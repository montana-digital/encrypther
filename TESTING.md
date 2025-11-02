# EncryptHer Testing Suite

Complete testing infrastructure for the EncryptHer project, following the **Test Pyramid** strategy.

## Quick Start

```bash
# Run all tests (unit + E2E)
npm test

# Run unit tests only
npm run test:unit

# Run E2E tests only
npm run test:e2e

# Watch mode for unit tests
npm run test:unit:watch

# Unit tests with coverage
npm run test:unit:coverage
```

## Test Structure

### Unit Tests (Vitest) - Fast & Isolated

Located in `src/**/__tests__/`:
- ✅ **Config validation** - SEO and Analytics configs
- ✅ **Utility functions** - Performance monitor, prefetch
- ✅ **Type safety** - Interface validation

**Stats:**
- 74 tests across 4 test files
- Execution time: ~1.5 seconds
- No browser required (uses happy-dom)

### E2E Tests (Playwright) - Integration & UI

Located in `tests/`:
- ✅ **User workflows** - Navigation, forms, interactions
- ✅ **Accessibility** - WCAG 2.1 AA compliance
- ✅ **Performance** - Core Web Vitals
- ✅ **SEO** - Meta tags, structured data
- ✅ **Visual** - Screenshots and regression

## Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (unit + E2E) |
| `npm run test:unit` | Run unit tests once |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:unit:ui` | Run unit tests with UI |
| `npm run test:unit:coverage` | Generate coverage report |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:all` | Run unit + E2E sequentially |
| `npm run test:a11y` | Accessibility tests only |
| `npm run test:performance` | Performance tests only |
| `npm run test:seo` | SEO tests only |

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../my-module';

describe('myFunction', () => {
  it('should return expected value', () => {
    expect(myFunction('input')).toBe('expected');
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/EncryptHer/);
});
```

## Test Coverage

### Unit Tests Coverage

- **Config Files**: SEO config validation, Analytics config validation
- **Utilities**: Performance monitoring, link prefetching
- **Type Safety**: TypeScript interface validation

### E2E Tests Coverage

- **User Flows**: Navigation, page rendering, forms
- **Accessibility**: WCAG compliance, keyboard navigation
- **Performance**: Core Web Vitals (LCP, FID, CLS, TTFB)
- **SEO**: Meta tags, structured data, Open Graph
- **Visual**: Screenshot regression testing

## CI/CD Integration

Tests are designed to run in CI/CD pipelines:

1. **Unit tests** run first (fast feedback)
2. **E2E tests** run after build
3. Reports generated as artifacts

## Best Practices

1. **Write unit tests for utilities and configs**
2. **Write E2E tests for user workflows**
3. **Keep tests independent** - each test should run alone
4. **Test behavior, not implementation**
5. **Use semantic selectors in E2E tests**
6. **Mock external dependencies in unit tests**

## Troubleshooting

**Unit tests failing?**
- Check TypeScript compilation: `npm run check`
- Verify imports and module paths

**E2E tests failing?**
- Build the site first: `npm run build`
- Check if preview server is running
- Increase timeout in `playwright.config.ts` if needed

**Coverage too low?**
- Run `npm run test:unit:coverage`
- Review uncovered lines
- Add tests for missing coverage

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

---

**Last Updated**: Test suite is ready to use! All 74 unit tests passing ✅

