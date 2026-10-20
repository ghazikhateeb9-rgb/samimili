(function () {
  'use strict';
  var FB_URL = 'https://www.facebook.com/profile.php?id=61595234725404&locale=ar_AR';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* إشعار صغير */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  /* الوضع الليلي / النهاري */
  var themeBtn = $('#themeBtn');
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    themeBtn.textContent = t === 'light' ? '☀️' : '🌙';
    var m = $('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#f7f5ff' : '#0c0a1d');
  }
  var saved = null;
  try { saved = localStorage.getItem('sammemli-theme'); } catch (e) {}
  applyTheme(saved || 'dark');
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
  var statsEl = $('.stats');
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
  }).observe(statsEl);

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
  works.forEach(function (w) {
    w.addEventListener('click', function () {
      toast('هذا نموذج توضيحي. اطلب أعمالنا الحقيقية عبر فيسبوك 💜');
    });
  });

  /* اختيار الباقة من البطاقات */
  $$('.choose').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = $('input[name="plan"][value="' + b.dataset.plan + '"]');
      if (r) { r.checked = true; buildPreview(); }
      toast('تم اختيار الباقة: ' + b.dataset.plan);
      $('#order').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* منشئ الطلب */
  var preview = $('#preview');
  function val(name) {
    var el = $('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  function buildMessage() {
    var svc = $$('#services-opts input:checked').map(function (i) { return i.value; });
    var name = $('#oname').value.trim();
    var note = $('#onote').value.trim();
    var lines = [
      'مرحبا صمملي 👋',
      name ? 'أنا ' + name + '.' : '',
      'بدي أطلب: ' + (svc.length ? svc.join('، ') : '(لم أحدد بعد)'),
      'الباقة: ' + val('plan'),
      'الاستعجال: ' + val('speed'),
      note ? 'تفاصيل الفكرة: ' + note : ''
    ];
    return lines.filter(Boolean).join('\n');
  }
  function buildPreview() { preview.textContent = buildMessage(); }
  $('#orderForm').addEventListener('input', buildPreview);
  $('#orderForm').addEventListener('change', buildPreview);
  buildPreview();

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
    copyText(buildMessage()).then(function () { toast('تم نسخ الرسالة ✅'); },
      function () { toast('تعذر النسخ، انسخها يدويًا'); });
  });
  $('#sendBtn').addEventListener('click', function () {
    copyText(buildMessage()).then(function () {
      toast('تم النسخ! الصق الرسالة في محادثة فيسبوك 💬');
    }, function () { toast('انسخ الرسالة يدويًا ثم الصقها في فيسبوك'); });
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
})();