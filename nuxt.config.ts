// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ssr: false,
  components: true,
  nitro: {
    preset: 'github-pages'
  },
  app: {
    head: {
      title: 'Flux Dev',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'flux hunter\' personal website!' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
    },
    baseURL: '/flux/',
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  compatibilityDate: '2024-08-11',
});