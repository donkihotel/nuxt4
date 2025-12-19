import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'github_pages',
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
    // head: {
    //   meta: [
    //     {
    //       name: 'viewport',
    //       content: 'width=1200, initial-scale=0.3'
    //     }
    //   ]
    // },
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: '_nuxt/'
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_APP_BASE_URL || 'http://localhost:3000',
    }
  },
  imports: {
    dirs: ['./stores']
  },
  // pinia: {
  //   autoImports: ['defineStore', 'acceptHMRUpdate']
  // },
})