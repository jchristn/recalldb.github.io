// RecallDB Website - Interactive Behavior

(function () {
  'use strict';

  var html = document.documentElement;
  var footerLogo = document.getElementById('footer-logo');

  // --- Footer logo swaps with theme (footer background inverts in light mode) ---
  function syncFooterLogo(theme) {
    if (!footerLogo) return;
    footerLogo.src = theme === 'light' ? 'assets/logo-black.png' : 'assets/logo-white.png';
  }

  // --- Mobile Navigation Toggle ---
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Dark Mode Toggle (dark is the default) ---
  var themeToggle = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    var saved = localStorage.getItem('recalldb-theme');
    if (saved) return saved;
    return 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('recalldb-theme', theme);
    syncFooterLogo(theme);
  }

  // Apply on load (inline script in <head> already set the attribute; this keeps state in sync)
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Sticky Nav Scroll Effect ---
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY || window.pageYOffset;
    if (nav) {
      if (scrollY > 40) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    }
  }, { passive: true });

  // --- SDK / Search Tab Switching (scoped per tab group) ---
  document.querySelectorAll('.sdk-tabs').forEach(function (tabGroup) {
    var panelsWrap = tabGroup.nextElementSibling;
    var groupTabs = tabGroup.querySelectorAll('.sdk-tab');

    groupTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');

        groupTabs.forEach(function (t) { t.classList.remove('active'); });
        if (panelsWrap) {
          panelsWrap.querySelectorAll('.sdk-panel').forEach(function (p) { p.classList.remove('active'); });
        }

        this.classList.add('active');
        var target = document.getElementById('panel-' + lang);
        if (target) { target.classList.add('active'); }
      });
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
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll-triggered Fade-in Animation ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.problem-card, .feature-card, .usecase-card, .benefit-item, .step, .search-cap, .arch-box, .api-group'
  ).forEach(function (el, i) {
    el.classList.add('fade-in');
    el.style.transitionDelay = (Math.min(i % 6, 5) * 0.06) + 's';
    observer.observe(el);
  });

})();
