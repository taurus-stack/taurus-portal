// zh-tw locale entry — merges 8 split modules
import common from './common'
import locale from './locale'
import nav from './nav'
import footer from './footer'
import hero from './hero'
import homeSections from './homeSections'
import contactForm from './contactForm'
import views from './views'

// P1 backward compat: expose homeSection (24 top-level section-header keys)
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
  clientsLabel: homeSections.clientsLabel,
  contactLabel: homeSections.contactLabel,
  contactHeroTitle: homeSections.contactHeroTitle,
  contactHeroDesc: homeSections.contactHeroDesc,
  scheduleFormTitle: homeSections.scheduleFormTitle,
  scheduleFormDesc: homeSections.scheduleFormDesc,
  screenshotsLabel: homeSections.screenshotsLabel,
  screenshotsTitle: homeSections.screenshotsTitle,
  screenshotsDesc: homeSections.screenshotsDesc,
  screenshotsCta: homeSections.screenshotsCta,
}

export default {
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
