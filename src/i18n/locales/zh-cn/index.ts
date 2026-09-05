// zh-cn 入口：合并 7 个模块
import common from './common'
import locale from './locale'
import nav from './nav'
import footer from './footer'
import hero from './hero'
import homeSections from './homeSections'
import contactForm from './contactForm'
import views from './views'

// P1 向后兼容：保留 homeSection 顶层键（老组件用 t('homeSection.xxx')）。
// 这里显式写出 24 个键，与 homeSections.ts 顶部的兼容值保持一致（不通过展开读取，避免推断歧义）。
const homeSection = {
  overviewLabel: homeSections.overviewLabel,
  overviewTitle: homeSections.overviewTitle,
  featuresLabel: homeSections.featuresLabel,
  featuresTitle: homeSections.featuresTitle,
  featuresDesc: homeSections.featuresDesc,
  archLabel: homeSections.archLabel,
  archTitle: homeSections.archTitle,
  archDesc: homeSections.archDesc,
  archAdvantagesTitle: homeSections.archAdvantagesTitle,
  archAdvantagesDesc: homeSections.archAdvantagesDesc,
  archSecurityLabel: homeSections.archSecurityLabel,
  securityTitle: homeSections.securityTitle,
  securityDesc: homeSections.securityDesc,
  solutionsLabel: homeSections.solutionsLabel,
  solutionsTitle: homeSections.solutionsTitle,
  solutionsDesc: homeSections.solutionsDesc,
  testimonialsLabel: homeSections.testimonialsLabel,
  testimonialsTitle: homeSections.testimonialsTitle,
  testimonialsDesc: homeSections.testimonialsDesc,
  contactLabel: homeSections.contactLabel,
  contactHeroTitle: homeSections.contactHeroTitle,
  contactHeroDesc: homeSections.contactHeroDesc,
  scheduleFormTitle: homeSections.scheduleFormTitle,
  scheduleFormDesc: homeSections.scheduleFormDesc,
}

const zhCn = {
  common,
  locale,
  nav,
  footer,
  hero,
  homeSection,
  homeSections,
  contactForm,
  views,
}

export type ZhCnMessages = typeof zhCn

export default zhCn
