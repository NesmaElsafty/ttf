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

    if (global.TTF && typeof global.TTF.initI18n === 'function') {
      global.TTF.initI18n(root);
    }
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
