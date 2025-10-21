# EncryptHer Visual Enhancement Plan

## Overview
Progressive enhancement approach: Site works perfectly without JavaScript, animations enhance the experience when available.

## Phase 1: Dark Mode Implementation ✅ PRIORITY
**Timeline: Quick Win (30 minutes)**

### Components to Create:
1. **DarkModeToggle.astro** - Toggle button component
2. **theme-switcher.ts** - Client-side script for theme management

### Implementation Strategy:
- Use Tailwind's `class` dark mode strategy
- Store preference in `localStorage`
- Apply `dark:` classes throughout existing components
- Sun/Moon icon toggle button in header
- Smooth transition between modes

### Files to Modify:
- `tailwind.config.ts` - Enable dark mode
- `src/components/Header.astro` - Add toggle button
- `src/layouts/BaseLayout.astro` - Add dark mode script
- `src/styles/global.css` - Add transition styles

---

## Phase 2: Glitch Effect on Initial Load
**Timeline: Medium Priority (1-2 hours)**

### Effect Description:
- Logo and "Your Safety, Your Privacy, Your Power" text appear with cyberpunk-style glitch effect
- Plays ONCE on page load/refresh
- Duration: ~1.5-2 seconds total
- Falls back to normal fade-in if JS disabled

### Technical Approach:
```
CSS Keyframes Animation:
- @keyframes glitch (text distortion, color shift, clip-path)
- @keyframes glitch-logo (scale, opacity, filter effects)

JavaScript Enhancement (client:load):
- Detect first visit/refresh
- Add .glitch-animate class to trigger animation
- Remove class after completion
- Store flag in sessionStorage (per-session, not persistent)

Fallback:
- CSS fade-in animation (no JS required)
- Progressive enhancement principle
```

### Files to Create:
- `src/components/GlitchText.astro` - Wrapper component for glitch effect
- `src/scripts/glitch-effect.ts` - Animation orchestration

### Files to Modify:
- `src/components/Hero.astro` - Wrap logo and tagline
- `src/styles/global.css` - Add glitch keyframes

---

## Phase 3: Scroll-Based Animations
**Timeline: Medium Priority (1-2 hours)**

### Effect Description:
- Subtle animations as sections enter viewport
- Much gentler than initial glitch
- Effects:
  - Fade-in + slight slide up
  - Very subtle scale (1.0 → 1.02)
  - Gentle opacity shift
  - NO glitch effect (too intense for scroll)

### Technical Approach:
```
Intersection Observer API:
- Observe sections as they enter viewport
- Add .scroll-animate class when visible
- Threshold: 0.1 (trigger when 10% visible)
- rootMargin: "0px 0px -100px 0px" (trigger slightly before)

CSS Transitions:
- transform: translateY(20px) opacity 0 → translateY(0) opacity 1
- transition: all 0.6s ease-out
- Will-change: transform, opacity (performance)

Fallback:
- Elements visible by default (no JS needed)
- CSS-only subtle transitions
```

### Files to Create:
- `src/scripts/scroll-animations.ts` - Intersection Observer setup
- `src/components/AnimatedSection.astro` - Wrapper component

### Files to Modify:
- Page components that need scroll animations
- `src/styles/global.css` - Animation classes

---

## Animation Specifications

### Initial Glitch Effect (Logo + Tagline):
```css
Duration: 1.5s
Timing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
Effects:
  - RGB color split (offset by 2-5px)
  - Horizontal clip distortion
  - Brief opacity flicker
  - Subtle scale variation (0.98 → 1.02)
  - Text shadow with color shift
```

### Scroll Animations (Sections):
```css
Duration: 0.6s
Timing: ease-out
Effects:
  - translateY: 20px → 0
  - opacity: 0 → 1
  - Optional: scale: 0.98 → 1.0
  - Stagger delay: 0.1s between elements
```

---

## Progressive Enhancement Checklist

✅ **No JavaScript Fallback:**
- Page loads and displays all content normally
- Basic CSS transitions provide polish
- No layout shift or broken functionality

✅ **JavaScript Enhancement:**
- Glitch effect adds visual impact
- Scroll animations improve engagement
- localStorage persists dark mode preference

✅ **Performance Considerations:**
- Use `will-change` sparingly
- Remove animation classes after completion
- Intersection Observer is passive (no scroll listener)
- CSS animations use GPU acceleration

---

## Implementation Order

1. **Dark Mode** (Quick win - do first)
   - Immediate visual enhancement
   - Simple to implement
   - High user value

2. **Glitch Effect** (Medium complexity)
   - High visual impact
   - Defines site personality
   - One-time on load (low performance cost)

3. **Scroll Animations** (Medium complexity)
   - Subtle engagement boost
   - Builds on glitch effect learnings
   - Can be refined incrementally

---

## Testing Checklist

- [ ] Test with JavaScript disabled (noscript fallback)
- [ ] Test dark mode persistence across page navigation
- [ ] Test glitch effect doesn't replay on every route change
- [ ] Test scroll animations on mobile devices
- [ ] Test performance with Chrome DevTools (FPS, repaints)
- [ ] Test accessibility (reduced motion preference)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)

---

## Accessibility Considerations

**Respect User Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Dark Mode Accessibility:**
- Maintain WCAG AA contrast ratios in both modes
- Test with screen readers
- Ensure focus indicators visible in both modes

