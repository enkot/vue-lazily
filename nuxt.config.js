export default {
  target: 'static',
  generate: {
    dir: 'gh_pages',
    subFolders: false
  },
  head: {
    title: 'VueAwaited',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  buildModules: ['@nuxtjs/tailwindcss'],
  plugins: ['@/plugins/highlight'],
  tailwindcss: {
    config: {
      plugins: [require('@tailwindcss/aspect-ratio')],
      theme: {
        extend: {
          keyframes: {
            flash: {
              '0%, 100%': { opacity: 0 },
              '50%': { opacity: 1 }
            }
          },
          animation: {
            flash: 'flash 1s ease-in-out'
          }
        }
      }
    }
  },
  build: {
    extend: config => {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader']
      })
    }
  }
}
