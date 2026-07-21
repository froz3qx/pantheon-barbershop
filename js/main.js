/* ============================================
   45 Pantheon — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navOverlay = document.querySelector('.nav-overlay');

  if (menuToggle && navList) {
    function toggleMenu(open) {
      menuToggle.classList.toggle('active', open);
      navList.classList.toggle('open', open);
      if (navOverlay) navOverlay.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', function () {
      toggleMenu(!navList.classList.contains('open'));
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        toggleMenu(false);
      });
    }

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggleMenu(false);
    });
  }

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });

  // --- Scroll reveal ---
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --- Form handling ---
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(bookingForm);
      var data = {};
      formData.forEach(function (value, key) { data[key] = value; });

      var btn = bookingForm.querySelector('.btn');
      if (btn) {
        btn.textContent = 'Отправка...';
        btn.disabled = true;
      }

      // Simulate sending
      setTimeout(function () {
        bookingForm.querySelector('.form-body').style.display = 'none';
        bookingForm.querySelector('.form-success').classList.add('show');
        if (btn) {
          btn.textContent = 'Записаться';
          btn.disabled = false;
        }
      }, 1200);

      // In production, send data to server here
      console.log('Booking data:', data);
    });
  }

  // --- Gallery lightbox ---
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        // In production, open a lightbox with the image
        // For now, we just add a visual feedback
        item.style.transform = 'scale(0.98)';
        setTimeout(function () {
          item.style.transform = '';
        }, 200);
      });
    });
  }

  // --- Animate stats counter ---
  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          if (!isNaN(target)) {
            animateCounter(el, target);
          }
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  function animateCounter(el, target) {
    var current = 0;
    var step = Math.ceil(target / 60);
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + (el.getAttribute('data-suffix') || '');
    }, 20);
  }

  // --- Analysis bars animation ---
  var analysisBars = document.querySelectorAll('.analysis-bar-fill');
  if (analysisBars.length) {
    var barsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          bar.style.width = bar.getAttribute('data-width') || '0%';
          barsObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    analysisBars.forEach(function (bar) {
      bar.style.width = '0%';
      barsObserver.observe(bar);
    });
  }

});
