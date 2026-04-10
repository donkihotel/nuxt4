import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/server/',
        '/domain/',
        '/task/'
      ]
    }
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    // '@nuxtjs/sitemap'
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
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: '_nuxt/',
    head: {
      script: [
        {
          src: 'https://analytics.ahrefs.com/analytics.js',
          async: true,
          'data-key': 'KZQYFtkPbslgyuy51XUE7A'
        }
      ],
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '2CPU2RAM' },
        { property: 'og:title', content: '2CPU2RAM' },
        { property: 'og:description', content: '서버 구축부터 도메인 연결, 메일 설정까지 한 번에—홈페이지를 쉽고 빠르게 운영할 수 있도록 도와드립니다.' },
        { property: 'og:url', content: 'https://2cpu2ram.com' },
        { property: 'og:image', content: 'https://2cpu2ram.com/og-image.png' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '2CPU2RAM' },
        { name: 'twitter:description', content: '서버 구축부터 도메인 연결, 메일 설정까지 한 번에—홈페이지를 쉽고 빠르게 운영할 수 있도록 도와드립니다.' },
        { name: 'twitter:image', content: 'https://2cpu2ram.com/og-image.png' }
      ]
    }
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
  // site: {
  //   url: 'https://2cpu2ram.com',
  //   name: '2CPU2RAM'
  // },
  // sitemap: {
  //   exclude: ['/pinia/**', '/fetch/**'],
  // }
})