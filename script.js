// RecallDB Website - Interactive Behavior

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Dark Mode Toggle ---
  var themeToggle = document.getElementById('theme-toggle');
  var html = document.documentElement;

  // Check for saved preference, then OS preference
  function getPreferredTheme() {
    var saved = localStorage.getItem('recalldb-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('recalldb-theme', theme);
  }

  // Apply on load
  setTheme(getPreferredTheme());

  // Listen for OS changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('recalldb-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Sticky Nav Scroll Effect ---
  var nav = document.getElementById('nav');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY || window.pageYOffset;
    if (nav) {
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    lastScroll = scrollY;
  });

  // --- SDK Tab Switching ---
  var tabs = document.querySelectorAll('.sdk-tab');
  var panels = document.querySelectorAll('.sdk-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      var target = document.getElementById('panel-' + lang);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll-triggered Fade-in Animation ---
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  var animateElements = document.querySelectorAll(
    '.problem-card, .feature-card, .usecase-card, .benefit-item, .step, .search-cap, .arch-box, .api-group'
  );

  animateElements.forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Add CSS for fade-in animation
  var style = document.createElement('style');
  style.textContent = [
    '.fade-in {',
    '  opacity: 0;',
    '  transform: translateY(20px);',
    '  transition: opacity 0.5s ease, transform 0.5s ease;',
    '}',
    '.fade-in.visible {',
    '  opacity: 1;',
    '  transform: translateY(0);',
    '}',
    '.problem-card.fade-in:nth-child(2) { transition-delay: 0.1s; }',
    '.problem-card.fade-in:nth-child(3) { transition-delay: 0.2s; }',
    '.problem-card.fade-in:nth-child(4) { transition-delay: 0.3s; }',
    '.feature-card.fade-in:nth-child(2) { transition-delay: 0.1s; }',
    '.feature-card.fade-in:nth-child(3) { transition-delay: 0.15s; }',
    '.feature-card.fade-in:nth-child(4) { transition-delay: 0.2s; }',
    '.feature-card.fade-in:nth-child(5) { transition-delay: 0.25s; }',
    '.feature-card.fade-in:nth-child(6) { transition-delay: 0.3s; }',
    '.usecase-card.fade-in:nth-child(2) { transition-delay: 0.1s; }',
    '.usecase-card.fade-in:nth-child(3) { transition-delay: 0.15s; }',
    '.usecase-card.fade-in:nth-child(4) { transition-delay: 0.2s; }',
    '.usecase-card.fade-in:nth-child(5) { transition-delay: 0.25s; }',
    '.usecase-card.fade-in:nth-child(6) { transition-delay: 0.3s; }',
    '.benefit-item.fade-in:nth-child(2) { transition-delay: 0.05s; }',
    '.benefit-item.fade-in:nth-child(3) { transition-delay: 0.1s; }',
    '.benefit-item.fade-in:nth-child(4) { transition-delay: 0.15s; }',
    '.benefit-item.fade-in:nth-child(5) { transition-delay: 0.2s; }',
    '.benefit-item.fade-in:nth-child(6) { transition-delay: 0.25s; }',
    '.benefit-item.fade-in:nth-child(7) { transition-delay: 0.3s; }',
    '.benefit-item.fade-in:nth-child(8) { transition-delay: 0.35s; }',
    '.search-cap.fade-in:nth-child(2) { transition-delay: 0.1s; }',
    '.search-cap.fade-in:nth-child(3) { transition-delay: 0.2s; }',
    '.search-cap.fade-in:nth-child(4) { transition-delay: 0.3s; }',
    '.search-cap.fade-in:nth-child(5) { transition-delay: 0.4s; }'
  ].join('\n');
  document.head.appendChild(style);

})();