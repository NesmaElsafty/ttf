/**
 * Sticky header / burger menu / mobile dropdowns
 * Browser-safe IIFE; attaches once per #ttf-app root.
 */
(function (global) {
  'use strict';

  function initNavigation(root) {
    if (!root || root.__ttfNavInit) return;
    root.__ttfNavInit = true;

    const menu = root.querySelector('#menu');
    const burger = root.querySelector('[data-ttf-burger]');
    const closeBtn = root.querySelector('[data-ttf-close-menu]');

    function toggleMenu() {
      if (!menu) return;
      const open = menu.classList.toggle('open');
      if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (burger) burger.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    root.querySelectorAll('[data-ttf-dropdown-toggle]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const li = link.parentElement;
          if (!li) return;
          const open = li.classList.toggle('open');
          link.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
      });
    });

    // Close drawer when a non-dropdown link is clicked on mobile
    if (menu) {
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          if (window.innerWidth <= 900 && !a.hasAttribute('data-ttf-dropdown-toggle')) {
            menu.classList.remove('open');
            if (burger) burger.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    // Expose for any leftover inline handlers
    global.toggleMenu = toggleMenu;
    global.toggleDropdown = function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
      }
    };
  }

  global.TTF = global.TTF || {};
  global.TTF.initNavigation = initNavigation;
})(typeof window !== 'undefined' ? window : globalThis);
