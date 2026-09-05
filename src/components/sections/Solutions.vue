<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SolutionIndustry } from '@/types'

const { t } = useI18n()

const INDUSTRY_KEYS = ['finance', 'internet', 'government', 'manufacturing'] as const

const solutions = computed<SolutionIndustry[]>(() =>
  INDUSTRY_KEYS.map((k) => {
    const p = `homeSections.solutions.${k}`
    const statCount = 4
    const stats = Array.from({ length: statCount }, (_, i) => {
      try {
        const value = t(`${p}.stats.${i}.value`)
        if (!value || value.startsWith(`${p}.stats.`)) return null
        return { value, label: t(`${p}.stats.${i}.label`) }
      } catch {
        return null
      }
    }).filter(Boolean) as { value: string; label: string }[]
    const visualCount = 6
    const visualList = Array.from({ length: visualCount }, (_, i) => {
      try {
        const val = t(`${p}.visualList.${i}`)
        if (!val || val.startsWith(`${p}.visualList.`)) return null
        return val
      } catch {
        return null
      }
    }).filter(Boolean) as string[]
    const featureCount = 5
    const features = Array.from({ length: featureCount }, (_, i) => {
      try {
        const title = t(`${p}.features.${i}.title`)
        if (!title || title.startsWith(`${p}.features.`)) return null
        return { title, desc: t(`${p}.features.${i}.desc`) }
      } catch {
        return null
      }
    }).filter(Boolean) as { title: string; desc: string }[]
    return {
      key: k,
      name: t(`${p}.name`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
      stats,
      tag: t(`${p}.tag`),
      visualList,
      features,
    }
  }),
)
</script>

<template>
  <section class="solutions" id="solutions">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('homeSection.solutionsLabel') }}</div>
        <h2 class="section-title">{{ t('homeSection.solutionsTitle') }}</h2>
        <p class="section-desc">{{ t('homeSection.solutionsDesc') }}</p>
      </div>
      <div class="solutions-grid">
        <div v-for="s in solutions" :key="s.key" class="solution-card reveal">
          <div class="solution-header">
            <div class="solution-label">{{ s.name }}</div>
            <div class="solution-tag">{{ s.tag }}</div>
          </div>
          <h3>{{ s.title }}</h3>
          <p class="solution-desc">{{ s.desc }}</p>
          <div class="solution-visual">
            <div v-for="(v, vi) in s.visualList" :key="vi" class="sv-item">{{ v }}</div>
          </div>
          <div class="solution-stats">
            <div v-for="(st, si) in s.stats" :key="si" class="ss-item">
              <div class="ss-value">{{ st.value }}</div>
              <div class="ss-label">{{ st.label }}</div>
            </div>
          </div>
          <div class="solution-features">
            <div v-for="(f, fi) in s.features" :key="fi" class="sf-item">
              <div class="sf-title">{{ f.title }}</div>
              <div class="sf-desc">{{ f.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Solutions styles live in global.scss
</style>
