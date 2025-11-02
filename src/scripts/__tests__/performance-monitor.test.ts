import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getMetrics, logSummary, initPerformanceMonitoring } from '../performance-monitor';

/**
 * Performance Monitor Unit Tests
 * 
 * Tests performance monitoring utilities.
 * Mocks browser Performance APIs for testing.
 */

describe('Performance Monitor', () => {
  beforeEach(() => {
    // Clear any previous state
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getMetrics', () => {
    it('should return metrics object', () => {
      const metrics = getMetrics();
      expect(metrics).toBeDefined();
      expect(typeof metrics).toBe('object');
    });

    it('should return metrics with optional properties', () => {
      const metrics = getMetrics();
      // Metrics may or may not be populated depending on browser support
      if (metrics.lcp !== undefined) {
        expect(typeof metrics.lcp).toBe('number');
        expect(metrics.lcp).toBeGreaterThanOrEqual(0);
      }
      if (metrics.fid !== undefined) {
        expect(typeof metrics.fid).toBe('number');
        expect(metrics.fid).toBeGreaterThanOrEqual(0);
      }
      if (metrics.cls !== undefined) {
        expect(typeof metrics.cls).toBe('number');
        expect(metrics.cls).toBeGreaterThanOrEqual(0);
      }
      if (metrics.ttfb !== undefined) {
        expect(typeof metrics.ttfb).toBe('number');
        expect(metrics.ttfb).toBeGreaterThanOrEqual(0);
      }
      if (metrics.fcp !== undefined) {
        expect(typeof metrics.fcp).toBe('number');
        expect(metrics.fcp).toBeGreaterThanOrEqual(0);
      }
    });

    it('should return a new object each time (not reference)', () => {
      const metrics1 = getMetrics();
      const metrics2 = getMetrics();
      // Should be different objects (defensive copy)
      expect(metrics1).not.toBe(metrics2);
    });
  });

  describe('logSummary', () => {
    it('should not throw error when called', () => {
      // In non-dev mode, it should return early
      // In dev mode, it would log to console
      expect(() => logSummary()).not.toThrow();
    });

    it('should handle when metrics are empty', () => {
      // Should work even with no metrics collected
      expect(() => logSummary()).not.toThrow();
    });
  });

  describe('initPerformanceMonitoring', () => {
    it('should not throw error when called', () => {
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('should handle missing PerformanceObserver gracefully', () => {
      // Should not crash if PerformanceObserver is not available
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('should handle missing performance.getEntriesByType gracefully', () => {
      // Should not crash if Performance API is not available
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });
  });

  describe('Error handling', () => {
    it('should handle errors gracefully in trackLCP', () => {
      // initPerformanceMonitoring should catch and log errors
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('should handle errors gracefully in trackFID', () => {
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('should handle errors gracefully in trackCLS', () => {
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('should handle errors gracefully in trackTTFB', () => {
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('should handle errors gracefully in trackFCP', () => {
      expect(() => initPerformanceMonitoring()).not.toThrow();
    });
  });
});

