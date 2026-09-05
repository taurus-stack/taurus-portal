<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import Solutions from '@/components/sections/Solutions.vue'
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
</script>

<template>
  <div class="solutions-view" style="background: var(--bg-slate)">
    <section class="sv-hero">
      <div class="container reveal">
        <div class="section-label">{{ t('views.solutions.label') }}</div>
        <h1>{{ t('views.solutions.title') }}</h1>
        <p>{{ t('views.solutions.heroTagline') }}</p>
      </div>
    </section>
    <Solutions />
    <section class="sv-cta">
      <div class="container">
        <h2>{{ t('views.solutions.ctaTitle') }}</h2>
        <p>{{ t('views.solutions.ctaDesc') }}</p>
        <router-link to="/#contact" class="btn btn-primary btn-lg">{{
          t('views.solutions.ctaButton')
        }}</router-link>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.sv-hero {
  padding: 120px 0 40px;
  text-align: center;
  background: linear-gradient(180deg, #f1f5f9 0%, var(--bg-slate) 100%);
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
    font-size: 17px;
  }
}
.sv-cta {
  padding: 80px 0;
  text-align: center;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%);
  color: white;
  h2 {
    color: white;
    font-size: clamp(24px, 3.5vw, 36px);
    margin-bottom: 12px;
  }
  p {
    color: #cbd5e1;
    margin-bottom: 28px;
  }
}
</style>
