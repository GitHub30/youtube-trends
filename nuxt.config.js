
// https://ja.nuxtjs.org/faq/github-pages/
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/youtube-trends/'
  }
} : {};


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'youtube-trends',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui']
  },
  modules: [
    // この行を追加して有効化
    '@nuxtjs/vuetify',
    ['@nuxtjs/moment', ['fa']]
  ],

  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  plugins: [
    '~plugins/element-ui'
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  ...routerBase
}
