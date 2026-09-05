<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Testimonial } from '@/types'

const { t } = useI18n()

const TEST_KEYS = ['t1', 't2', 't3'] as const

const testimonials = computed<Testimonial[]>(() =>
  TEST_KEYS.map((k) => {
    const p = `homeSections.testimonials.${k}`
    return {
      quote: t(`${p}.quote`),
      name: t(`${p}.name`),
      title: t(`${p}.title`),
      company: t(`${p}.company`),
      avatar: t(`${p}.avatar`),
    }
  }),
)

// clients is a string[]; vue-i18n renders it via t() if keyed numerically;
// we read 20 slots and filter misses.
const clients = computed<string[]>(
  () =>
    Array.from({ length: 20 }, (_, i) => {
      try {
        const val = t(`homeSections.clients.${i}`)
        if (val && !val.startsWith('homeSections.clients.')) return val
      } catch {
        /* ignore */
      }
      return null
    }).filter(Boolean) as string[],
)
</script>

<template>
  <section class="testimonials" id="testimonials">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('homeSection.testimonialsLabel') }}</div>
        <h2 class="section-title">{{ t('homeSection.testimonialsTitle') }}</h2>
        <p class="section-desc">{{ t('homeSection.testimonialsDesc') }}</p>
      </div>
      <div class="testimonial-grid">
        <div v-for="(q, i) in testimonials" :key="i" class="testimonial-card reveal">
          <div class="quote-mark">&ldquo;</div>
          <p class="quote">{{ q.quote }}</p>
          <div class="author">
            <div class="avatar">{{ q.avatar }}</div>
            <div>
              <div class="name">{{ q.name }}</div>
              <div class="position">{{ q.title }} · {{ q.company }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 客户集群 -->
      <div style="margin-top: 80px" class="clients-block reveal">
        <div
          class="section-label"
          style="text-align: center; justify-content: center; display: flex"
        >
          {{ t('hero.clusterLabel') }}
        </div>
        <div class="clients-grid">
          <div v-for="(c, i) in clients" :key="i" class="client-logo">{{ c }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Testimonials styles live in global.scss
</style>
