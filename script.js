(function () {
  'use strict';
  var FB_URL = 'https://www.facebook.com/profile.php?id=61595234725404&locale=ar_AR';
  var PRICES = { 1: '3$', 2: '5$', 3: '15$' };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ================= الترجمات ================= */
  /* العربية تُقرأ من الصفحة نفسها، وهنا فقط النصوص التي لا تظهر في الصفحة */
  var DICT = {
    ar: {
      title: 'صمملي | تصميم صور وتطبيقات',
      meta: 'صمملي: نصمم الصور والهويات البصرية وتطبيقات الجوال بلمسة إبداعية.',
      sep: '، ',
      msg_hi: 'مرحبا صمملي 👋',
      msg_iam: 'أنا {n}.',
      msg_want: 'بدي أطلب: {l}',
      msg_none: '(لم أحدد بعد)',
      msg_plan: 'الباقة: {p} ({c})',
      msg_speed: 'الاستعجال: {s}',
      msg_note: 'تفاصيل الفكرة: {n}',
      t_plan: 'تم اختيار الباقة: ',
      t_copied: 'تم نسخ الرسالة ✅',
      t_copy_fail: 'تعذر النسخ، انسخها يدويًا',
      t_sent: 'تم النسخ! الصق الرسالة في محادثة فيسبوك 💬',
      t_sent_fail: 'انسخ الرسالة يدويًا ثم الصقها في فيسبوك',
    },
    en: {
      title: 'Sammimli | Image & App Design',
      meta: 'Sammimli: we design images, brand identities and mobile apps with a creative touch.',
      sep: ', ',
      msg_hi: 'Hello Sammimli 👋',
      msg_iam: "I'm {n}.",
      msg_want: "I'd like to order: {l}",
      msg_none: '(not decided yet)',
      msg_plan: 'Package: {p} ({c})',
      msg_speed: 'Urgency: {s}',
      msg_note: 'Idea details: {n}',
      t_plan: 'Package selected: ',
      t_copied: 'Message copied ✅',
      t_copy_fail: "Couldn't copy, please copy it manually",
      t_sent: 'Copied! Paste the message into our Facebook chat 💬',
      t_sent_fail: 'Copy the message manually, then paste it on Facebook',
      brand: 'Sammimli',
      nav1: 'Services', nav2: 'Work', nav3: 'Process', nav4: 'Packages', nav5: 'Order', nav6: 'FAQ', nav7: 'Contact',
      fb_btn: 'Contact us on Facebook',
      hero_chip: 'Creative design studio',
      hero_h1: 'We turn your ideas into <span class="grad">designs</span> everyone admires',
      hero_p: 'At <b>Sammimli</b> we design images, brand identities and app interfaces in a modern, professional style, so your project stands out at first glance.',
      hero_cta1: 'Start your project 🚀', hero_cta2: 'See our work',
      st1: 'Designs delivered', st2: 'Happy clients', st3: 'Avg. delivery hours',
      ph1: 'Image design', ph2: 'App interfaces', ph3: 'Brand identity',
      svc_chip: 'Our services', svc_h2: 'What can we do for you?',
      svc_p: 'Everything you need for a strong visual presence, from a simple idea to a full app.',
      s1_t: 'Image design', s1_p: 'Social media posts, banners, ads and product visuals that grab attention.',
      s1_l1: 'Posts & stories', s1_l2: 'Banners & ads', s1_l3: 'Photo editing & enhancement',
      s2_t: 'App design', s2_p: 'Modern, easy-to-use UI/UX interfaces for mobile and web apps.',
      s2_l1: 'Screen design', s2_l2: 'Interactive prototypes', s2_l3: 'Smooth user experience',
      s3_t: 'Brand identity', s3_p: 'Logo, colors and fonts that give your brand a distinctive personality.',
      s3_l1: 'Logo design', s3_l2: 'Cards & stationery', s3_l3: 'Brand guidelines',
      s4_t: 'Motion & presentations', s4_p: 'Presentations and simple animated designs that catch the eye.',
      s4_l1: 'Presentations', s4_l2: 'Infographics', s4_l3: 'Animated clips',
      por_chip: 'Our work', por_h2: 'A taste of our creativity', por_p: 'Pick a category and see our style.',
      f_all: 'All', f_bday: 'Birthdays', f_wed: 'Weddings', f_grad: 'Graduation', f_baby: 'Newborns',
      w1: 'Birthday invitation', w2: 'Wedding invitation', w3: 'Graduation card', w4: 'Newborn card',
      cat_inv: 'Cards & invitations',
      por_note: 'Tap any design to enlarge it. We design any occasion on request.',
      proc_chip: 'How we work', proc_h2: 'Just 4 steps',
      pr1_t: 'Contact us', pr1_p: 'Tell us your idea and needs.',
      pr2_t: 'We sketch it', pr2_p: 'We send you a first draft.',
      pr3_t: 'Revisions', pr3_p: 'We tweak it until you love it.',
      pr4_t: 'Delivery', pr4_p: 'You get your files ready to use.',
      pk_chip: 'Packages', pk_h2: 'Pick the right package',
      pk_p: 'Clear, simple prices. For special requests, get in touch.',
      pn1: 'Basic', pn2: 'Professional', pn3: 'Complete',
      pd1: 'To get started', pd2: 'For growing projects', pd3: 'For companies & apps',
      pf11: 'One design', pf12: 'Two free revisions', pf13: 'Fast delivery',
      pf21: 'Up to 5 designs', pf22: 'Unlimited revisions', pf23: 'Logo + colors', pf24: 'Open source files',
      pf31: 'Full identity', pf32: 'App design', pf33: 'Ongoing support',
      pk_badge: 'Most popular', pk_choose: 'Choose this package',
      ord_chip: 'Order now', ord_h2: 'Prepare your order in seconds',
      ord_p: 'Pick what you want, we copy a ready message and open our Facebook chat.',
      o_what: 'What should we design for you?',
      m_svc1: 'Image design', m_svc2: 'App design', m_svc3: 'Logo & identity', m_svc4: 'Motion & presentations',
      o_plan: 'Package', o_speed: 'Urgency', sp1: 'Normal', sp2: 'Fast', sp3: 'Very urgent',
      o_name: 'Your name', o_name_ph: 'Type your name',
      o_note: 'Describe your idea',
      o_note_ph: 'Tell us about your project, favorite colors, any example you liked...',
      o_send: '📋 Copy message & open Facebook', o_copy: 'Copy only',
      faq_chip: 'FAQ', faq_h2: 'Got a question?',
      q1: 'How long does a design take?',
      a1: 'Simple designs take a day or two; bigger projects like apps need several days depending on the details.',
      q2: 'Can I ask for revisions?',
      a2: 'Of course, revisions are part of the service until you get the result you like.',
      q3: 'What files will I receive?',
      a3: 'We deliver files in the formats you need (PNG, JPG, PDF and more), ready to use.',
      q4: 'How can I contact you?',
      a4: "The easiest way is our Facebook page. Send a message and we'll reply as soon as we can.",
      cta_h2: 'Ready to start together?',
      cta_p: "Contact us on Facebook and let's design something special for you.",
      cta_btn: 'Contact us on Facebook',
      foot_rights: 'All rights reserved.',
      tab1: 'Home', tab2: 'Services', tab3: 'Work', tab4: 'Order', tab5: 'Contact'
    }
  };

  /* حفظ النصوص العربية الأصلية من الصفحة */
  $$('[data-i18n]').forEach(function (el) { DICT.ar[el.getAttribute('data-i18n')] = el.innerHTML; });
  $$('[data-i18n-ph]').forEach(function (el) { DICT.ar[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder'); });

  var lang = 'ar';
  function t(key) {
    var d = DICT[lang];
    if (d && d[key] !== undefined) return d[key];
    return DICT.ar[key] !== undefined ? DICT.ar[key] : key;
  }

  var langSel = $('#langSel');
  function applyLang(l) {
    if (!DICT[l]) l = 'ar';
    lang = l;
    var h = document.documentElement;
    h.setAttribute('lang', l);
    h.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    $$('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    document.title = t('title');
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta'));
    langSel.value = l;
    try { localStorage.setItem('sammemli-lang', l); } catch (e) {}
    buildPreview();
  }
  langSel.addEventListener('change', function () { applyLang(langSel.value); });

  /* إشعار صغير */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* الوضع الليلي / النهاري */
  var themeBtn = $('#themeBtn');
  function applyTheme(th) {
    document.documentElement.setAttribute('data-theme', th);
    themeBtn.textContent = th === 'light' ? '☀️' : '🌙';
    var m = $('meta[name="theme-color"]');
    if (m) m.setAttribute('content', th === 'light' ? '#f7f5ff' : '#0c0a1d');
  }
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('sammemli-theme'); } catch (e) {}
  applyTheme(savedTheme || 'dark');
  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('sammemli-theme', next); } catch (e) {}
  });

  /* قائمة الجوال */
  var links = $('#links');
  $('#menuBtn').addEventListener('click', function () { links.classList.toggle('open'); });
  $$('a', links).forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });

  /* السكرول: شريط التقدم، الهيدر، زر الأعلى */
  var progress = $('#progress'), header = $('#header'), topBtn = $('#topBtn');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    header.classList.toggle('scrolled', h.scrollTop > 20);
    topBtn.classList.toggle('show', h.scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* تفعيل الرابط الحالي */
  var sections = $$('section[id]');
  var navLinks = $$('.links a'), tabLinks = $$('#tabbar a');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        var id = '#' + en.target.id;
        navLinks.concat(tabLinks).forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { spy.observe(s); });

  /* ظهور العناصر تدريجيًا */
  var rev = new IntersectionObserver(function (entries) {
    entries.forEach(function (en, i) {
      if (en.isIntersecting) {
        setTimeout(function () { en.target.classList.add('in'); }, (i % 4) * 90);
        rev.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(function (el) { rev.observe(el); });

  /* عدّاد الأرقام */
  var counted = false;
  new IntersectionObserver(function (es, ob) {
    if (es[0].isIntersecting && !counted) {
      counted = true; ob.disconnect();
      $$('[data-count]').forEach(function (el) {
        var end = +el.dataset.count, start = performance.now(), dur = 1400;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? '+' : '');
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      });
    }
  }).observe($('.stats'));

  /* فلترة الأعمال */
  var works = $$('.work');
  $$('#filters .pill').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('#filters .pill').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.f;
      works.forEach(function (w) {
        var show = f === 'all' || w.dataset.t === f;
        w.classList.toggle('hide', !show);
        if (show) { w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop'); }
      });
    });
  });
  /* عرض مكبّر للتصميم */
  var lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  works.forEach(function (w) {
    w.addEventListener('click', function () {
      var im = $('img', w);
      lbImg.src = im.src; lbImg.alt = im.alt;
      lbCap.textContent = $('b', w).textContent;
      lb.hidden = false; document.body.style.overflow = 'hidden';
    });
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

  /* منشئ الطلب */
  var preview = $('#preview');
  function checked(name) {
    var el = $('input[name="' + name + '"]:checked');
    return el ? el.value : '1';
  }
  function buildMessage() {
    var svc = $$('#services-opts input:checked').map(function (i) { return t(i.getAttribute('data-k')); });
    var name = $('#oname').value.trim();
    var note = $('#onote').value.trim();
    var plan = checked('plan');
    var lines = [
      t('msg_hi'),
      name ? t('msg_iam').replace('{n}', name) : '',
      t('msg_want').replace('{l}', svc.length ? svc.join(t('sep')) : t('msg_none')),
      t('msg_plan').replace('{p}', t('pn' + plan)).replace('{c}', PRICES[plan]),
      t('msg_speed').replace('{s}', t('sp' + checked('speed'))),
      note ? t('msg_note').replace('{n}', note) : ''
    ];
    return lines.filter(Boolean).join('\n');
  }
  function buildPreview() { preview.textContent = buildMessage(); }
  $('#orderForm').addEventListener('input', buildPreview);
  $('#orderForm').addEventListener('change', buildPreview);

  /* اختيار الباقة من البطاقات */
  $$('.choose').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = $('input[name="plan"][value="' + b.dataset.plan + '"]');
      if (r) { r.checked = true; buildPreview(); }
      toast(t('t_plan') + t('pn' + b.dataset.plan) + ' (' + PRICES[b.dataset.plan] + ')');
      $('#order').scrollIntoView({ behavior: 'smooth' });
    });
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }
  $('#copyBtn').addEventListener('click', function () {
    copyText(buildMessage()).then(function () { toast(t('t_copied')); },
      function () { toast(t('t_copy_fail')); });
  });
  $('#sendBtn').addEventListener('click', function () {
    copyText(buildMessage()).then(function () { toast(t('t_sent')); },
      function () { toast(t('t_sent_fail')); });
    setTimeout(function () { window.open(FB_URL, '_blank', 'noopener'); }, 900);
  });

  /* حركة ميلان خفيفة للجوال في الهيرو */
  var phone = $('.phone');
  var visual = $('.hero-visual');
  if (phone && window.matchMedia('(hover:hover)').matches) {
    visual.addEventListener('mousemove', function (e) {
      var r = visual.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      phone.style.animation = 'none';
      phone.style.transform = 'rotate(' + (-6 + x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateY(-6px)';
    });
    visual.addEventListener('mouseleave', function () {
      phone.style.transform = '';
      phone.style.animation = '';
    });
  }

  $('#year').textContent = new Date().getFullYear();

  /* تشغيل اللغة المحفوظة */
  var savedLang = null;
  try { savedLang = localStorage.getItem('sammemli-lang'); } catch (e) {}
  if (savedLang && savedLang !== 'ar') applyLang(savedLang); else { langSel.value = 'ar'; buildPreview(); }
})();
