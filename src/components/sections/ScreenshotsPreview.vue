<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18nInstance from '@/i18n'

interface PreviewShot {
  file: string
  title: string
  desc: string
}

const { t } = useI18n()

const imageModules = import.meta.glob('@/assets/img/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const imgUrl = (file: string): string => {
  const key = Object.keys(imageModules).find((k) => k.endsWith(`/${file}`))
  return key ? imageModules[key] : ''
}

const shots = computed<PreviewShot[]>(() => {
  const locale = i18nInstance.global.locale.value as string
  const localeMsgs = (i18nInstance.global.messages.value as Record<string, unknown>)[locale] as
    | Record<string, unknown>
    | undefined
  const raw = (
    (localeMsgs?.homeSections as Record<string, unknown> | undefined)?.screenshots as
      | { items?: PreviewShot[] }
      | undefined
  )?.items
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section class="screenshots-preview" id="screenshots-preview">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('homeSection.screenshotsLabel') }}</div>
        <h2 class="section-title">{{ t('homeSection.screenshotsTitle') }}</h2>
        <p class="section-desc">{{ t('homeSection.screenshotsDesc') }}</p>
      </div>

      <div class="sp-grid">
        <div
          v-for="(shot, i) in shots"
          :key="shot.file"
          class="sp-card reveal"
          :style="{ transitionDelay: i * 0.08 + 's' }"
        >
          <div class="sp-thumb">
            <img :src="imgUrl(shot.file)" :alt="shot.title" loading="lazy" />
            <div class="sp-overlay"></div>
          </div>
          <div class="sp-meta">
            <h4>{{ shot.title }}</h4>
            <p>{{ shot.desc }}</p>
          </div>
        </div>
      </div>

      <div class="sp-cta reveal">
        <router-link to="/product" class="btn btn-primary btn-lg">
          {{ t('homeSection.screenshotsCta') }}
          <span>→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.screenshots-preview {
  padding: 80px 0;
  background: var(--bg-slate);
}

.sp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.sp-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-xl);

    .sp-thumb img {
      transform: scale(1.04);
    }
  }
}

.sp-thumb {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--slate-100);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
}

.sp-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(10, 22, 40, 0.35) 100%);
  pointer-events: none;
}

.sp-meta {
  padding: 18px 20px 22px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--navy-900);
    margin: 0 0 6px;
  }

  p {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0;
  }
}

.sp-cta {
  text-align: center;
}

@media (max-width: 768px) {
  .sp-grid {
    grid-template-columns: 1fr;
  }
}
</style>
