# Changelog — Taurus Stack Portal

所有重要版本变更将记录在此文件。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0)，
并采用 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [0.4.0] — 2026-08-31

### P3 阶段：AI 完整三语翻译 + SEO 绝对化

#### Added

- **homeSections + views 大模块 EN / zh-tw 完整翻译**：
  - P2 保留的 `[EN-TODO]` / `[繁-TODO]` 骨架占位（共约 510 处）全部替换为自然的英文 / 繁体中文译文。
  - homeSections（Overview/Features/Architecture/Solutions/Testimonials）十大能力、六大优势、四层架构节点、六安全点、四行业解决方案、三典型场景 + 客户标签全部三语对齐。
  - views（Product 六模块卡 + metrics、Docs 四文档卡 + 六 FAQ、Download 六制品卡 + Compose 说明、About 四价值观 + 六年 roadmap + AGPLv3 详情 + 四贡献指南）完整三语。
  - 技术名词保持一致性：mTLS / gRPC / Macaroon / Fernet / APScheduler / Redis Leader Election / Celery Beat+Worker / RBAC 等均保留英文原文。
- **SEO 绝对化（P3-B）**：
  - `vite.config.ts` 新增简易 `transformIndexHtml` 插件，将 `{{SITE_URL}}` 运行时替换为 `VITE_SITE_URL` 环境变量值。
  - `closeBundle` 钩子生成绝对化 `sitemap.xml`（含 `<lastmod>`）与 `robots.txt`（含绝对 `Sitemap:` 行）写入 dist。
  - `check-dist.mjs` 新增断言：sitemap 绝对 URL 模式、lastmod 存在、robots Sitemap 行对齐。

#### Changed

- **联系信息占位策略**：三语 contactForm + about 4 张联系卡片 desc 统一为纯 TODO 占位（无伪电话/邮箱/地址），等待用户后续提供真实信息。

---

## [0.3.0] — 2026-08-31

### P2 阶段完整版（门户工程化 + i18n 拆分 + 主题切换 + 联系表单真实接入 + 构建/SEO/质量体系）

#### Added

- **联系表单真实接入后端 `ContactLead`**：
  - taurus-backend 新增 `taurus.ContactLead` 模型（表：`taurus_contact_lead`）、`ContactLeadSerializer`、`ContactLeadViewSet`。
    - POST 为 `AllowAny`，附加 60/min/IP 限流；list/retrieve/update/destroy 仅管理员；
    - `perform_create` 透明捕获客户端 XFF、UA，并强制设置 `source='portal'`。
  - 生成 migration `taurus/migrations/0015_contact_lead.py`。
  - `src/api/contact.ts` 从 mock-only 改为真实 `axios POST /taurus/contact-lead/`（VITE_API_BASE_URL 拼接 / VITE_CONTACT_ENDPOINT 覆盖），失败降级到 1.5 s mock。
  - About 视图 4 项联系信息卡片继续保留 **TODO 占位**（不填真号/邮箱/地址）。
- **主题切换（light / dark / system 三选）**：
  - Pinia setup store `src/stores/theme.ts`，`ThemePref` 三态 + `prefers-color-scheme` 实时监听 + html `data-theme` 属性同步 + localStorage 持久化。
  - `src/styles/global.scss`：新增 `[data-theme='dark']` 语义变量重映射（品牌色 teal/navy/amber 等不变，仅反转语义色板）。
  - `NavBar.vue`：桌面端主题切换下拉（3 选项图标+标签），移动菜单独立主题行。
- **i18n 模块化拆分（P2-3 前置执行，零回归）**：
  - 从单文件 800+ key 重构为 `src/i18n/locales/<lang>/{common,locale,nav,footer,hero,homeSections,contactForm,views}.ts` × 3 语（zh-cn / en / zh-tw）共 24 文件 + 3 语 `index.ts` deepMerge 入口 + 3 份老单文件 re-export 兼容层。
  - EN / zh-tw 采用骨架占位 `[EN-TODO]` / `[繁-TODO]` 自动生成，保证 key 结构严格镜像。
  - 同时暴露 `homeSection` (P1 24 扁平兼容键) 和 `homeSections` (P2 深层)，零回归老组件。
- **长文案全部 computed+t() 延迟重求值**：
  - P2-1 5 个 section（Overview/Features/Architecture/Solutions/Testimonials）全面改写。
  - P2-2 5 个视图（Product/Solutions/Docs/Download/About）全面改写。
  - Features FAQ / Solutions visualList / Docs bullets / Download methods / About values 等不定长数组采用固定命名对象 + 组件侧探测构建，避免 vue-i18n 缺 key fallback 失效。
