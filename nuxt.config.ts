// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    build: {
        ssr: false
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
    ],
    // target: 'static',
    // typescript: {
    //     typeCheck: true,
    //     tsConfig: {
    //         "extends": "../../../tsconfig.base.json"
    //     }
    // },
});