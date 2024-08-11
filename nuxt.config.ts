// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  
  setup () {
    useMeta({
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
      ],
      bodyAttrs: {
        class: 'w-full h-full'
      }
    })
  },
  modules: [
      '@pinia/nuxt',
      '@nuxtjs/tailwindcss',
  ],

  compatibilityDate: '2024-08-11',
});