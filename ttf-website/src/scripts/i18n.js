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
