import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import SolutionsView from '@/views/SolutionsView.vue'
import DocsView from '@/views/DocsView.vue'
import DownloadView from '@/views/DownloadView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export interface RouteMeta extends Record<string | number | symbol, unknown> {
  title: string
  description: string
  keywords?: string
  ogImage?: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Taurus — 企业级分布式运维平台',
        description:
          'Taurus（天枢）— 企业级分布式一体化运维管理平台。覆盖主机管理、自动化运维、程序部署、监控告警、安全认证全场景。',
      } as RouteMeta,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
      meta: {
        title: '产品功能 · Taurus',
        description:
          'Taurus 六大核心模块：Web 控制台、Backend API、Executor 执行器、Supervisor 守护进程、Auth 认证服务、Scheduler 调度服务。',
      } as RouteMeta,
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: SolutionsView,
      meta: {
        title: '解决方案 · Taurus',
        description:
          '面向金融、互联网、政务/央企、制造业的 Taurus 行业运维解决方案，等保合规、零停机升级、大规模纳管、信创兼容。',
      } as RouteMeta,
    },
    {
      path: '/docs',
      name: 'docs',
      component: DocsView,
      meta: {
        title: '文档中心 · Taurus',
        description: 'Taurus 快速开始、部署指南、架构说明、API 文档、常见问题 FAQ。',
      } as RouteMeta,
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
      meta: {
        title: '下载 · Taurus',
        description: '下载 Taurus 各子项目安装包、Docker 镜像、部署脚本与二进制客户端。',
      } as RouteMeta,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: '关于我们 · Taurus',
        description: 'Taurus 开源项目简介、AGPLv3 协议、贡献指南、团队与联系方式。',
      } as RouteMeta,
    },
    {
      path: '/contact',
      redirect: '/#contact',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: '页面未找到 · Taurus',
        description: '您访问的页面不存在，请返回 Taurus 官网。',
      } as RouteMeta,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta?.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
})

export default router
