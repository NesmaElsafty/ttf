/**
 * Testimonials tabs, vlogs play/scroll, GHL registration webhook submit
 */
(function (global) {
  'use strict';

  /** Only absolute https URLs verified on the reference funnel / CDN. */
  var VERIFIED_TESTIMONIAL_MP4 =
    'https://storage.googleapis.com/msgsndr/9LHVl0sw8gABEkuoMC1s/media/6950ace7ee1047793af668b6.mp4';

  var TTF_DATA_I18N = {
    en: {
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
            src: VERIFIED_TESTIMONIAL_MP4,
            name: 'Case Study – Ops',
            role: 'COO – Logistics',
          },
          {
            type: 'video',
            provider: 'mp4',
            src: '',
            name: 'Customer Experience',
            role: 'Head of CX',
          },
        ],
      },
    },
    ar: {
      people: {
        title: 'ماذا يقول الناس عن TTF',
        tags: ['تدريب', 'استشارات', 'حلول أعمال'],
        items: [
          {
            type: 'text',
            name: 'سارة المطيري',
            role: 'مديرة موارد بشرية – شركة تقنية مالية',
            text: 'رفع تدريب TTF أداء فريقنا خلال 30 يومًا فقط. محتوى واضح وعملي جدًا.',
            rating: 5,
            img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
          },
          {
            type: 'text',
            name: 'محمد السيد',
            role: 'مؤسس – StartHub',
            text: 'الاستشارات كانت دقيقة وواقعية. خرجنا بخارطة طريق سهّلت قراراتنا.',
            rating: 5,
            img: '',
          },
        ],
      },
      voices: {
        title: 'أصوات من مجتمعنا',
        tags: ['المجتمع', 'صوتيات', 'عائلة TTF'],
        items: [
          {
            type: 'audio',
            name: 'لينا ح.',
            role: 'مديرة منتج',
            text: 'ملاحظة صوتية عن اللقاءات الأسبوعية.',
            img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
            src: '',
          },
          {
            type: 'audio',
            name: 'راشد ع.',
            role: 'صاحب منشأة صغيرة',
            text: 'شهادة سريعة.',
            img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
            src: '',
          },
          {
            type: 'audio',
            name: 'نور ب.',
            role: 'قائدة فريق',
            text: 'عن توفير الوقت عبر TTF.',
            img: 'https://images.unsplash.com/photo-1545588201-9403f36c0f48?q=80&w=400&auto=format&fit=crop',
            src: '',
          },
        ],
      },
      real: {
        title: 'ملاحظات حقيقية… أثر حقيقي',
        tags: ['أثر', 'فيديوهات', 'دراسات حالة'],
        items: [
          {
            type: 'video',
            provider: 'mp4',
            src: VERIFIED_TESTIMONIAL_MP4,
            name: 'دراسة حالة – العمليات',
            role: 'مدير العمليات – لوجستيات',
          },
          {
            type: 'video',
            provider: 'mp4',
            src: '',
            name: 'تجربة العملاء',
            role: 'رئيس تجربة العملاء',
          },
        ],
      },
    },
  };

  function ttfT(key) {
    return global.TTF && typeof global.TTF.t === 'function' ? global.TTF.t(key) : key;
  }

  function getTtfData() {
    var lang = global.TTF && typeof global.TTF.getLang === 'function' ? global.TTF.getLang() : 'en';
    return TTF_DATA_I18N[lang] || TTF_DATA_I18N.en;
  }

  var TTF_DATA = TTF_DATA_I18N.en;

  function isPlayableUrl(src) {
    return typeof src === 'string' && /^https?:\/\//i.test(src.trim());
  }

  function mediaFallback(kind, label) {
    return (
      '<div class="ttf-media-fallback" role="status">' +
      '<span class="ttf-media-fallback-label">' +
      (label || ttfT('media.unavailable')) +
      '</span>' +
      '<span class="ttf-media-fallback-hint">' +
      (kind === 'audio' ? ttfT('media.audioHint') : ttfT('media.videoHint')) +
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

  // GHL Animate.css fadeInDown — once when each marked heading scrolls into view
  function initFadeInDownHeadings(root) {
    var nodes = root.querySelectorAll(
      '[data-ttf-fade-in-down], .ttf-social-proof-heading, .ttf-vlogs-heading',
    );
    if (!nodes.length) return;

    var reduce =
      global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Array.prototype.forEach.call(nodes, function (title) {
      if (title.__ttfHeadingAnim) return;
      title.__ttfHeadingAnim = true;

      if (reduce) {
        title.classList.add('ttf-anim-in');
        return;
      }

      title.classList.add('ttf-anim-ready');

      if (typeof global.IntersectionObserver === 'function') {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              title.classList.add('ttf-anim-in');
              io.disconnect();
            });
          },
          { threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
        );
        io.observe(title);
      } else {
        title.classList.add('ttf-anim-in');
      }
    });
  }

  function initTestimonials(root) {
    var $c = root.querySelector('#ttf-component');
    if (!$c || $c.__ttfTestimonialsInit) return;
    $c.__ttfTestimonialsInit = true;

    var grid = $c.querySelector('#ttf-grid');
    var chips = $c.querySelector('#ttf-chips');
    var heading = $c.querySelector('#ttf-heading');
    var count = $c.querySelector('#ttf-count');
    var scroller = $c.querySelector('.ttf-scroll');
    if (!grid || !chips || !heading || !count) return;

    function activeKey() {
      var active = $c.querySelector('.ttf-side .ttf-btn.ttf-active');
      return (active && active.dataset.key) || 'people';
    }

    function render(key) {
      var data = getTtfData();
      var set = data[key];
      if (!set) return;
      heading.textContent = set.title;
      chips.innerHTML = set.tags
        .map(function (tag) {
          return '<span class="ttf-chip">' + tag + '</span>';
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
      if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
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

    root.addEventListener('ttf:langchange', function () {
      render(activeKey());
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
        setFormStatus(statusEl, ttfT('cta.errRequired'), 'error');
        return;
      }

      if (!webhook) {
        setFormStatus(statusEl, ttfT('cta.errWebhook'), 'error');
        return;
      }

      var payload = {
        name: name,
        email: email,
        whatsapp: whatsapp,
        source: 'TTF Glass CTA (no-bg)',
      };

      if (submitBtn) submitBtn.disabled = true;
      setFormStatus(statusEl, ttfT('cta.pending'), 'pending');

      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) {
            throw new Error('HTTP ' + res.status);
          }
          setFormStatus(statusEl, ttfT('cta.success'), 'success');
          form.reset();
        })
        .catch(function (err) {
          console.error('[TTF] Registration submit failed', err);
          setFormStatus(statusEl, ttfT('cta.fail'), 'error');
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
    initFadeInDownHeadings(root);
    initRegistration(root);
    root.__ttfInteractionsInit = true;
  }

  global.TTF = global.TTF || {};
  global.TTF.initInteractions = initInteractions;
  global.TTF.TTF_DATA = TTF_DATA;
  global.TTF.TTF_DATA_I18N = TTF_DATA_I18N;
  global.TTF.getTtfData = getTtfData;
  global.TTF.VERIFIED_TESTIMONIAL_MP4 = VERIFIED_TESTIMONIAL_MP4;
})(typeof window !== 'undefined' ? window : globalThis);
