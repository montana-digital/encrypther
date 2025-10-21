# EncryptHer - Your Safety, Your Privacy, Your Power

![EncryptHer Logo](./public/images/encrypther-logo.png)

EncryptHer is a nonprofit organization dedicated to empowering women through comprehensive education on online privacy, personal safety, travel security, and digital advocacy.

## 🌟 About

EncryptHer provides essential education and resources to help women protect themselves online and offline. Our programs cover:

- **Online Privacy & Security** - Digital footprint protection, account security, data broker removal
- **Travel Safety** - Hidden camera detection, tracking device identification, travel privacy
- **Public Safety & Awareness** - Situational awareness, self-defense, personal safety strategies
- **Digital Advocacy** - Fighting for comprehensive federal privacy legislation and data protection rights

Founded by cybersecurity analyst Anastasiya, EncryptHer bridges the gap between cybersecurity education, personal safety, and empowerment.

## 🚀 Tech Stack

This website is built with modern web technologies for optimal performance and maintainability:

- **[Astro](https://astro.build)** - Static site generator for blazing-fast performance
- **[React](https://react.dev)** - UI components for interactive elements
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **Cloudflare Pages** - Deployment platform with edge network delivery

## 📁 Project Structure

```text
encrypther/
├── public/              # Static assets
│   ├── images/         # Images and graphics
│   ├── robots.txt      # Search engine crawling rules
│   ├── _headers        # Cloudflare Pages headers
│   └── manifest.json   # PWA manifest
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── sections/   # Page sections
│   ├── config/         # Configuration files
│   │   ├── seo.config.ts          # SEO metadata
│   │   ├── social-media.config.ts # Social media links
│   │   └── analytics.config.ts    # Analytics settings
│   ├── content/        # Content collections (markdown)
│   │   └── README.md   # Content editing guide
│   ├── layouts/        # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/          # File-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── online-privacy.astro
│   │   ├── travel-safety.astro
│   │   ├── public-safety.astro
│   │   ├── digital-advocacy.astro
│   │   └── contact.astro
│   ├── scripts/        # Client-side scripts
│   └── styles/         # Global styles
├── astro.config.mjs    # Astro configuration
├── tailwind.config.ts  # Tailwind configuration
└── package.json        # Dependencies
```

## 🧞 Development Commands

All commands are run from the `encrypther` directory:

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd encrypther
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### 3. Make Changes

The site will automatically reload when you edit files in `src/`.

### 4. Build for Production

```bash
npm run build
```

This generates optimized static files in the `dist/` directory.

## 🎨 Customization Guide

### Update SEO Settings

Edit `src/config/seo.config.ts` to customize meta tags, site title, description, and organization details.

```typescript
export const seoConfig = {
  siteName: 'EncryptHer',
  siteUrl: 'https://your-domain.com', // Update with your domain
  defaultTitle: 'EncryptHer - Your Safety, Your Privacy, Your Power',
  // ... more settings
};
```

### Configure Social Media

Edit `src/config/social-media.config.ts` to add or update social media links:

```typescript
twitter: {
  url: 'https://twitter.com/YOUR_HANDLE',
  enabled: true, // Set to true when account is created
},
```

Social media icons will automatically appear in the footer when enabled.

### Enable Analytics

Edit `src/config/analytics.config.ts`:

```typescript
googleAnalytics: {
  enabled: true, // Change to true
  measurementId: 'G-XXXXXXXXXX', // Add your GA4 ID
},
```

### Update Content

Content is organized in `src/content/`. See the [Content README](./src/content/README.md) for detailed instructions on how to edit content using Markdown.

## 🌐 Deployment

This site is designed to deploy seamlessly on Cloudflare Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output: `dist`
4. Set root directory: `encrypther`
5. Deploy!

Your site will be live at `https://encrypther-xxx.pages.dev`

## 🔍 SEO Features

This site includes comprehensive SEO optimization:

- ✅ Automatic sitemap generation
- ✅ Robots.txt configuration
- ✅ Structured data (JSON-LD) for search engines
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ Optimized meta descriptions for all pages
- ✅ Canonical URLs
- ✅ PWA manifest
- ✅ Security headers

## 📊 Performance

Optimized for Core Web Vitals:

- Static site generation for instant page loads
- Minimal JavaScript footprint
- Optimized images and assets
- CDN delivery via Cloudflare edge network
- Aggressive caching for static assets

Target Lighthouse scores: 90+ in all categories (Performance, Accessibility, Best Practices, SEO)

## 🎯 Features

- 🌙 Dark mode toggle with system preference detection
- 📱 Fully responsive design
- ♿ WCAG 2.1 accessibility compliant
- 🔒 Security headers configured
- 🚀 Optimized for Cloudflare Pages
- 📈 Google Analytics & Cloudflare Analytics ready
- 🎨 Matrix-inspired terminal animations
- 📧 Contact form ready (backend integration pending)

## 📝 Content Management

Non-technical editors can update content using Markdown files in the `src/content/` directory. Each page has its own content directory with well-documented frontmatter.

See [Content README](./src/content/README.md) for a complete guide.

## 🤝 Contributing

EncryptHer is a mission-driven organization. If you'd like to contribute to the codebase:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

© 2025 EncryptHer. All rights reserved.

## 🆘 Support

- **Website Issues:** Create an issue in this repository
- **General Inquiries:** info@encrypther.org
- **Media Inquiries:** media@encrypther.org

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages)

---

**Made with ❤️ for women's safety and empowerment**
