/**
 * Image Cleaning - Main site JavaScript
 * Mobile navigation, contact modal, form handling (mailto), toast notifications
 * Consolidated in /src/assets/js/
 */

(function () {
  'use strict';

  // ==================== MOBILE NAV ====================
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');

    if (!toggle || !mobileNav) return;

    let isOpen = false;

    function closeNav() {
      isOpen = false;
      mobileNav.classList.add('hidden');
      mobileNav.classList.remove('flex', 'fixed', 'top-[5rem]', 'left-0', 'right-0', 'z-[999]', 'shadow-xl');
      if (overlay) overlay.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openNav() {
      isOpen = true;
      mobileNav.classList.remove('hidden');
      mobileNav.classList.add('flex', 'fixed', 'top-[5rem]', 'left-0', 'right-0', 'z-[999]', 'shadow-xl');
      if (overlay) overlay.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
      }
    });

    // Close mobile nav when clicking any nav link inside it
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        // small delay so navigation can start
        setTimeout(closeNav, 120);
      });
    });
  }

  // ==================== CONTACT MODAL ====================
  function initContactModal() {
    const openButtons = document.querySelectorAll('[data-open-contact]');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('contact-modal-close');
    const overlay = document.getElementById('contact-modal-overlay');

    if (!modal) return;

    const form = modal.querySelector('#contact-form');

    function openModal() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      // focus first field
      setTimeout(() => {
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
      }, 80);
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
      // reset form state if needed
      if (form) {
        form.classList.remove('hidden');
        const success = modal.querySelector('#form-success');
        if (success) success.classList.add('hidden');
      }
    }

    // Open buttons (header CTA, page CTAs etc)
    openButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    // Close actions
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // Form handling inside modal (also works for standalone forms)
    if (form) {
      initContactForm(form, closeModal);
    }
  }

  // ==================== CONTACT FORM (Mailto + Validation) ====================
  function initContactForm(form, onSuccessClose) {
    if (!form) return;

    const successEl = form.parentElement.querySelector('#form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot (basic spam protection)
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value.trim() !== '') {
        // Silent fail for bots
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Validation
      const errors = [];
      if (!data.name || data.name.trim().length < 2) errors.push('Please enter your name');
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.push('Please enter a valid email');
      if (!data.message || data.message.trim().length < 10)
        errors.push('Please tell us a bit more about your needs (min 10 characters)');

      if (errors.length > 0) {
        showToast(errors.join('. '), 'error');
        return;
      }

      // Build beautiful mailto body
      const subject = encodeURIComponent(
        `Cleaning Inquiry from ${data.name} (${data.service || 'General'})`
      );
      const bodyLines = [
        `Hello Image Cleaning Team,`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || 'Not provided'}`,
        `Service Type: ${data.service || 'Not specified'}`,
        `Preferred Date: ${data.date || 'Flexible'}`,
        ``,
        `Message:`,
        `${data.message}`,
        ``,
        `---`,
        `Submitted via imagecleaning.example.com contact form`,
        `Source page: ${window.location.href}`,
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));

      // Open user's email client (reliable, no external service needed)
      const mailto = `mailto:${window.SITE_EMAIL || 'ashliobryant@gmail.com'}?subject=${subject}&body=${body}`;
      window.location.href = mailto;

      // Show success UI
      form.classList.add('hidden');
      if (successEl) {
        successEl.classList.remove('hidden');
      } else {
        showToast(
          'Thank you! Your email client should now be open with the details pre-filled.',
          'success'
        );
      }

      // Analytics hook (optional)
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact_form_submit', { method: 'mailto' });
      }

      // Auto close modal after a delay if provided
      if (onSuccessClose) {
        setTimeout(() => {
          onSuccessClose();
          // reset for next open
          form.classList.remove('hidden');
          if (successEl) successEl.classList.add('hidden');
          form.reset();
        }, 2400);
      } else {
        // Standalone form on page - reset after 3s
        setTimeout(() => {
          form.classList.remove('hidden');
          if (successEl) successEl.classList.add('hidden');
          form.reset();
        }, 3200);
      }
    });

    // Real-time subtle validation feedback (optional enhancement)
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.validity && !input.validity.valid) {
          input.classList.add('!border-red-400');
        } else {
          input.classList.remove('!border-red-400');
        }
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('!border-red-400')) {
          input.classList.remove('!border-red-400');
        }
      });
    });
  }

  // ==================== TOAST NOTIFICATIONS ====================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) {
      // Fallback if container missing
      alert(message);
      return;
    }

    const toast = document.createElement('div');
    const isError = type === 'error';
    toast.className = `max-w-sm w-full shadow-soft rounded-2xl pointer-events-auto border px-4 py-3 flex gap-3 ${
      isError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-white border-slate-200 text-slate-800'
    }`;

    toast.innerHTML = `
      <div class="flex-1 text-sm font-medium pt-0.5">${message}</div>
      <button class="text-xl leading-none opacity-60 hover:opacity-100" aria-label="Close">×</button>
    `;

    container.appendChild(toast);

    const close = () => {
      toast.style.transition = 'all 0.2s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 180);
    };

    toast.querySelector('button').addEventListener('click', close);

    // Auto dismiss
    setTimeout(close, isError ? 5200 : 4200);
  }

  // Expose toast globally for debugging / future use
  window.showToast = showToast;

  // ==================== ACTIVE NAV HIGHLIGHT ====================
  function initActiveNav() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('nav a[href], .nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.replace(/\/$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('nav-link-active', 'text-primary-700');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update hash without jump
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  // ==================== INIT EVERYTHING ====================
  function init() {
    initMobileNav();
    initContactModal();
    initActiveNav();
    initSmoothScroll();

    // Also initialize any standalone contact forms (e.g. on homepage)
    document.querySelectorAll('form#contact-form:not(#contact-modal form)').forEach((form) => {
      initContactForm(form);
    });

    // Keyboard shortcut hint (dev only feel)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === '?' && document.activeElement.tagName === 'BODY') {
          e.preventDefault();
          const modal = document.getElementById('contact-modal');
          if (modal) modal.classList.toggle('hidden');
        }
      });
    }

    // Mark JS loaded (for progressive enhancement CSS if wanted)
    document.documentElement.classList.add('js-loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
