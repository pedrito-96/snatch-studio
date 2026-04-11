// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@tresjs/nuxt', 'nuxt-i18n-micro'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      ignore: ['/en/en']
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        'three',
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', dir: 'ltr' },
      { code: 'en', iso: 'en-US', dir: 'ltr' }
    ],
    defaultLocale: 'it',
    translationDir: 'locales',
    meta: true,
    strategy: 'prefix_except_default'
  },

  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }]
  },
  tres: {
    devtools: true
  }
})
