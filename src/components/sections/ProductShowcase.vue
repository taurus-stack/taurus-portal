<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import i18nInstance from '@/i18n'

interface ShowcaseScreenshot {
  file: string
  title: string
  desc: string
}

interface ShowcaseCategory {
  key: string
  name: string
  screenshots: ShowcaseScreenshot[]
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

const categories = computed<ShowcaseCategory[]>(() => {
  const locale = i18nInstance.global.locale.value as string
  const localeMsgs = (i18nInstance.global.messages.value as Record<string, unknown>)[locale] as
    | Record<string, unknown>
    | undefined
  const showcase = (
    (localeMsgs?.views as Record<string, unknown> | undefined)?.product as
      | Record<string, unknown>
      | undefined
  )?.showcase as { categories?: ShowcaseCategory[] } | undefined
  return showcase?.categories ?? []
})

const activeKey = ref<string>('')

watch(
  categories,
  (cats) => {
    if (cats.length && !cats.some((c) => c.key === activeKey.value)) {
      activeKey.value = cats[0].key
    }
  },
  { immediate: true },
)

const activeCategory = computed<ShowcaseCategory | undefined>(() =>
  categories.value.find((c) => c.key === activeKey.value),
)

const flatScreenshots = computed<{ category: string; item: ShowcaseScreenshot }[]>(() =>
  categories.value.flatMap((c) => c.screenshots.map((s) => ({ category: c.name, item: s }))),
)

const lightboxIndex = ref<number | null>(null)

const openLightbox = (file: string) => {
  const idx = flatScreenshots.value.findIndex((f) => f.item.file === file)
  if (idx >= 0) lightboxIndex.value = idx
}

const closeLightbox = () => {
  lightboxIndex.value = null
}

const prevScreenshot = () => {
  if (lightboxIndex.value === null) return
  const total = flatScreenshots.value.length
  lightboxIndex.value = (lightboxIndex.value - 1 + total) % total
}

const nextScreenshot = () => {
  if (lightboxIndex.value === null) return
  const total = flatScreenshots.value.length
  lightboxIndex.value = (lightboxIndex.value + 1) % total
}

const lightboxItem = computed(() =>
  lightboxIndex.value !== null ? flatScreenshots.value[lightboxIndex.value] : null,
)

const onKeydown = (e: KeyboardEvent) => {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') prevScreenshot()
  else if (e.key === 'ArrowRight') nextScreenshot()
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeydown)
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <section class="product-showcase" id="product-showcase">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('views.product.showcase.label') }}</div>
        <h2 class="section-title">{{ t('views.product.showcase.title') }}</h2>
        <p class="section-desc">{{ t('views.product.showcase.desc') }}</p>
      </div>

      <div class="ps-tabs reveal">
        <button
          v-for="cat in categories"
          :key="cat.key"
          :class="['ps-tab', { active: cat.key === activeKey }]"
          @click="activeKey = cat.key"
        >
          {{ cat.name }}
          <span class="ps-tab-count">{{ cat.screenshots.length }}</span>
        </button>
      </div>

      <div class="ps-grid reveal">
        <div
          v-for="shot in activeCategory?.screenshots ?? []"
          :key="shot.file"
          class="ps-card"
          @click="openLightbox(shot.file)"
        >
          <div class="ps-thumb">
            <img :src="imgUrl(shot.file)" :alt="shot.title" loading="lazy" />
            <div class="ps-zoom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          </div>
          <div class="ps-meta">
            <h4>{{ shot.title }}</h4>
            <p>{{ shot.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="lightboxItem" class="ps-lightbox" @click.self="closeLightbox">
        <button class="ps-lb-close" @click="closeLightbox" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <button
          v-if="flatScreenshots.length > 1"
          class="ps-lb-nav ps-lb-prev"
          @click.stop="prevScreenshot"
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div class="ps-lb-stage" @click.stop>
          <img :src="imgUrl(lightboxItem.item.file)" :alt="lightboxItem.item.title" />
          <div class="ps-lb-caption">
            <span class="ps-lb-cat">{{ lightboxItem.category }}</span>
            <h3>{{ lightboxItem.item.title }}</h3>
            <p>{{ lightboxItem.item.desc }}</p>
          </div>
        </div>
        <button
          v-if="flatScreenshots.length > 1"
          class="ps-lb-nav ps-lb-next"
          @click.stop="nextScreenshot"
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.product-showcase {
  padding: 80px 0;
  background: var(--bg-slate);
}

.ps-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 48px;
}

.ps-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: white;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--teal-400);
    color: var(--teal-600);
  }

  &.active {
    background: linear-gradient(135deg, var(--teal-500), var(--teal-600));
    border-color: transparent;
    color: white;
    box-shadow: 0 6px 16px rgba(13, 148, 136, 0.25);
  }
}

.ps-tab-count {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.25);
  padding: 1px 8px;
  border-radius: 999px;
}

.ps-tab:not(.active) .ps-tab-count {
  background: var(--slate-100);
  color: var(--slate-500);
}

.ps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}

.ps-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-xl);

    .ps-thumb img {
      transform: scale(1.04);
    }

    .ps-zoom {
      opacity: 1;
    }
  }
}

.ps-thumb {
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

.ps-zoom {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 22, 40, 0.45);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;

  svg {
    width: 36px;
    height: 36px;
  }
}

.ps-meta {
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

.ps-lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 15, 28, 0.92);
  backdrop-filter: blur(4px);
  animation: ps-fade-in 0.2s ease;
}

@keyframes ps-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.ps-lb-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  svg {
    width: 22px;
    height: 22px;
  }
}

.ps-lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.28);
  }

  svg {
    width: 26px;
    height: 26px;
  }
}

.ps-lb-prev {
  left: 24px;
}

.ps-lb-next {
  right: 24px;
}

.ps-lb-stage {
  max-width: min(1100px, 92vw);
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  }
}

.ps-lb-caption {
  text-align: center;
  color: white;

  .ps-lb-cat {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--teal-400);
    margin-bottom: 8px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 6px;
  }

  p {
    font-size: 14px;
    color: #cbd5e1;
    margin: 0 auto;
    max-width: 640px;
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .ps-grid {
    grid-template-columns: 1fr;
  }

  .ps-lb-nav {
    width: 42px;
    height: 42px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .ps-lb-prev {
    left: 10px;
  }

  .ps-lb-next {
    right: 10px;
  }

  .ps-lb-close {
    top: 14px;
    right: 14px;
  }
}
</style>
