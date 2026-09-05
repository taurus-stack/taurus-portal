// ===== Nav / Menu =====
export interface NavItem {
  label: string
  href: string
}

// ===== Hero =====
export interface HeroMetric {
  value: string
  unit?: string
  label: string
}

export interface MetricBar {
  label: string
  icon: string
  value: string
  bar: number
  color: string
}

// ===== Overview =====
export interface PainPoint {
  icon: string
  solved?: boolean
  title: string
  desc: string
}

export interface OverviewMetric {
  value: string
  trend?: string
  label: string
}

export interface CoreModule {
  step: string
  name: string
  desc: string
}

// ===== Features =====
export interface Feature {
  iconClass: string
  title: string
  desc: string
  iconPath: string
  points: string[]
}

// ===== Architecture =====
export interface Advantage {
  icon: string
  iconSymbol: string
  title: string
  desc: string
}

export interface ArchNode {
  name: string
  icon: string
}

export interface ArchLayer {
  label: string
  nodes: ArchNode[]
}

export interface SecurityPoint {
  title: string
  desc: string
}

// ===== Solutions =====
export interface SolutionStat {
  value: string
  label: string
}

export interface SolutionFeature {
  title: string
  desc: string
}

export interface Solution {
  name: string
  title: string
  desc: string
  stats: SolutionStat[]
  tag: string
  visualList: string[]
  features: SolutionFeature[]
}

// Homepage Solutions.vue needs an industry key.
export interface SolutionIndustry extends Solution {
  key: string
}

// ===== Testimonials =====
export interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  avatar: string
}

// ===== Contact =====
export interface ContactFormData {
  name: string
  company: string
  phone: string
  email: string
  scale: string
  message: string
}

export interface ContactErrors {
  name?: string
  company?: string
  phone?: string
  email?: string
  scale?: string
  message?: string
}

export interface ContactMethod {
  icon: string
  title: string
  desc: string
}

// ===== Footer =====
export interface FooterLink {
  label: string
  href: string
}

export interface Social {
  name: string
  path: string
}

// ===== i18n =====
export type Locale = 'zh-cn' | 'en' | 'zh-tw'

export interface LocaleMessages {
  nav: Record<string, string>
  common: Record<string, string>
  hero: Record<string, string>
  overview: Record<string, any>
  features: Record<string, any>
  arch: Record<string, any>
  solutions: Record<string, any>
  testimonials: Record<string, any>
  contact: Record<string, any>
  footer: Record<string, any>
}
