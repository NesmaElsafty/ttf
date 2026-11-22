/**
 * Testimonials tabs, vlogs play/scroll, registration UX validation
 */
(function (global) {
  'use strict';

  const TTF_DATA = {
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
          src: '/media/voices/lina-note.mp3',
        },
        {
          type: 'audio',
          name: 'Rashid A.',
          role: 'SMB Owner',
          text: 'Quick testimonial.',
          img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
          src: '/media/voices/rashid-short.m4a',
        },
        {
          type: 'audio',
          name: 'Nour B.',
          role: 'Team Lead',
          text: 'On saving time via TTF.',
          img: 'https://images.unsplash.com/photo-1545588201-9403f36c0f48?q=80&w=400&auto=format&fit=crop',
          src: '/media/voices/nour-feedback.ogg',
        },
      ],
    },
    real: {
      title: 'Real Feedback, Real Impact',
      tags: ['Impact', 'Videos', 'Case Studies'],
      items: [
        {
          type: 'video',
          provider: 'youtube',
          youtubeId: 'dQw4w9WgXcQ',
          name: 'Case Study – Ops',
          role: 'COO – Logistics',
        },
        {
          type: 'video',
          provider: 'mp4',
          src: '/media/videos/cx-drop-22.mp4',
          name: 'Customer Experience',
          role: 'Head of CX',
        },
      ],
    },
  };

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
      '<div class="ttf-audio"><audio controls preload="none" src="' +
      i.src +
      '"></audio></div></article>'
    );
  }

  function cardVideo(i) {
    var inner =
      i.provider === 'youtube'
        ? '<iframe src="https://storage.googleapis.com/msgsndr/9LHVl0sw8gABEkuoMC1s/media/6950ace7ee1047793af668b6.mp4" title="' +
          i.name +
          '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        : '<video controls preload="none" src="' + i.src + '"></video>';
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
        var video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        video.autoplay = true;
        video.setAttribute('playsinline', 'true');
        thumb.replaceWith(video);
      });
    });
  }

  function initRegistration(root) {
    var form = root.querySelector('[data-ttf-registration-form]');
    if (!form || form.__ttfFormInit) return;
    form.__ttfFormInit = true;

    var hint = form.querySelector('.ttfns-ghl-hint');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (form.name && form.name.value ? form.name.value : '').trim();
      var email = (form.email && form.email.value ? form.email.value : '').trim();
      var whatsapp = (form.whatsapp && form.whatsapp.value ? form.whatsapp.value : '').trim();

      if (!name || !email || !whatsapp) {
        alert('Please fill in all required fields.');
        return;
      }

      // Native GHL form embed should replace this placeholder for production submissions.
      if (hint) hint.hidden = false;
      alert(
        'Thanks! This layout form is a placeholder. Insert the native GoHighLevel form into [data-ghl-form="registration"] for live submissions.',
      );
    });
  }

  function initInteractions(root) {
    if (!root || root.__ttfInteractionsInit) return;
    root.__ttfInteractionsInit = true;
    initTestimonials(root);
    initVlogs(root);
    initRegistration(root);
  }

  global.TTF = global.TTF || {};
  global.TTF.initInteractions = initInteractions;
  global.TTF.TTF_DATA = TTF_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
