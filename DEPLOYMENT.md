# EncryptHer - Deployment Guide

This guide walks you through deploying the EncryptHer website to Cloudflare Pages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Deploy](#quick-deploy)
- [Build Configuration](#build-configuration)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)
- [Analytics Configuration](#analytics-configuration)
- [SEO Configuration](#seo-configuration)
- [Social Media Setup](#social-media-setup)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- GitHub account with repository access
- Cloudflare account (free tier works great)
- Node.js 18+ installed locally (for testing builds)

## Quick Deploy

### Step 1: Connect GitHub to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select the EncryptHer repository

### Step 2: Configure Build Settings

Use these exact settings:

```
Build command: npm run build
Build output directory: dist
Root directory: encrypther
Node version: 18 (or latest LTS)
```

**Important:** Set the root directory to `encrypther` since this is the Astro project directory.

### Step 3: Deploy

1. Click **Save and Deploy**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://encrypther-xxx.pages.dev`

## Build Configuration

### Build Command

```bash
npm run build
```

This runs Astro's static site generator and outputs to the `dist/` directory.

### Build Output Directory

```
dist
```

All static files (HTML, CSS, JS, images) are output here.

### Environment Detection

The site automatically detects the environment:
- `import.meta.env.PROD` - true in production builds
- `import.meta.env.DEV` - true in development

Analytics and certain features only activate in production.

## Environment Variables

### Required Variables

None required for basic deployment! The site works out of the box.

### Optional Variables

If you want to customize analytics or other features, add these in **Settings → Environment variables**:

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID | `G-XXXXXXXXXX` |
| `PUBLIC_SITE_URL` | Production domain | `https://encrypther.org` |

**Note:** All public environment variables must be prefixed with `PUBLIC_` to be accessible in Astro.

## Custom Domain Setup

### When You Have a Domain

1. Go to your Cloudflare Pages project
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `encrypther.org` or `www.encrypther.org`)
5. Follow the DNS setup instructions

### Update Site Configuration

Once your custom domain is active, update the site URL:

1. Edit `src/config/seo.config.ts`
2. Change `siteUrl` from `https://encrypther.pages.dev` to your domain
3. Edit `astro.config.mjs`
4. Change `site` from `https://encrypther.pages.dev` to your domain
5. Commit and push changes

```typescript
// seo.config.ts
siteUrl: 'https://encrypther.org', // Your actual domain

// astro.config.mjs
site: 'https://encrypther.org',
```

## Analytics Configuration

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Edit `src/config/analytics.config.ts`:

```typescript
googleAnalytics: {
  enabled: true, // Change to true
  measurementId: 'G-XXXXXXXXXX', // Your actual ID
  enableInDev: false,
},
```

4. Commit and deploy

### Cloudflare Web Analytics

Automatically enabled on Cloudflare Pages! View stats in your Cloudflare Dashboard under **Analytics → Web Analytics**.

To enable in your code:

```typescript
// src/config/analytics.config.ts
cloudflareAnalytics: {
  enabled: true, // Change to true
  enableInDev: false,
},
```

## SEO Configuration

### Update Site Metadata

Edit `src/config/seo.config.ts` to customize:

```typescript
export const seoConfig = {
  siteName: 'EncryptHer',
  siteUrl: 'https://your-domain.com', // Update when you have custom domain
  defaultTitle: 'EncryptHer - Your Safety, Your Privacy, Your Power',
  defaultDescription: '...',
  author: 'Anastasiya, Cybersecurity Analyst',
  keywords: [...], // Add more relevant keywords
  organization: {
    email: 'info@encrypther.org',
    telephone: '+1-XXX-XXX-XXXX', // Add when available
    // Add physical address when available
  }
};
```

### Verify Sitemap

After deployment, verify your sitemap is accessible:
- Visit: `https://your-site.pages.dev/sitemap-index.xml`
- Should show XML sitemap with all pages

### Submit to Search Engines

1. **Google Search Console**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your property
   - Submit your sitemap URL
   - Verify ownership via DNS or HTML file

2. **Bing Webmaster Tools**
   - Go to [bing.com/webmasters](https://www.bing.com/webmasters)
   - Add your site
   - Submit sitemap

## Social Media Setup

### Configure Social Media Links

Edit `src/config/social-media.config.ts`:

```typescript
export const socialMediaConfig = {
  twitter: {
    url: 'https://twitter.com/YOUR_HANDLE',
    handle: '@YOUR_HANDLE',
    enabled: true, // Change to true when account is created
    // ...
  },
  facebook: {
    url: 'https://facebook.com/YOUR_PAGE',
    enabled: true, // Change to true when page is created
    // ...
  },
  // Update other platforms as needed
};
```

### Update Twitter Handle in SEO Config

Once you have a Twitter account, update `seo.config.ts`:

```typescript
twitterHandle: '@EncryptHer', // Uncomment and add your handle
```

This adds Twitter Card meta tags with your handle.

## Post-Deployment Checklist

Use this checklist after each deployment:

### Functionality
- [ ] All pages load correctly
- [ ] Dark mode toggle works
- [ ] Mobile menu works
- [ ] All links work (no 404s)
- [ ] Contact form displays (even if not functional yet)
- [ ] Images load properly

### SEO
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] View page source - meta tags present
- [ ] Test Open Graph: [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Test Twitter Card: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- [ ] Structured data valid: [validator.schema.org](https://validator.schema.org/)

### Performance
- [ ] Run Lighthouse audit (aim for 90+ in all categories)
  - Open Chrome DevTools
  - Go to Lighthouse tab
  - Generate report
- [ ] Check page load speed on mobile
- [ ] Test on slow 3G connection

### Security
- [ ] HTTPS enabled (automatic on Cloudflare Pages)
- [ ] Security headers present (check with [securityheaders.com](https://securityheaders.com))
- [ ] No mixed content warnings

### Analytics
- [ ] Google Analytics tracking (if enabled)
- [ ] Cloudflare Analytics showing data
- [ ] No console errors in browser

## Troubleshooting

### Build Fails

**Error:** `Module not found`

**Solution:** Make sure all dependencies are in `package.json` and run `npm install` locally to test.

**Error:** `Cannot find module '@astrojs/sitemap'`

**Solution:** The sitemap package is installed. Clear cache:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Sitemap Not Generating

**Check:** Is the `site` field set in `astro.config.mjs`?

```javascript
site: 'https://encrypther.pages.dev', // Must be set for sitemap
```

### Images Not Loading

**Check:** Are images in the `/public` directory?
- Images should be at `public/images/`
- Referenced as `/images/filename.jpg` in code

### 404 Errors on Page Refresh

This shouldn't happen with Cloudflare Pages, but if it does:
- Check `build.format` in `astro.config.mjs` is set to `'file'`
- Verify `output: 'static'` is set

### Dark Mode Not Working

**Check:** Is JavaScript enabled in browser?
- Dark mode toggle uses client-side JavaScript
- Check browser console for errors

### Social Media Icons Not Showing

**Check:** `src/config/social-media.config.ts`
- Ensure `enabled: true` for platforms you want to show
- At least one platform must be enabled to show the social section

## Continuous Deployment

Every commit to your repository's main branch triggers an automatic deployment:

1. Push changes to GitHub
2. Cloudflare automatically builds and deploys
3. Build takes 2-3 minutes
4. New version is live

### Preview Deployments

Pull requests get their own preview URL:
- Every PR creates a unique preview
- Perfect for testing before merging
- Preview URL: `https://xxxxxx.encrypther-xxx.pages.dev`

## Getting Help

- **Cloudflare Docs:** [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)
- **Astro Docs:** [docs.astro.build](https://docs.astro.build)
- **Issues:** Open an issue in the GitHub repository

---

**Need help?** Contact the development team or create an issue in the repository.

