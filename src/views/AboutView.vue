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

const VALUE_KEYS = ['v1', 'v2', 'v3', 'v4'] as const
const values = computed(() =>
  VALUE_KEYS.map((k) => {
    const p = `views.about.values.${k}`
    return {
      num: t(`${p}.num`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
      c1: t(`${p}.c1`),
      c2: t(`${p}.c2`),
    }
  }),
)

const MILESTONE_KEYS = ['ms1', 'ms2', 'ms3', 'ms4', 'ms5', 'ms6'] as const
const milestones = computed(() =>
  MILESTONE_KEYS.map((k) => {
    const p = `views.about.roadmap.${k}`
    return {
      year: t(`${p}.year`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
      highlight: t(`${p}.highlight`) === 'true',
    }
  }),
)

const licenseCol1Points = computed(() => {
  const cap = 8
  const out: string[] = []
  for (let i = 0; i < cap; i++) {
    const v = t(`views.about.license.col1Points.${i}`)
    if (!v || v.startsWith('views.about.license.col1Points.')) break
    out.push(v)
  }
  return out
})
const licenseCol2Points = computed(() => {
  const cap = 8
  const out: string[] = []
  for (let i = 0; i < cap; i++) {
    const v = t(`views.about.license.col2Points.${i}`)
    if (!v || v.startsWith('views.about.license.col2Points.')) break
    out.push(v)
  }
  return out
})

const CONTRIB_KEYS = ['c1', 'c2', 'c3', 'c4'] as const
const contributions = computed(() =>
  CONTRIB_KEYS.map((k) => {
    const p = `views.about.contributions.${k}`
    const stepCap = 6
    const steps: string[] = []
    for (let i = 0; i < stepCap; i++) {
      const v = t(`${p}.steps.${i}`)
      if (!v || v.startsWith(`${p}.steps.`)) break
      steps.push(v)
    }
    return {
      icon: t(`${p}.icon`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
      steps,
    }
  }),
)

const CONTACT_KEYS = ['cc1', 'cc2', 'cc3', 'cc4'] as const
const contactCards = computed(() =>
  CONTACT_KEYS.map((k) => {
    const p = `views.about.contactCards.${k}`
    return {
      icon: t(`${p}.icon`),
      title: t(`${p}.title`),
      desc: t(`${p}.desc`),
      badge: t(`${p}.badge`),
    }
  }),
)
</script>

<template>
  <div class="about-view">
    <section class="av-hero">
      <div class="container reveal">
        <div class="section-label">{{ t('views.about.label') }}</div>
        <h1>{{ t('views.about.title') }}</h1>
        <p>{{ t('views.about.heroTagline') }}</p>
      </div>
    </section>

    <section class="av-values">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">{{ t('views.about.valuesLabel') }}</div>
          <h2 class="section-title">{{ t('views.about.valuesTitle') }}</h2>
        </div>
        <div class="av-values-grid">
          <div
            v-for="(v, i) in values"
            :key="i"
            class="av-value reveal"
            :style="{ '--c1': v.c1, '--c2': v.c2 } as Record<string, string>"
          >
            <div class="v-num">{{ v.num }}</div>
            <h3>{{ v.title }}</h3>
            <p>{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="av-roadmap">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">{{ t('views.about.roadmapLabel') }}</div>
          <h2 class="section-title">{{ t('views.about.roadmapTitle') }}</h2>
          <p class="section-desc">{{ t('views.about.roadmapDesc') }}</p>
        </div>
        <ol class="av-roadmap-line reveal">
          <li v-for="(m, i) in milestones" :key="i" :class="{ highlight: m.highlight }">
            <div class="r-dot"></div>
            <div class="r-content">
              <div class="r-year">{{ m.year }}</div>
              <h4>{{ m.title }}</h4>
              <p>{{ m.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="av-license">
      <div class="container">
        <div class="av-license-card reveal">
          <div>
            <div class="section-label">{{ t('views.about.licenseLabel') }}</div>
            <h2>{{ t('views.about.licenseTitle') }}</h2>
            <p>{{ t('views.about.licenseSubtitle') }}</p>
            <div class="av-license-actions">
              <a
                :href="t('views.about.licenseLinkHref')"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
                >{{ t('views.about.licenseLinkLabel') }}</a
              >
              <router-link to="/#contact" class="btn btn-ghost">{{
                t('views.about.licenseConsultLabel')
              }}</router-link>
            </div>
          </div>
          <div class="av-license-features">
            <div style="display: grid; gap: 16px; grid-template-columns: 1fr 1fr">
              <div>
                <div class="license-col-title">{{ t('views.about.license.col1Title') }}</div>
                <ul class="license-bullets">
                  <li v-for="(pt, i) in licenseCol1Points" :key="i">✓ {{ pt }}</li>
                </ul>
              </div>
              <div>
                <div class="license-col-title">{{ t('views.about.license.col2Title') }}</div>
                <ul class="license-bullets">
                  <li v-for="(pt, i) in licenseCol2Points" :key="i">✓ {{ pt }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="av-contrib">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">{{ t('views.about.contribLabel') }}</div>
          <h2 class="section-title">{{ t('views.about.contribTitle') }}</h2>
          <p class="section-desc">{{ t('views.about.contribDesc') }}</p>
        </div>
        <div class="av-contrib-grid">
          <div v-for="(c, i) in contributions" :key="i" class="av-contrib-item reveal">
            <div class="av-ic">{{ c.icon }}</div>
            <h4>{{ c.title }}</h4>
            <p>{{ c.desc }}</p>
            <ol v-if="c.steps.length" class="av-steps">
              <li v-for="(step, j) in c.steps" :key="j">{{ step }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="av-contact">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">{{ t('views.about.contactLabel') }}</div>
          <h2 class="section-title">{{ t('views.about.contactTitle') }}</h2>
          <p class="section-desc">{{ t('views.about.contactDesc') }}</p>
        </div>
        <div class="av-contact-grid reveal">
          <div v-for="(c, i) in contactCards" :key="i" class="av-contact-card">
            <div class="av-cc-icon">{{ c.icon }}</div>
            <span
              v-if="c.badge && !c.badge.startsWith('views.about.contactCards.')"
              class="av-badge"
              >{{ c.badge }}</span
            >
            <h4>{{ c.title }}</h4>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  padding-top: 80px;
  background: var(--bg-slate);
}
.av-hero {
  padding: 60px 0 40px;
  text-align: center;
  background: linear-gradient(180deg, #0a1628 0%, #162a47 100%);
  color: white;
  .section-label {
    color: var(--teal-400);
    display: inline-block;
    margin-bottom: 16px;
  }
  h1 {
    font-size: clamp(28px, 4.5vw, 48px);
    color: white;
    margin-bottom: 16px;
    max-width: 900px;
    margin-inline: auto;
  }
  p {
    color: #cbd5e1;
    max-width: 780px;
    margin: 0 auto;
    font-size: 17px;
  }
}
.av-values {
  padding: 64px 0;
}
.av-values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.av-value {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--c1, #2dd4bf), var(--c2, #14b8a6));
    opacity: 0.12;
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .v-num {
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--c1, #2dd4bf), var(--c2, #14b8a6));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  p {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.7;
  }
}
.av-roadmap {
  padding: 40px 0 80px;
}
.av-roadmap-line {
  list-style: none;
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  padding-left: 40px;
  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--teal-400), var(--navy-500));
  }
  > li {
    position: relative;
    padding-bottom: 32px;
  }
  & li.highlight .r-dot {
    background: linear-gradient(135deg, var(--amber-400), var(--amber-600));
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.22);
  }
  .r-dot {
    position: absolute;
    left: -34px;
    top: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
    border: 3px solid var(--bg-slate);
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2);
  }
  .r-year {
    font-size: 13px;
    color: var(--teal-600);
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  h4 {
    font-size: 17px;
    margin: 4px 0 8px;
  }
  p {
    color: var(--text-secondary);
    line-height: 1.7;
  }
}
.av-license {
  padding: 40px 0 80px;
}
.av-license-card {
  background: linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%);
  color: white;
  border-radius: 28px;
  padding: 48px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
  align-items: center;
  .section-label {
    color: var(--teal-400);
    display: inline-block;
    margin-bottom: 16px;
  }
  h2 {
    color: white;
    font-size: 32px;
    margin-bottom: 16px;
  }
  p {
    color: #cbd5e1;
    margin-bottom: 12px;
    line-height: 1.8;
  }
  .av-license-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }
  .license-col-title {
    font-weight: 700;
    color: var(--teal-300);
    margin-bottom: 12px;
  }
  .license-bullets {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 8px;
  }
  .license-bullets li {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.6;
  }
}

.av-contrib {
  padding: 40px 0 80px;
}
.av-contrib-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
.av-contrib-item {
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .av-ic {
    font-size: 32px;
    margin-bottom: 16px;
  }
  h4 {
    font-size: 17px;
    margin-bottom: 8px;
  }
  p {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 12px;
  }
  .av-steps {
    padding-left: 18px;
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.7;
  }
}
.av-contact {
  padding: 40px 0 80px;
}
.av-contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
.av-contact-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: var(--transition);
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  .av-cc-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  h4 {
    font-size: 17px;
    margin-bottom: 8px;
  }
  p {
    color: var(--text-secondary);
    font-size: 14px;
  }
  .av-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    background: var(--slate-100);
    color: var(--slate-600);
  }
}

@media (max-width: 900px) {
  .av-license-card {
    grid-template-columns: 1fr;
    padding: 32px 24px;
  }
  .license-col-title + .license-bullets {
    grid-template-columns: 1fr;
  }
}
</style>
