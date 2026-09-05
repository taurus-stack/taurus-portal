<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
useHead(() => ({
  title: route.meta.title as string | undefined,
  meta: [
    { name: 'description', content: route.meta.description as string | undefined },
    { property: 'og:title', content: route.meta.title as string | undefined },
    { property: 'og:description', content: route.meta.description as string | undefined },
  ],
}))

const { t } = useI18n()

interface DocSection {
  icon: string
  title: string
  desc: string
  linkLabel: string
  items: { label: string; href?: string; tag?: string }[]
}

const SECTION_KEYS = ['quickStart', 'architecture', 'deployment', 'apiReference'] as const

const docSections = computed<DocSection[]>(() =>
  SECTION_KEYS.map((k) => {
    const p = `views.docs.sections.${k}`
    const bulletCap = 8
    const items = Array.from({ length: bulletCap }, (_, i) => {
      const label = t(`${p}.bullets.${i}.label`)
      if (!label || label.startsWith(`${p}.bullets.`)) return null
      const tryHref = t(`${p}.bullets.${i}.href`)
      const tryTag = t(`${p}.bullets.${i}.tag`)
      const href = tryHref && !tryHref.startsWith(`${p}.bullets.`) ? tryHref : undefined
      const tag = tryTag && !tryTag.startsWith(`${p}.bullets.`) ? tryTag : undefined
      return { label, href, tag }
    }).filter(Boolean) as { label: string; href?: string; tag?: string }[]
    return {
      icon: t(`${p}.icon`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
      linkLabel: t(`${p}.linkLabel`),
      items,
    }
  }),
)

const FAQ_KEYS = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6'] as const
const faqs = computed<{ q: string; a: string }[]>(() =>
  FAQ_KEYS.map((k) => ({ q: t(`views.docs.${k}.q`), a: t(`views.docs.${k}.a`) })),
)
</script>

<template>
  <div class="docs-view">
    <section class="dv-hero">
      <div class="container reveal">
        <div class="section-label">{{ t('views.docs.label') }}</div>
        <h1>{{ t('views.docs.title') }}</h1>
        <p>{{ t('views.docs.intro') }}</p>
      </div>
    </section>

    <section class="dv-sections">
      <div class="container">
        <div class="dv-grid">
          <article v-for="(s, i) in docSections" :key="i" class="dv-card reveal">
            <header>
              <div class="dv-icon">{{ s.icon }}</div>
              <div>
                <h3>{{ s.title }}</h3>
                <p>{{ s.desc }}</p>
              </div>
            </header>
            <ul class="dv-list">
              <li v-for="(it, j) in s.items" :key="j">
                <span class="dv-dot">•</span>
                <component
                  :is="it.href ? 'a' : 'span'"
                  :href="it.href"
                  :target="it.href ? '_blank' : undefined"
                  :rel="it.href ? 'noopener noreferrer' : undefined"
                  class="dv-label"
                >
                  {{ it.label }}
                </component>
                <span v-if="it.tag" class="dv-tag">{{ it.tag }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="dv-faq">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">{{ t('views.docs.faqLabel') }}</div>
          <h2 class="section-title">{{ t('views.docs.faqTitle') }}</h2>
        </div>
        <div class="dv-faq-list reveal">
          <details v-for="(f, i) in faqs" :key="i" class="dv-faq-item">
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.docs-view {
  background: var(--bg-slate);
  padding-top: 80px;
}
.dv-hero {
  padding: 60px 0 40px;
  text-align: center;
  .section-label {
    display: inline-block;
    margin-bottom: 16px;
  }
  h1 {
    font-size: clamp(28px, 4.5vw, 48px);
    margin-bottom: 16px;
    max-width: 900px;
    margin-inline: auto;
  }
  p {
    color: var(--text-secondary);
    max-width: 720px;
    margin: 0 auto;
  }
}
.dv-sections {
  padding: 32px 0 64px;
}
.dv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}
.dv-card {
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  header {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }
  .dv-icon {
    font-size: 32px;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(45, 212, 191, 0.12), rgba(96, 165, 250, 0.12));
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 6px;
  }
  p {
    color: var(--text-secondary);
    font-size: 14px;
  }
}
.dv-list {
  display: grid;
  gap: 10px;
}
.dv-list li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.6;
}
.dv-dot {
  color: var(--teal-500);
  font-weight: 700;
  margin-top: 2px;
}
.dv-label {
  color: var(--text-primary);
  &:hover {
    color: var(--teal-600);
  }
}
.dv-tag {
  margin-left: auto;
  flex-shrink: 0;
  background: var(--slate-100);
  color: var(--slate-600);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
}

.dv-faq {
  padding: 40px 0 80px;
}
.dv-faq-list {
  max-width: 860px;
  margin: 0 auto;
}
.dv-faq-item {
  background: white;
  border-radius: 14px;
  padding: 16px 20px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 12px;
  &[open] {
    box-shadow: var(--shadow-md);
  }
  summary {
    cursor: pointer;
    font-weight: 600;
    list-style: none;
    position: relative;
    padding-right: 32px;
  }
  summary::after {
    content: '+';
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    color: var(--teal-500);
    transition: transform 0.2s;
  }
  &[open] summary::after {
    content: '−';
  }
  p {
    margin-top: 12px;
    color: var(--text-secondary);
    line-height: 1.8;
  }
}
</style>
