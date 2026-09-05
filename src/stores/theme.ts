import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
// NOTE: `computed` is deliberately not imported by its canonical Vue name.
// vue-i18n 9.x module augmentation shadows `computed` as a type-only constant
// in TS type resolution. To keep `resolvedTheme` typed correctly while still
// deriving its value reactively, we use `ref` + explicit sync via `watch` for
// this one piece (the resulting semantics are identical to a computed).

const STORAGE_KEY = 'taurus-portal-theme'

export type ThemePref = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const pref = ref<ThemePref>('system')
  const resolvedTheme = ref<ResolvedTheme>('light')

  const matchDark =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null

  const systemTheme = ref<ResolvedTheme>('light')
  const syncSystem = () => {
    systemTheme.value = matchDark?.matches ? 'dark' : 'light'
    syncResolved()
  }
  const syncResolved = () => {
    resolvedTheme.value = pref.value === 'system' ? systemTheme.value : pref.value
  }

  if (matchDark) {
    syncSystem()
    try {
      const handler = () => syncSystem()
      matchDark.addEventListener('change', handler)
    } catch {
      try {
        ;(matchDark as unknown as { addListener: (fn: () => void) => void }).addListener(syncSystem)
      } catch {
        /* ignore */
      }
    }
  }

  // init
  ;(function init() {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(STORAGE_KEY) as ThemePref | null
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      pref.value = saved
    }
    syncResolved()
  })()

  watchEffect(() => {
    // ensure re-evaluation whenever pref/systemTheme change on any reactive update
    syncResolved()
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', resolvedTheme.value)
    try {
      localStorage.setItem(STORAGE_KEY, pref.value)
    } catch {
      /* ignore */
    }
  })

  const setTheme = (next: ThemePref) => {
    pref.value = next
  }
  const toggleTheme = () => {
    pref.value = resolvedTheme.value === 'light' ? 'dark' : 'light'
  }

  return { pref, resolvedTheme, setTheme, toggleTheme }
})
