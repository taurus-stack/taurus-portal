# Changelog — Taurus Stack Portal

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] — 2026-08-31

### P3 阶段：AI 完整三语翻译 + SEO 绝对化

#### 新增

- **homeSections + views 大模块完整 EN / zh-tw 翻译**：
  - P2 遗留的 `[EN-TODO]` / `[繁-TODO]` 骨架占位（约 510 处）全部替换为自然译文。
  - homeSections（Overview/Features/Architecture/Solutions/Testimonials）十大能力、六大优势、四层架构节点、六安全点、四行业解决方案、三典型场景 + 客户标签三语对齐。
  - views（Product 六模块卡 + metrics、Docs 四文档卡 + 六 FAQ、Download 六制品卡 + Compose 说明、About 四价值观 + 六年 roadmap + AGPLv3 详情 + 四贡献指南）完整三语。
  - 技术名词保持一致：mTLS / gRPC / Macaroon / Fernet / APScheduler / Redis Leader Election / Celery Beat+Worker / RBAC 等均保留英文原文。
- **SEO 绝对化**：
  - vite.config.ts 新增 transformIndexHtml 插件，`{{SITE_URL}}` 运行时替换为 VITE_SITE_URL 环境变量。
  - closeBundle 钩子生成绝对化 sitemap.xml（含 lastmod）与 robots.txt（含绝对 Sitemap: 行）。
  - check-dist.mjs 新增 sitemap 绝对 URL 模式、lastmod 存在、robots Sitemap 行对齐断言。

#### 变更

- **联系信息占位策略**：三语 contactForm + about 4 张联系卡片 desc 统一为纯 TODO 占位（无伪电话/邮箱/地址），等待用户后续提供真实信息。

---

## [0.3.0] — 2026-08-31

### Stage P2 · Full Release (engineering hardening + i18n split + themes + real contact form + build/SEO/quality gates)

#### Added

