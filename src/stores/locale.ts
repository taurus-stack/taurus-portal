import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Locale } from '@/types'
import { setLocale as setI18nLocale } from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const current = ref<Locale>('zh-cn')

  const setLocale = (locale: Locale) => {
    current.value = locale
    setI18nLocale(locale)
  }

  const availableLocales = computed<{ code: Locale; label: string }[]>(() => [
    { code: 'zh-cn', label: '简体中文' },
    { code: 'en', label: 'English' },
    { code: 'zh-tw', label: '繁體中文' },
  ])

  return { current, setLocale, availableLocales }
})
