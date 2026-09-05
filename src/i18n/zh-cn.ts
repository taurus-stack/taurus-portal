// Backward-compatible re-export of the zh-cn locale.
// The canonical source is now ./locales/zh-cn/index.ts which assembles the 8 split
// modules (common/locale/nav/footer/hero/homeSections/contactForm/views).
export { default } from './locales/zh-cn/index'
export type { ZhCnMessages } from './locales/zh-cn/index'
