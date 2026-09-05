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

const MODULE_ORDER = ['web', 'backend', 'executor', 'supervisor', 'auth', 'scheduler'] as const
type ModuleKey = (typeof MODULE_ORDER)[number]

interface Method {
  label: string
  cmd: string
  tag?: string
}
interface ArtifactCard {
  key: ModuleKey
  icon: string
  name: string
  badge: string
  gradient: string
  desc: string
  methods: Method[]
}

const artifacts = computed<ArtifactCard[]>(() =>
  MODULE_ORDER.map((k) => {
    const p = `views.download.modules.${k}`
    const methodCap = 5
    const methods = Array.from({ length: methodCap }, (_, i) => {
      const label = t(`${p}.installMethods.${i}.label`)
      if (!label || label.startsWith(`${p}.installMethods.`)) return null
      const cmd = t(`${p}.installMethods.${i}.cmd`)
      const tryTag = t(`${p}.installMethods.${i}.tag`)
      const tag = tryTag && !tryTag.startsWith(`${p}.installMethods.`) ? tryTag : undefined
      return { label, cmd, tag }
    }).filter(Boolean) as Method[]
    return {
      key: k,
      icon: t(`${p}.icon`),
      name: t(`${p}.name`),
      badge: t(`${p}.tag`),
      gradient: t(`${p}.gradient`),
      desc: t(`${p}.desc`),
      methods,
    }
  }),
)

// Compose script (fixed structure with i18n prefixed comments/lines)
const composeLines = computed<string[]>(() => {
  const key = 'views.download.compose'
  const cap = 12
  const out: string[] = []
  for (let i = 0; i < cap; i++) {
    const line = t(`${key}.${i}`)
    if (line && !line.startsWith(`${key}.`)) out.push(line)
  }
  return out
})
</script>

<template>
  <div class="download-view">
    <section class="dl-hero">
      <div class="container reveal">
        <div class="section-label">{{ t('views.download.label') }}</div>
        <h1>{{ t('views.download.title') }}</h1>
        <p>{{ t('views.download.introTip') }}</p>
        <div class="dl-hero-actions">
          <a
            :href="t('views.download.repoLink')"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-lg"
            >{{ t('views.download.repoButton') }}</a
          >
          <router-link to="/docs" class="btn btn-ghost btn-lg">{{
            t('views.download.docsButton')
          }}</router-link>
        </div>
      </div>
    </section>

    <section class="dl-cards">
      <div class="container">
        <div class="dl-grid">
          <article v-for="a in artifacts" :key="a.key" class="dl-card reveal">
            <header :style="{ background: a.gradient }">
              <span class="dl-icon">{{ a.icon }}</span>
              <div>
                <div class="dl-badge">{{ a.badge }}</div>
                <h3>{{ a.name }}</h3>
              </div>
            </header>
            <p class="dl-desc">{{ a.desc }}</p>
            <div class="dl-methods">
              <div v-for="(m, j) in a.methods" :key="j" class="dl-method">
                <div class="dl-method-head">
                  <span>{{ m.label }}</span>
                  <span v-if="m.tag" class="dl-chip">{{ m.tag }}</span>
                </div>
                <pre class="dl-cmd"><code>{{ m.cmd }}</code></pre>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="dl-compose">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">{{ t('views.download.composeLabel') }}</div>
          <h2 class="section-title">{{ t('views.download.composeTitle') }}</h2>
          <p class="section-desc">{{ t('views.download.composeDesc') }}</p>
        </div>
        <pre class="dl-compose-box reveal"><code>{{ composeLines.join('\n') }}</code></pre>
        <p
          style="
            margin-top: 16px;
            text-align: center;
            color: var(--text-secondary);
            font-size: 13px;
          "
        >
          ⚠️ {{ t('views.download.composeWarn') }}
          <a
            href="https://github.com/taurus-ops/taurus-stack/blob/main/docker-compose.yml"
            target="_blank"
            rel="noopener noreferrer"
            class="link-teal"
            >{{ t('views.download.composeLink') }}</a
          >
        </p>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.download-view {
  padding-top: 80px;
  background: var(--bg-slate);
}
.dl-hero {
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
    margin: 0 auto 28px;
  }
  .dl-hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
}
.dl-cards {
  padding: 40px 0 64px;
}
.dl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
}
.dl-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  header {
    padding: 24px;
    color: white;
    display: flex;
    gap: 16px;
    align-items: center;
    .dl-icon {
      font-size: 36px;
      flex-shrink: 0;
    }
    .dl-badge {
      font-size: 12px;
      opacity: 0.85;
      margin-bottom: 4px;
    }
    h3 {
      color: white;
      font-size: 18px;
      margin: 0;
    }
  }
  .dl-desc {
    padding: 20px 24px 0;
    color: var(--text-secondary);
    margin: 0;
  }
  .dl-methods {
    padding: 16px 24px 24px;
  }
  .dl-method {
    margin-bottom: 12px;
  }
  .dl-method-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    font-size: 13px;
    color: var(--slate-600);
  }
  .dl-chip {
    background: var(--slate-100);
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
  }
  .dl-cmd {
    background: var(--slate-900);
    color: #e2e8f0;
    border-radius: 10px;
    padding: 12px 14px;
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 12.5px;
    line-height: 1.6;
    overflow-x: auto;
    margin: 0;
  }
}
.dl-compose {
  padding: 32px 0 80px;
}
.dl-compose-box {
  background: var(--slate-900);
  color: #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  line-height: 1.7;
  box-shadow: var(--shadow-xl);
}
.link-teal {
  color: var(--teal-500);
  text-decoration: underline;
}
</style>