- **构建优化（P2-7）**：
  - `vite.config.ts` `manualChunks` 拆成 11 块稳定缓存：`vue-core / vue-router / pinia / vue-i18n / @vueuse-head / axios / i18n-zh-cn / i18n-en / i18n-zh-tw / index / css`。
  - 修复 axios 空 chunk（根因：ContactForm.vue 未实际 import API）。
  - 拆分后实测：index 15.55 KB / vue-core 29.33 KB / css 9.45 KB gzip，三项预算均达标。
- **SEO 静态兜底 + 运行时增强**：
  - `index.html` 静态写 `<title>/<meta description>/<meta theme-color>/<link rel=canonical>` + `application/ld+json` Organization schema（无 JS 爬虫兜底）。
  - HomeView `useHead` 运行时覆盖 title/description/OG/twitter/robots/JSON-LD。
  - `public/sitemap.xml` 从 1 URL 扩展为 6（首页 + 5 内页）。
  - `public/robots.txt` 追加 `Sitemap: /sitemap.xml`。
  - `.env.example` 新增 `VITE_SITE_URL` 用于部署时绝对化 canonical/JSON-LD。
- **代码质量体系（P2-6）**：
  - ESLint 9 flat：`js.recommended` + `tseslint.recommended`(非 type-info) + `pluginVue.configs['flat/recommended']` + `eslint-config-prettier` 冲突关闭。
  - Prettier 3.4（单引号/无分号/100 宽）。
  - lint-staged 15.3：pre-commit 自动 `eslint --fix` + `prettier --write` 仅对暂存文件。
  - simple-git-hooks 2.11：`pre-commit: pnpm exec lint-staged`，postinstall + `pnpm hooks:install` 双方式写入 `.git/hooks/`。
  - 修复 lint 中 2 个 Vue `no-unused-vars`（Solutions.vue / DownloadView.vue 未用索引）。
- **构建健康门 `scripts/check-dist.mjs`**：8 项断言（axios 非空 / index≤55 / vue-core≤65 / css≤12 / 三语 Δ≤5 / SEO 存在 / sitemap≥5 URLs）。
- **文档资产**：README.md / README.en.md 双语工程手册；Dockerfile 构建期运行 check-dist 门。

#### Changed

- `ContactForm.vue`：`handleSubmit` 从 `setTimeout` mock 改为 `async/await submitContactLead`；新增 `SCALE_VALUE_MAP` 将 P1 规模 1–5 映射到后端语义键。
- `tsconfig.json`：移除 `references` + 排除 `vite.config.ts` in include（修复 P0 TS composite 假阳性错误）。
- `global.scss`：`features-grid` 5 列 → 3 列；修复 3 处 `backdrop-filter` 缺 `-webkit-backdrop-filter` 前缀。
- `RouteMeta`：`extends Record<string | number | symbol, unknown>` 修复 7 处 TS2322。

#### Removed

- P0 遗留：`App.vue` 中硬编码 "OpsCloud"/"望京"/"400-888-9999" 标签已全量清理（P0 审计通过）。
- `utils/request.ts` axios 空调用死路径：现经 ContactForm.vue 实际调用链路生效。

#### Fixed

- P2-4 初版 `stores/theme.ts` `computed(...)` 报 TS2349 "ComputedRef 不可 call"（vue-i18n 模块增强下的符号污染）——改为 `ref + watchEffect`，语义完全一致。
- P2-3 IDE 对 `homeSections.ts` "duplicate property name" 的假阳性（CLI `pnpm run type-check` 实测 0 错误）。
- P0 pnpm approve-builds TTY hang：`CI=true pnpm install` 规避。
- P2-1 `Advantage.icon` 类型过严：放宽为 string；新增 `SolutionIndustry` 接口。
- P2-6 ESLint 规则配置 3 轮假失败：定位 `consistent-type-imports / require-await / only-throw-error` 均为 type-info 规则，统一关闭并使用非 type-info 预设。

---

## [0.2.0] — 2026-08 (P1 阶段归档)

### P1 阶段：框架骨架 + 路由 + 视图 + SEO + i18n 单文件 t() 标签替换

- 完成 portal Vite+Vue+TS 工程骨架，NavBar/Footer/Hero 9 大 section + 5 内页静态。
- 全部 P0 硬编码 t("nav._" / "hero._" / "homeSection._" / "views._") 替换生效。
- 构建全绿：vue-tsc 0 error，vite build 2.53 s / 99 modules。

---

## [0.1.0] — 2026-08 (P0 阶段归档)

### P0 阶段：原始原型迁入 + 工程化 + 依赖 + 构建通过

- 将 `_archive/` 中纯 HTML/CSS/JS 原型转写为 Vue SFC。
- 建立 pnpm + Vue 3.5 + TypeScript 5.6 依赖栈，Sass@1.80 附加变量注入。
- 构建基线 P0 全绿。
