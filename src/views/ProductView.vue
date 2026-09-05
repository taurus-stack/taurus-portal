<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductShowcase from '@/components/sections/ProductShowcase.vue'

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

interface ModuleCard {
  key: string
  name: string
  subtitle: string
  tag: string
  icon: string
  gradient: string
  desc: string
  stack: string[]
  features: { title: string; desc: string }[]
  port?: string
  repoDir: string
}

const MODULE_KEYS = ['web', 'backend', 'executor', 'supervisor', 'auth', 'scheduler'] as const

const modules = computed<ModuleCard[]>(() =>
  MODULE_KEYS.map((k) => {
    const p = `views.product.moduleCards.${k}`
    // variable-length arrays → probe up to a sensible cap
    const stackCap = 10
    const stack = Array.from({ length: stackCap }, (_, i) => {
      const v = t(`${p}.stack.${i}`)
      if (v && !v.startsWith(`${p}.stack.`)) return v
      return null
    }).filter(Boolean) as string[]
    const featCap = 6
    const features = Array.from({ length: featCap }, (_, i) => {
      const title = t(`${p}.features.${i}.title`)
      if (!title || title.startsWith(`${p}.features.`)) return null
      return { title, desc: t(`${p}.features.${i}.desc`) }
    }).filter(Boolean) as { title: string; desc: string }[]
    return {
      key: k,
      name: t(`${p}.name`),
      subtitle: t(`${p}.subtitle`),
      tag: t(`${p}.tag`),
      icon: t(`${p}.icon`),
      gradient: t(`${p}.gradient`),
      desc: t(`${p}.desc`),
      stack,
      features,
      repoDir: t(`${p}.repoDir`),
      port: (() => {
        const v = t(`${p}.port`)
        return v && !v.startsWith(`${p}.port`) ? v : undefined
      })(),
    }
  }),
)

const metrics = computed(() => [
  { value: t('views.product.metrics.m1.value'), label: t('views.product.metrics.m1.label') },
  { value: t('views.product.metrics.m2.value'), label: t('views.product.metrics.m2.label') },
  { value: t('views.product.metrics.m3.value'), label: t('views.product.metrics.m3.label') },
  { value: t('views.product.metrics.m4.value'), label: t('views.product.metrics.m4.label') },
])
</script>

<template>
  <div class="product-view">
    <section class="pv-hero">
      <div class="container reveal">
        <div class="section-label">{{ t('views.product.label') }}</div>
        <h1>{{ t('views.product.title') }}</h1>
        <p class="pv-sub">{{ t('views.product.subtitle') }}</p>
        <div class="pv-metrics">
          <div v-for="(m, i) in metrics" :key="i" class="pv-metric">
            <strong v-html="m.value"></strong><span>{{ m.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="pv-modules">
      <div class="container">
        <div
          v-for="(m, i) in modules"
          :key="m.key"
          :class="['pv-module-card reveal', { reverse: i % 2 === 1 }]"
        >
          <div class="pv-module-banner" :style="{ background: m.gradient }">
            <div class="pv-module-icon">{{ m.icon }}</div>
            <div class="pv-module-banner-info">
              <div class="pv-module-banner-tag">{{ m.tag }}</div>
              <div class="pv-module-banner-dir">📁 {{ m.repoDir }}</div>
              <div v-if="m.port" class="pv-module-banner-dir">🔌 端口 {{ m.port }}</div>
            </div>
          </div>
          <div class="pv-module-info">
            <div style="display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap">
              <h2>{{ m.name }}</h2>
              <span class="pv-module-subtitle">{{ m.subtitle }}</span>
            </div>
            <p class="pv-module-desc">{{ m.desc }}</p>
            <div class="pv-module-stack">
              <span v-for="(s, j) in m.stack" :key="j" class="pv-stack-chip">{{ s }}</span>
            </div>
            <div class="pv-module-features">
              <div v-for="(f, j) in m.features" :key="j" class="pv-m-feature">
                <span class="pv-m-feature-icon">✓</span>
                <div>
                  <h5>{{ f.title }}</h5>
                  <p>{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ProductShowcase />

    <section class="pv-cta">
      <div class="container">
        <h2>{{ t('views.product.ctaTitle') }}</h2>
        <p>{{ t('views.product.ctaDesc') }}</p>
        <router-link to="/#contact" class="btn btn-primary btn-lg">{{
          t('views.product.ctaButton')
        }}</router-link>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.product-view {
  padding-top: 80px;
  background: var(--bg-slate);
}
.pv-hero {
  padding: 80px 0 64px;
  background: linear-gradient(180deg, #0a1628 0%, #162a47 100%);
  color: white;
  text-align: center;
  .section-label {
    color: var(--teal-400);
    display: inline-block;
    margin-bottom: 16px;
  }
  h1 {
    font-size: clamp(32px, 5vw, 56px);
    color: white;
    max-width: 900px;
    margin: 0 auto 20px;
  }
  .pv-sub {
    color: #cbd5e1;
    max-width: 760px;
    margin: 0 auto 40px;
    font-size: 18px;
  }
  .pv-metrics {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 48px;
  }
  .pv-metric {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pv-metric strong {
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, var(--teal-400), var(--blue-400));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pv-metric span {
    margin-top: 8px;
    color: #94a3b8;
    font-size: 14px;
  }
}
.pv-modules {
  padding: 64px 0 80px;
}
.pv-module-card {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 40px;
  background: white;
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-lg);
  &.reverse {
    grid-template-columns: 1.3fr 1fr;
  }
  &.reverse .pv-module-banner {
    order: 2;
  }
  &.reverse .pv-module-info {
    order: 1;
  }
}
.pv-module-banner {
  border-radius: 20px;
  padding: 32px;
  color: white;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pv-module-icon {
  font-size: 56px;
}
.pv-module-banner-tag {
  font-size: 14px;
  opacity: 0.85;
  margin-bottom: 8px;
}
.pv-module-banner-dir {
  font-size: 13px;
  opacity: 0.75;
  line-height: 1.8;
}
.pv-module-info h2 {
  font-size: 28px;
  margin: 0;
}
.pv-module-subtitle {
  color: var(--slate-500);
  font-size: 15px;
}
.pv-module-desc {
  color: var(--text-secondary);
  margin: 16px 0 20px;
  line-height: 1.8;
}
.pv-module-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.pv-stack-chip {
  background: var(--slate-100);
  color: var(--slate-700);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid var(--border-color);
}
.pv-module-features {
  display: grid;
  gap: 16px;
}
.pv-m-feature {
  display: flex;
  gap: 14px;
}
.pv-m-feature-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}
.pv-m-feature h5 {
  font-size: 15px;
  margin-bottom: 4px;
}
.pv-m-feature p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.pv-cta {
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

@media (max-width: 900px) {
  .pv-module-card,
  .pv-module-card.reverse {
    grid-template-columns: 1fr;
    & .pv-module-banner {
      order: 0;
      min-height: 200px;
    }
    & .pv-module-info {
      order: 0;
    }
  }
}
</style>
