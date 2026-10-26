// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Crusts & Daisies',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Perpaduan antara kue kering yang renyah dan menyenangkan dengan suasana hangat.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
    vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },

  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  routeRules: {
    '/status': { ssr: false },
    '/orders': { ssr: false },
  },
});
