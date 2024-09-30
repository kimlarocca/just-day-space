// https://nuxt.com/docs/api/configuration/nuxt-config//
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Just Day Space',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#f4f2f0' },
        { name: 'theme-color', content: '#f4f2f0' },
        { name: 'description', content: 'Connecting empty spaces with people who need them.' }
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
    },
  },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Ym56ZHJid2RnY2NtYXdxd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwOTc4NzYsImV4cCI6MjAzOTY3Mzg3Nn0.w02ujkoreWL7FhuAqP5nDNFTVsKIAwrh4ZoknJ8WuJs',
    url: 'https://qzbnzdrbwdgccmawqwtf.supabase.co',
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
      // gtagId: 'G-6CN5WGM5L0',
      supabaseAuthSignInRedirectTo: process.env.environment === 'local' ? 'http://localhost:3000' : 'https://app.justdayspace.com',
      supabaseSuccessRedirectTo: process.env.environment === 'local' ? 'http://localhost:3000/success' : 'https://app.justdayspace.com/success',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Ym56ZHJid2RnY2NtYXdxd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwOTc4NzYsImV4cCI6MjAzOTY3Mzg3Nn0.w02ujkoreWL7FhuAqP5nDNFTVsKIAwrh4ZoknJ8WuJs',
      supabaseUrl: 'https://qzbnzdrbwdgccmawqwtf.supabase.co',
      supabaseAuthTokenName: 'sb-qzbnzdrbwdgccmawqwtf-auth-token',
    }
  },
})
