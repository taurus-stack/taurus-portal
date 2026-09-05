# Taurus Stack · Portal (官网门户)

> Taurus Stack 企业级分布式运维平台 — 官方门户 / 官网前端工程。
>
> 基于 **Vue 3 + TypeScript + Vite 5 + Pinia + Vue Router + vue-i18n + @vueuse/head** 构建；
> 联系表单通过真实 `axios` POST 到 **taurus-backend `POST /api/taurus/contact-lead/`**（ContactLead Model+ViewSet+migration 已内建）。
> 其余 5 个内页（Product / Solutions / Docs / Download / About）无需后端。

---

## 1. 工程特性一览

| 维度       | 实现 / 技术                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 框架       | Vue 3.5 + `<script setup lang="ts">` + Composition API                                                                                                                                                                       |
| 构建       | Vite 5，目标 ES2020，`manualChunks` 拆成 **11 个可单独缓存的 chunk**（vue-core / vue-router / pinia / vue-i18n / @vueuse-head / axios / i18n-zh-cn / i18n-en / i18n-zh-tw / index / CSS）                                    |
| 状态       | Pinia 2 setup store（theme / locale）                                                                                                                                                                                        |
| 路由       | Vue Router 4，7 路由 + 404 + meta 标题同步 + `/#contact` 锚跳转                                                                                                                                                              |
| 国际化     | vue-i18n 9.14，**3 语 × 8 模块 = 24 份 ts**；新旧命名空间 (`homeSection` 扁平 + `homeSections` 深层) 兼容；三语顶层 key Δ=0                                                                                                  |
| 主题       | light / dark / system 三选，主题枚举 store + `prefers-color-scheme` 实时监听 + CSS 语义 token 重映射（品牌色不变，只反转语义背景/文字/边框/阴影），NavBar 桌面下拉 + 移动菜单主题行                                          |
| SEO        | `@vueuse/head` 运行时 useHead；`index.html` 静态模板写入 **fallback canonical + Organization JSON-LD + meta description / theme-color**（无 JS 执行爬虫兜底）。`public/sitemap.xml` 6 URLs，`public/robots.txt` 含 Sitemap。 |
| 代码质量   | ESLint 9 flat（TS + Vue recommended，无 type-info）+ Prettier 3.4 + lint-staged 15.3 + simple-git-hooks 2.11（pre-commit = lint-staged）                                                                                     |
| 联系表单   | 真实 axios POST `{baseURL}/taurus/contact-lead/`；UI 规模 1–5 语义映射到 `startup/small/mid/large/enterprise`；失败自动 fallback 1.5s mock；联系信息卡片（电话/邮箱/IM/地址）保留 TODO 占位                                  |
| 后端存储   | Django 4.2 `ContactLead` 模型（表：`taurus_contact_lead`），已生成 migration `0015_contact_lead.py`；POST AllowAny + 60/min/IP 限流；其他操作仅管理员                                                                        |
| 构建健康门 | `scripts/check-dist.mjs` — 8 项断言 (axios>1KB / index≤55KB / vue-core≤65KB / css≤12KB / 三语 key Δ≤5 / SEO 存在 / sitemap≥5 URLs)，CI 全绿                                                                                  |

**构建尺寸（P2-7 build 最终数据）**：

| Chunk                                        | Raw      | Gzip                     |
| -------------------------------------------- | -------- | ------------------------ |
| index                                        | 52.5 KB  | **15.55 KB** (≤ 55 KB ✓) |
| vue-core                                     | 74.2 KB  | **29.33 KB** (≤ 65 KB ✓) |
| axios                                        | 51.4 KB  | **19.49 KB** (非空 ✓)    |
| css (单文件)                                 | 52.2 KB  | **9.45 KB** (≤ 12 KB ✓)  |
| i18n-zh-cn / en / zh-tw                      | 26–36 KB | 17.3 / 18.5 / 18.5 KB    |
| vue-router / pinia / vue-i18n / @vueuse-head | 4–64 KB  | 1.9–20.4 KB              |

---

## 2. 快速开始

### 2.1 环境要求

- **Node.js** ≥ 20.x（构建 Docker 镜像用 20-alpine）
- **pnpm** 10.x（`corepack prepare pnpm@latest-10 --activate`）
- **Python 3.12 + conda env `taurus` + poetry**：仅在需要修改后端 ContactLead、执行 `makemigrations`、或运行 Django 时使用（详见上一层 `taurus-backend/`）

### 2.2 本地开发

```bash
cd taurus-portal

# 1) 安装依赖（首次可跑 `pnpm approve-builds simple-git-hooks` 允许 postinstall 写入 pre-commit 钩子）
CI=true pnpm install

# 2) 注册 git hooks（postinstall 会自动跑，也可手动）
pnpm hooks:install

# 3) 启动（默认 8082，可在 .env 中 VITE_PORT=8083 覆盖）
pnpm dev
# http://localhost:8082/
```

### 2.3 生产构建

```bash
pnpm build                              # vue-tsc --noEmit && vite build
node scripts/check-dist.mjs             # 构建健康门（等同 pnpm check-dist）
```

### 2.4 联系表单 / 后端对接

两种方式：

**A. 同源反代（推荐，生产默认）** — nginx 中已将 `/api` 反代到 taurus-backend 8000。

- portal 发 `POST /api/taurus/contact-lead/` → 直接命中后端，不需要额外配置。

**B. 本地分离开发（后端跑在本机 8000）**：

