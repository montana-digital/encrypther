# EncryptHer Design Patterns & Component Architecture

**Last Updated:** Phase 6 - Homepage Complete  
**Purpose:** Ensure consistency across all pages and maintain the EncryptHer brand identity

---

## Core Design Principles

### Visual Identity
- **Primary Color:** Purple (`hsl(280 70% 45%)`) - Used for main brand elements, primary buttons, links
- **Accent Color:** Pink (`hsl(320 65% 55%)`) - Used for highlights, secondary CTAs, hover states
- **Gradient Overlays:** `from-primary/40 via-background/80 to-accent/40` for hero backgrounds
- **Gradient CTAs:** `from-primary to-accent` for call-to-action sections

### Typography Hierarchy
- **H1 (Hero):** `text-4xl md:text-5xl lg:text-6xl font-bold` 
- **H2 (Section):** `text-3xl md:text-4xl font-bold`
- **H3 (Card Title):** `text-xl md:text-2xl font-semibold`
- **Body:** `text-base` for main content, `text-lg` for important descriptions
- **Small:** `text-sm` for card descriptions, `text-xs` for badges

### Spacing Standards
- **Section Padding:** `py-20 px-4` for all major sections
- **Container:** `container mx-auto max-w-6xl` (standard), `max-w-4xl` (narrow)
- **Card Padding:** `p-6` for all cards
- **Element Gaps:** `gap-6` for grids, `gap-4` for button groups, `gap-2` for small items

---

## Component Patterns

### 1. Hero Component

**When to use:** Top of every page except 404

**Standard Pattern:**
```astro
<Hero
  title="Main Heading <span class='text-primary'>Highlighted Text</span>"
  subtitle="Descriptive paragraph that explains the page purpose"
  badge="Category or Context Badge"
  badgeIcon='<svg>...</svg>'
  backgroundImage="/images/hero-image.jpg"
  primaryCTA={{
    text: "Primary Action",
    href: "#section-id"
  }}
  secondaryCTA={{
    text: "Secondary Action", 
    href: "/page"
  }}
/>
```

**Rules:**
- Always include title and subtitle
- Background images should have 30% opacity with gradient overlay
- Badge text should be descriptive (e.g., "Empowering Women Through Digital Safety")
- Primary CTA is solid button, secondary is outlined

---

### 2. Card Component

**Usage:** Feature cards, program cards, advocacy cards, content blocks

#### Pattern A: Feature Card (Default Layout)
**When:** Simple feature listings, benefits, values

```astro
<Card>
  <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
    <svg class="h-6 w-6 text-primary">...</svg>
  </div>
  <h3 class="text-xl font-semibold mb-2 text-foreground">Feature Title</h3>
  <p class="text-muted-foreground text-sm">Description text here</p>
</Card>
```

#### Pattern B: Program/Course Card  
**When:** Displaying courses, programs, clickable content with images

```astro
<Card
  href="/page-url"
  image="/images/card-image.jpg"
  imageAlt="Descriptive alt text"
>
  <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
    <svg class="h-6 w-6 text-primary">...</svg>
  </div>
  <h3 class="text-xl font-semibold mb-2 text-foreground">Card Title</h3>
  <p class="text-sm text-muted-foreground mb-3">
    📊 Statistic or key fact
  </p>
  <p class="text-sm text-muted-foreground">
    Main description content
  </p>
</Card>
```

#### Pattern C: Advocacy/Feature Card (Icon + Badge Layout)
**When:** Important content blocks with badge and icon, featured sections

```astro
<Card
  href="/page-url"
  image="/images/card-image.jpg"
  imageAlt="Descriptive alt text"
  badge="Initiative"
  iconPosition="center"
  icon='<svg>...</svg>'
  iconColor="primary"
>
  <h3 class="text-2xl font-semibold mb-3 text-foreground">Title</h3>
  <p class="text-base text-muted-foreground mb-4">
    First paragraph with important info
  </p>
  <p class="text-sm text-muted-foreground">
    Additional details
  </p>
</Card>
```

