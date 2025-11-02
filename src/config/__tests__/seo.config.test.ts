import { describe, it, expect } from 'vitest';
import { seoConfig, pageSEO, type SEOConfig } from '../seo.config';

/**
 * SEO Config Unit Tests
 * 
 * Tests validation and structure of SEO configuration.
 * Ensures config has required fields and valid formats.
 */

describe('SEO Configuration', () => {
  describe('seoConfig', () => {
    it('should have all required fields', () => {
      expect(seoConfig.siteName).toBeDefined();
      expect(seoConfig.siteUrl).toBeDefined();
      expect(seoConfig.defaultTitle).toBeDefined();
      expect(seoConfig.defaultDescription).toBeDefined();
      expect(seoConfig.defaultImage).toBeDefined();
      expect(seoConfig.author).toBeDefined();
      expect(seoConfig.keywords).toBeDefined();
      expect(seoConfig.locale).toBeDefined();
      expect(seoConfig.themeColor).toBeDefined();
      expect(seoConfig.organization).toBeDefined();
    });

    it('should have siteName as non-empty string', () => {
      expect(typeof seoConfig.siteName).toBe('string');
      expect(seoConfig.siteName.length).toBeGreaterThan(0);
    });

    it('should have valid siteUrl format', () => {
      expect(seoConfig.siteUrl).toMatch(/^https?:\/\/.+/);
    });

    it('should have defaultTitle as non-empty string', () => {
      expect(typeof seoConfig.defaultTitle).toBe('string');
      expect(seoConfig.defaultTitle.length).toBeGreaterThan(0);
    });

    it('should have defaultDescription as non-empty string', () => {
      expect(typeof seoConfig.defaultDescription).toBe('string');
      expect(seoConfig.defaultDescription.length).toBeGreaterThan(0);
      // Meta descriptions should be 50-160 characters
      expect(seoConfig.defaultDescription.length).toBeGreaterThanOrEqual(50);
      expect(seoConfig.defaultDescription.length).toBeLessThanOrEqual(160);
    });

    it('should have defaultImage starting with /', () => {
      expect(seoConfig.defaultImage).toMatch(/^\//);
    });

    it('should have keywords as non-empty array', () => {
      expect(Array.isArray(seoConfig.keywords)).toBe(true);
      expect(seoConfig.keywords.length).toBeGreaterThan(0);
      seoConfig.keywords.forEach(keyword => {
        expect(typeof keyword).toBe('string');
        expect(keyword.length).toBeGreaterThan(0);
      });
    });

    it('should have valid locale format', () => {
      expect(seoConfig.locale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    });

    it('should have themeColor as valid hex color', () => {
      expect(seoConfig.themeColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    describe('organization', () => {
      it('should have required organization fields', () => {
        expect(seoConfig.organization.name).toBeDefined();
        expect(seoConfig.organization.legalName).toBeDefined();
        expect(seoConfig.organization.foundingDate).toBeDefined();
        expect(seoConfig.organization.email).toBeDefined();
      });

      it('should have valid email format', () => {
        expect(seoConfig.organization.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });

      it('should have foundingDate as year string', () => {
        expect(seoConfig.organization.foundingDate).toMatch(/^\d{4}$/);
      });

      it('should have valid address structure when provided', () => {
        if (seoConfig.organization.address) {
          const { address } = seoConfig.organization;
          expect(address.streetAddress).toBeDefined();
          expect(address.addressLocality).toBeDefined();
          expect(address.addressRegion).toBeDefined();
          expect(address.postalCode).toBeDefined();
          expect(address.addressCountry).toBeDefined();
          expect(address.addressCountry.length).toBe(2); // ISO country code
        }
      });
    });
  });

  describe('pageSEO', () => {
    it('should have SEO config for all major pages', () => {
      expect(pageSEO.home).toBeDefined();
      expect(pageSEO.about).toBeDefined();
      expect(pageSEO.onlinePrivacy).toBeDefined();
      expect(pageSEO.publicSafety).toBeDefined();
      expect(pageSEO.travelSafety).toBeDefined();
      expect(pageSEO.digitalAdvocacy).toBeDefined();
      expect(pageSEO.contact).toBeDefined();
      expect(pageSEO.donate).toBeDefined();
    });

    Object.entries(pageSEO).forEach(([pageName, seo]) => {
      describe(`${pageName} page SEO`, () => {
        it('should have title', () => {
          expect(seo.title).toBeDefined();
          expect(typeof seo.title).toBe('string');
          expect(seo.title.length).toBeGreaterThan(0);
        });

        it('should have description', () => {
          expect(seo.description).toBeDefined();
          expect(typeof seo.description).toBe('string');
          expect(seo.description.length).toBeGreaterThanOrEqual(50);
          // SEO descriptions are best between 50-160, but up to 320 is acceptable
          expect(seo.description.length).toBeLessThanOrEqual(320);
        });

        it('should have keywords array if provided', () => {
          if (seo.keywords) {
            expect(Array.isArray(seo.keywords)).toBe(true);
            seo.keywords.forEach(keyword => {
              expect(typeof keyword).toBe('string');
            });
          }
        });
      });
    });
  });

  describe('Config type safety', () => {
    it('should match SEOConfig interface structure', () => {
      const config: SEOConfig = seoConfig;
      expect(config).toBeDefined();
      // TypeScript will catch type mismatches at compile time
    });
  });
});

