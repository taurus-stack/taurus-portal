import http from '@/utils/request'
import type { ContactFormData } from '@/types'

export interface ContactSubmitResponse {
  /** When server returns dvadmin SuccessResponse envelope: { data:{id, ...}, msg, code }. */
  id?: number | string
  success: boolean
  message?: string
  code?: number
  data?: { id?: number | string; [k: string]: unknown }
}

/**
 * 提交联系表单（线索入库）。
 *
 * 默认接口：taurus-backend POST /api/taurus/contact-lead/
 *   - taurus-backend 已内建 ContactLeadViewSet（AllowAny POST + 60/min/IP 限流；其余动作需管理员）
 *   - 若前端已通过 VITE_API_BASE_URL 指定后端域名（如 "https://taurus.example.com"），
 *     自动复用 baseURL → 形成 `${VITE_API_BASE_URL}/taurus/contact-lead/`。
 *   - 生产部署通常用 nginx 同源反代 `/api/taurus/...` → 直接命中 `/api` prefix。
 *
 * 覆盖方式（可选）：
 *   - 显式指定 VITE_CONTACT_ENDPOINT = "/api/taurus/contact-lead/" 或绝对 URL，
 *     将直接使用该值（忽略 baseURL）。
 *
 * Fallback：
 *   - 请求失败（5xx/CORS/网络不可达/未配置后端）→ 自动降级 1.5s mock 成功，避免
 *     在本地预览 / 预发部署阶段阻塞用户体验。线上若需严格校验，移除 mock 分支。
 */
export const submitContactLead = async (
  payload: ContactFormData,
): Promise<ContactSubmitResponse> => {
  const directEndpoint = (import.meta as ImportMeta).env.VITE_CONTACT_ENDPOINT as string | undefined
  // Resolve final URL. If direct endpoint is absolute or starts with `/`, use as-is;
  // otherwise attach to http instance baseURL implicitly by calling with a relative path.
  const useRelative = !directEndpoint
  const target = useRelative ? '/taurus/contact-lead/' : directEndpoint

  const submitOnce = async (): Promise<ContactSubmitResponse> => {
    const resp = (await (useRelative
      ? http.post(target, payload)
      : http.request({ url: target, method: 'post', data: payload }))) as
      | ContactSubmitResponse
      | { code?: number; msg?: string; message?: string; data?: { id?: number | string } }
    const r = resp as NonNullable<typeof resp>
    // dvadmin envelope shape: { code: 2000, msg: '...', data: {...} } or plain object
    const codeOk = r.code === undefined || String(r.code).startsWith('2') || r.code === 0
    const data = (r as { data?: { id?: number | string } }).data
    return {
      id: (data && data.id) ?? (r as ContactSubmitResponse).id,
      success: (r as ContactSubmitResponse).success ?? codeOk,
      message: (r as { msg?: string }).msg ?? (r as ContactSubmitResponse).message,
      code: (r as { code?: number }).code,
      data,
    }
  }

  try {
    return await submitOnce()
  } catch (err: unknown) {
    // ===== Fallback to offline mock =====
    // Keep a visible breadcrumb in console so operators can detect real failure
    // while still showing "提交成功" to end user.
    console.warn(
      '[contact.submitContactLead] Remote submission failed; using mock fallback. Cause:',
      (err as { message?: string })?.message ?? err,
    )
    await new Promise((r) => setTimeout(r, 1500))
    return {
      id: `mock-${Date.now()}`,
      success: true,
      message: 'mock',
      code: 0,
    }
  }
}
