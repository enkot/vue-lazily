export default function({ asyncComponent, loading }) {
  let resolveComponent

  return () => ({
    // resolve a component eventually.
    component: new Promise(resolve => {
      resolveComponent = resolve
    }),
    loading: {
      mounted() {
        // if `IntersectionObserver` is not supported.
        if (!('IntersectionObserver' in window)) {
          asyncComponent().then(resolveComponent)
          return
        }

        const observer = new IntersectionObserver(entries => {
          // use `intersectionRatio` instead of `isIntersecting`
          // https://github.com/w3c/IntersectionObserver/issues/211
          if (entries[0].intersectionRatio <= 0) return

          // cleanup the observer
          observer.unobserve(this.$el)

          asyncComponent().then(resolveComponent)
        })

        observer.observe(this.$el)
      },
      render(h) {
        return loading || h('div')
      }
    }
  })
}