**Card Rules:**
- Images are always 48 height (`h-48`) with `object-cover`
- Icon backgrounds: `bg-primary/10` or `bg-accent/10` with `rounded-lg`
- Icons: `h-6 w-6` inside `h-12 w-12` containers
- Always include hover effect: `hover:shadow-lg transition-shadow`
- When iconPosition="center": icon left, badge right, flexbox layout

---

### 3. CTA (Call-to-Action) Component

**When to use:** End of every major page, after important sections

**Pattern:**
```astro
<CTA
  title="Compelling Call to Action"
  description="Supporting text that motivates action"
  primaryButton={{
    text: "Main Action",
    href: "/action-page"
  }}
  secondaryButton={{
    text: "Alternative Action",
    href: "/secondary-page"
  }}
/>
```

**Rules:**
- Default has gradient background (`gradient=true`)
- Title should be action-oriented
- Always include both buttons when possible
- Primary button is white on gradient, secondary is outlined

---

### 4. Section Layouts

#### Two-Column Feature Grid
**When:** "What We Do" type sections, benefits, values

```astro
<section class="py-20 px-4 bg-background">
  <div class="container mx-auto max-w-6xl">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-foreground">Section Title</h2>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        Section description
      </p>
    </div>

    <FeatureGrid columns={2} class="max-w-4xl mx-auto">
      <Card>...</Card>
      <Card>...</Card>
    </FeatureGrid>
  </div>
</section>
```

#### Three-Column Program Grid
**When:** Courses, programs, main offerings

```astro
<section class="py-20 px-4 bg-muted/50">
  <div class="container mx-auto max-w-6xl">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-foreground">Programs</h2>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        Description
      </p>
    </div>

    <FeatureGrid columns={3}>
      <Card href="/page1">...</Card>
      <Card href="/page2">...</Card>
      <Card href="/page3">...</Card>
    </FeatureGrid>
  </div>
</section>
```

#### Featured Content Section
**When:** Advocacy, special initiatives, highlighted content

**IMPORTANT:** Everything must be in ONE single card - image, icon, badge, and all content together.

```astro
<section class="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
  <div class="container mx-auto max-w-4xl">
    <!-- Centered section header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-foreground">Section Title</h2>
      <p class="text-lg text-muted-foreground">Description</p>
    </div>

    <!-- Single card with all content -->
    <Card
      href="/page"
      image="/images/featured.jpg"
      badge="Initiative"
      iconPosition="center"
      icon='<svg class="h-6 w-6">...</svg>'
      iconColor="primary"
    >
      <h3 class="text-2xl font-semibold mb-3 text-foreground">Card Title</h3>
      <p class="text-base text-muted-foreground mb-4">
        Main content paragraph
      </p>
      <p class="text-sm text-muted-foreground">
        Additional details
      </p>
    </Card>
  </div>
</section>
```

**Visual Result:** One white card containing:
1. Image at top (full width, h-48)
2. Icon (left) and Badge (right) in same row
3. Title and content below
4. Everything centered on page with max-w-4xl container

---

## Background Patterns

### Section Backgrounds (Alternate for Visual Rhythm)
- **White/Default:** `bg-background`
- **Light Gray:** `bg-muted/50`  
- **Gradient Accent:** `bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5`
- **CTA Gradient:** `bg-gradient-to-br from-primary to-accent`

**Pattern Rule:** Alternate between white and light gray for consecutive sections

---

## Icon System

### Icon Sources
- Using inline SVG with Heroicons styling
- Icons are stroke-based, not filled
- Standard size: `h-6 w-6`
- Stroke width: `stroke-width="2"`

### Icon Colors
- **Primary icons:** Use on primary features, main programs
- **Accent icons:** Use for secondary features, alternating with primary

### Icon Container Standards
```html
<div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
  <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="..." />
  </svg>
</div>
```