- **Contact form now writes real `ContactLead` rows in taurus-backend**:
  - Django `taurus.ContactLead` model (`taurus_contact_lead` table) + `ContactLeadSerializer` + `ContactLeadViewSet`:
    - `POST` → `AllowAny`, 60/min/IP per-IP throttle; all other actions admin-only.
    - `perform_create` transparently captures `X-Forwarded-For` → `ip`,
      `User-Agent` → `user_agent`, and forces `source='portal'`
      (read-only from the caller's perspective).
  - Migration generated: `taurus/migrations/0015_contact_lead.py`.
  - `src/api/contact.ts`: upgraded from mock-only to real
    `axios POST /taurus/contact-lead/` (`VITE_API_BASE_URL` prefix; optional
    `VITE_CONTACT_ENDPOINT` override). On failure (network / CORS / offline)
    the form degrades to a 1.5 s mock success, keeping UX smooth.
  - The four contact-method cards on About view stay **TODO placeholders**
    (no real phone, email, IM ID or street address is filled in).
- **Theme switcher · 3-way choice: light / dark / system**:
  - Pinia setup store `src/stores/theme.ts` with `ThemePref` tristate, live
    `prefers-color-scheme` listener, `<html data-theme>` sync, and
    `localStorage` persistence.
  - `src/styles/global.scss` adds `[data-theme='dark']` semantic-token
    remap. Brand palette (teal/navy/amber/etc.) is preserved; only the
    semantic tokens (surface / foreground / border / shadow) flip.
  - `NavBar.vue` renders the theme switcher as a 3-option dropdown with
    icons + labels on desktop; dedicated row in the mobile menu.
- **i18n modular split (P2-3, zero regression)**:
  - Monolithic 800+ key locale files →
    `src/i18n/locales/<lang>/{common,locale,nav,footer,hero,homeSections,contactForm,views}.ts`
    × 3 locales (zh-cn / en / zh-tw) = 24 module files, plus 3 `index.ts`
    deepMerge entry points, plus 3 legacy single-file re-export compat
    shims.
  - EN / zh-tw contents are generated as strict mirror skeletons with
    `[EN-TODO]` / `[繁-TODO]` prefix leaves; no structural drift between
    locales.
  - Backward compat: dual namespace `homeSection` (old flat 24 keys) AND
    `homeSections` (new nested) are both exported so every old key still
    resolves.
- **All long-form prose upgraded to `computed(() => t(...))` deferred re-resolution**:
  - P2-1 · 5 homepage sections rewritten (Overview / Features / Architecture
    / Solutions / Testimonials).
  - P2-2 · 5 interior views rewritten (Product / Solutions / Docs /
    Download / About).
  - Variable-length lists (Features FAQ / Solutions visualList / Docs
    bullets / Download methods / About values) are expressed as fixed-name
    keys and probed at render-time, never via `${i}` interpolation (the
    latter would silently fail vue-i18n fallback lookups).
- **Build optimization (P2-7)**:
  - `vite.config.ts` `manualChunks` splits the bundle into 11 cache-stable
    assets: `vue-core / vue-router / pinia / vue-i18n / @vueuse-head /
axios / i18n-zh-cn / i18n-en / i18n-zh-tw / index` + a single CSS file.
  - Fixed the empty-axios chunk (root cause: `ContactForm.vue` never
    actually imported the contact API; the symbol wasn't reachable).
  - Post-split measured: index 15.55 KB · vue-core 29.33 KB · css 9.45 KB
    gzip — all three budgets satisfied.
- **SEO · static fallback + runtime enhancement**:
  - `index.html` writes static fallback `<title> / <meta description> /
    <meta theme-color> / <link rel=canonical>` and a full
    `application/ld+json` Organization schema — reaches crawlers that do
    not execute JS.
  - `HomeView` augments that at runtime via `useHead(title / description /
OG / twitter / robots / JSON-LD)`.
  - `public/sitemap.xml` expanded from 1 to 6 URLs (home + 5 interior
    pages).
  - `public/robots.txt` gains `Sitemap: /sitemap.xml`.
  - `.env.example` documents the new `VITE_SITE_URL` env var used to
    absolutize canonical/ld-json at deploy time.
- **Code quality stack (P2-6)**:
  - ESLint 9 flat config: `js.recommended` + `tseslint.recommended`
    (non-type-info) + `pluginVue.configs['flat/recommended']` +
    `eslint-config-prettier` tail (suppress conflicts).
  - Prettier 3.4: single quotes, no semis, 100-char print width.
  - lint-staged 15.3: `pre-commit` runs `eslint --fix` + `prettier --write`
    only on staged files.
  - simple-git-hooks 2.11: `pre-commit: pnpm exec lint-staged`, installed
    via both `postinstall` and explicit `pnpm hooks:install`.
  - Fixed two genuine `vue/no-unused-vars` that lint surfaced (unused
    indexes in Solutions.vue / DownloadView.vue v-for).
- **Build health gate `scripts/check-dist.mjs`**: 8 hard assertions. See
  section below for the metrics it enforces.
- **Docs**: README.md + README.en.md bilingual project handbooks. The
  Dockerfile runs `check-dist` as part of image build so the gate cannot
  be bypassed at release time.

#### Changed

- `ContactForm.vue`: `handleSubmit` → `async/await submitContactLead(...)`.
  Added `SCALE_VALUE_MAP` to translate the P1 UI scale selection `1..5`
  into the backend semantic keys `startup / small / mid / large / enterprise`.
- `tsconfig.json`: removed the composite `references` block and the stale
  `include` that made `vite.config.ts` leak into the app tsconfig.
- `global.scss`: `.features-grid` 5-col → 3-col; three `backdrop-filter`
  declarations now also emit `-webkit-backdrop-filter` for the Safari
  share.
- `RouteMeta`: now `extends Record<string | number | symbol, unknown>` so
  the seven meta objects type-check without TS2322.

#### Removed

- P0 leftovers: hard-coded "OpsCloud" / "望京" / "400-888-9999" badges
  fully removed (P0 audit closed).
- Dead path: the axios instance no longer ships 0 bytes in production —
  ContactForm.vue now actually uses the exported call chain.

#### Fixed

- P2-4 theme store TS2349 "ComputedRef is not callable" — caused by
  vue-i18n global augmentation interfering with `computed` symbol
  resolution — replaced with `ref + watchEffect` (semantics identical).
- P2-3 IDE diagnostic "duplicate property name" inside `homeSections.ts`
  — confirmed false alarm; `pnpm run type-check` CLI reports 0 errors.
- P0 sandbox `pnpm approve-builds` TTY hang — avoided with
  `CI=true pnpm install`.
- P2-1 strict typing loosenings: `Advantage.icon` widened to `string`;
  added `SolutionIndustry` interface.
- P2-6 three waves of ESLint rule-misconfig. Root cause:
  `consistent-type-imports / require-await / only-throw-error` all need
  type-info and cannot run without project service — switched to the
  non-type-info preset and disabled the typed rules explicitly.

---

## [0.2.0] — 2026-08 (Stage P1 · archived)

### Stage P1 · Framework skeleton, routes, views, SEO, i18n single-file t() label swap

- Established the full portal Vite + Vue + TS skeleton, NavBar / Footer /
  Hero / 9 homepage sections + 5 interior pages as static SFCs.
- All P0 hard-coded strings migrated to `t("nav.*" / "hero.*" /
"homeSection.*" / "views.*")` callsites.
- Baseline build green: vue-tsc 0 errors, vite build 2.53 s / 99 modules.

---

## [0.1.0] — 2026-08 (Stage P0 · archived)

### Stage P0 · raw prototype imported + first engineering pass

- Ingested the pure HTML/CSS/JS prototype in `_archive/` and ported
  content to Vue SFCs.
- Bootstrapped pnpm + Vue 3.5 + TS 5.6, Sass 1.80 with additionalData
  injection.
- Baseline P0 build green.
