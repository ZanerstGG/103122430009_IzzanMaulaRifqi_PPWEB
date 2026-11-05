$(function () {
  const root = document.documentElement;
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'cubic-bezier(.22,.8,.24,1)';
  const anim = (el, kf, o = {}) =>
    rm ? { finished: Promise.resolve() } : el.animate(kf, { duration: 500, easing: EASE, ...o });
  const file = location.pathname.split('/').pop() || 'index.html';
  const state = JSON.parse(sessionStorage.getItem('yuki-nav') || '{}');
  sessionStorage.removeItem('yuki-nav');

  const applyTheme = t => {
    $('html').attr('data-bs-theme', t);
    localStorage.setItem('yuki-theme', t);
    $('#themeToggle').html(`<i class="bi bi-${t === 'dark' ? 'sun' : 'moon-stars'}"></i>`);
  };
  applyTheme(localStorage.getItem('yuki-theme') || 'light');

  $('#themeToggle').on('click', function (e) {
    const next = $('html').attr('data-bs-theme') === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || rm) return applyTheme(next);
    const x = e.clientX, y = e.clientY, r = Math.hypot(innerWidth, innerHeight);
    document.startViewTransition(() => applyTheme(next)).ready.then(() =>
      root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }));
  });
  $(window).on('scroll', () => $('header').toggleClass('shadow', scrollY > 8));

  const $nav = $('header .nav-pills').addClass('position-relative');
  const $links = $nav.find('.nav-link').removeClass('active bg-danger').addClass('position-relative rounded-pill');
  const nameOf = a => a.getAttribute('href').split('#')[0];
  const idx = $links.index($links.filter((i, a) => nameOf(a) === file));
  const box = a => ({ left: a.offsetLeft, top: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight });
  const $pill = $('<span class="position-absolute bg-danger rounded-pill"></span>').prependTo($nav);
  const placePill = () => {
    if (idx < 0) return;
    $links.removeClass('text-white').addClass('text-body').eq(idx).removeClass('text-body').addClass('text-white').attr('aria-current', 'page');
    $pill.css(box($links[idx]));
  };
  placePill();
  $(window).on('resize', placePill);
  if (idx >= 0) {
    $links[idx].scrollIntoView({ inline: 'center', block: 'nearest' });
    if (state.prev >= 0 && state.prev !== idx) {
      const a = box($links[state.prev]), b = box($links[idx]);
      anim($pill[0], [{ left: a.left + 'px', width: a.width + 'px' }, { left: b.left + 'px', width: b.width + 'px' }], { duration: 650 });
    }
  }

  function leave(href, f) {
    const to = $links.index($links.filter((i, a) => nameOf(a) === f));
    const dir = to > idx ? 1 : -1;
    sessionStorage.setItem('yuki-nav', JSON.stringify({ prev: idx, dir }));
    setTimeout(() => (location.href = href), 800);
    Promise.all($('main,aside').toArray().map((el, i) =>
      anim(el, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-dir * 70}px)` }],
        { duration: 280, delay: i * 50, fill: 'forwards' }).finished)).then(() => (location.href = href));
  }

  let quizGo = () => {};
  if ($('#soal-1').length) {
    let lives = 4;
    const L = 'ABCD', $secs = $('main > section');
    const start = /^#[\w-]+$/.test(location.hash) && $(location.hash).is('main > section') ? location.hash : '#soal-1';
    $secs.hide(); $(start).show();
    quizGo = id => {
      if (id === '#soal-1' && $('#selesai').is(':visible')) { location.hash = id; return location.reload(); }
      const $from = $secs.filter(':visible'), $to = $(id);
      const dir = $secs.index($to) >= $secs.index($from) ? 1 : -1;
      const swap = () => { $from.hide(); $to.show(); anim($to[0], [{ opacity: 0, transform: `translateX(${dir * 60}px)` }, { opacity: 1, transform: 'none' }]); };
      $from.length ? anim($from[0], [{ opacity: 1 }, { opacity: 0, transform: `translateX(${-dir * 60}px)` }], { duration: 240 }).finished.then(swap) : swap();
    };
    $('main > section[id^=soal-]').each(function () {
      const $s = $(this), $next = $s.find('a.btn-danger[href^="#"]').addClass('disabled');
      const ans = ($s.find('.alert strong').first().text().match(/Pilihan ([A-D])/) || [])[1];
      $s.find('input[type=radio]').on('change', function () {
        const $it = $s.find('label.list-group-item'), pick = $it.index($(this).closest('label')), ok = L[pick] === ans;
        $s.find('input').prop('disabled', true);
        $it.eq(L.indexOf(ans)).addClass('list-group-item-success');
        if (ok) anim($it[pick], [{ transform: 'scale(1)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 350 });
        else {
          $it.eq(pick).addClass('list-group-item-danger');
          $('.js-lives').text(--lives);
          anim($it[pick], [0, -9, 9, -5, 0].map(x => ({ transform: `translateX(${x}px)` })), { duration: 400 });
        }
        $s.find('details').prop('open', true).children().not('summary').hide().slideDown(300);
        $next.removeClass('disabled');
      });
    });
  }

  $(document).on('click', 'a[href]', function (e) {
    const h = this.getAttribute('href');
    if (e.ctrlKey || e.metaKey || this.target || h === '#') return;
    const [f, hash] = h.split('#');
    if (f === '' || f === file) {
      if (!hash) return;
      e.preventDefault();
      if (/^modal/.test(hash)) {
        $('#' + hash).children('summary').trigger('click')[0];
        $('#' + hash)[0].scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'center' });
      } else if ($('#soal-1').length) quizGo('#' + hash);
      return;
    }
    if (/\.html$/.test(f)) { e.preventDefault(); leave(h, f); }
  });

  $(document).on('click', 'details > summary', function (e) {
    e.preventDefault();
    const $d = $(this).parent(), $body = $d.children().not('summary');
    if ($d.prop('open')) $body.stop(true).slideUp(260, () => $d.prop('open', false));
    else { $d.prop('open', true).trigger('opened'); $body.stop(true).hide().slideDown(320); }
  });

  const from = state.dir ? `translateX(${state.dir * 48}px)` : 'translateY(24px)';
  const enter = (el, delay) => {
    el.style.opacity = '';
    anim(el, [{ opacity: 0, transform: from }, { opacity: 1, transform: 'none' }], { delay, fill: 'backwards' });
  };
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { io.unobserve(en.target); enter(en.target, 0); }
  }), { threshold: 0.08 });
  $('main > *:visible, aside > *:visible').each(function (i) {
    if (this.getBoundingClientRect().top < innerHeight) enter(this, Math.min(i, 8) * 70);
    else if (!rm) { this.style.opacity = 0; io.observe(this); }
  });

  $('.badge span').filter(function () { return !this.children.length && /^\d[\d,]*(\s\w+)?$/.test(this.textContent.trim()); }).each(function () {
    const el = this, m = el.textContent.trim().match(/^([\d,]+)(.*)$/), end = +m[1].replace(/,/g, '');
    $({ n: 0 }).animate({ n: end }, { duration: 1400, step: n => (el.textContent = Math.round(n).toLocaleString('en-US') + m[2]) });
  });
  $('.progress-bar').css('transform-origin', 'left').each(function () {
    anim(this, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1200, delay: 350, fill: 'backwards' });
  });

  const pulse = $('#modal-level-4 summary .rounded-circle')[0];
  if (pulse) anim(pulse, [{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 2400, iterations: Infinity, easing: 'ease-in-out' });
  const $img = $('.ratio > img');
  if ($img.length && !rm) {
    $img.parent().addClass('overflow-hidden');
    const drift = () => $img.css('transform', `translateY(${scrollY * 0.12}px) scale(1.12)`);
    drift(); $(window).on('scroll', () => requestAnimationFrame(drift));
  }
});
