/**
 * Scroll Animations with Intersection Observer
 * 
 * Adds subtle fade-in and slide-up animations to elements as they enter the viewport.
 * Progressive enhancement: Elements are visible by default without JavaScript.
 */

export function initScrollAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Don't apply animations if user prefers reduced motion
    return;
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
        // Add visible class to trigger animation
        entry.target.classList.add('visible');
        
        // Optional: Unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all animate elements
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Clean up on page navigation (for future Astro view transitions)
  document.addEventListener('astro:before-preparation', () => {
    observer.disconnect();
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Also initialize on Astro page load (for view transitions)
document.addEventListener('astro:page-load', initScrollAnimations);

