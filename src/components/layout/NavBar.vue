<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import { useThemeStore, type ThemePref } from '@/stores/theme'
import type { Locale } from '@/types'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const localeStore = useLocaleStore()
const themeStore = useThemeStore()

const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const themeOpen = ref(false)

// 使用 t() 动态生成菜单（避免静态固化）
const navItems = computed(() => [
  { label: t('nav.home'), href: '/' },
  { label: t('nav.product'), href: '/product' },
  { label: t('nav.solutions'), href: '/solutions' },
  { label: t('nav.docs'), href: '/docs' },
  { label: t('nav.download'), href: '/download' },
  { label: t('nav.about'), href: '/about' },
])

const isActive = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path === href
}

const onNavClick = (href: string, e: MouseEvent) => {
  if (href.startsWith('http')) return
  e.preventDefault()
  mobileOpen.value = false
  langOpen.value = false
  themeOpen.value = false
  router.push(href)
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}
const closeMobile = () => {
  mobileOpen.value = false
}

const handleLangSelect = (code: Locale) => {
  localeStore.setLocale(code)
  // vue-i18n legacy:false → locale is a ref<string>
  ;(locale as unknown as { value: string }).value = code
  langOpen.value = false
}

const handleThemeSelect = (next: ThemePref) => {
  themeStore.setTheme(next)
  themeOpen.value = false
}

const localeList = computed(() => [
  { code: 'zh-cn' as Locale, label: t('locale.zhCn') },
  { code: 'en' as Locale, label: t('locale.en') },
  { code: 'zh-tw' as Locale, label: t('locale.zhTw') },
])

const THEME_ICON: Record<ThemePref, string> = {
  light: '☀️',
  dark: '🌙',
  system: '💻',
}

const themeList = computed(() => [
  { code: 'light' as ThemePref, label: t('common.theme.light'), icon: THEME_ICON.light },
  { code: 'dark' as ThemePref, label: t('common.theme.dark'), icon: THEME_ICON.dark },
  { code: 'system' as ThemePref, label: t('common.theme.system'), icon: THEME_ICON.system },
])

const currentLocaleLabel = computed(
  () => localeList.value.find((l) => l.code === localeStore.current)?.label || t('locale.zhCn'),
)
const currentThemeIcon = computed(
  () => THEME_ICON[themeStore.pref as ThemePref] ?? THEME_ICON.system,
)

const outsideClick = (e: MouseEvent) => {
  const el = e.target as HTMLElement
  if (!el.closest('.lang-switcher')) langOpen.value = false
  if (!el.closest('.theme-switcher')) themeOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', outsideClick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', outsideClick)
})
</script>

