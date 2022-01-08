import FS from 'fs';
import Path from 'path';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ppapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css', 
    'typer-js/dist/typer.min.css',
    '~/assets/styles/base.sass',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/cyberpunk-vue',
    { src: '@/plugins/client/error', ssr: false, mode: 'client' },
    { src: '@/plugins/client/api', ssr: false },
  ],

  serverMiddleware: [
    { path: '/api/', handler: '~/server/api' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  server: {
    host: '0.0.0.0',
    https: {
      key: FS.readFileSync(Path.resolve(__dirname, 'server.key')),
      cert: FS.readFileSync(Path.resolve(__dirname, 'server.crt')),
    },
  },

  router: {
    middleware: 'router'
  },

  hooks: {
    error(nuxt, error) {
      console.log(error);
    }
  },

  styleResources: {
    sass: './assets/styles/util/*.sass',
  },
}
