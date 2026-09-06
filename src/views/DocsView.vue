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
