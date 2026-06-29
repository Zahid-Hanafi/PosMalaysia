/* ===== IMS552 POS MALAYSIA BERHAD — SHARED JAVASCRIPT ===== */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ===== MOBILE NAV TOGGLE ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ===== FADE-IN ON SCROLL ===== */
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ===== TABS ===== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const tabGroup = btn.closest('.tabs-wrapper');
      if (!tabGroup) return;
      // Deactivate all
      tabGroup.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      tabGroup.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      // Activate clicked
      btn.classList.add('active');
      var target = tabGroup.querySelector('#' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  /* ===== ACCORDION ===== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all in same group
      const group = item.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item').forEach(function (i) {
          i.classList.remove('open');
        });
      }
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ===== COUNTER ANIMATION ===== */
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;
        window.scrollTo({
          top: target.offsetTop - offset - 20,
          behavior: 'smooth'
        });
      }
    });
  });

});
