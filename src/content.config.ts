/**
 * Content Collections Configuration
 * 
 * Defines the schema and structure for content collections.
 * This removes the deprecation warning and provides type safety.
 * 
 * Schema supports:
 * - Hero sections (title, subtitle, badge, CTAs, etc.)
 * - SEO metadata (title, description, keywords)
 * - Structured data types (course, article, website)
 * - Content freshness (lastModified dates)
 * - Cards/features data (arrays)
 */

import { defineCollection, z } from 'astro:content';

// CTA button schema
const ctaSchema = z.object({
  text: z.string(),
  href: z.string(),
}).optional();

// Hero schema
const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
  badgeIcon: z.string().optional(), // SVG string
  backgroundImage: z.string().optional(),
  glitchEffect: z.union([z.boolean(), z.literal('subtle')]).default(false),
  primaryCTA: ctaSchema,
  secondaryCTA: ctaSchema,
});

// SEO metadata schema
const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
});

// Card schema for features/sections
const cardSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  href: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  icon: z.string().optional(), // SVG string
  iconBg: z.enum(['primary', 'accent']).optional(),
  badge: z.string().optional(),
  content: z.string().optional(), // Additional markdown content
}).optional();

// CTA section schema
const ctaSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  primaryButton: ctaSchema,
  secondaryButton: ctaSchema.optional(),
}).optional();

// Main content schema for pages
const pageContentSchema = z.object({
  // Hero section data
  hero: heroSchema,
  
  // SEO metadata
  seo: seoSchema,
  
  // Structured data type for JSON-LD
  structuredDataType: z.enum(['website', 'article', 'course']).default('website'),
  
  // Content freshness
  lastModified: z.date().optional(),
  datePublished: z.date().optional(),
  
  // Optional: Cards/features data (for sections with structured components)
  cards: z.array(cardSchema).optional(),
  
  // Optional: CTA section data
  cta: ctaSectionSchema,
  
  // Legacy fields (kept for backward compatibility during migration)
  enabled: z.boolean().default(true),
  order: z.number().default(0),
  section: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

// Shared schema for all collections
const sharedSchema = pageContentSchema;

// Define collections for each content directory
const indexCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const onlinePrivacyCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const travelSafetyCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const publicSafetyCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const digitalAdvocacyCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const donateCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const contactCollection = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

// Export collections
export const collections = {
  'index': indexCollection,
  'about': aboutCollection,
  'online-privacy': onlinePrivacyCollection,
  'travel-safety': travelSafetyCollection,
  'public-safety': publicSafetyCollection,
  'digital-advocacy': digitalAdvocacyCollection,
  'donate': donateCollection,
  'contact': contactCollection,
};

