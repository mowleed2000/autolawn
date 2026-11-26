/**
 * Woodlawn Auto Centre - Main JavaScript
 * Handles navigation, mobile drawer, FAQ accordions, and testimonial carousel.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Drawer
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      // Toggle icon
      mobileMenuBtn.innerHTML = isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close when clicking a link
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        // Close others
        faqCards.forEach(c => c.classList.remove('open'));
        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });

  // 4. Testimonials Carousel
  const reviewCards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.carousel-prev-btn');
  const nextBtn = document.querySelector('.carousel-next-btn');
  const counterSpan = document.querySelector('.carousel-counter');
  let currentIndex = 0;

  function showReview(index) {
    if (!reviewCards.length) return;
    reviewCards.forEach(card => card.classList.remove('active'));
    
    // Wrap index
    if (index >= reviewCards.length) currentIndex = 0;
    else if (index < 0) currentIndex = reviewCards.length - 1;
    else currentIndex = index;

    reviewCards[currentIndex].classList.add('active');
    if (counterSpan) {
      counterSpan.textContent = `${currentIndex + 1} / ${reviewCards.length}`;
    }
  }

  if (prevBtn && nextBtn && reviewCards.length) {
    prevBtn.addEventListener('click', () => showReview(currentIndex - 1));
    nextBtn.addEventListener('click', () => showReview(currentIndex + 1));
    
    // Auto advance every 8s
    setInterval(() => {
      showReview(currentIndex + 1);
    }, 8000);
  }
});
