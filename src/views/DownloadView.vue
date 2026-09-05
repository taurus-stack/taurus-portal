<script setup lang="ts">
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
        </div>
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
</style>
