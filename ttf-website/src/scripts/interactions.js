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
