import axios from 'axios'
import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Custom context variables
   */
  env: {
    siteTitle: process.env.TITLE || process.env.npm_package_helvellyn_title,
    siteDescription:
      process.env.DESCRIPTION || process.env.npm_package_helvellyn_description,
    baseUrl: process.env.URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || process.env.npm_package_helvellyn_api_url,
    apiKey: process.env.API_KEY || process.env.npm_package_helvellyn_api_key
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_helvellyn_title,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_helvellyn_description || ''
      },
      {
        property: 'og:url',
        content: process.env.URL || 'http://localhost:3000',
        hid: 'og:url'
      },
      { property: 'og:type', content: 'website', hid: 'og:type' },
      {
        property: 'og:title',
        content:
          process.env.npm_package_helvellyn_title +
          ' - ' +
          process.env.npm_package_helvellyn_description,
        hid: 'og:title'
      },
      {
        property: 'og:description',
        content: process.env.npm_package_helvellyn_description,
        hid: 'og:description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the loading indicator shown on initial load
   */
  loadingIndicator: {
    name: 'cube-grid',
    color: 'white',
    background: colors.cyan.darken2
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors[process.env.PRIMARY_COLOR || 'blue'].darken1
        },
        light: {
          primary: colors[process.env.PRIMARY_COLOR || 'blue']
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Generate configuration
   */
  generate: {
    async routes() {
      const headers = {
        headers: {
          common: {
            Accept: 'application/json',
            'Api-Token':
              process.env.API_KEY || process.env.npm_package_helvellyn_api_key
          }
        }
      }

      const templates = await axios
        .get(
          process.env.API_URL || process.env.npm_package_helvellyn_api_url,
          headers
        )
        .then((res) => {
          const workspace = res.data
          return workspace.templates
        })

      const templateRoutes = templates.map((template) => {
        return {
          route: '/' + template.slug,
          payload: template
        }
      })

      const entities = await Promise.all(
        templates.map((template) => {
          return axios
            .get(
              (process.env.API_URL ||
                process.env.npm_package_helvellyn_api_url) +
                '/' +
                template.slug,
              headers
            )
            .then((res) => {
              return res.data.map((entity) => {
                return {
                  route: '/' + template.slug + '/' + entity.slug,
                  payload: entity
                }
              })
            })
        })
      )

      const entityRoutes = (entities || []).flat()

      return templateRoutes.concat(entityRoutes)
    }
    // NOTE: `nuxt export` sounds promising: https://noti.st/debbie/V5iLun/slides
  }
}
