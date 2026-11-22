/* ===== navigation.js ===== */
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


/* ===== interactions.js ===== */
/**
 * Testimonials tabs, vlogs play/scroll, GHL registration webhook submit
 */
(function (global) {
  'use strict';

  /** Only absolute https URLs verified on the reference funnel / CDN. */
  var VERIFIED_TESTIMONIAL_MP4 =
    'https://storage.googleapis.com/msgsndr/9LHVl0sw8gABEkuoMC1s/media/6950ace7ee1047793af668b6.mp4';

  var TTF_DATA = {
    people: {
      title: 'What People Say About TTF',
      tags: ['Training', 'Consulting', 'Business Solutions'],
      items: [
        {
          type: 'text',
          name: 'Sara Al-Mutairi',
          role: 'HR Manager – FinTech Co.',
          text: "TTF's training elevated our team's performance in just 30 days. Clear content, highly practical.",
          rating: 5,
          img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
        },
        {
          type: 'text',
          name: 'Mohamed El-Sayed',
          role: 'Founder – StartHub',
          text: 'Consulting was precise and realistic. We left with a roadmap that simplified decisions.',
          rating: 5,
          img: '',
        },
      ],
    },
    voices: {
      title: 'Voices from Our Community',
      tags: ['Community', 'Audio', 'TTF Family'],
      items: [
        {
          type: 'audio',
          name: 'Lina H.',
          role: 'Product Manager',
          text: 'Voice note about the weekly circles.',
          img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
          // Reference used /media/voices/lina-note.mp3 — not hosted publicly; no verified URL.
          src: '',
        },
        {
          type: 'audio',
          name: 'Rashid A.',
          role: 'SMB Owner',
          text: 'Quick testimonial.',
          img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
          src: '',
        },
        {
          type: 'audio',
          name: 'Nour B.',
          role: 'Team Lead',
          text: 'On saving time via TTF.',
          img: 'https://images.unsplash.com/photo-1545588201-9403f36c0f48?q=80&w=400&auto=format&fit=crop',
          src: '',
        },
      ],
    },
    real: {
      title: 'Real Feedback, Real Impact',
      tags: ['Impact', 'Videos', 'Case Studies'],
      items: [
        {
          type: 'video',
          provider: 'mp4',
          // Reference "youtube" card mapped to this verified msgsndr MP4 (not a YouTube embed).
          src: VERIFIED_TESTIMONIAL_MP4,
          name: 'Case Study – Ops',
          role: 'COO – Logistics',
        },
        {
          type: 'video',
          provider: 'mp4',
          // Reference path /media/videos/cx-drop-22.mp4 is not publicly hosted.
          src: '',
          name: 'Customer Experience',
          role: 'Head of CX',
        },
      ],
    },
  };

  function isPlayableUrl(src) {
    return typeof src === 'string' && /^https?:\/\//i.test(src.trim());
  }

  function mediaFallback(kind, label) {
    return (
      '<div class="ttf-media-fallback" role="status">' +
      '<span class="ttf-media-fallback-label">' +
      (label || 'Media unavailable') +
      '</span>' +
      '<span class="ttf-media-fallback-hint">' +
      (kind === 'audio'
        ? 'Audio file is not hosted on a verified public URL.'
        : 'Video file is not hosted on a verified public URL.') +
      '</span></div>'
    );
  }

  function stars(n) {
    return '★★★★★'
      .slice(0, n)
      .split('')
      .map(function () {
        return '<span aria-hidden="true">★</span>';
      })
      .join('');
  }

  function cardText(i) {
    return (
      '<article class="ttf-card" tabindex="0" aria-label="' +
      i.name +
      '">' +
      '<div class="ttf-person">' +
      '<img class="ttf-avatar" src="' +
      (i.img || '') +
      '" alt="' +
      i.name +
      '">' +
      '<div><div class="ttf-name">' +
      i.name +
      '</div><div class="ttf-role">' +
      i.role +
      '</div></div></div>' +
      '<div class="ttf-text">' +
      i.text +
      '</div>' +
      (i.rating ? '<div class="ttf-rating" aria-hidden="true">' + stars(i.rating) + '</div>' : '') +
      '</article>'
    );
  }

  function cardAudio(i) {
    var player = isPlayableUrl(i.src)
      ? '<div class="ttf-audio"><audio controls preload="none" src="' +
        i.src +
        '"><track kind="captions"></audio></div>'
      : mediaFallback('audio', 'Audio unavailable');

    return (
      '<article class="ttf-card" tabindex="0" aria-label="Voice from ' +
      i.name +
      '">' +
      '<div class="ttf-person">' +
      '<img class="ttf-avatar" src="' +
      i.img +
      '" alt="' +
      i.name +
      '">' +
      '<div><div class="ttf-name">' +
      i.name +
      '</div><div class="ttf-role">' +
      i.role +
      '</div></div></div>' +
      '<div class="ttf-text">' +
      (i.text || '') +
      '</div>' +
      player +
      '</article>'
    );
  }

  function cardVideo(i) {
    var src = i.src;
    // Legacy reference mapped provider:"youtube" to the verified msgsndr MP4.
    if (!isPlayableUrl(src) && i.provider === 'youtube') {
      src = VERIFIED_TESTIMONIAL_MP4;
    }

    var inner = isPlayableUrl(src)
      ? '<video controls playsinline preload="metadata" src="' +
        src +
        '" title="' +
        (i.name || 'Testimonial video') +
        '">Sorry, your browser does not support embedded videos.</video>'
      : mediaFallback('video', 'Video unavailable');

    return (
      '<article class="ttf-card" tabindex="0" aria-label="Video: ' +
      i.name +
      '">' +
      '<div class="ttf-person"><div><div class="ttf-name">' +
      i.name +
      '</div><div class="ttf-role">' +
      (i.role || '') +
      '</div></div></div>' +
      '<div class="ttf-video">' +
      inner +
      '</div></article>'
    );
  }

  function initTestimonials(root) {
    var $c = root.querySelector('#ttf-component');
    if (!$c || $c.__ttfTestimonialsInit) return;
    $c.__ttfTestimonialsInit = true;

    var grid = $c.querySelector('#ttf-grid');
    var chips = $c.querySelector('#ttf-chips');
    var heading = $c.querySelector('#ttf-heading');
    var count = $c.querySelector('#ttf-count');
    if (!grid || !chips || !heading || !count) return;

    function render(key) {
      var set = TTF_DATA[key];
      if (!set) return;
      heading.textContent = set.title;
      chips.innerHTML = set.tags
        .map(function (t) {
          return '<span class="ttf-chip">' + t + '</span>';
        })
        .join('');
      grid.innerHTML = set.items
        .map(function (i) {
          if (i.type === 'audio') return cardAudio(i);
          if (i.type === 'video') return cardVideo(i);
          return cardText(i);
        })
        .join('');
      count.textContent = '(' + set.items.length + ')';
    }

    render('people');

    $c.querySelectorAll('.ttf-side .ttf-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $c.querySelectorAll('.ttf-side .ttf-btn').forEach(function (b) {
          b.classList.remove('ttf-active');
        });
        btn.classList.add('ttf-active');
        render(btn.dataset.key);
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  function initVlogs(root) {
    var skin = root.querySelector('.ttf-skin');
    if (!skin || skin.__ttfVlogsInit) return;
    skin.__ttfVlogsInit = true;

    var buttons = skin.querySelectorAll('.v-item-btn');
    var cards = skin.querySelectorAll('.ghl-v-card');

    function setActive(idx) {
      buttons.forEach(function (b) {
        b.classList.remove('ttf-active');
      });
      if (buttons[idx]) buttons[idx].classList.add('ttf-active');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        var target = skin.querySelector('.ghl-v-card[data-index="' + idx + '"]');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setActive(idx);
        }
      });
    });

    cards.forEach(function (card) {
      var idx = parseInt(card.getAttribute('data-index'), 10);
      card.addEventListener('mouseenter', function () {
        setActive(idx);
      });
    });

    skin.querySelectorAll('.thumbnail').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var videoUrl = thumb.getAttribute('data-video');
        if (!isPlayableUrl(videoUrl)) return;
        var video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        video.autoplay = true;
        video.setAttribute('playsinline', 'true');
        thumb.replaceWith(video);
      });
    });
  }

  function setFormStatus(el, message, kind) {
    if (!el) return;
    if (!message) {
      el.hidden = true;
      el.textContent = '';
      el.removeAttribute('data-kind');
      return;
    }
    el.hidden = false;
    el.textContent = message;
    el.setAttribute('data-kind', kind || 'info');
  }

  function initRegistration(root) {
    var form = root.querySelector('[data-ttf-registration-form]');
    if (!form || form.__ttfFormInit) return;

    // Native GHL embed inside the slot — leave alone (no fake handler).
    if (form.hasAttribute('data-ghl-native-embed') || form.querySelector('.hl-form, .ghl-form-embed, iframe[src*="leadconnector"], iframe[src*="msgsndr"]')) {
      return;
    }

    form.__ttfFormInit = true;

    var statusEl = form.querySelector('[data-ttf-form-status]');
    var submitBtn = form.querySelector('[type="submit"]');
    var webhook =
      (form.getAttribute('data-ghl-webhook') || '').trim() ||
      'https://services.leadconnectorhq.com/hooks/9LHVl0sw8gABEkuoMC1s/webhook-trigger/28d257a9-5c8b-42fd-9279-3d3e72166ef7';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setFormStatus(statusEl, '', '');

      var name = (form.name && form.name.value ? form.name.value : '').trim();
      var email = (form.email && form.email.value ? form.email.value : '').trim();
      var whatsapp = (form.whatsapp && form.whatsapp.value ? form.whatsapp.value : '').trim();

      if (!name || !email || !whatsapp) {
        setFormStatus(statusEl, 'Please fill in all required fields.', 'error');
        return;
      }

      if (!webhook) {
        setFormStatus(
          statusEl,
          'Form is not connected. Set data-ghl-webhook or paste a native GHL form embed.',
          'error',
        );
        return;
      }

      var payload = {
        name: name,
        email: email,
        whatsapp: whatsapp,
        source: 'TTF Glass CTA (no-bg)',
      };

      if (submitBtn) submitBtn.disabled = true;
      setFormStatus(statusEl, 'Submitting…', 'pending');

      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) {
            throw new Error('HTTP ' + res.status);
          }
          setFormStatus(statusEl, 'Thank you! Your info has been sent successfully.', 'success');
          form.reset();
        })
        .catch(function (err) {
          console.error('[TTF] Registration submit failed', err);
          setFormStatus(
            statusEl,
            'Submission failed. Please try again or contact support.',
            'error',
          );
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  function initInteractions(root) {
    if (!root) return;
    initTestimonials(root);
    initVlogs(root);
    initRegistration(root);
    root.__ttfInteractionsInit = true;
  }

  global.TTF = global.TTF || {};
  global.TTF.initInteractions = initInteractions;
  global.TTF.TTF_DATA = TTF_DATA;
  global.TTF.VERIFIED_TESTIMONIAL_MP4 = VERIFIED_TESTIMONIAL_MP4;
})(typeof window !== 'undefined' ? window : globalThis);


