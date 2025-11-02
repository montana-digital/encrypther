/**
 * Unit Test Helper Utilities
 * 
 * Common utilities for unit tests (Vitest).
 * E2E test helpers are in tests/utils/test-helpers.ts
 */

import { vi, type Mock } from 'vitest';

/**
 * Create a mock URL object
 */
export function createMockURL(url: string, base?: string): URL {
  return new URL(url, base || 'https://example.com');
}

/**
 * Create a mock DOM element
 */
export function createMockElement(tagName: string = 'div'): Partial<HTMLElement> {
  return {
    tagName: tagName.toUpperCase(),
    getAttribute: vi.fn(),
    setAttribute: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    innerHTML: '',
    textContent: '',
  };
}

/**
 * Mock console methods for testing
 */
export function mockConsole() {
  const originalConsole = { ...console };
  
  return {
    log: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    group: vi.fn(),
    groupEnd: vi.fn(),
    table: vi.fn(),
    restore: () => {
      Object.assign(console, originalConsole);
    },
  };
}

/**
 * Wait for async operations
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create mock config for testing
 */
export function createMockConfig<T>(overrides: Partial<T> = {}): T {
  return {
    ...overrides,
  } as T;
}

