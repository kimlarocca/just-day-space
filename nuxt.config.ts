// https://nuxt.com/docs/api/configuration/nuxt-config//
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Cuetip Benchmark',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#f4f2f0' },
        { name: 'theme-color', content: '#f4f2f0' },
        { name: 'description', content: 'Cuetip is a tech and data provider of premium technology and services to the entire supply chain in the cannabis space.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff3904' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        }
      ],
      script: [
        { id: 'ze-snippet', src: 'https://static.zdassets.com/ekr/snippet.js?key=522fb0c1-1c9e-4801-8800-5c24e938f131' }
      ],
    },
  },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcmpldHFyenBnbGx6cmRhbmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0NjIyMTcsImV4cCI6MjAxMDAzODIxN30.u4WDh3DATcibxn_i9TGZxwuO_15FsoklszHCJkBdzbY',
    url: 'https://oorjetqrzpgllzrdangl.supabase.co',
    redirect: true,
  },
  css: [
        'primevue/resources/themes/mdc-light-deeppurple/theme.css',
    'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/styles/main.scss',
  ],
  components: true,
    build: {
        transpile: ['primevue'],
    },
  runtimeConfig: {
    SENDGRID_API_KEY: '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',
    public: {
      environment: process.env.environment ?? 'local',
      gtagId: 'G-6CN5WGM5L0',
      supabaseAuthSignInRedirectTo: process.env.environment === 'local' ? 'http://localhost:3000' : 'https://benchmark.cuetip.com',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcmpldHFyenBnbGx6cmRhbmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0NjIyMTcsImV4cCI6MjAxMDAzODIxN30.u4WDh3DATcibxn_i9TGZxwuO_15FsoklszHCJkBdzbY',
      supabaseUrl: 'https://oorjetqrzpgllzrdangl.supabase.co',
      supabaseAuthTokenName: 'sb-oorjetqrzpgllzrdangl-auth-token',
    }
  },
})
