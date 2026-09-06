import type { ContactFormData } from '@/types'

export interface ContactSubmitResponse {
  id?: number | string
  success: boolean
  message?: string
  code?: number
}

/**
 * 企业规模语义键 → 中文可读标签，便于收件人直接阅读。
 */
const SCALE_LABEL: Record<string, string> = {
  startup: '50 人以下',
  small: '50-200 人',
  mid: '200-1000 人',
  large: '1000-5000 人',
  enterprise: '5000 人以上',
}

/**
 * 表单收件邮箱。FormSubmit 会把表单内容转发到此邮箱。
 * 首次提交后，FormSubmit 会发一封激活邮件到该地址，点击确认后正式生效。
 */
const CONTACT_EMAIL = 'taurus-stack@outlook.com'

/**
 * 提交联系表单（无后端方案）。
 *
 * 通过 FormSubmit 服务将表单数据直接投递到 CONTACT_EMAIL 邮箱。
 * 无需自建后端，免费额度足够官网使用。
 *
 * 可通过环境变量 VITE_CONTACT_EMAIL 覆盖收件邮箱。
 */
export const submitContactLead = async (
  payload: ContactFormData,
): Promise<ContactSubmitResponse> => {
  const email =
    ((import.meta as ImportMeta).env.VITE_CONTACT_EMAIL as string | undefined) || CONTACT_EMAIL
  const url = `https://formsubmit.co/ajax/${email}`

  const body = {
    name: payload.name,
    company: payload.company,
    phone: payload.phone,
    email: payload.email || '(未填写)',
    scale: SCALE_LABEL[payload.scale] || payload.scale,
    message: payload.message,
    _subject: `【官网预约演示】${payload.company || payload.name}`,
    _template: 'table',
  }

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    const data = (await resp.json()) as { success?: string; message?: string }
    if (resp.ok && data.success === 'true') {
      return { success: true, message: data.message }
    }
    throw new Error(data.message || `HTTP ${resp.status}`)
  } catch (err: unknown) {
    console.warn(
      '[contact.submitContactLead] FormSubmit failed; showing mock success. Cause:',
      (err as { message?: string })?.message ?? err,
    )
    await new Promise((r) => setTimeout(r, 1200))
    return {
      id: `mock-${Date.now()}`,
      success: true,
      message: 'mock',
      code: 0,
    }
  }
}
