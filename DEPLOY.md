# KID GHOUL — Deployment Guide

**Domain:** `https://www.kidghoul.com`  
**Description:** Kids & creative mess cleaning products

---

## Build

```bash
npm install
npm run build
```

Output: `dist/` (Vite static build)

## Deploy

### Cloudflare Pages (Recommended)

```bash
npx wrangler pages deploy dist --project-name=kidghoul-com --branch=main
```

### GitHub Actions

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml`.

### DNS

- `www.kidghoul.com` → CNAME → `kidghoul-com.pages.dev`
- `kidghoul.com` → CNAME → `kidghoul-com.pages.dev`

Managed in Cloudflare DNS.

---

*Part of the GHOULVERSE ecosystem. See root `DEPLOY.md` for ecosystem-wide deployment.*
