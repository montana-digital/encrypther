/**
 * Scroll Animations with Intersection Observer
 * 
 * Adds subtle fade-in and slide-up animations to elements as they enter the viewport.
 * Progressive enhancement: Elements are visible by default without JavaScript.
 * 
 * Features:
 * - Respects prefers-reduced-motion
 * - Performance optimized with IntersectionObserver
 * - Error handling and fallback
 * - Cleanup on page navigation
 */

let globalObserver: IntersectionObserver | null = null;

export function initScrollAnimations(): void {
  try {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      console.info('[ScrollAnimations] Reduced motion preferred - skipping animations');
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('[ScrollAnimations] IntersectionObserver not supported - skipping animations');
      return;
    }

    // Clean up existing observer if any
    if (globalObserver) {
      globalObserver.disconnect();
      globalObserver = null;
    }

    // Find all elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    if (animateElements.length === 0) {
      return;
    }

    // Create Intersection Observer
    const observerOptions: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is fully visible
      threshold: 0.1, // Trigger when 10% of element is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          try {
            // Add visible class to trigger animation
            entry.target.classList.add('visible');
            
            // Unobserve after animation to improve performance
            if (globalObserver) {
              globalObserver.unobserve(entry.target);
            }
          } catch (error) {
            console.error('[ScrollAnimations] Error animating element:', error);
          }
        }
      });
    };

    globalObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all animate elements
    animateElements.forEach((element) => {
      globalObserver?.observe(element);
    });

    console.info(`[ScrollAnimations] Observing ${animateElements.length} elements`);
  } catch (error) {
    console.error('[ScrollAnimations] Error initializing scroll animations:', error);
  }
}

/**
 * Cleanup function to disconnect observer
 */
export function cleanupScrollAnimations(): void {
  if (globalObserver) {
    globalObserver.disconnect();
    globalObserver = null;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Re-initialize on Astro page load (for view transitions)
document.addEventListener('astro:page-load', initScrollAnimations);

// Clean up on page navigation
document.addEventListener('astro:before-preparation', cleanupScrollAnimations);

