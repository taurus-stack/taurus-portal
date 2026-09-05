<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <section
    class="not-found"
    style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 24px;
      background: linear-gradient(180deg, #0a1628 0%, #162a47 100%);
      color: white;
    "
  >
    <div
      style="
        font-size: clamp(80px, 16vw, 160px);
        font-weight: 800;
        letter-spacing: -0.04em;
        background: linear-gradient(135deg, #2dd4bf, #60a5fa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      "
    >
      404
    </div>
    <h1 style="font-size: 28px; margin: 24px 0 12px; color: white">
      {{ t('common.notFoundTitle') }}
    </h1>
    <p style="color: #94a3b8; max-width: 480px; margin-bottom: 40px">
      {{ t('common.notFoundDesc') }}
    </p>
    <button class="btn btn-primary btn-lg" @click="router.push('/')">
      {{ t('common.backHome') }}
    </button>
  </section>
</template>
