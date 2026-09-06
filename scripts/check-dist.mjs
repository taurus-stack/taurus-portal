#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Taurus Portal — distribution health gate.
 *
 * Runs after `pnpm run build`. Assertions guard against regressions we have
 * explicitly introduced through P2. A non-zero exit code means the CI gate
 * fails and build artifacts should not be promoted.
 *
 * Checks performed (all byte thresholds are gzip-compressed — matches the
 * `reportCompressedSize: true` line that vite prints right after build):
 *   1. index.js must reference 'formsubmit.co' → proves the contact form
 *      submission API is wired (not tree-shaken as dead code).
 *   2. index.js gzip ≤ 55 KB — business logic stays small after splitting
 *      framework chunks.
 *   3. vue-core chunk gzip ≤ 65 KB — Vue 3.5.x expected size.
 *   4. Single CSS asset gzip ≤ 12 KB — SCSS design-system boundary.
 *   5. zh-cn / en / zh-tw i18n locale files (in dist/) key-count parity: top-
 *      level message keys across the three languages must differ by ≤ 5.
 *   6. dist/index.html must reference at least one <link rel=canonical> OR
 *      contain Organization JSON-LD → SEO artifacts are not stripped.
 *   7. dist/sitemap.xml exists and lists at least 5 <loc> entries.
 *   8. dist/sitemap.xml every <loc> either starts with http(s):// (absolute mode
 *      — when VITE_SITE_URL is set) or remains "/" relative, AND every entry
 *      has a fresh <lastmod> tag (YYYY-MM-DD) injected by the SEO plugin.
 *   9. dist/robots.txt declares Sitemap: and the target either is absolute
 *      when VITE_SITE_URL is set, or at minimum equals /sitemap.xml.
 */

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import process from 'node:process'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const ROOT = path.resolve(__dirname, '..')
const DIST = path.resolve(ROOT, 'dist')

