<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18nInstance from '@/i18n'
import type { Feature } from '@/types'

const { t } = useI18n()

const FEATURE_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10'] as const

const features = computed<Feature[]>(() =>
  FEATURE_KEYS.map((k) => {
    const prefix = `homeSections.features.${k}`
    // Read actual points count from raw messages (avoids hard-coded 10 and
    // the resulting [intlify] Not found warnings for non-existent indices).
    const locale = i18nInstance.global.locale.value as string
    const localeMsgs = (i18nInstance.global.messages.value as Record<string, unknown>)[locale] as
      | Record<string, unknown>
      | undefined
    const rawPoints = (
      (localeMsgs?.homeSections as Record<string, unknown> | undefined)?.features as
        | Record<string, { points?: unknown[] }>
        | undefined
    )?.[k]?.points
    const pointsCount = Array.isArray(rawPoints) ? rawPoints.length : 0
    return {
      iconClass: t(`${prefix}.iconClass`),
      title: t(`${prefix}.title`),
      desc: t(`${prefix}.desc`),
      iconPath: t(`${prefix}.iconPath`),
      points: Array.from({ length: pointsCount }, (_, j) => t(`${prefix}.points.${j}`)).filter(
        (p) => p && !p.startsWith(`${prefix}.points.`),
      ) as string[],
    }
  }),
)
</script>

<template>
  <section class="features" id="features">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('homeSection.featuresLabel') }}</div>
        <h2 class="section-title">{{ t('homeSection.featuresTitle') }}</h2>
        <p class="section-desc">{{ t('homeSection.featuresDesc') }}</p>
      </div>
      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card reveal"
          :style="{ transitionDelay: i * 0.08 + 's' }"
        >
          <div :class="['feature-icon', f.iconClass]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="f.iconPath" />
            </svg>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
          <ul class="feature-list">
            <li v-for="(p, j) in f.points" :key="j">{{ p }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Features styles live in global.scss
</style>
