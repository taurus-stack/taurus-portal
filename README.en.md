# Taurus Stack · Portal

> Official marketing website / public portal for the **Taurus Stack** enterprise
> distributed operations platform.
>
> Built with **Vue 3 + TypeScript + Vite 5 + Pinia + Vue Router + vue-i18n + @vueuse/head**.
> Contact submissions are posted for real via `axios` to the taurus-backend
> `POST /api/taurus/contact-lead/` endpoint (the matching `ContactLead` Model,
> ViewSet and migration are shipped alongside taurus-backend in this repo).

---

## 1. Highlights (feature matrix)

| Layer        | Implementation                                                                                                                                                                                                                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework    | Vue 3.5 `<script setup lang="ts">` + Composition API                                                                                                                                                                                                                                                                                                                                       |
| Bundler      | Vite 5, `target:es2020`, `manualChunks` produces **11 cache-stable assets** (vue-core / vue-router / pinia / vue-i18n / @vueuse-head / axios / i18n-zh-cn / i18n-en / i18n-zh-tw / index + single CSS)                                                                                                                                                                                     |
| State        | Pinia 2 setup stores (`theme`, `locale`)                                                                                                                                                                                                                                                                                                                                                   |
| Routing      | Vue Router 4: 7 routes + 404 view + meta title sync + legacy `/#contact` anchor redirect                                                                                                                                                                                                                                                                                                   |
| i18n         | vue-i18n 9.14 — **3 locales × 8 split modules = 24 files**. Dual namespace (`homeSection` flat + `homeSections` nested) for P0/P1 backward compat. Top-level keys across the three languages are byte-identical in shape (Δ=0).                                                                                                                                                            |
| Theme        | 3-choice: `light` / `dark` / `system`. Live `prefers-color-scheme` listener + semantic-token CSS remap under `[data-theme='dark']` (brand colors are untouched; only surface/foreground/border/shadow semantic tokens flip). Switcher rendered in NavBar dropdown (desktop) and in the mobile-menu theme row.                                                                              |
| SEO          | Runtime `@vueuse/head` per-view `useHead`. **Static fallback** in `index.html` writes `<link rel=canonical>`, Organization JSON-LD and `<meta description/theme-color>` upfront — works for crawlers that skip JS execution. `public/sitemap.xml` lists 6 URLs, `public/robots.txt` declares the Sitemap.                                                                                  |
| Code quality | ESLint 9 flat (JS rec + TS rec non-type-info + Vue flat/recommended) + Prettier 3.4 + lint-staged 15.3 + simple-git-hooks 2.11 (pre-commit runs lint-staged).                                                                                                                                                                                                                              |
| Contact form | Real `axios` POST to `{VITE_API_BASE_URL}/taurus/contact-lead/`. UI numeric scale `1..5` is mapped to semantic keys `startup/small/mid/large/enterprise` at submit time. Requests that fail (network/CORS/offline) degrade to a 1.5 s mock success for a friendly UX. The _four_ contact-method cards (Phone / Email / IM / Address) stay **TODO placeholders** in About, per stage scope. |
| Backend      | Django 4.2 `ContactLead` table `taurus_contact_lead`. Migration `0015_contact_lead.py` is already generated. POST: `AllowAny` + 60/min/IP per-IP throttle. All other actions require an admin user.                                                                                                                                                                                        |
| Build gate   | `scripts/check-dist.mjs` — 8 hard assertions. CI must be green.                                                                                                                                                                                                                                                                                                                            |

**Build sizes (final after P2-7)**

| Chunk                                        | Raw      | Gzip                       |
| -------------------------------------------- | -------- | -------------------------- |
| index                                        | 52.5 KB  | **15.55 KB** (≤ 55 KB ✓)   |
| vue-core                                     | 74.2 KB  | **29.33 KB** (≤ 65 KB ✓)   |
| axios                                        | 51.4 KB  | **19.49 KB** (non-empty ✓) |
| CSS (single file)                            | 52.2 KB  | **9.45 KB** (≤ 12 KB ✓)    |
| i18n-zh-cn / en / zh-tw                      | 26–36 KB | 17.3 / 18.5 / 18.5 KB      |
| vue-router / pinia / vue-i18n / @vueuse-head | 4–64 KB  | 1.9–20.4 KB                |

---

## 2. Quick start

### 2.1 Requirements

- **Node.js** ≥ 20.x (docker build base: `node:20-alpine`)
- **pnpm** 10.x (`corepack prepare pnpm@latest-10 --activate`)
- **Python 3.12 (conda env `taurus`) + poetry**: only needed if you edit
  taurus-backend's `ContactLead` model or run its migrations.