/* ===== main.js ===== */
/**
 * TTF app bootstrap — safe for Vite ESM and GHL classic IIFE paste.
 * Waits for #ttf-app (supports delayed GHL Custom Code mount).
 * Initializes once; guards Ziko chatbot against double init.
 */
(function (global) {
  'use strict';

  var ZIKO_CDN = 'https://cdn.n8nchatui.com/v1/pole-embed-yard.js';
  var ZIKO_CONFIG = {
    n8nChatUrl: 'https://diginovia-ai.cloud/webhook/95be99e1-07d2-4b95-ba6d-3c0043b83cc2/chat',
    metadata: {},
    theme: {
      button: {
        backgroundColor: '#EFF1F4',
        right: 20,
        bottom: 20,
        size: 59,
        iconColor: '#ffffff',
        customIconSrc: 'https://keyworld.technology/wp-content/uploads/chatbot_images/ziko_chatbot_icon-003.png',
        customIconSize: 94,
        customIconBorderRadius: 10,
        autoWindowOpen: { autoOpen: false, openDelay: 2 },
        borderRadius: 'rounded',
      },
      tooltip: {
        showTooltip: true,
        tooltipMessage: "Hello! I'm Ziko your AI Assistant",
        tooltipBackgroundColor: '#ffffff',
        tooltipTextColor: '#CBD0D8',
        tooltipFontSize: 13,
        hideTooltipOnMobile: true,
      },
      customCSS: '.n8n-chat-ui-bot-header { background: rgb(200 205 213) !important}',
      direction: 'ltr',
      allowProgrammaticMessage: true,
      consentScreen: {
        enabled: false,
        title: 'User Agreement',
        message:
          "By using this chatbot, you agree to our\n<p><a href='/terms' target='_blank' style='color: black; text-decoration: underline; text-decoration-color: black;'>Terms & Conditions</a></p>",
        textColor: '#1e1e1f',
        acceptButtonColor: '#f36539',
        acceptButtonTextColor: '#ffffff',
        acceptButtonText: 'Agree & Start Chatting',
        backgroundColor: '#ffffff',
        backdropColor: '#00000',
      },
      chatWindow: {
        borderRadiusStyle: 'rounded',
        avatarBorderRadius: 25,
        messageBorderRadius: 6,
        showTitle: true,
        title: 'Ziko زيكو',
        titleAvatarSrc: 'https://keyworld.technology/wp-content/uploads/chatbot_images/ziko_chatbot_icon-003.png',
        avatarSize: 40,
        welcomeMessage: 'Hello! I can help you explore KWT',
        errorMessage: 'Something was wrong please try again or contact support at +201116077755',
        backgroundColor: '#f7f7f7',
        height: 480,
        width: 400,
        fontSize: 14,
        starterPrompts: [
          'KWT Services?',
          'TTF Programs & Services?',
          'Who You Are?',
          'About Dr. Wael Fathy?',
          'خدمات كي ورلد تكنولوجي?',
          'خدمات تك تايتنز فاكتوري?',
          'من أنتم ؟',
          'مين وائل فتحي ؟',
        ],
        starterPromptFontSize: 14,
        renderHTML: true,
        clearChatOnReload: true,
        showScrollbar: false,
        botMessage: {
          backgroundColor: '#E4FF10',
          textColor: '#1B2029',
          showAvatar: false,
          avatarSrc: 'https://www.svgrepo.com/show/334455/bot.svg',
          showCopyToClipboardIcon: true,
        },
        userMessage: {
          backgroundColor: '#EFF1F4',
          textColor: '#1B2029',
          showAvatar: false,
          avatarSrc: 'https://www.svgrepo.com/show/532363/user-alt-1.svg',
        },
        textInput: {
          placeholder: 'Type your query',
          backgroundColor: '#ffffff',
          textColor: '#1B2029',
          sendButtonColor: '#E0E61A',
          maxChars: 500,
          maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 500 characters.',
          autoFocus: true,
          borderRadius: 6,
          sendButtonBorderRadius: 50,
        },
        footer: {
          text: 'Powered By',
          company: 'Diginovia',
          companyLink: 'https://diginovia.com',
          textColor: '#1B2029',
        },
        voiceInputConfig: {
          enabled: true,
          maxRecordingTime: 10,
          recordingNotSupportedMessage:
            'To record audio, use modern browsers like Chrome or Firefox that support audio recording',
          microphoneAccessErrorMessage:
            'Microphone access is required to record audio. Please allow microphone access in your browser settings',
        },
      },
    },
  };

  var BOOT_INTERVAL_MS = 100;
  var BOOT_MAX_ATTEMPTS = 50; // ~5s for delayed GHL mount
  var ZIKO_RTL_MAX_ATTEMPTS = 40; // ~20s then stop

  /** Safe dynamic import that does not break classic-script parsers */
  function dynamicImport(url) {
    try {
      return new Function('u', 'return import(u)')(url);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function initZikoRtlGuard() {
    if (global.__ttfZikoRtlGuard) return;
    global.__ttfZikoRtlGuard = true;

    var RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    var WIDGET_SELECTOR = 'n8nchatui-popup';
    var attempts = 0;

    function applyShadowStyles(shadowRoot, direction) {
      var styleTag = shadowRoot.getElementById('dynamic-rtl-styles');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-rtl-styles';
        shadowRoot.appendChild(styleTag);
      }
      if (direction === 'rtl') {
        styleTag.innerHTML =
          '.chatbot-host-bubble{direction:rtl!important;text-align:right!important;}textarea{direction:rtl!important;text-align:right!important;}';
      } else {
        styleTag.innerHTML =
          '.chatbot-host-bubble{direction:ltr!important;text-align:left!important;}textarea{direction:ltr!important;text-align:left!important;}';
      }
    }

    function initWidgetObserver() {
      if (global.__ttfZikoRtlReady) return;
      var widgetHost = document.querySelector(WIDGET_SELECTOR);
      if (!widgetHost || !widgetHost.shadowRoot) {
        attempts += 1;
        if (attempts >= ZIKO_RTL_MAX_ATTEMPTS) return;
        setTimeout(initWidgetObserver, 500);
        return;
      }

      global.__ttfZikoRtlReady = true;
      var shadow = widgetHost.shadowRoot;
      var shadowObserver = new MutationObserver(function () {
        var textarea = shadow.querySelector('textarea');
        if (textarea && !textarea.dataset.rtlListenerAttached) {
          textarea.dataset.rtlListenerAttached = 'true';
          textarea.addEventListener('input', function (e) {
            var text = e.target.value;
            if (!text) return;
            var isRTL = RTL_REGEX.test(text);
            var currentDir = textarea.dataset.dir;
            if (isRTL && currentDir !== 'rtl') {
              applyShadowStyles(shadow, 'rtl');
              textarea.dataset.dir = 'rtl';
            } else if (!isRTL && currentDir !== 'ltr') {
              applyShadowStyles(shadow, 'ltr');
              textarea.dataset.dir = 'ltr';
            }
          });
        }
      });
      shadowObserver.observe(shadow, { childList: true, subtree: true });
    }

    initWidgetObserver();
  }

  function runChatbotInit(Chatbot) {
    if (!Chatbot || typeof Chatbot.init !== 'function') return;
    if (global.__ttfZikoStarted) return;
    if (document.querySelector('n8nchatui-popup')) {
      global.__ttfZikoStarted = true;
      initZikoRtlGuard();
      return;
    }
    global.__ttfZikoStarted = true;
    try {
      Chatbot.init(ZIKO_CONFIG);
      initZikoRtlGuard();
    } catch (err) {
      console.error('[TTF] Ziko init failed', err);
      global.__ttfZikoStarted = false;
    }
  }

  function initZiko() {
    if (global.__ttfZikoInit) return;
    global.__ttfZikoInit = true;

    dynamicImport(ZIKO_CDN)
      .then(function (mod) {
        runChatbotInit(mod && (mod.default || mod));
      })
      .catch(function () {
        if (document.querySelector('script[data-ttf-ziko-cdn]')) {
          dynamicImport(ZIKO_CDN)
            .then(function (mod) {
              runChatbotInit(mod && (mod.default || mod));
            })
            .catch(function () {
              runChatbotInit(global.Chatbot);
            });
          return;
        }
        var s = document.createElement('script');
        s.src = ZIKO_CDN;
        s.type = 'module';
        s.dataset.ttfZikoCdn = '1';
        s.onload = function () {
          dynamicImport(ZIKO_CDN)
            .then(function (mod) {
              runChatbotInit(mod && (mod.default || mod));
            })
            .catch(function () {
              runChatbotInit(global.Chatbot);
            });
        };
        document.head.appendChild(s);
      });
  }

  function initHeroEntrance(root) {
    var hero = root.querySelector('[data-ttf-hero]');
    if (!hero || hero.__ttfHeroAnim) return;
    hero.__ttfHeroAnim = true;

    var reduce =
      global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      hero.classList.add('ttf-hero--entered');
      return;
    }

    // Double rAF so initial opacity:0 paints before fadeInUp starts (GHL Animate.css behavior).
    global.requestAnimationFrame(function () {
      global.requestAnimationFrame(function () {
        hero.classList.add('ttf-hero--entered');
      });
    });
  }

  function bootstrapRoot(root) {
    if (!root || root.__ttfBootstrapped) return false;
    root.__ttfBootstrapped = true;

    if (global.TTF && typeof global.TTF.initNavigation === 'function') {
      global.TTF.initNavigation(root);
    }
    if (global.TTF && typeof global.TTF.initInteractions === 'function') {
      global.TTF.initInteractions(root);
    }

    initHeroEntrance(root);
    initZiko();
    return true;
  }

  function tryInitApp() {
    var root = document.getElementById('ttf-app');
    if (!root) return false;
    return bootstrapRoot(root);
  }

  function scheduleInit() {
    if (global.__ttfBootScheduled) return;
    global.__ttfBootScheduled = true;

    if (tryInitApp()) return;

    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      if (tryInitApp() || attempts >= BOOT_MAX_ATTEMPTS) {
        clearInterval(timer);
        if (!document.getElementById('ttf-app')) {
          console.warn('[TTF] #ttf-app not found after delayed wait');
        }
      }
    }, BOOT_INTERVAL_MS);
  }

  function initApp() {
    scheduleInit();
  }

  global.TTF = global.TTF || {};
  global.TTF.init = initApp;
  global.TTF.initZiko = initZiko;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInit, { once: true });
  } else {
    scheduleInit();
  }
})(typeof window !== 'undefined' ? window : globalThis);