---

## Image Guidelines

### Sizes & Formats
- **Hero Images:** 1920x1080, JPG, optimized to <300KB
- **Card Images:** 800x600, JPG, optimized to <200KB  
- **Logo:** PNG with transparency
- All images in `/public/images/` directory

### Alt Text Rules
- Describe what's happening in the image
- Include context about why it's relevant
- Example: "Woman practicing situational awareness in public urban space"

### Image Object Positioning
- Default: `object-cover object-center`
- Special positioning: `object-[center_99%]` when face/subject needs vertical adjustment

---

## Responsive Breakpoints

```css
/* Mobile-first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1400px /* Large desktops (container max) */
```

### Responsive Typography Pattern
- Base mobile, then `md:` for tablet, `lg:` for desktop
- Example: `text-4xl md:text-5xl lg:text-6xl`

### Responsive Grids Pattern
- Always start with `grid-cols-1`
- Add `md:grid-cols-2` for tablet
- Add `lg:grid-cols-3` for desktop when 3-column layout
- Example: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## Hover States & Transitions

### Standard Transitions
```css
transition-colors  /* For text/background color changes */
transition-shadow  /* For shadow effects */
transition-smooth  /* Custom 300ms cubic-bezier (use for multiple properties) */
```

### Card Hover Pattern
```astro
class="hover:shadow-lg transition-shadow"
```

### Link/Button Hover Pattern
```astro
class="hover:bg-primary/90 transition-colors"
class="hover:text-foreground transition-colors"
```

---

## Common Mistakes to Avoid

### ❌ DON'T:
- Use arbitrary Tailwind values without theme variables
- Mix px and rem units inconsistently
- Create custom gradients outside the defined patterns
- Use inline styles instead of Tailwind classes
- Skip mobile-first responsive design
- Forget hover states on interactive elements
- Use images without alt text
- Put icon and badge in separate containers when they should flex together

### ✅ DO:
- Use theme color variables (`bg-primary`, `text-accent`)
- Follow mobile-first with `md:` and `lg:` breakpoints
- Use defined gradient patterns consistently
- Test on mobile, tablet, and desktop
- Add hover effects to all clickable elements
- Optimize all images before adding
- Use semantic HTML (proper heading hierarchy)
- Use iconPosition="center" for advocacy/feature cards with badges

---

## Page Template Structure

Every page should follow this structure:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Card from '../components/Card.astro';
import CTA from '../components/CTA.astro';
import FeatureGrid from '../components/sections/FeatureGrid.astro';
---

<BaseLayout
  title="Page Title - EncryptHer"
  description="SEO-friendly description"
>
  <!-- Hero Section -->
  <Hero ... />

  <!-- Section 1 (white background) -->
  <section class="py-20 px-4 bg-background">
    ...
  </section>

  <!-- Section 2 (gray background) -->
  <section class="py-20 px-4 bg-muted/50">
    ...
  </section>

  <!-- Section 3 (gradient background) -->
  <section class="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
    ...
  </section>

  <!-- CTA Section -->
  <CTA ... />
</BaseLayout>
```

---

## Quick Reference Checklist

When creating a new page, ensure:

- [ ] Hero section with proper title and background
- [ ] Sections alternate between white/gray/gradient backgrounds
- [ ] All sections use `py-20 px-4` padding
- [ ] Container uses `mx-auto` with appropriate `max-w-*`
- [ ] Text center with `mb-12` for section headers
- [ ] Cards have hover effects
- [ ] Icons use standard 12x12 containers with 6x6 icons
- [ ] Images have descriptive alt text
- [ ] Responsive classes follow mobile-first pattern
- [ ] CTA section at the end
- [ ] All links have hover states
- [ ] Colors use theme variables, not arbitrary values

---

**Remember:** Consistency is key to maintaining the professional EncryptHer brand. When in doubt, refer to the homepage as the gold standard implementation.

