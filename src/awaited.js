export default {
  props: {
    action: {
      type: String,
      required: false
    },
    storeData: {
      type: String,
      required: false
    }
  },
  data: () => ({
    promise: null
  }),
  async created() {
    this.$store.dispatch(this.action)
  },
  render() {
    const key = this.storeData

    return this.$scopedSlots.default({
      [key]: this.$store.state[key]
    })
  }
}
