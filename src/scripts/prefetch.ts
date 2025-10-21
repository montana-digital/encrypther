/**
 * Intelligent Prefetching Script
 * 
 * Prefetches links on hover/touchstart for faster navigation.
 * Only prefetches same-origin links and respects user preferences.
 * 
 * Features:
 * - Hover-based prefetching with delay
 * - Touch-based prefetching for mobile
 * - Respects data-saver mode
 * - Prevents duplicate prefetches
 * - Error handling
 */

const prefetchedUrls = new Set<string>();
let prefetchTimeout: number | null = null;

/**
 * Check if prefetching should be enabled
 */
function shouldPrefetch(): boolean {
  try {
    // Don't prefetch if user has data saver enabled
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn?.saveData) {
        console.info('[Prefetch] Data saver enabled - skipping prefetching');
        return false;
      }
      
      // Don't prefetch on slow connections
      if (conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') {
        console.info('[Prefetch] Slow connection detected - skipping prefetching');
        return false;
      }
    }
    
    // Don't prefetch if user prefers reduced data usage
    if (window.matchMedia?.('(prefers-reduced-data: reduce)').matches) {
      console.info('[Prefetch] Reduced data preference - skipping prefetching');
      return false;
    }
    
    return true;
  } catch (error) {
    console.warn('[Prefetch] Error checking prefetch conditions:', error);
    return false;
  }
}

/**
 * Prefetch a URL
 */
function prefetchUrl(url: string): void {
  try {
    // Don't prefetch if already prefetched
    if (prefetchedUrls.has(url)) {
      return;
    }
    
    // Only prefetch same-origin URLs
    const urlObj = new URL(url, window.location.href);
    if (urlObj.origin !== window.location.origin) {
      return;
    }
    
    // Create link element for prefetching
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';
    
    // Add to DOM
    document.head.appendChild(link);
    
    // Mark as prefetched
    prefetchedUrls.add(url);
    
    console.info('[Prefetch] Prefetched:', url);
  } catch (error) {
    console.error('[Prefetch] Error prefetching URL:', error);
  }
}

/**
 * Initialize prefetching on links
 */
export function initPrefetch(): void {
  try {
    if (!shouldPrefetch()) {
      return;
    }
    
    // Find all internal links
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href]');
    
    links.forEach(link => {
      try {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          return;
        }
        
        // Hover-based prefetching (desktop)
        link.addEventListener('mouseenter', () => {
          // Add small delay to avoid prefetching on accidental hovers
          prefetchTimeout = window.setTimeout(() => {
            prefetchUrl(link.href);
          }, 100);
        });
        
        link.addEventListener('mouseleave', () => {
          if (prefetchTimeout) {
            clearTimeout(prefetchTimeout);
            prefetchTimeout = null;
          }
        });
        
        // Touch-based prefetching (mobile)
        link.addEventListener('touchstart', () => {
          prefetchUrl(link.href);
        }, { passive: true });
        
      } catch (error) {
        console.error('[Prefetch] Error setting up prefetch for link:', error);
      }
    });
    
    console.info(`[Prefetch] Initialized prefetching for ${links.length} links`);
  } catch (error) {
    console.error('[Prefetch] Error initializing prefetch:', error);
  }
}

/**
 * Cleanup prefetch listeners
 */
export function cleanupPrefetch(): void {
  if (prefetchTimeout) {
    clearTimeout(prefetchTimeout);
    prefetchTimeout = null;
  }
  prefetchedUrls.clear();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrefetch);
} else {
  initPrefetch();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', initPrefetch);

// Clean up on page navigation
document.addEventListener('astro:before-preparation', cleanupPrefetch);

