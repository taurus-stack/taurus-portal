<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'

// IntersectionObserver 驱动各 section 的滚入动画
// 注意：必须在 <transition mode="out-in"> 的 enter 动画完全结束后再注册，
// 否则 querySelectorAll('.reveal') 拿不到 router-view 里的子组件元素
let observer: IntersectionObserver | null = null

function registerReveals() {
  if (!observer) return
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer!.observe(el))
}

// transition enter 动画结束后的回调 — 此时新页面 DOM 已完全就位
function onAfterEnter() {
  registerReveals()
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
  )

  // 初始加载时 transition 也有 enter 动画（~250ms），setTimeout 兜底
  setTimeout(() => registerReveals(), 350)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="portal-root">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in" @after-enter="onAfterEnter">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
