<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

import Hero from '@/components/sections/Hero.vue'
import Overview from '@/components/sections/Overview.vue'
import Features from '@/components/sections/Features.vue'
import ScreenshotsPreview from '@/components/sections/ScreenshotsPreview.vue'
import Architecture from '@/components/sections/Architecture.vue'
import Solutions from '@/components/sections/Solutions.vue'
import Testimonials from '@/components/sections/Testimonials.vue'
import ContactForm from '@/components/sections/ContactForm.vue'

const route = useRoute()

// Canonical + site-wide SEO defaults. Vite build-time env (VITE_SITE_URL) can
// be absolute "https://taurus.example.com" → yields absolute canonical. If
// empty, fallback to relative `/` (still prevents duplicate content on
// query-parameter variants of the same page).
const SITE_URL = (import.meta as ImportMeta).env.VITE_SITE_URL as string | undefined
const siteUrl = SITE_URL?.replace(/\/$/, '') ?? ''
const canonical = siteUrl ? `${siteUrl}/` : '/'

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Taurus',
  alternateName: 'Taurus Ops',
  url: siteUrl || 'https://taurus-stack.github.io/taurus-portal',
  logo: siteUrl ? `${siteUrl}/favicon.svg` : '/favicon.svg',
  description:
    'Taurus 企业级分布式运维平台（官网门户）。统一 Shell 脚本、文件下发、gRPC 主机执行器、Supervisor 守护进程、工作流编排、调度器、票据鉴权 7 大模块，覆盖中大型企业批量运维。',
  sameAs: ['https://github.com/taurus-stack/taurus'],
}

useHead(() => ({
  title: route.meta.title as string | undefined,
  meta: [
    { name: 'description', content: route.meta.description as string | undefined },
    { property: 'og:title', content: route.meta.title as string | undefined },
    { property: 'og:description', content: route.meta.description as string | undefined },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonical },
    { property: 'og:site_name', content: 'Taurus Portal' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' },
  ],
  link: [{ rel: 'canonical', href: canonical }],
  htmlAttrs: { lang: 'zh-CN' },
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(orgLd),
    },
  ],
}))
</script>

<template>
  <main class="page-home">
    <Hero />
    <Overview />
    <Features />
    <ScreenshotsPreview />
    <Architecture />
    <Solutions />
    <Testimonials />
    <ContactForm />
  </main>
</template>
