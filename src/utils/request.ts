import axios from 'axios'

const baseURL = (import.meta as ImportMeta).env.VITE_API_BASE_URL || '/api'

const http = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 响应拦截器
http.interceptors.response.use(
  (res) => res.data,
  (error) => {
    // P0: 简化处理，实际错误 toast 可在 P1 增加
    console.error('[Portal API Error]', error?.message || error)
    return Promise.reject(error)
  },
)

export default http
