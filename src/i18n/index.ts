import { createI18n } from 'vue-i18n'
// P2-3: locale split modules per language (common / locale / nav / footer / hero /
//        homeSection(s) / contactForm / views), assembled in locales/<lang>/index.ts.
// Old top-level files ./zh-cn.ts still re-export from here for backward compatibility
// with any external imports referencing the old paths directly.
import zhCn from './locales/zh-cn/index'
import en from './locales/en/index'
import zhTw from './locales/zh-tw/index'
import type { Locale } from '@/types'

const STORAGE_KEY = 'taurus-portal-locale'

const detectDefaultLocale = (): Locale => {
  if (typeof window === 'undefined') return 'zh-cn'
  const STANDARD: Locale[] = ['zh-cn', 'en', 'zh-tw']
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && STANDARD.includes(saved as Locale)) return saved as Locale
  const nav = (navigator.language || 'zh-cn').toLowerCase()
  // Handle bare 'zh' (no subtag) — treat as Simplified Chinese
  if (nav === 'zh') return 'zh-cn'
  if (nav.startsWith('zh') && (nav.includes('tw') || nav.includes('hant'))) return 'zh-tw'
  if (nav.startsWith('zh')) return 'zh-cn'
  return 'en'
}

const i18n = createI18n({
  legacy: false, // Composition API
  globalInjection: true,
  locale: detectDefaultLocale(),
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': zhCn,
    en,
    'zh-tw': zhTw,
  },
})

export default i18n

export const setLocale = (locale: Locale) => {
  ;(i18n.global.locale as unknown as { value: Locale }).value = locale
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
}
