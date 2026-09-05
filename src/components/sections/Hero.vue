<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { HeroMetric, MetricBar } from '@/types'

const { t } = useI18n()

const metricBars = computed<MetricBar[]>(() => [
  { label: t('hero.metricHostOnline'), icon: 'cpu', value: '128/130', bar: 98, color: '#60a5fa' },
  {
    label: t('hero.metricRunningProgram'),
    icon: 'mem',
    value: '342 個',
    bar: 72,
    color: '#a78bfa',
  },
  { label: t('hero.metricCpuAvg'), icon: 'disk', value: '46.3%', bar: 46, color: '#fbbf24' },
  { label: t('hero.metricTaskSuccess'), icon: 'net', value: '99.7%', bar: 99.7, color: '#14b8a6' },
])

const chartBars: number[] = [65, 72, 58, 82, 68, 75, 92, 70, 88, 62, 78, 95]
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero-bg-grid"></div>
    <div class="hero-glow"></div>
    <div class="hero-glow-2"></div>
    <div class="container">
      <div class="hero-inner">
        <div class="hero-content reveal">
          <div class="hero-badge">
            <span class="dot"></span>
            <span>{{ t('hero.badge') }}</span>
          </div>
          <h1 class="hero-title">
            {{ t('hero.title1') }}
            <br /><span class="highlight">{{ t('hero.titleHighlight') }}</span>
          </h1>
          <p class="hero-subtitle">
            {{ t('hero.subtitle') }}
          </p>
          <div class="hero-actions">
            <a href="#contact" class="btn btn-primary btn-lg">
              {{ t('hero.scheduleDemo') }}
              <span>→</span>
            </a>
            <a href="#features" class="btn btn-ghost btn-lg">
              {{ t('hero.viewFeatures') }}
            </a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-number">
                {{ t('hero.stat6') }}<span class="unit">{{ t('hero.stat6Unit') }}</span>
              </div>
              <div class="hero-stat-label">{{ t('hero.stat6Label') }}</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-number">
                {{ t('hero.statZero') }}<span class="unit">{{ t('hero.statZeroUnit') }}</span>
              </div>
              <div class="hero-stat-label">{{ t('hero.statZeroLabel') }}</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-number">
                {{ t('hero.stat100') }}<span class="unit">{{ t('hero.stat100Unit') }}</span>
              </div>
              <div class="hero-stat-label">{{ t('hero.stat100Label') }}</div>
            </div>
          </div>
        </div>

        <div class="hero-visual reveal">
          <div class="hero-card">
            <div class="card-header">
              <div class="card-header-title">
                <span class="status-dot"></span>
                {{ t('hero.visualClusterTitle') }}
              </div>
              <div class="card-header-meta">{{ t('hero.visualClusterMeta') }}</div>
            </div>
            <div v-for="(m, i) in metricBars" :key="i" class="metric-row">
              <div class="metric-label">
                <span :class="['metric-icon', m.icon]">{{ m.icon[0].toUpperCase() }}</span>
                {{ m.label }}
              </div>
              <div style="display: flex; align-items: center; gap: 12px">
                <div class="metric-bar">
                  <div
                    class="metric-bar-fill"
                    :style="{ width: m.bar + '%', background: m.color }"
                  ></div>
                </div>
                <span class="metric-value">{{ m.value }}</span>
              </div>
            </div>
            <div class="mini-chart">
              <div
                v-for="(h, i) in chartBars"
                :key="i"
                class="mini-chart-bar"
                :style="{ height: h + '%', animationDelay: i * 0.1 + 's' }"
              ></div>
            </div>
          </div>
          <div class="floating-card alert">
            <div class="fc-icon warn">⚠</div>
            <div class="fc-content">
              <div class="fc-title">{{ t('hero.alertProgramTitle') }}</div>
              <div class="fc-desc">{{ t('hero.alertProgramDesc') }}</div>
            </div>
          </div>
          <div class="floating-card task">
            <div class="fc-icon check">✓</div>
            <div class="fc-content">
              <div class="fc-title">{{ t('hero.alertWorkflowTitle') }}</div>
              <div class="fc-desc">{{ t('hero.alertWorkflowDesc') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Hero section styles live in global.scss
</style>
