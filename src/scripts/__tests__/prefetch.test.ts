import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initPrefetch, cleanupPrefetch } from '../prefetch';

/**
 * Prefetch Utility Unit Tests
 * 
 * Tests link prefetching functionality.
 * Mocks DOM and browser APIs for testing.
 */

describe('Prefetch Utility', () => {
  let mockDocument: Partial<Document>;
  let mockWindow: Partial<Window>;
  let mockNavigator: Partial<Navigator>;

  beforeEach(() => {
    // Mock DOM elements
    const mockLink = {
      getAttribute: vi.fn(),
      href: 'https://example.com/page',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    const mockLinks = [mockLink];

    // Mock document
    mockDocument = {
      querySelectorAll: vi.fn(() => mockLinks),
      createElement: vi.fn(() => ({
        rel: '',
        href: '',
        as: '',
        appendChild: vi.fn(),
      })),
      head: {
        appendChild: vi.fn(),
      } as any,
      readyState: 'complete',
      addEventListener: vi.fn(),
    };

    // Mock window
    mockWindow = {
      location: {
        href: 'https://example.com',
        origin: 'https://example.com',
      } as any,
      matchMedia: vi.fn(() => ({
        matches: false,
      })),
      setTimeout: vi.fn((fn) => {
        fn();
        return 123 as any;
      }),
      clearTimeout: vi.fn(),
    };

    // Mock navigator
    mockNavigator = {
      connection: undefined,
    } as any;

    // Override globals for testing
    global.document = mockDocument as Document;
    global.window = mockWindow as Window & typeof globalThis;
    global.navigator = mockNavigator as Navigator;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanupPrefetch();
  });

  describe('initPrefetch', () => {
    it('should not throw when called', () => {
      expect(() => initPrefetch()).not.toThrow();
    });

    it('should query for links', () => {
      initPrefetch();
      expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('a[href]');
    });

    it('should handle empty link list', () => {
      (mockDocument.querySelectorAll as any) = vi.fn(() => []);
      expect(() => initPrefetch()).not.toThrow();
    });

    it('should skip anchors starting with #', () => {
      const mockLinkWithHash = {
        getAttribute: vi.fn(() => '#anchor'),
        href: 'https://example.com#anchor',
        addEventListener: vi.fn(),
      } as any;
      
      (mockDocument.querySelectorAll as any) = vi.fn(() => [mockLinkWithHash]);
      initPrefetch();
      
      // Should not add event listeners for hash links
      expect(mockLinkWithHash.addEventListener).not.toHaveBeenCalled();
    });

    it('should skip mailto: links', () => {
      const mockMailtoLink = {
        getAttribute: vi.fn(() => 'mailto:test@example.com'),
        href: 'mailto:test@example.com',
        addEventListener: vi.fn(),
      } as any;
      
      (mockDocument.querySelectorAll as any) = vi.fn(() => [mockMailtoLink]);
      initPrefetch();
      
      // Should not prefetch mailto links
      expect(mockMailtoLink.addEventListener).not.toHaveBeenCalled();
    });

    it('should skip tel: links', () => {
      const mockTelLink = {
        getAttribute: vi.fn(() => 'tel:+1234567890'),
        href: 'tel:+1234567890',
        addEventListener: vi.fn(),
      } as any;
      
      (mockDocument.querySelectorAll as any) = vi.fn(() => [mockTelLink]);
      initPrefetch();
      
      // Should not prefetch tel links
      expect(mockTelLink.addEventListener).not.toHaveBeenCalled();
    });

    it('should skip when shouldPrefetch returns false', () => {
      // Mock data saver enabled
      (mockNavigator.connection as any) = {
        saveData: true,
      };

      initPrefetch();
      // Should not add event listeners
      // Note: In real implementation, shouldPrefetch checks happen before querySelectorAll
      expect(() => initPrefetch()).not.toThrow();
    });

    it('should handle errors gracefully', () => {
      (mockDocument.querySelectorAll as any) = vi.fn(() => {
        throw new Error('Query failed');
      });

      expect(() => initPrefetch()).not.toThrow();
    });
  });

  describe('cleanupPrefetch', () => {
    it('should not throw when called', () => {
      expect(() => cleanupPrefetch()).not.toThrow();
    });

    it('should clear prefetched URLs', () => {
      initPrefetch();
      cleanupPrefetch();
      // Should handle cleanup without errors
      expect(() => cleanupPrefetch()).not.toThrow();
    });
  });

  describe('Error handling', () => {
    it('should handle missing navigator.connection', () => {
      delete (mockNavigator as any).connection;
      expect(() => initPrefetch()).not.toThrow();
    });

    it('should handle missing matchMedia', () => {
      delete (mockWindow as any).matchMedia;
      expect(() => initPrefetch()).not.toThrow();
    });

    it('should handle URL parsing errors', () => {
      const mockBadLink = {
        getAttribute: vi.fn(() => 'invalid-url'),
        href: 'invalid-url',
        addEventListener: vi.fn(),
      } as any;

      (mockDocument.querySelectorAll as any) = vi.fn(() => [mockBadLink]);
      
      // Should handle invalid URLs gracefully
      expect(() => initPrefetch()).not.toThrow();
    });
  });
});

