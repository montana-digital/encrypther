# EncryptHer Testing Suite

Comprehensive testing suite for UI/UX validation, accessibility, performance, SEO, and user experience.

## Test Structure

```
tests/
├── e2e/              # End-to-end user flow tests
├── accessibility/    # WCAG 2.1 AA compliance tests
├── performance/      # Core Web Vitals and performance tests
├── seo/             # SEO meta tags and structured data tests
├── visual/          # Visual regression and screenshot tests
├── utils/           # Test helper utilities
└── fixtures/        # Test data and constants
```

## Quick Start

### Prerequisites

1. Build the site first:
   ```bash
   npm run build
   ```

2. Install Playwright browsers (if not already installed):
   ```bash
   npx playwright install
   ```

### Running Tests

**Run all tests:**
```bash
npm run test
```

**Run specific test suites:**
```bash
npm run test:e2e          # E2E tests only
npm run test:a11y         # Accessibility tests
npm run test:performance  # Performance tests
npm run test:seo          # SEO tests
npm run test:visual       # Visual regression tests
```

**Interactive mode (UI):**
```bash
npm run test:ui
```

**Debug mode:**
```bash
npm run test:debug
```

**Headed mode (see browser):**
```bash
npm run test:headed
```

## Test Categories

### E2E Tests (`tests/e2e/`)

- **navigation.spec.ts** - Navigation links, mobile menu, footer links
- **homepage.spec.ts** - Homepage content, sections, cards, CTAs
- **pages.spec.ts** - All pages render correctly
- **forms.spec.ts** - Contact form validation and interactions
- **dark-mode.spec.ts** - Dark mode toggle functionality
- **mobile-menu.spec.ts** - Mobile menu behavior

### Accessibility Tests (`tests/accessibility/`)

- **a11y.spec.ts** - WCAG 2.1 AA compliance using axe-core
- **keyboard-navigation.spec.ts** - Keyboard accessibility

### Performance Tests (`tests/performance/`)

- **core-web-vitals.spec.ts** - LCP, FID, CLS, TTFB measurements

### SEO Tests (`tests/seo/`)

- **meta-tags.spec.ts** - Title tags, meta descriptions, Open Graph, Twitter Cards
- **structured-data.spec.ts** - JSON-LD schema validation

### Visual Tests (`tests/visual/`)

- **screenshot.spec.ts** - Visual regression screenshots

## Performance Budgets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 800ms
- **Page Load**: < 3s

## Writing New Tests

### Example E2E Test

```typescript
import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';

test('my new feature test', async ({ page }) => {
  await navigateToPage(page, '/my-page');
  await waitForHydration(page);
  
  // Your test assertions
  await expect(page.getByText('Expected Content')).toBeVisible();
});
```

### Example Accessibility Test

```typescript
import { test } from '@playwright/test';
import { navigateToPage, checkAccessibility } from '../utils/test-helpers';

test('my page should be accessible', async ({ page }) => {
  await navigateToPage(page, '/my-page');
  await checkAccessibility(page);
});
```

## Test Utilities

Located in `tests/utils/test-helpers.ts`:

- `navigateToPage()` - Navigate with retry logic
- `waitForHydration()` - Wait for Astro hydration
- `checkAccessibility()` - Run axe-core audit
- `getPerformanceMetrics()` - Get Core Web Vitals
- `takeScreenshot()` - Capture screenshots
- `assertPerformanceBudget()` - Assert performance thresholds

## CI/CD Integration

Tests run automatically in CI/CD pipelines:
- On every pull request
- On merge to main branch
- On deployment

Test reports are generated and uploaded as artifacts.

## Debugging Failed Tests

1. **View HTML Report:**
   ```bash
   npx playwright show-report
   ```

2. **Debug in UI Mode:**
   ```bash
   npm run test:ui
   ```

3. **Run Single Test:**
   ```bash
   npx playwright test tests/e2e/navigation.spec.ts
   ```

4. **Debug Mode:**
   ```bash
   npm run test:debug
   ```

## Test Coverage

### Critical User Flows
- ✅ Navigation (header, footer, mobile menu)
- ✅ Page rendering (all pages)
- ✅ Forms (validation, submission)
- ✅ Dark mode toggle
- ✅ Mobile responsiveness

### Accessibility
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast
- ✅ Form labels

### Performance
- ✅ Core Web Vitals
- ✅ Page load times
- ✅ Image optimization
- ✅ Bundle size

### SEO
- ✅ Meta tags
- ✅ Structured data
- ✅ Heading hierarchy
- ✅ Image alt text

## Best Practices

1. **Keep tests independent** - Each test should be able to run alone
2. **Use test data from fixtures** - Centralized test data in `tests/fixtures/`
3. **Wait for hydration** - Always wait for Astro hydration before assertions
4. **Check accessibility** - Include accessibility checks in E2E tests
5. **Test user behavior** - Test what users do, not implementation details
6. **Use semantic selectors** - Prefer roles and labels over classes/IDs
7. **Clean up state** - Tests should not depend on previous test state

## Troubleshooting

**Tests failing with timeout:**
- Check if preview server is running
- Increase timeout in `playwright.config.ts`
- Check network connectivity

**Accessibility violations:**
- Review violations in HTML report
- Fix violations in code
- Re-run accessibility tests

**Performance tests failing:**
- Check if site is built (`npm run build`)
- Review performance budgets
- Optimize slow pages

## Resources

- [Playwright Documentation](https://playwright.dev)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

