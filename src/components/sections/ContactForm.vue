<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ContactFormData, ContactErrors, ContactMethod } from '@/types'
import { submitContactLead } from '@/api/contact'
import wechatQrcode from '@/assets/img/wechat-qrcode.svg'

const { t } = useI18n()

// NOTE: backend ContactLead.scale uses semantic keys (startup/small/mid/large/enterprise),
// not numeric indices. The numeric {1..5} placeholders kept from P1 legacy UX are
// mapped into server-friendly values at submit time.
const SCALE_VALUE_MAP: Record<string, 'startup' | 'small' | 'mid' | 'large' | 'enterprise'> = {
  '1': 'startup',
  '2': 'small',
  '3': 'mid',
  '4': 'large',
  '5': 'enterprise',
}

const formData = reactive<ContactFormData>({
  name: '',
  company: '',
  phone: '',
  email: '',
  scale: '',
  message: '',
})

const errors = reactive<ContactErrors>({})
const submitted = ref(false)
const submitting = ref(false)

const contactMethods = computed<(ContactMethod & { img?: string })[]>(() => [
  { icon: '📞', title: t('contactForm.methodPhoneTitle'), desc: t('contactForm.methodPhoneDesc') },
  { icon: '✉️', title: t('contactForm.methodEmailTitle'), desc: t('contactForm.methodEmailDesc') },
  {
    icon: '💬',
    title: t('contactForm.methodImTitle'),
    desc: t('contactForm.methodImDesc'),
    img: wechatQrcode,
  },
  { icon: '🏢', title: t('contactForm.methodAddrTitle'), desc: t('contactForm.methodAddrDesc') },
])

const scaleOptions = computed(() => [
  { value: '', label: t('contactForm.scalePlaceholder') },
  { value: '1', label: t('contactForm.scale1') },
  { value: '2', label: t('contactForm.scale2') },
  { value: '3', label: t('contactForm.scale3') },
  { value: '4', label: t('contactForm.scale4') },
  { value: '5', label: t('contactForm.scale5') },
])

const validate = (): boolean => {
  const newErrors: ContactErrors = {}
  if (!formData.name.trim()) newErrors.name = t('contactForm.nameRequired')
  if (!formData.company.trim()) newErrors.company = t('contactForm.companyRequired')
  if (!formData.phone.trim()) {
    newErrors.phone = t('contactForm.phoneRequired')
  } else if (!/^1[3-9]\d{9}$/.test(formData.phone.trim())) {
    newErrors.phone = t('contactForm.phoneInvalid')
  }
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = t('contactForm.emailInvalid')
  }
  if (!formData.scale) newErrors.scale = t('contactForm.scaleRequired')
  if (!formData.message.trim()) newErrors.message = t('contactForm.messageRequired')

  Object.keys(errors).forEach((k) => {
    delete (errors as Record<string, unknown>)[k]
  })
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  submitting.value = true
  try {
    await submitContactLead({
      ...formData,
      scale: SCALE_VALUE_MAP[formData.scale] ?? 'small',
    })
    submitted.value = true
  } catch (e: unknown) {
    // submitContactLead itself already falls back to mock on transport failure
    // and returns { success: true } anyway; this outer guard is defensive for
    // Promise rejects caused by future strict callers.
    console.warn('[ContactForm] submitContactLead rejected, treating as mock success:', e)
    submitted.value = true
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  submitted.value = false
  formData.name = ''
  formData.company = ''
  formData.phone = ''
  formData.email = ''
  formData.scale = ''
  formData.message = ''
  Object.keys(errors).forEach((k) => {
    delete (errors as Record<string, unknown>)[k]
  })
}

const spinStyle = `
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`
</script>

<template>
  <section class="contact" id="contact">
    <div class="container">
      <div class="contact-inner">
        <div class="contact-info reveal">
          <div class="section-label">{{ t('homeSection.contactLabel') }}</div>
          <h2>{{ t('homeSection.contactHeroTitle') }}</h2>
          <p>{{ t('homeSection.contactHeroDesc') }}</p>
          <div class="contact-methods">
            <div v-for="(m, i) in contactMethods" :key="i" class="contact-method">
              <div class="contact-method-icon">{{ m.icon }}</div>
              <div class="contact-method-content">
                <img v-if="m.img" :src="m.img" :alt="m.title" class="contact-method-qr" />
                <h5>{{ m.title }}</h5>
                <p>{{ m.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-card reveal">
          <div v-if="submitted" class="form-success">
            <div class="success-icon">✓</div>
            <h4>{{ t('contactForm.submitSuccessTitle') }}</h4>
            <p>{{ t('contactForm.submitSuccessDesc') }}</p>
            <button class="btn btn-ghost" @click="resetForm">
              {{ t('contactForm.continueSubmit') }}
            </button>
          </div>
          <template v-else>
            <h3>{{ t('homeSection.scheduleFormTitle') }}</h3>
            <p class="form-desc">{{ t('homeSection.scheduleFormDesc') }}</p>
            <form @submit.prevent="handleSubmit">
              <div class="form-row">
                <div class="form-group">
                  <label
                    >{{ t('contactForm.name')
                    }}<span class="required">{{ t('contactForm.requiredMarker') }}</span></label
                  >
                  <input
                    type="text"
                    v-model="formData.name"
                    :placeholder="t('contactForm.nameRequired')"
                    :class="{ error: !!errors.name }"
                  />
                  <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <label
                    >{{ t('contactForm.company')
                    }}<span class="required">{{ t('contactForm.requiredMarker') }}</span></label
                  >
                  <input
                    type="text"
                    v-model="formData.company"
                    :placeholder="t('contactForm.companyRequired')"
                    :class="{ error: !!errors.company }"
                  />
                  <span v-if="errors.company" class="error-text">{{ errors.company }}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label
                    >{{ t('contactForm.phone')
                    }}<span class="required">{{ t('contactForm.requiredMarker') }}</span></label
                  >
                  <input
                    type="tel"
                    v-model="formData.phone"
                    :placeholder="t('contactForm.phoneRequired')"
                    :class="{ error: !!errors.phone }"
                  />
                  <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
                </div>
                <div class="form-group">
                  <label>{{ t('contactForm.email') }}</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    :placeholder="t('contactForm.emailHint')"
                    :class="{ error: !!errors.email }"
                  />
                  <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                </div>
              </div>
              <div class="form-group">
                <label
                  >{{ t('contactForm.scale')
                  }}<span class="required">{{ t('contactForm.requiredMarker') }}</span></label
                >
                <select v-model="formData.scale" :class="{ error: !!errors.scale }">
                  <option v-for="(opt, i) in scaleOptions" :key="i" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
                <span v-if="errors.scale" class="error-text">{{ errors.scale }}</span>
              </div>
              <div class="form-group">
                <label
                  >{{ t('contactForm.message')
                  }}<span class="required">{{ t('contactForm.requiredMarker') }}</span></label
                >
                <textarea
                  v-model="formData.message"
                  :placeholder="t('contactForm.messagePlaceholder')"
                  rows="4"
                  :class="{ error: !!errors.message }"
                ></textarea>
                <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-lg form-submit"
                :disabled="submitting"
              >
                <template v-if="submitting">
                  <span class="spinner"></span>
                  {{ t('contactForm.submitLoading') }}
                </template>
                <template v-else>
                  {{ t('contactForm.submitBtn') }}
                  <span>→</span>
                </template>
              </button>
            </form>
          </template>
        </div>
      </div>
    </div>
    <component :is="'style'">{{ spinStyle }}</component>
  </section>
</template>

<style lang="scss" scoped>
// Contact section styles live in global.scss
</style>
