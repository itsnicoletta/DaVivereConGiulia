import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-05',
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: { public: { siteUrl: '' } },
  app: { head: { htmlAttrs: { lang: 'it' }, link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'preconnect', href: 'https://api.fontshare.com' },
    { rel: 'preconnect', href: 'https://cdn.fontshare.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap' },
  ] } },
})
