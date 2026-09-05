<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PainPoint, OverviewMetric, CoreModule } from '@/types'

const { t } = useI18n()

const painPoints = computed<PainPoint[]>(() => [
  {
    icon: '✕',
    title: t('homeSections.painPoints.p1.title'),
    desc: t('homeSections.painPoints.p1.desc'),
  },
  {
    icon: '✕',
    title: t('homeSections.painPoints.p2.title'),
    desc: t('homeSections.painPoints.p2.desc'),
  },
  {
    icon: '✕',
    title: t('homeSections.painPoints.p3.title'),
    desc: t('homeSections.painPoints.p3.desc'),
  },
])

const metrics = computed<OverviewMetric[]>(() => [
  {
    value: t('homeSections.metrics.m1.value'),
    trend: t('homeSections.metrics.m1.trend'),
    label: t('homeSections.metrics.m1.label'),
  },
  {
    value: t('homeSections.metrics.m2.value'),
    trend: t('homeSections.metrics.m2.trend'),
    label: t('homeSections.metrics.m2.label'),
  },
  {
    value: t('homeSections.metrics.m3.value'),
    trend: t('homeSections.metrics.m3.trend'),
    label: t('homeSections.metrics.m3.label'),
  },
  {
    value: t('homeSections.metrics.m4.value'),
    trend: t('homeSections.metrics.m4.trend'),
    label: t('homeSections.metrics.m4.label'),
  },
])

const modules = computed<CoreModule[]>(() => [
  {
    step: t('homeSections.modules.web.step'),
    name: t('homeSections.modules.web.name'),
    desc: t('homeSections.modules.web.desc'),
  },
  {
    step: t('homeSections.modules.backend.step'),
    name: t('homeSections.modules.backend.name'),
    desc: t('homeSections.modules.backend.desc'),
  },
  {
    step: t('homeSections.modules.executor.step'),
    name: t('homeSections.modules.executor.name'),
    desc: t('homeSections.modules.executor.desc'),
  },
  {
    step: t('homeSections.modules.supervisor.step'),
    name: t('homeSections.modules.supervisor.name'),
    desc: t('homeSections.modules.supervisor.desc'),
  },
  {
    step: t('homeSections.modules.auth.step'),
    name: t('homeSections.modules.auth.name'),
    desc: t('homeSections.modules.auth.desc'),
  },
  {
    step: t('homeSections.modules.scheduler.step'),
    name: t('homeSections.modules.scheduler.name'),
    desc: t('homeSections.modules.scheduler.desc'),
  },
])

// Access to static iconPaths and classes — already non-localized
const iconClassFor = ['automation', 'monitor', 'logs', 'orchestration', 'asset', 'tenant']
</script>

<template>
  <section class="overview" id="overview">
    <div class="container">
      <div class="overview-grid">
        <div class="overview-content reveal">
          <div class="section-label">{{ t('homeSection.overviewLabel') }}</div>
          <h2>{{ t('homeSection.overviewTitle') }}</h2>
          <p>{{ t('homeSections.overviewParagraph1') }}</p>
          <p>{{ t('homeSections.overviewParagraph2') }}</p>
          <div class="pain-points">
            <div v-for="(p, i) in painPoints" :key="i" class="pain-item">
              <div class="pain-icon">{{ p.icon }}</div>
              <div class="pain-text">
                <h4>{{ p.title }}</h4>
                <p>{{ p.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="overview-visual reveal">
          <div class="overview-card">
            <div class="oc-header">
              <div class="oc-title">{{ t('hero.stat6Label') }}</div>
              <div class="oc-badge">{{ t('homeSection.archTitle') }}</div>
            </div>
            <div class="oc-metrics">
              <div v-for="(m, i) in metrics" :key="i" class="oc-metric">
                <div class="oc-metric-value">
                  {{ m.value }}<span class="up">{{ m.trend }}</span>
                </div>
                <div class="oc-metric-label">{{ m.label }}</div>
              </div>
            </div>
            <div class="oc-flow">
              <div v-for="(f, i) in modules" :key="i" class="oc-flow-item">
                <span class="step">{{ f.step }}</span>
                <span class="text">{{ f.name }} · {{ f.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Overview styles live in global.scss
</style>
