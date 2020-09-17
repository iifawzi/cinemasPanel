
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, viewport-fit=cover, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  '~/assets/scss/main.scss',
  '~/assets/css/all.css',
  ],
    /*
  ** Will be shared in all components
  */
 styleResources: {
  scss: ['./assets/scss/variables.scss','./assets/scss/zindexes.scss']
},
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
    "~/plugins/vuelidate.js",
    "~/plugins/axios.js"
  ],
  /*
  ** Routers configs
  */
  router: {
    middleware: ['language'],
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    "@nuxtjs/axios"
  ],
    /*
  ** Axios Settings: 
  */
 axios: {
  baseURL: 'http://localhost:3000/api/',
},
        /*
  ** Server Settings : 
  */
 server: {
  port: 4000, // wheen needed to change the port
 },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