- 复制 `.env.example` 为 `.env.development.local`，写入：
  ```dotenv
  VITE_API_BASE_URL=http://localhost:8000/api
  ```
- `pnpm dev` 即可。

**迁移数据库（如果还没有跑过 `0015_contact_lead`）**：

```bash
cd ../taurus-backend
conda run -n taurus poetry run python manage.py migrate taurus
```

---

## 3. 脚本速查

```bash
pnpm dev                 # 开发模式 Vite
pnpm build               # TS 检查 + 生产构建
pnpm preview             # 预览构建产物 (vite preview)
pnpm type-check          # vue-tsc --noEmit
pnpm lint                # ESLint 扫描（warning 不阻断，error 才阻断）
pnpm lint:fix            # ESLint --fix
pnpm format              # Prettier --write
pnpm format:check        # Prettier --check
pnpm hooks:install       # simple-git-hooks 将 pre-commit = lint-staged 写入 .git/hooks/
pnpm check-dist          # scripts/check-dist.mjs：8 项构建健康断言
```

---

## 4. 代码组织

```
taurus-portal/
├── index.html                         # 静态 SEO fallback（title / canonical / JSON-LD Organization）
├── vite.config.ts                     # manualChunks 框架 + 三语 locale 独立拆分
├── eslint.config.mjs                  # ESLint 9 flat：js.recommended + ts.recommended + vue/flat/recommended + prettier 冲突关闭
├── .prettierrc.json / .prettierignore
├── .lintstagedrc.json / .simple-git-hooks.json
├── .env.example / .env.development / .env.production
├── Dockerfile                         # node:20-alpine build → nginx:1.27-alpine serve；构建后执行 check-dist.mjs
├── nginx.conf                         # gzip + SPA fallback + assets Cache-Control
├── scripts/check-dist.mjs             # 8 项构建健康断言（CI/CD gate）
├── public/
│   ├── favicon.ico
│   ├── robots.txt                     # 含 Sitemap: /sitemap.xml
│   └── sitemap.xml                    # 首页 + 5 内页
└── src/
    ├── main.ts                        # createApp(Pinia/Router/i18n/Head)
    ├── App.vue                        # 路由 view + 过渡 + IntersectionObserver reveal
    ├── router/index.ts                # 7 routes + 404 + meta.title 同步 + /#contact 跳回首页锚
    ├── types/index.ts                 # Portal 全局类型定义
    ├── utils/request.ts               # axios instance（baseURL = VITE_API_BASE_URL || /api，响应拦截器 unwrap）
    ├── api/contact.ts                 # POST /taurus/contact-lead/；失败降级 mock
    ├── stores/
    │   ├── locale.ts                  # locale 切换（zh-cn / en / zh-tw）
    │   └── theme.ts                   # ThemePref (light/dark/system) + resolvedTheme + html data-theme + 持久化
    ├── styles/
    │   ├── variables.scss             # 设计 token + SCSS 附加数据注入
    │   ├── reset.scss                 # Meyer 风格全局 reset
    │   └── global.scss                # 全站语义变量、布局、语义类、features-grid 3 列；含 [data-theme='dark'] 深色覆盖
    ├── i18n/
    │   ├── index.ts                   # createI18n legacy:false + 按语言动态加载
    │   ├── {zh-cn,en,zh-tw}.ts        # P0–P1 单文件 re-export 兼容层
    │   └── locales/{zh-cn,en,zh-tw}/
    │       ├── index.ts               # deepMerge 7 模块 + 导出
    │       ├── {common,locale,nav,footer,hero,homeSections,contactForm,views}.ts
    ├── components/
    │   ├── layout/{NavBar,Footer}.vue
    │   └── sections/{Hero,Overview,Features,Architecture,Solutions,Testimonials,ContactForm}.vue
    └── views/
        ├── HomeView.vue               # useHead canonical + Organization JSON-LD
        ├── ProductView.vue            # 6 模块 × 特性表
        ├── SolutionsView.vue          # 行业 + CTA
        ├── DocsView.vue               # 4 段文档导航 + FAQ ×6
        ├── DownloadView.vue           # 6 模块安装方式 + Docker 12 行 docker-compose 脚手架
        ├── AboutView.vue              # 价值观 / 路线图 / 协议 / 贡献 / 联系信息（TODO 占位，不填真号）
        └── NotFoundView.vue           # 404
```

---

## 5. 联系信息占位策略（当前版本）

根据开发阶段决策：**官网门户 P2 阶段不填真实电话 / 邮箱 / IM / 地址**。

- `Home > ContactForm.vue`：联系表单功能完全可用（axios 真实入库 ContactLead），是当前唯一可交互的联系入口。
- `About > 联系方式卡片`：4 项 `desc` 字段保留 `TODO` 占位文案，可在对外上线前一次性替换。

---

## 6. Docker 部署

```bash
# 构建镜像（buildx 会缓存 pnpm store、layers）
docker build -t taurus-portal:0.3.0 .

# 本地试运行
docker run --rm -p 8080:80 --name tp taurus-portal:0.3.0
curl -I http://localhost:8080/            # 200 OK，已存在 canonical + JSON-LD
docker rm -f tp
```

---

## 7. 许可证 / 协议

- Portal (本站代码)：AGPL-3.0-only (与主仓库 LICENSE 保持一致)
- 第三方依赖：见各子包 `package.json` / `LICENSE` 文件

---

最后一条：保持 Karpathy 风格，修改要**精准**、验证要**闭环**。任何改动请跑：

```bash
pnpm run type-check && pnpm run build && pnpm check-dist && pnpm lint
```
