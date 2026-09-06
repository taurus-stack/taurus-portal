import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import fs from 'node:fs'

// ---------------------------------------------------------------------------
// Portal SEO plugin
//   1) Transform {{SITE_URL}} placeholders in index.html → absolute origin
//      from VITE_SITE_URL (or keep relative "/" when missing).
//   2) On closeBundle, rewrite dist/sitemap.xml + dist/robots.txt so they
//      contain absolute URLs — required by sitemap spec and preferred by
//      Google / Bing for cross-origin crawlers.
// ---------------------------------------------------------------------------
function portalSeoPlugin(siteUrlEnv: string | undefined): Plugin {
  const siteUrl = siteUrlEnv?.replace(/\/$/, '') ?? ''
  const todayIso = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  return {
    name: 'taurus-portal-seo',
    transformIndexHtml(html) {
      const replace1 = siteUrl ? siteUrl : ''
      const canonical = siteUrl ? `${siteUrl}/` : '/'
      const orgUrl = siteUrl || 'https://taurus-stack.github.io/taurus-portal'
      const logoUrl = siteUrl ? `${siteUrl}/favicon.ico` : '/favicon.ico'
      return html
        .replace(/\{\{SITE_URL\}\}/g, replace1)
        .replace(/(<link rel="canonical" href=")([^"]+)(")/, `$1${canonical}$3`)
        .replace(/"url":\s*"[^"]*"/, `"url": "${orgUrl}"`)
        .replace(/"logo":\s*"[^"]*"/, `"logo": "${logoUrl}"`)
    },
    closeBundle() {
      // --- 1) dist/sitemap.xml: absolutize + <lastmod> injection ---
      try {
        const srcPath = path.resolve('public/sitemap.xml')
        const outPath = path.resolve('dist/sitemap.xml')
        if (fs.existsSync(srcPath) && fs.existsSync(outPath)) {
          let content = fs.readFileSync(srcPath, 'utf-8')
          if (siteUrl) content = content.replace(/(<loc>)(\/[^<]*)(<\/loc>)/g, `$1${siteUrl}$2$3`)
          // Inject <lastmod> after every <priority>...</priority> line
          content = content.replace(
            /(<priority>[^<]+<\/priority>)\s*(<\/url>)/g,
            `$1\n    <lastmod>${todayIso}</lastmod>\n  $2`,
          )
          fs.writeFileSync(outPath, content, 'utf-8')
        }
      } catch (e) {
        this.warn(`[taurus-portal-seo] sitemap rewrite skipped: ${(e as Error).message}`)
      }
      // --- 2) dist/robots.txt: absolute Sitemap line ---
      try {
        const srcPath = path.resolve('public/robots.txt')
        const outPath = path.resolve('dist/robots.txt')
        if (fs.existsSync(srcPath) && fs.existsSync(outPath)) {
          let content = fs.readFileSync(srcPath, 'utf-8')
          const absoluteSitemap = siteUrl ? `${siteUrl}/sitemap.xml` : '/sitemap.xml'
          content = content.replace(/^Sitemap:\s*.*$/m, `Sitemap: ${absoluteSitemap}`)
          fs.writeFileSync(outPath, content, 'utf-8')
        }
      } catch (e) {
        this.warn(`[taurus-portal-seo] robots rewrite skipped: ${(e as Error).message}`)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_PORT || '8082')

  const FRAMEWORK_CHUNKS: Record<string, string[]> = {
    // Vue reactive runtime — typically ~48KB gz
    'vue-core': ['vue'],
    // Vue application layers — typically ~22KB gz each
    'vue-router': ['vue-router'],
    pinia: ['pinia'],
    'vue-i18n': ['vue-i18n'],
    // Head manager
    '@vueuse-head': ['@vueuse/head'],
  }
  // Chunk names that come out of manualChunks (framework + locale split).
  // Used by chunkFileNames to apply the deterministic <name>-[hash].js form.
  const LOCALE_CHUNKS = ['i18n-zh-cn', 'i18n-en', 'i18n-zh-tw'] as const
  const KNOWN_CHUNK_NAMES = new Set([...Object.keys(FRAMEWORK_CHUNKS), ...LOCALE_CHUNKS, 'index'])

  return {
    base: env.VITE_BASE || '/',
    plugins: [vue(), portalSeoPlugin(env.VITE_SITE_URL)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port,
      strictPort: false,
      open: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    build: {
      target: 'es2020',
      modulePreload: { polyfill: false },
      cssCodeSplit: true,
      sourcemap: mode !== 'production',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // ===== chunk strategy =====
          // Goal: split every heavy framework package into its own cache-friendly
          // file (can stay cached across portal app code bumps) while keeping the
          // business index chunk tight (<55KB gz).
          manualChunks(id) {
            // --- 1) Framework packages: split each into its own cacheable chunk ---
            const pkgMatch = id.match(
              /node_modules\/(?:\.pnpm\/[^/]+\/)?node_modules\/(@[^/]+\/[^/]+|[^/]+)/,
            )
            const pkg = pkgMatch ? pkgMatch[1] : undefined
            if (pkg) {
              for (const [name, pkgs] of Object.entries(FRAMEWORK_CHUNKS)) {
                if (pkgs.includes(pkg)) return name
              }
              if (pkg.startsWith('@vueuse')) return '@vueuse-head'
              return undefined
            }

            // --- 2) Locale sources (3 big message tables) split by language ---
            // Prevents ~40 KB of i18n text from inflating the main business
            // index.js on every code bump. Caching a locale-only chunk also
            // means translation-only updates don't invalidate the app chunk.
            const srcNorm = id.split('?')[0].replace(/\\/g, '/')
            const localesHit = srcNorm.match(/src\/i18n\/locales\/(zh-cn|en|zh-tw)\//)
            if (localesHit) return `i18n-${localesHit[1]}`

            return undefined
          },
          // Guarantee stable, deterministic file names for long-term cache +
          // predictable check-dist assertions.
          chunkFileNames: (chunkInfo) => {
            const n = chunkInfo.name
            if (n && KNOWN_CHUNK_NAMES.has(n)) return `assets/${n}-[hash].js`
            return 'assets/chunk-[name]-[hash].js'
          },
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  }
})