// Mirror how vite.config.ts reads VITE_SITE_URL — so assertions can toggle
// between "absolute required" (VITE_SITE_URL set) and "relative allowed"
// (local / staging build, no VITE_SITE_URL).
let VITE_SITE_URL = (process.env.VITE_SITE_URL || '').trim()
if (!VITE_SITE_URL) {
  // Fallback: scan .env.* files in repo order.
  for (const f of ['.env.production', '.env', '.env.example']) {
    const fp = path.join(ROOT, f)
    if (!fs.existsSync(fp)) continue
    const match = fs
      .readFileSync(fp, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.match(/^\s*VITE_SITE_URL\s*=\s*(.*)$/))
      .find((m) => m)
    if (match) {
      VITE_SITE_URL = match[1].trim().replace(/^['"]|['"]$/g, '')
      break
    }
  }
}
const SITE_URL_ABSOLUTE = VITE_SITE_URL?.replace(/\/$/, '') ?? ''
const REQUIRE_ABSOLUTE = /^https?:\/\//i.test(SITE_URL_ABSOLUTE)

const PASS = '✓ PASS'
const FAIL = '✗ FAIL'

const failures = []
const passes = []

function check(name, fn) {
  try {
    fn()
    passes.push(name)
    console.log(`${PASS}  ${name}`)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    failures.push({ name, msg })
    console.log(`${FAIL}  ${name} — ${msg}`)
  }
}

/**
 * Map chunk path to its byte sizes. Returns { raw, gzip } where both are
 * integer bytes. We recompute gzip locally so this script runs on any
 * developer machine without relying on Vite's stdout text format.
 */
function sizes(p) {
  const buf = fs.readFileSync(p)
  const gz = zlib.gzipSync(buf, { level: 9 })
  return { raw: buf.byteLength, gzip: gz.byteLength }
}

function findAsset(pattern) {
  const assets = path.join(DIST, 'assets')
  if (!fs.existsSync(assets)) return null
  const entries = fs.readdirSync(assets)
  const hit = entries.find((e) => pattern.test(e))
  return hit ? path.join(assets, hit) : null
}

function kb(n) {
  return `${(n / 1024).toFixed(2)} KB`
}

// -------------------------- Preconditions ---------------------------
check('dist/ directory exists', () => {
  if (!fs.statSync(DIST).isDirectory()) throw new Error('missing dist/')
})

// -------------------------- 1. contact form wired -------------------
check('contact form FormSubmit integration present in bundle', () => {
  const p = findAsset(/^index-.*\.js$/)
  if (!p) throw new Error('no assets/index-*.js entry chunk')
  const src = fs.readFileSync(p, 'utf-8')
  if (!src.includes('formsubmit.co')) {
    throw new Error('index.js lacks formsubmit.co reference — contact form API may be tree-shaken')
  }
})

// -------------------------- 2. index.js tight -----------------------
check('index.js gzip ≤ 55 KB', () => {
  const p = findAsset(/^index-.*\.js$/)
  if (!p) throw new Error('no assets/index-*.js entry chunk')
  const { gzip } = sizes(p)
  if (gzip > 55 * 1024) throw new Error(`gzipped ${kb(gzip)} exceeds budget`)
})

// -------------------------- 3. vue-core gzip -----------------------
check('vue-core chunk gzip ≤ 65 KB', () => {
  const p = findAsset(/^vue-core-.*\.js$/)
  if (!p) throw new Error('no assets/vue-core-*.js — framework split misconfigured')
  const { gzip } = sizes(p)
  if (gzip > 65 * 1024) throw new Error(`gzipped ${kb(gzip)} exceeds budget`)
})

// -------------------------- 4. CSS payload -------------------------
check('CSS asset gzip ≤ 12 KB', () => {
  const assets = path.join(DIST, 'assets')
  const csses = fs.readdirSync(assets).filter((e) => e.endsWith('.css'))
  if (csses.length === 0) throw new Error('no .css produced')
  // Sum gzipped bytes across all split CSS assets.
  const total = csses.reduce((acc, f) => acc + sizes(path.join(assets, f)).gzip, 0)
  if (total > 12 * 1024) throw new Error(`all CSS gzipped ${kb(total)} exceeds budget`)
})

// -------------------------- 5. i18n locale parity ------------------
check('zh-cn / en / zh-tw locale key parity (Δ ≤ 5 top-level keys)', () => {
  // The P2-3 locale split uses a deterministic two-stage pattern per language:
  //   const zhCn = { common, nav, footer, hero, homeSections, contactForm, views,
  //                  homeSection: { ... 24 flat compat keys ... } }
  //   export default zhCn
  // Rather than parse TypeScript AST, we count top-level keys of the object
  // assigned to the identifier named by `export default <ID>` by walking
  // braces (depth=1) and counting commas. This is robust for the current
  // simple file shape; if the pattern changes this guard will fail noisily
  // (which is the desired behavior for an anti-regression script).
  const src = path.resolve(ROOT, 'src/i18n/locales')
  const counts = new Map()
  for (const lang of ['zh-cn', 'en', 'zh-tw']) {
    const idx = path.join(src, lang, 'index.ts')
    const txt = fs.readFileSync(idx, 'utf8')

    // Step 1: resolve the default-export identifier
    const defaultMatch = txt.match(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;?\s*$/)
    const defaultId = defaultMatch ? defaultMatch[1] : null
    let objStart = -1
    if (defaultId) {
      // Step 2a: find `const <defaultId> = {`
      const re = new RegExp(`const\\s+${defaultId}\\s*=\\s*\\{`, 'm')
      const m = txt.match(re)
      if (m && typeof m.index === 'number') objStart = m.index + m[0].length
    } else {
      // Step 2b: fallback to inline `export default {` (previous file shape)
      const m = txt.match(/export\s+default\s*\{/)
      if (m && typeof m.index === 'number') objStart = m.index + m[0].length
    }
    if (objStart < 0) {
      throw new Error(`${lang}/index.ts: cannot locate default-exported object`)
    }

    let i = objStart
    let depth = 1
    let inStr = null
    let commaAtOne = 0
    while (i < txt.length && depth > 0) {
      const ch = txt[i]
      const prev = txt[i - 1] ?? ''
      if (inStr) {
        if (ch === inStr && prev !== '\\') inStr = null
      } else if (ch === '"' || ch === "'" || ch === '`') {
        inStr = ch
      } else if (ch === '{' || ch === '[') {
        depth++
      } else if (ch === '}' || ch === ']') {
        depth--
      } else if (ch === ',' && depth === 1) {
        commaAtOne++
      }
      i++
    }
    counts.set(lang, commaAtOne + 1)
  }
  const min = Math.min(...counts.values())
  const max = Math.max(...counts.values())
  const delta = max - min
  const summary = [...counts.entries()].map(([k, v]) => `${k}=${v}`).join(', ')
  if (delta > 5) {
    throw new Error(`Δ=${delta} exceeds threshold (${summary})`)
  }
  console.log(`       · locale key counts: ${summary} (Δ=${delta})`)
})

// -------------------------- 6. SEO artifacts in index.html ---------
check('dist/index.html has SEO (canonical or JSON-LD Organization)', () => {
  const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
  const hasCanonical = /<link[^>]+rel=["']canonical["']/.test(html)
  const hasOrgLd = /application\/ld\+json[^>]*>[\s\S]*Organization/.test(html)
  if (!hasCanonical && !hasOrgLd) {
    throw new Error('index.html lacks canonical link AND Organization JSON-LD')
  }
  console.log(
    `       · canonical=${hasCanonical ? 'yes' : 'no'} · organization-ld=${hasOrgLd ? 'yes' : 'no'}`,
  )
})

// -------------------------- 7. sitemap breadth ---------------------
check('sitemap.xml lists ≥ 5 <loc> entries', () => {
  const p = path.join(DIST, 'sitemap.xml')
  if (!fs.existsSync(p)) throw new Error('dist/sitemap.xml missing (copy from public/)')
  const xml = fs.readFileSync(p, 'utf8')
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
  if (entries.length < 5) {
    throw new Error(`only ${entries.length} <url> entries; expect ≥5 (home + 5 inner pages)`)
  }
  const n = entries.length
  console.log(`       · sitemap lists ${n} URLs`)
})

// -------------------------- 8. sitemap format: lastmod + (opt) absolute
check('sitemap.xml each <url> has <lastmod> and correct absolute mode', () => {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8')
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
  if (entries.length === 0) throw new Error('no <url> entries at all')
  const dateRe = /^\d{4}-\d{2}-\d{2}$/
  let absCount = 0
  let relCount = 0
  for (const block of entries) {
    const locMatch = block.match(/<loc>\s*(\S+)\s*<\/loc>/)
    const lastmodMatch = block.match(/<lastmod>\s*(\S+)\s*<\/lastmod>/)
    if (!locMatch) throw new Error('entry missing <loc>')
    if (!lastmodMatch) throw new Error('entry missing <lastmod> (SEO plugin hook may have been skipped)')
    if (!dateRe.test(lastmodMatch[1])) {
      throw new Error(`<lastmod> malformed: ${lastmodMatch[1]}`)
    }
    const loc = locMatch[1]
    if (/^https?:\/\//i.test(loc)) absCount++
    else if (loc.startsWith('/')) relCount++
    else throw new Error(`<loc> neither absolute nor root-relative: ${loc}`)
  }
  if (REQUIRE_ABSOLUTE) {
    if (relCount > 0) {
      throw new Error(
        `VITE_SITE_URL=${SITE_URL_ABSOLUTE} requires all <loc> absolute, but ${relCount} still relative`,
      )
    }
    if (!absCount) throw new Error('zero absolute <loc> entries; SEO plugin rewrite did not run?')
  }
  console.log(
    `       · lastmod=YYYY-MM-DD present in all ${entries.length} entries; absolute mode=${REQUIRE_ABSOLUTE ? 'YES' : 'no (VITE_SITE_URL unset)'}`,
  )
})

// -------------------------- 9. robots.txt Sitemap row ----------------
check('robots.txt declares Sitemap: (absolute when VITE_SITE_URL set)', () => {
  const p = path.join(DIST, 'robots.txt')
  if (!fs.existsSync(p)) throw new Error('dist/robots.txt missing')
  const txt = fs.readFileSync(p, 'utf8')
  const m = txt.match(/^Sitemap:\s*(\S+)\s*$/im)
  if (!m) throw new Error('missing "Sitemap:" line')
  const target = m[1]
  if (REQUIRE_ABSOLUTE) {
    const expected = `${SITE_URL_ABSOLUTE}/sitemap.xml`
    if (target !== expected) {
      throw new Error(`expected Sitemap: ${expected}, got ${target}`)
    }
  } else {
    if (target !== '/sitemap.xml' && !/^https?:\/\//i.test(target)) {
      throw new Error(`Sitemap: ${target} — expected "/sitemap.xml" relative (no VITE_SITE_URL)`)
    }
  }
  console.log(`       · Sitemap line: ${target}`)
})

// -------------------------- Summary --------------------------------
console.log('')
console.log(`Passed: ${passes.length} / ${passes.length + failures.length}`)
if (failures.length) {
  console.log(`Failed: ${failures.length}`)
  for (const f of failures) console.log(`  - ${f.name}: ${f.msg}`)
  process.exit(1)
}
console.log('All distribution-health checks green.')