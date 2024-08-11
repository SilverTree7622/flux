// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  devtools: { enabled: true },
  // target: 'static',
	ssr: false,
	components: true,

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
  nitro : {
   preset : 'github-pages' 
  },
  // app : {
  //  baseURL : 'https://silvertree7622.github.io/' 
  // },
  
  modules: [
      '@pinia/nuxt',
      '@nuxtjs/tailwindcss',
  ],

  compatibilityDate: '2024-08-11',
});