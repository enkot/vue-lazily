import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  ref,
  h,
  watch,
} from "vue";

const DEFAULT_DELAY = 200;

export default defineComponent({
  props: {
    action: {
      type: [String, Function, Promise],
      required: false,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: [Number, Boolean],
    },
    margin: {
      type: String,
    },
    threshold: {
      type: Number,
    },
    height: {
      type: String,
    },
    tag: {
      type: String,
      default: "div",
    },
    watch: {
      type: [Number, String, Array, Object, Function],
    },
    actionHandler: {
      type: Function,
    },
  },
  emits: ["observed", "resolved"],
  setup(props, { slots, emit }) {
    const resolved = ref(false);
    const observed = ref(false);
    const error = ref<unknown>(null);
    const data = ref(null);
    const observer = ref<IntersectionObserver | null>(null);
    const root = ref<Element | undefined>();
    const isDelay = ref(!!props.delay);

    const startDelay = () => {
      if (props.delay) {
        const delayTimer = setTimeout(
          () => {
            isDelay.value = false;
            clearTimeout(delayTimer);
          },
          typeof props.delay === "number" ? props.delay : DEFAULT_DELAY
        );
      } else {
        isDelay.value = false;
      }
    };

    const getData = (action: string | Function | Promise<any>) => {
      switch (typeof action) {
        case "string":
          return fetch(action).then((data) => data.json());
        case "function":
          return action();
        default:
          return action;
      }
    };

    const run = async () => {
      observed.value = true;

      if (!props.action) {
        resolved.value = true;
        return;
      }

      resolved.value = false;
      startDelay();

      try {
        const result = await (props.actionHandler
          ? props.actionHandler(props.action)
          : props.action
          ? getData(props.action)
          : undefined);

        data.value = result;
      } catch (e) {
        error.value = e;
      } finally {
        resolved.value = true;
        emit("resolved", {
          data: data.value,
          error: error.value,
        });
      }
    };

    const unobserve = () => {
      if (observer.value && root.value) {
        observer.value.unobserve(root.value);
        root.value = undefined;
      }
    };

    const observe = () => {
      observer.value = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio <= 0) return;
          unobserve();
          run();
          emit("observed");
        },
        {
          rootMargin: props.margin,
          threshold: props.threshold,
        }
      );

      if (root.value) observer.value.observe(root.value);
    };

    const combinedSlotData = computed(() => ({
      pending: !resolved.value,
      data: data.value,
      error: error.value,
      observed: observed.value,
    }));

    const pendingSlotData = computed(() => ({
      data: data.value,
      observed: observed.value,
    }));

    const initialSlot =
      slots.combined?.(combinedSlotData.value) ||
      slots.pending?.(pendingSlotData.value);

    onMounted(() => {
      if (initialSlot?.length && !isDelay.value) {
        //@ts-ignore Vue 2 and Vue 3 VNodes have different props to get DOM element
        root.value = initialSlot?.[0].elm || initialSlot?.[0].el;
      }
      if (props.lazy) observe();
    });

    onUnmounted(unobserve);

    if (!props.lazy) run();

    if (props.watch)
      watch(
        typeof props.watch === "function" ? props.watch : () => props.watch,
        run
      );

    return () => {
      const { height } = props;

      if (slots.combined)
        return observed.value
          ? slots.combined?.(combinedSlotData.value)
          : initialSlot;

      if (props.lazy && !resolved.value)
        return slots.pending && !isDelay.value
          ? observed.value
            ? slots.pending?.(pendingSlotData.value)
            : initialSlot
          : h(
              "div",
              {
                //@ts-ignore
                ref: root,
                style: height
                  ? {
                      height,
                    }
                  : undefined,
              },
              ""
            );

      if (error.value && slots.error)
        return slots.error?.({ error: error.value });

      if (resolved.value && slots.default)
        return slots.default?.({ data: data.value });
    };
  },
});
