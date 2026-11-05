$(function () {
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;
  const anim = (el, kf, o = {}) =>
    rm ? { finished: Promise.resolve() } : el.animate(kf, { duration: 500, easing: 'cubic-bezier(.22,.8,.24,1)', ...o });

  $('main .row > .col > .card.h-100').has('.display-3').each(function () {
    const $body = $(this).children('.card-body'), $head = $body.children().first(), $info = $body.children().last();
    const kanji = $head.find('.display-3').text().trim(), arti = $head.find('.fw-semibold').text().trim();
    const $flip = $(`<div class="flip" tabindex="0" role="button" aria-pressed="false" aria-label="Balik kartu ${kanji}">
      <div class="flip-inner">
        <div class="flip-face card-body d-flex flex-column align-items-center justify-content-center text-center gap-1 py-4">
          <span class="kanji-besar text-danger lh-1"></span><span class="fw-semibold fs-5"></span>
          <span class="small text-body-secondary mt-2"><i class="bi bi-arrow-repeat"></i> Sentuh untuk membalik</span>
        </div>
        <div class="flip-face flip-back card-body d-flex flex-column justify-content-center gap-2">
          <div class="d-flex align-items-center gap-3 pb-2 border-bottom">
            <span class="fs-1 text-danger lh-1 serif"></span><span class="fw-semibold"></span>
          </div>
        </div>
      </div></div>`);
    $flip.find('.kanji-besar, .fs-1').text(kanji);
    $flip.find('.fw-semibold').text(arti);
    $flip.find('.flip-back').append($info.removeClass('border-top pt-2'));
    $body.replaceWith($flip);
    const toggle = on => $flip.toggleClass('is-flipped', on).attr('aria-pressed', $flip.hasClass('is-flipped'));
    $flip.on('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    if (canHover) $(this).on('mouseenter', () => toggle(true)).on('mouseleave', () => toggle(false));
    else $flip.on('click', () => toggle());
  });

  $(document).on('mousemove', 'main .row > .col > .card, aside .card', function (e) {
    const r = this.getBoundingClientRect();
    this.style.setProperty('--mx', e.clientX - r.left + 'px');
    this.style.setProperty('--my', e.clientY - r.top + 'px');
  });

  const $bar = $('<div class="position-fixed top-0 start-0 bg-danger"></div>').css({ height: 3, width: 0, zIndex: 1100 }).appendTo('body');
  $(window).on('scroll resize', () => $bar.css('width', (scrollY / Math.max(1, $(document).height() - innerHeight)) * 100 + '%'));

  if (!rm) {
    const cv = $('<canvas class="position-fixed top-0 start-0 w-100 h-100 pe-none" aria-hidden="true"></canvas>').css('z-index', 1050).appendTo('body')[0];
    const g = cv.getContext('2d'); let W, H;
    const fit = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    fit(); $(window).on('resize', fit);
    const mk = top => ({ x: Math.random() * W, y: top ? -20 : Math.random() * H, s: 4 + Math.random() * 6, v: .4 + Math.random() * .7, w: Math.random() * 6.28, r: Math.random() * 6.28, dr: (Math.random() - .5) * .03 });
    const P = Array.from({ length: 22 }, () => mk(false));
    (function loop() {
      g.clearRect(0, 0, W, H);
      g.fillStyle = $('html').attr('data-bs-theme') === 'dark' ? 'rgba(220,230,245,.55)' : 'rgba(232,140,165,.5)';
      P.forEach((p, i) => {
        p.y += p.v; p.w += .015; p.x += Math.sin(p.w) * .6; p.r += p.dr;
        if (p.y > H + 20) P[i] = mk(true);
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.beginPath(); g.ellipse(0, 0, p.s, p.s * .55, 0, 0, 6.283); g.fill(); g.restore();
      });
      requestAnimationFrame(loop);
    })();
  }

  $(document).on('click', '.btn', function (e) {
    if (rm) return;
    const $b = $(this).addClass('position-relative overflow-hidden'), r = this.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2;
    const $s = $('<span class="position-absolute rounded-circle bg-white pe-none"></span>')
      .css({ width: d, height: d, left: e.clientX - r.left - d / 2, top: e.clientY - r.top - d / 2 }).appendTo($b);
    $s[0].animate([{ transform: 'scale(0)', opacity: .35 }, { transform: 'scale(1)', opacity: 0 }], { duration: 600, easing: 'ease-out' }).finished.then(() => $s.remove());
  });

  const speak = (teks, el) => {
    if (el) anim(el, [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 400 });
    if (!('speechSynthesis' in window) || !teks) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(teks); u.lang = 'ja-JP'; u.rate = .8; speechSynthesis.speak(u);
  };
  $('.row-cols-3 > .col > .card > .card-body').append('<i class="bi bi-volume-up position-absolute top-0 end-0 m-2 small text-body-secondary opacity-50" aria-hidden="true"></i>');
  $('.list-group-flush .fs-5').append(' <i class="bi bi-volume-up ms-1 small text-body-secondary" aria-hidden="true"></i>');
  $(document).on('click', '.row-cols-3 > .col > .card', function () { const $c = $(this).find('.fs-2').first(); speak($c.text().trim(), $c[0]); });
  $(document).on('click', '.list-group-flush > .list-group-item', function () { const $c = $(this).find('.fs-5').first(); speak($c.text().trim(), $c[0]); });

  const stagger = $s => $s.find('.row > .col, .list-group-item').each((i, el) =>
    anim(el, [{ opacity: 0, transform: 'translateY(16px) scale(.96)' }, { opacity: 1, transform: 'none' }], { delay: Math.min(i, 30) * 22, fill: 'backwards' }));
  $(document).on('opened', 'details', function () { stagger($(this)); });
  stagger($('main details[open]'));

  const big = $('section.card .display-3, section.card .display-4').first()[0];
  if (big) anim(big, [{ opacity: 0, filter: 'blur(14px)', transform: 'scale(1.5) rotate(-8deg)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 1100, delay: 250, fill: 'backwards' });
});
