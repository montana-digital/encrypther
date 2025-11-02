# EncryptHer Testing Suite

Comprehensive testing suite for UI/UX validation, accessibility, performance, SEO, and user experience.

## Test Structure

```
tests/
├── e2e/              # End-to-end user flow tests (Playwright)
├── accessibility/    # WCAG 2.1 AA compliance tests (Playwright)
├── performance/      # Core Web Vitals and performance tests (Playwright)
├── seo/             # SEO meta tags and structured data tests (Playwright)
├── visual/          # Visual regression and screenshot tests (Playwright)
├── unit/            # Unit test utilities
│   └── utils/       # Unit test helper functions
├── utils/           # E2E test helper utilities
└── fixtures/        # Test data and constants

src/
├── config/
│   └── __tests__/   # Unit tests for config files (Vitest)
└── scripts/
    └── __tests__/   # Unit tests for utility scripts (Vitest)
```

## Quick Start

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. For E2E tests, build the site first:
   ```bash
   npm run build
   ```

3. Install Playwright browsers (if not already installed):
   ```bash
   npx playwright install
   ```

### Running Tests

**Run all tests (unit + E2E):**
```bash
npm run test
```

**Unit Tests (Vitest):**
```bash
npm run test:unit          # Run unit tests once
npm run test:unit:watch    # Run unit tests in watch mode
npm run test:unit:ui       # Run unit tests with UI
npm run test:unit:coverage # Run with coverage report
```

**E2E Tests (Playwright):**
```bash
npm run test:e2e          # E2E tests only
npm run test:a11y         # Accessibility tests
npm run test:performance  # Performance tests
npm run test:seo          # SEO tests
npm run test:visual       # Visual regression tests
npm run test:all          # Run all unit + E2E tests
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

### Unit Tests (`src/**/__tests__/`)

Fast, isolated tests for TypeScript utilities and configurations using Vitest.

#### Config Tests
- **`src/config/__tests__/seo.config.test.ts`** - SEO configuration validation
- **`src/config/__tests__/analytics.config.test.ts`** - Analytics configuration validation

#### Utility Script Tests
- **`src/scripts/__tests__/performance-monitor.test.ts`** - Performance monitoring utilities
- **`src/scripts/__tests__/prefetch.test.ts`** - Link prefetching functionality

**Unit Test Features:**
- Fast execution (< 1 second for all unit tests)
- Test individual functions and configurations
- No browser required (uses happy-dom for DOM APIs)
- Type-safe with TypeScript
- Mock browser APIs for testing

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

### Example Unit Test

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../my-module';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected-output');
  });

  it('should handle edge cases', () => {
    expect(() => myFunction('')).not.toThrow();
  });
});
```

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

### E2E Test Helpers (`tests/utils/test-helpers.ts`)

- `navigateToPage()` - Navigate with retry logic
- `waitForHydration()` - Wait for Astro hydration
- `checkAccessibility()` - Run axe-core audit
- `getPerformanceMetrics()` - Get Core Web Vitals
- `takeScreenshot()` - Capture screenshots
- `assertPerformanceBudget()` - Assert performance thresholds

### Unit Test Helpers (`tests/unit/utils/test-helpers.ts`)

- `createMockURL()` - Create mock URL objects
- `createMockElement()` - Create mock DOM elements
- `mockConsole()` - Mock console methods for testing
- `waitFor()` - Wait for async operations
- `createMockConfig()` - Create mock configuration objects

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

### Unit Tests
- ✅ Config validation (SEO, Analytics)
- ✅ Utility function testing (performance monitor, prefetch)
- ✅ Type safety validation
- ✅ Error handling

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

## Test Architecture

This project follows the **Test Pyramid** strategy:

1. **Unit Tests (Vitest)** - Fast, isolated tests for utilities and configs
   - Located in `src/**/__tests__/`
   - Run in milliseconds
   - Test business logic, configurations, and utilities

2. **E2E Tests (Playwright)** - Integration tests through browser
   - Located in `tests/`
   - Run in seconds
   - Test user workflows and UI behavior

**Why Both?**
- Unit tests catch bugs quickly during development
- E2E tests validate the complete user experience
- Together they provide comprehensive coverage

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

