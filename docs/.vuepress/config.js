module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VueAwaited 🥂',
      description: 'A Vue.js plugin for data and components lazy loading.'
    }
  },
  base: '/vue-awaited/',
  themeConfig: {
    repoLabel: 'Contribute!',
    // git repo here... gitlab, github
    repo: '',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'dev',
    editLinkText: 'Help us improve this page!',
    search: false,
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      // external link to git repo...again
      { text: 'GitHub', link: '' }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'gettingStarted', 'awaited', 'awaitedComponent']
        }
      ]
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
