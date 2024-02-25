import { createI18n } from 'vue-i18n'
// import { requireContext } from 'node-loader'
import en from '../locales/en'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`,
 * which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
// function loadLocaleMessages() {
//   const locales = import.meta.glob('../locales', { eager: true })
//   //('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach((key) => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key).default
//     }
//   })
//   return messages
// }

export async function loadLocaleMessages() {
  const locales = await import.meta.glob('../locales')
  const messages = {}

  for (const key of locales.keys()) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = await locales(key).default
    }
  }

  return messages
}

export default createI18n({
  locale: import.meta.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { en },
  numberFormats: {
    en: {
      currency: { style: 'currency', currency: 'USD' }
    },
    ja: {
      currency: { style: 'currency', currency: 'JPY' }
    }
  }
})