### 2.2 Local development

```bash
cd taurus-portal

# 1) Install deps. On first run, approve build scripts for simple-git-hooks.
CI=true pnpm install

# 2) Register git hooks (also run automatically by postinstall)
pnpm hooks:install

# 3) Start dev (default port 8082, override via VITE_PORT in .env)
pnpm dev
# http://localhost:8082/
```

### 2.3 Production build

```bash
pnpm build                              # vue-tsc --noEmit + vite build
node scripts/check-dist.mjs             # distribution health gate
```

### 2.4 Contact form ↔ backend wiring

Two ways to connect:

**A. Same-origin reverse proxy (prod default)** — nginx forwards `/api` →
taurus-backend port 8000. Portal posts `POST /api/taurus/contact-lead/` out of
the box, nothing to configure.

**B. Split local dev (backend on :8000, portal on :8082)** — copy `.env.example`
to `.env.development.local` and set:

```dotenv
VITE_API_BASE_URL=http://localhost:8000/api
```

**Apply the migration (if 0015_contact_lead hasn't been run yet)**

```bash
cd ../taurus-backend
conda run -n taurus poetry run python manage.py migrate taurus
```

---

## 3. Scripts (at a glance)

```bash
pnpm dev                 # vite dev server
pnpm build               # TS check + production build
pnpm preview             # vite preview dist
pnpm type-check          # vue-tsc --noEmit
pnpm lint                # ESLint (warns are non-blocking, errors fail)
pnpm lint:fix            # ESLint --fix
pnpm format              # Prettier --write
pnpm format:check        # Prettier --check
pnpm hooks:install       # simple-git-hooks → writes pre-commit = lint-staged
pnpm check-dist          # scripts/check-dist.mjs — 8 build-health assertions
```

---

## 4. Repository layout

```
taurus-portal/
├── index.html                         # static SEO fallback title + canonical + Organization JSON-LD
├── vite.config.ts                     # manualChunks: framework pkgs + per-lang i18n splits
├── eslint.config.mjs                  # ESLint 9 flat (js rec + ts rec + vue rec)
├── .prettierrc.json / .prettierignore
├── .lintstagedrc.json / .simple-git-hooks.json
├── Dockerfile                         # node:20-alpine build + nginx:1.27-alpine serve + gate
├── nginx.conf                         # gzip + SPA fallback + asset cache-control
├── scripts/check-dist.mjs
├── public/{favicon.ico,robots.txt,sitemap.xml}
└── src/
    ├── main.ts                        # createApp(Pinia/Router/i18n/Head)
    ├── App.vue                        # router-view transition + IntersectionObserver reveal
    ├── router/index.ts                # 7 routes + 404 + meta.title sync + /#contact → /#contact
    ├── types/index.ts                 # global type declarations
    ├── utils/request.ts               # axios (VITE_API_BASE_URL || /api)
    ├── api/contact.ts                 # POST /taurus/contact-lead/ + offline mock fallback
    ├── stores/{locale,theme}.ts
    ├── styles/{variables,reset,global}.scss
    ├── i18n/{index.ts + {zh-cn,en,zh-tw}.ts + locales/<lang>/{8 modules}}
    ├── components/layout/{NavBar,Footer}.vue
    ├── components/sections/{Hero,Overview,Features,Architecture,
    │                          Solutions,Testimonials,ContactForm}.vue
    └── views/{Home,Product,Solutions,Docs,Download,About,NotFound}View.vue
```

---

## 5. Contact-method placeholders (scope note)

Per the v0.3.0 scope decision: **the four contact-method cards on the About
view (Phone / Email / IM / Address) remain TODO placeholder text** — no fake
phone numbers, emails, IM IDs or street addresses are filled in. The functional
contact entry point for real users remains the Contact Form on the home page,
which writes `ContactLead` rows to the backend for follow-up.

---

## 6. Docker deploy

```bash
# Build (cache-friendly: package.json first, then sources, layer reuse works)
docker build -t taurus-portal:0.3.0 .

# Run locally
docker run --rm -p 8080:80 --name tp taurus-portal:0.3.0
curl -I http://localhost:8080/             # 200 OK; contains canonical + JSON-LD
docker rm -f tp
```

---

## 7. License / compliance

- Portal code in this directory: AGPL-3.0-only (aligned with the LICENSE at the
  repo root).
- Third-party packages: see each package's own `LICENSE` / package metadata.

---

Before merging, always run the full validation loop (Karpathy "verify end-to-end"):

```bash
pnpm run type-check && pnpm run build && pnpm check-dist && pnpm lint
```
