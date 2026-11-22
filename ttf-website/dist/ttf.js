/* ===== i18n.js ===== */
/**
 * EN / AR i18n + RTL switcher for #ttf-app
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'ttf-lang';
  var DEFAULT_LANG = 'en';

  var STRINGS = {
    en: {
      'nav.home': 'Home Page',
      'nav.about': 'About Us ▾',
      'nav.aboutTtf': 'About TTF',
      'nav.aboutWael': 'About Eng. Wael Fathy',
      'nav.coreValues': 'Core Values',
      'nav.vision': 'Our Vision',
      'nav.mission': 'Our Mission',
      'nav.services': 'Services ▾',
      'nav.training': 'Training Programs',
      'nav.consulting': 'Consulting Services',
      'nav.content': 'Content Creation',
      'nav.setup': 'All-in-One Business Setup',
      'nav.vlog': 'Vlog',
      'nav.members': 'Members Area',
      'nav.contact': 'Contact Us',
      'nav.openMenu': 'Open menu',
      'nav.closeMenu': 'Close menu',
      'nav.primary': 'Primary',
      'lang.group': 'Language',
      'lang.en': 'EN',
      'lang.ar': 'AR',

      'hero.decoding': 'DECODING',
      'hero.success': 'SUCCESS',
      'hero.alt': 'Wael Fathy',

      'about.label': 'ABOUT',
      'about.p1':
        'Founded by IT master hand Wael Fathy. Tech Titans Factory was born out of our belief that Information Technology and',
      'about.p2':
        'Business Information Systems are more than just technicalities, it’s about holistic personal growth and development and',
      'about.p3': 'achieving excellence in every part of your career. We’re here to equip you ...',
      'about.more': 'Read More',

      'partners.label': 'PARTNERS',
      'partners.heading': 'WHO WE WORK WITH',

      'social.heading': 'Testimonials & Social Proof',
      'testimonials.brand': 'Testimonials',
      'testimonials.note': 'Pick a heading to view matching testimonials.',
      'testimonials.people': 'What People Say About TTF',
      'testimonials.peopleSub': 'General praise & highlights',
      'testimonials.voices': 'Voices from Our Community',
      'testimonials.voicesSub': 'Uploadable voice notes',
      'testimonials.real': 'Real Feedback, Real Impact',
      'testimonials.realSub': 'Videos / case studies',
      'testimonials.new': 'NEW',
      'media.unavailable': 'Media unavailable',
      'media.audioHint': 'Audio file is not hosted on a verified public URL.',
      'media.videoHint': 'Video file is not hosted on a verified public URL.',

      'vlogs.heading': 'Our Vlogs',
      'vlogs.latest': 'Latest Vlogs',
      'vlogs.note':
        'Exclusive vlogs covering travels, behind-the-scenes, and life hacks. Click a title to jump or scroll the videos.',
      'vlogs.v1': 'Video One',
      'vlogs.v2': 'Video Two',
      'vlogs.v3': 'Video Three',
      'vlogs.v4': 'Video Four',
      'vlogs.v1Text':
        'Join me on an incredible journey through breathtaking landscapes and hidden gems.',
      'vlogs.v2Text':
        'An exclusive look at how ideas turn into content, from sketches to final edits.',
      'vlogs.v3Text':
        'Practical tips and tricks that make everyday life easier and more efficient.',
      'vlogs.v4Text': 'Start your day right with this complete guide to a productive routine.',

      'marketing.heading': 'OUR EXCEPTIONAL MARKETING TEAM',
      'marketing.desc':
        'Our team consists of highly skilled professionals with deep expertise in web design, e-commerce, web analytics, SEO, and PPC. We are committed to delivering exceptional results for our clients.',
      'marketing.expertise': 'Expertise',
      'marketing.collab': 'Collaboration',
      'marketing.results': 'Results-Driven',
      'marketing.btn': 'OUR SERVICES',

      'programs.heading': 'Our Programs',
      'programs.p1Title': 'Business Information Systems',
      'programs.p1Text':
        'From Technical Mastery to Strategic Impact. Learn to align technology with business goals for powerful results.',
      'programs.p2Title': 'The Smart Customer Service',
      'programs.p2Text':
        'Develop strategies for exceptional customer experiences and build loyalty through intelligent systems.',
      'programs.p3Title': 'From Trainer to Business Leader',
      'programs.p3Text':
        'Transition your training expertise into business leadership and strategic influence within your industry.',
      'programs.p4Title': 'The Golden Nuggets in the IT World',
      'programs.p4Text':
        'Discover essential insights, methods, and best practices that shape success in the modern IT ecosystem.',
      'programs.more': 'Read More',

      'newsletter.eyebrow': 'Stay in the loop',
      'newsletter.title': 'Join our Newsletter',
      'newsletter.text':
        'Short, valuable updates from TTF — insights, tips, and hand-picked videos that truly help you grow.',

      'cta.title': 'Take Action with TTF',
      'cta.ig': 'Get daily motivation',
      'cta.yt': 'Watch TTF Show',
      'cta.email': 'Video to your email',
      'cta.note':
        'Enter your contact details below to receive TTF’s latest updates and valuable insights instantly.',
      'cta.name': 'Full Name',
      'cta.emailPh': 'Email Address',
      'cta.whatsapp': 'WhatsApp Number (with country code)',
      'cta.submit': 'Register Now',
      'cta.errRequired': 'Please fill in all required fields.',
      'cta.errWebhook':
        'Form is not connected. Set data-ghl-webhook or paste a native GHL form embed.',
      'cta.pending': 'Submitting…',
      'cta.success': 'Thank you! Your info has been sent successfully.',
      'cta.fail': 'Submission failed. Please try again or contact support.',

      'footer.desc':
        'Empowering businesses with cutting-edge training, consulting, and digital solutions. Stay ahead with TTF insights and innovation.',
      'footer.explore': 'Explore',
      'footer.support': 'Support',
      'footer.home': 'Home',
      'footer.about': 'About Us',
      'footer.services': 'Services',
      'footer.vlog': 'Vlog',
      'footer.members': 'Members Area',
      'footer.contact': 'Contact Us',
      'footer.privacy': 'Privacy Policy',
      'footer.refund': 'Refund Policy',
      'footer.copy': '© 2025 Tech Titans Factory. All rights reserved.',
      'footer.social': 'Social media',
    },
    ar: {
      'nav.home': 'الصفحة الرئيسية',
      'nav.about': 'من نحن ▾',
      'nav.aboutTtf': 'عن تي تك تيتانز',
      'nav.aboutWael': 'عن م. وائل فتحي',
      'nav.coreValues': 'قيمنا الأساسية',
      'nav.vision': 'رؤيتنا',
      'nav.mission': 'رسالتنا',
      'nav.services': 'خدماتنا ▾',
      'nav.training': 'برامج التدريب',
      'nav.consulting': 'خدمات الاستشارات',
      'nav.content': 'صناعة المحتوى',
      'nav.setup': 'تأسيس الأعمال المتكامل',
      'nav.vlog': 'الفلوغ',
      'nav.members': 'منطقة الأعضاء',
      'nav.contact': 'تواصل معنا',
      'nav.openMenu': 'فتح القائمة',
      'nav.closeMenu': 'إغلاق القائمة',
      'nav.primary': 'القائمة الرئيسية',
      'lang.group': 'اللغة',
      'lang.en': 'EN',
      'lang.ar': 'ع',

      'hero.decoding': 'فك شفرة',
      'hero.success': 'النجاح',
      'hero.alt': 'وائل فتحي',

      'about.label': 'من نحن',
      'about.p1':
        'تأسست على يد خبير تقنية المعلومات وائل فتحي. وُلدت Tech Titans Factory من إيماننا بأن تقنية المعلومات و',
      'about.p2':
        'نظم معلومات الأعمال أكثر من مجرد تفاصيل تقنية؛ إنها نمو شخصي متكامل وتطوير و',
      'about.p3': 'تحقيق التميّز في كل جانب من مسارك المهني. نحن هنا لنجهّزك ...',
      'about.more': 'اقرأ المزيد',

      'partners.label': 'شركاؤنا',
      'partners.heading': 'من نعمل معهم',

      'social.heading': 'آراء العملاء والإثبات الاجتماعي',
      'testimonials.brand': 'الشهادات',
      'testimonials.note': 'اختر عنوانًا لعرض الشهادات المطابقة.',
      'testimonials.people': 'ماذا يقول الناس عن TTF',
      'testimonials.peopleSub': 'إشادات عامة وأبرز النقاط',
      'testimonials.voices': 'أصوات من مجتمعنا',
      'testimonials.voicesSub': 'ملاحظات صوتية قابلة للرفع',
      'testimonials.real': 'ملاحظات حقيقية… أثر حقيقي',
      'testimonials.realSub': 'فيديوهات / دراسات حالة',
      'testimonials.new': 'جديد',
      'media.unavailable': 'الوسائط غير متاحة',
      'media.audioHint': 'ملف الصوت غير مستضاف على رابط عام موثّق.',
      'media.videoHint': 'ملف الفيديو غير مستضاف على رابط عام موثّق.',

      'vlogs.heading': 'فلوغاتنا',
      'vlogs.latest': 'أحدث الفلوغات',
      'vlogs.note':
        'فلوغات حصرية تغطي السفر وكواليس العمل ونصائح الحياة. انقر عنوانًا للانتقال أو مرّر بين الفيديوهات.',
      'vlogs.v1': 'الفيديو الأول',
      'vlogs.v2': 'الفيديو الثاني',
      'vlogs.v3': 'الفيديو الثالث',
      'vlogs.v4': 'الفيديو الرابع',
      'vlogs.v1Text': 'انضم إليّ في رحلة مذهلة عبر مناظر خلّابة وجواهر مخفية.',
      'vlogs.v2Text': 'نظرة حصرية على تحوّل الأفكار إلى محتوى، من المسودات إلى التعديل النهائي.',
      'vlogs.v3Text': 'نصائح عملية تجعل حياتك اليومية أسهل وأكثر كفاءة.',
      'vlogs.v4Text': 'ابدأ يومك بالطريقة الصحيحة مع هذا الدليل الكامل لروتين إنتاجي.',

      'marketing.heading': 'فريق التسويق الاستثنائي لدينا',
      'marketing.desc':
        'يتألف فريقنا من محترفين ذوي مهارات عالية وخبرة عميقة في تصميم المواقع والتجارة الإلكترونية وتحليلات الويب وتحسين محركات البحث والإعلانات المدفوعة. نلتزم بتقديم نتائج استثنائية لعملائنا.',
      'marketing.expertise': 'الخبرة',
      'marketing.collab': 'التعاون',
      'marketing.results': 'التركيز على النتائج',
      'marketing.btn': 'خدماتنا',

      'programs.heading': 'برامجنا',
      'programs.p1Title': 'نظم معلومات الأعمال',
      'programs.p1Text':
        'من الإتقان التقني إلى الأثر الاستراتيجي. تعلّم مواءمة التقنية مع أهداف الأعمال لتحقيق نتائج قوية.',
      'programs.p2Title': 'خدمة العملاء الذكية',
      'programs.p2Text':
        'طوّر استراتيجيات لتجارب عملاء استثنائية وابنِ الولاء عبر أنظمة ذكية.',
      'programs.p3Title': 'من مدرّب إلى قائد أعمال',
      'programs.p3Text':
        'حوّل خبرتك التدريبية إلى قيادة أعمال وتأثير استراتيجي داخل قطاعك.',
      'programs.p4Title': 'كنوز ذهبية في عالم تقنية المعلومات',
      'programs.p4Text':
        'اكتشف رؤى وأساليب وممارسات أساسية تشكّل النجاح في منظومة تقنية المعلومات الحديثة.',
      'programs.more': 'اقرأ المزيد',

      'newsletter.eyebrow': 'ابقَ على اطلاع',
      'newsletter.title': 'انضم إلى نشرتنا البريدية',
      'newsletter.text':
        'تحديثات قصيرة وقيمة من TTF — رؤى ونصائح وفيديوهات مختارة تساعدك على النمو حقًا.',

      'cta.title': 'اتخذ خطوة مع TTF',
      'cta.ig': 'احصل على تحفيز يومي',
      'cta.yt': 'شاهد عرض TTF',
      'cta.email': 'فيديو إلى بريدك',
      'cta.note':
        'أدخل بيانات التواصل أدناه لتصلك أحدث تحديثات TTF ورؤاها القيّمة فورًا.',
      'cta.name': 'الاسم الكامل',
      'cta.emailPh': 'البريد الإلكتروني',
      'cta.whatsapp': 'رقم واتساب (مع رمز الدولة)',
      'cta.submit': 'سجّل الآن',
      'cta.errRequired': 'يرجى تعبئة جميع الحقول المطلوبة.',
      'cta.errWebhook':
        'النموذج غير متصل. اضبط data-ghl-webhook أو الصق نموذج GHL الأصلي.',
      'cta.pending': 'جارٍ الإرسال…',
      'cta.success': 'شكرًا لك! تم إرسال بياناتك بنجاح.',
      'cta.fail': 'فشل الإرسال. حاول مرة أخرى أو تواصل مع الدعم.',

      'footer.desc':
        'نمكّن الشركات عبر تدريب واستشارات وحلول رقمية متقدمة. ابقَ في الصدارة مع رؤى وابتكار TTF.',
      'footer.explore': 'استكشف',
      'footer.support': 'الدعم',
      'footer.home': 'الرئيسية',
      'footer.about': 'من نحن',
      'footer.services': 'الخدمات',
      'footer.vlog': 'الفلوغ',
      'footer.members': 'منطقة الأعضاء',
      'footer.contact': 'تواصل معنا',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.refund': 'سياسة الاسترجاع',
      'footer.copy': '© 2025 Tech Titans Factory. جميع الحقوق محفوظة.',
      'footer.social': 'وسائل التواصل',
    },
  };

  var currentLang = DEFAULT_LANG;

  function normalizeLang(lang) {
    return lang === 'ar' ? 'ar' : 'en';
  }

  function getLang() {
    return currentLang;
  }

  function t(key) {
    var pack = STRINGS[currentLang] || STRINGS.en;
    if (pack[key] != null) return pack[key];
    if (STRINGS.en[key] != null) return STRINGS.en[key];
    return key;
  }

  function readStoredLang() {
    try {
      return normalizeLang(global.localStorage && global.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function storeLang(lang) {
    try {
      if (global.localStorage) global.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function applyAttributes(root, lang) {
    var nodes = root.querySelectorAll(
      '[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria], [data-i18n-alt], [data-i18n-title]',
    );
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) {
        var value = t(key);
        if (el.childElementCount === 0) {
          el.textContent = value;
        } else {
          var textTarget = el.querySelector('[data-i18n-text]');
          if (textTarget) textTarget.textContent = value;
        }
      }

      var htmlKey = el.getAttribute('data-i18n-html');
      if (htmlKey) el.innerHTML = t(htmlKey);

      var ph = el.getAttribute('data-i18n-placeholder');
      if (ph) el.setAttribute('placeholder', t(ph));

      var aria = el.getAttribute('data-i18n-aria');
      if (aria) el.setAttribute('aria-label', t(aria));

      var alt = el.getAttribute('data-i18n-alt');
      if (alt) el.setAttribute('alt', t(alt));

      var title = el.getAttribute('data-i18n-title');
      if (title) el.setAttribute('title', t(title));
    });

    // Keep switcher pressed state in sync
    Array.prototype.forEach.call(root.querySelectorAll('[data-ttf-lang]'), function (btn) {
      var active = btn.getAttribute('data-ttf-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyDocumentDirection(lang) {
    var dir = lang === 'ar' ? 'rtl' : 'ltr';
    var root = document.getElementById('ttf-app');
    if (root) {
      root.setAttribute('dir', dir);
      root.setAttribute('lang', lang);
      root.classList.toggle('ttf-lang-ar', lang === 'ar');
      root.classList.toggle('ttf-lang-en', lang === 'en');
    }

    // Standalone / local file preview: also flip the document
    if (document.body && document.body.querySelector('#ttf-app')) {
      var onlyApp =
        document.body.children.length === 1 ||
        !!document.querySelector('.ghl-sim-shell') ||
        document.documentElement.getAttribute('data-ttf-owns-dir') === '1';
      if (onlyApp || document.documentElement.getAttribute('data-ttf-owns-dir') === '1') {
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
      }
    }
  }

  function setLang(lang, root) {
    currentLang = normalizeLang(lang);
    storeLang(currentLang);
    root = root || document.getElementById('ttf-app');
    if (!root) return currentLang;

    applyDocumentDirection(currentLang);
    applyAttributes(root, currentLang);

    try {
      root.dispatchEvent(
        new CustomEvent('ttf:langchange', { detail: { lang: currentLang }, bubbles: true }),
      );
    } catch (e) {
      /* IE-safe ignore */
    }

    return currentLang;
  }

  function initI18n(root) {
    if (!root || root.__ttfI18nInit) return;
    root.__ttfI18nInit = true;

    currentLang = readStoredLang();
    applyDocumentDirection(currentLang);
    applyAttributes(root, currentLang);

    root.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-ttf-lang]') : null;
      if (!btn || !root.contains(btn)) return;
      e.preventDefault();
      setLang(btn.getAttribute('data-ttf-lang'), root);
    });
  }

  global.TTF = global.TTF || {};
  global.TTF.STRINGS = STRINGS;
  global.TTF.t = t;
  global.TTF.getLang = getLang;
  global.TTF.setLang = setLang;
  global.TTF.initI18n = initI18n;
})(typeof window !== 'undefined' ? window : globalThis);


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
