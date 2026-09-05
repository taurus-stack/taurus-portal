<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Testimonial } from '@/types'

const { t } = useI18n()

const TEST_KEYS = ['t1', 't2', 't3'] as const

const IMG_BASE = 'https://api.dicebear.com/7.x/personas/png'

const AVATAR_URLS = [
  `${IMG_BASE}?seed=chen-ops&size=128&backgroundColor=b6e3f4`,
  `${IMG_BASE}?seed=li-manager&size=128&backgroundColor=c0aede`,
  `${IMG_BASE}?seed=wang-security&size=128&backgroundColor=ffd5dc`,
]

const brokenAvatars = ref<Set<number>>(new Set())

const onAvatarError = (i: number) => {
  brokenAvatars.value.add(i)
}

const testimonials = computed<Testimonial[]>(() =>
  TEST_KEYS.map((k) => {
    const p = `homeSections.testimonials.${k}`
    return {
      quote: t(`${p}.quote`),
      name: t(`${p}.name`),
      title: t(`${p}.title`),
      company: t(`${p}.company`),
      avatar: t(`${p}.avatar`),
    }
  }),
)

const avatarUrl = (i: number): string => AVATAR_URLS[i] ?? AVATAR_URLS[0]
const isAvatarBroken = (i: number): boolean => brokenAvatars.value.has(i)

// clients is a string[]; vue-i18n renders it via t() if keyed numerically;
// we read 20 slots and filter misses.
const clients = computed<string[]>(
  () =>
    Array.from({ length: 20 }, (_, i) => {
      try {
        const val = t(`homeSections.clients.${i}`)
        if (val && !val.startsWith('homeSections.clients.')) return val
      } catch {
        /* ignore */
      }
      return null
    }).filter(Boolean) as string[],
)
</script>

<template>
  <section class="testimonials" id="testimonials">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-label">{{ t('homeSection.testimonialsLabel') }}</div>
        <h2 class="section-title">{{ t('homeSection.testimonialsTitle') }}</h2>
        <p class="section-desc">{{ t('homeSection.testimonialsDesc') }}</p>
      </div>
      <div class="testimonial-grid">
        <div v-for="(q, i) in testimonials" :key="i" class="testimonial-card reveal">
          <div class="quote-mark">&ldquo;</div>
          <p class="quote">{{ q.quote }}</p>
          <div class="testimonial-author author-right">
            <div class="author-info">
              <div class="name">{{ q.name }}</div>
              <div class="position">{{ q.title }} · {{ q.company }}</div>
            </div>
            <div class="author-avatar">
              <img
                v-if="!isAvatarBroken(i)"
                :src="avatarUrl(i)"
                :alt="q.name"
                loading="lazy"
                @error="onAvatarError(i)"
              />
              <span v-else>{{ q.avatar }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 客户集群 -->
      <div style="margin-top: 80px" class="clients-block reveal">
        <div
          class="section-label"
          style="text-align: center; justify-content: center; display: flex"
        >
          {{ t('homeSection.clientsLabel') }}
        </div>
        <div class="client-logos">
          <div v-for="(c, i) in clients" :key="i" class="client-logo">{{ c }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.author-right {
  justify-content: flex-end;
  text-align: right;
}

.author-avatar {
  overflow: hidden;
  padding: 0;
  background: linear-gradient(135deg, var(--navy-500), var(--teal-500));
  color: white;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  span {
    letter-spacing: 0.5px;
  }
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: var(--navy-900);
  margin-bottom: 2px;
}

.position {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}
</style>