<template>
  <div>
    <nav :class="['navbar', { scrolled }]">
      <div class="container nav-inner">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">
            <span class="dot"></span>
          </span>
          <span>{{ t('common.brand') }}</span>
        </RouterLink>
        <ul class="nav-menu">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              :class="{ active: isActive(item.href) }"
              @click="onNavClick(item.href, $event)"
              >{{ item.label }}</a
            >
          </li>
        </ul>
        <div class="nav-cta" style="display: flex; align-items: center; gap: 10px">
          <!-- Theme switcher (P2-4) -->
          <div class="theme-switcher" @click.stop>
            <button
              type="button"
              class="lang-switcher-btn theme-btn"
              :aria-expanded="themeOpen"
              aria-haspopup="listbox"
              :title="t('common.theme.label')"
              @click="themeOpen = !themeOpen"
            >
              <span aria-hidden="true">{{ currentThemeIcon }}</span>
              <span class="chevron" :class="{ open: themeOpen }">▾</span>
            </button>
            <ul v-if="themeOpen" class="lang-switcher-menu theme-menu" role="listbox">
              <li v-for="th in themeList" :key="th.code" role="option">
                <button
                  type="button"
                  :class="{ current: th.code === themeStore.pref }"
                  @click="handleThemeSelect(th.code)"
                >
                  <span class="row">
                    <span class="ic">{{ th.icon }}</span>
                    <span>{{ th.label }}</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div class="lang-switcher" @click.stop>
            <button
              type="button"
              class="lang-switcher-btn"
              :aria-expanded="langOpen"
              aria-haspopup="listbox"
              @click="langOpen = !langOpen"
            >
              <span aria-hidden="true">🌐</span>
              <span>{{ currentLocaleLabel }}</span>
              <span class="chevron" :class="{ open: langOpen }">▾</span>
            </button>
            <ul v-if="langOpen" class="lang-switcher-menu" role="listbox">
              <li v-for="l in localeList" :key="l.code" role="option">
                <button
                  type="button"
                  :class="{ current: l.code === localeStore.current }"
                  @click="handleLangSelect(l.code)"
                >
                  {{ l.label }}
                </button>
              </li>
            </ul>
          </div>
          <RouterLink to="/#contact" class="btn btn-primary">{{
            t('nav.scheduleDemo')
          }}</RouterLink>
          <div
            :class="['hamburger', { active: mobileOpen }]"
            @click="mobileOpen = !mobileOpen"
            :aria-label="t('nav.scheduleDemo')"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
    <div :class="['mobile-menu', { active: mobileOpen }]">
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        :class="{ active: isActive(item.href) }"
        @click="onNavClick(item.href, $event)"
      >
        {{ item.label }}
      </a>
      <div class="mobile-lang">
        <span class="mobile-lang-label">{{ t('common.theme.label') }}</span>
        <button
          v-for="th in themeList"
          :key="th.code"
          type="button"
          :class="['mobile-lang-btn', { current: th.code === themeStore.pref }]"
          @click="handleThemeSelect(th.code)"
        >
          {{ th.icon }} {{ th.label }}
        </button>
      </div>
      <div class="mobile-lang">
        <span class="mobile-lang-label">{{ t('locale.label') }}</span>
        <button
          v-for="l in localeList"
          :key="l.code"
          type="button"
          :class="['mobile-lang-btn', { current: l.code === localeStore.current }]"
          @click="
            handleLangSelect(l.code)
            closeMobile()
          "
        >
          {{ l.label }}
        </button>
      </div>
      <RouterLink to="/#contact" class="btn btn-primary" @click="closeMobile">
        {{ t('nav.scheduleDemo') }}
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lang-switcher,
.theme-switcher {
  position: relative;
  .lang-switcher-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background: var(--bg-primary);
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      border-color: var(--teal-500);
      color: var(--teal-700);
      background: var(--bg-slate);
    }
    .chevron {
      font-size: 10px;
      transition: transform 0.2s;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
  }
  .theme-btn {
    padding: 6px 10px;
    min-width: 42px;
    justify-content: center;
  }
  .lang-switcher-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 152px;
    z-index: 100;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    padding: 4px;
    list-style: none;
    overflow: hidden;
    animation: drop 0.18s ease;
    .row {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .ic {
      display: inline-flex;
      width: 18px;
      justify-content: center;
    }
    button {
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      color: var(--text-primary);
      background: transparent;
      &:hover,
      &.current {
        background: linear-gradient(135deg, rgba(45, 212, 191, 0.1), rgba(96, 165, 250, 0.1));
        color: var(--teal-700);
      }
      &.current {
        font-weight: 600;
      }
    }
  }
  // [data-theme='dark'] scoped override for menu
}
:global([data-theme='dark']) {
  .lang-switcher-btn:hover {
    color: var(--teal-400);
  }
}
@keyframes drop {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mobile-lang {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 8px;
  &:first-of-type {
    padding-top: 16px;
  }
}
.mobile-lang-label {
  color: #94a3b8;
  font-size: 13px;
  width: 100%;
  margin-bottom: 4px;
}
.mobile-lang-btn {
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  &.current {
    background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
    color: white;
    border-color: transparent;
    font-weight: 600;
  }
}
:deep(.nav-menu a.active)::after {
  transform: scaleX(1);
}
</style>
