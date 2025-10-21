import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'github_pages'
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  app: {
    baseURL: '/nuxt4/',
    buildAssetsDir: '/nuxt4/_nuxt/'
  },
  imports: {
    dirs: ['./stores']
  },
  // pinia: {
  //   autoImports: ['defineStore', 'acceptHMRUpdate']
  // },
})