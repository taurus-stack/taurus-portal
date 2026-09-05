<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Advantage, ArchLayer, SecurityPoint } from '@/types'

const { t } = useI18n()

const ADV_KEYS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'] as const
const LAYER_KEYS = ['l1', 'l2', 'l3', 'l4', 'l5'] as const
const SECURITY_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6'] as const

const advantages = computed<Advantage[]>(() =>
  ADV_KEYS.map((k) => {
    const p = `homeSections.advantages.${k}`
    return {
      icon: t(`${p}.icon`),
      iconSymbol: t(`${p}.iconSymbol`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
    }
  }),
)

const layers = computed<ArchLayer[]>(() =>
  LAYER_KEYS.map((k) => {
    const p = `homeSections.layers.${k}`
    const count = 8 // enough for 4-5 nodes per layer
    const nodes = Array.from({ length: count }, (_, i) => {
      try {
        const name = t(`${p}.nodes.${i}.name`)
        if (!name || name.startsWith(`${p}.nodes.`)) return null
        const icon = t(`${p}.nodes.${i}.icon`)
        return { name, icon }
      } catch {
        return null
      }
    }).filter(Boolean) as { name: string; icon: string }[]
    return { label: t(`${p}.label`), nodes }
  }),
)

const securityPoints = computed<SecurityPoint[]>(() =>
  SECURITY_KEYS.map((k) => {
    const p = `homeSections.securityPoints.${k}`
    return { title: t(`${p}.title`), desc: t(`${p}.desc`) }
  }),
)
</script>

<template>
  <section class="architecture" id="architecture">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('homeSection.archLabel') }}</div>
        <h2 class="section-title">{{ t('homeSection.archTitle') }}</h2>
        <p class="section-desc">{{ t('homeSection.archDesc') }}</p>
      </div>
      <div class="arch-content">
        <div class="arch-left reveal">
          <h2 class="section-title">{{ t('homeSection.archAdvantagesTitle') }}</h2>
          <p class="section-desc">{{ t('homeSection.archAdvantagesDesc') }}</p>
          <div class="arch-features">
            <div v-for="(f, i) in advantages" :key="i" class="arch-feature">
              <div :class="['arch-feature-icon', f.icon]">
                {{ f.iconSymbol }}
              </div>
              <div>
                <h4>{{ f.title }}</h4>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="arch-diagram reveal">
          <template v-for="(layer, li) in layers" :key="li">
            <div class="arch-layer">
              <div class="arch-layer-label">{{ layer.label }}</div>
              <div class="arch-layer-row">
                <div v-for="(n, ni) in layer.nodes" :key="ni" class="arch-node">
                  <div class="arch-node-icon">{{ n.icon }}</div>
                  <div class="arch-node-name">{{ n.name }}</div>
                </div>
              </div>
            </div>
            <div v-if="li < layers.length - 1" class="arch-divider"></div>
          </template>
        </div>
      </div>

      <!-- 安全架构亮点 -->
      <div style="margin-top: 80px" class="reveal">
        <div class="section-header" style="margin-bottom: 40px">
          <div class="section-label">{{ t('homeSection.archSecurityLabel') }}</div>
          <h2 class="section-title">{{ t('homeSection.securityTitle') }}</h2>
          <p class="section-desc">{{ t('homeSection.securityDesc') }}</p>
        </div>
        <div class="security-grid">
          <div v-for="(s, i) in securityPoints" :key="i" class="security-card">
            <div class="security-num">0{{ i + 1 }}</div>
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Architecture styles live in global.scss
</style>
