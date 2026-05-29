/* ===========================================================
   STODOLA — motion engine (dependency-free, single ticker)
   =========================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---- single master ticker ---- */
  var ticks = [];
  function onTick(fn) { ticks.push(fn); }
  var lastT = performance.now();
  function master(now) {
    var dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
    for (var i = 0; i < ticks.length; i++) ticks[i](dt, now);
    requestAnimationFrame(master);
  }

  /* ---------- scroll state (shared) ---------- */
  var scrollY = window.scrollY, lastY = scrollY, smoothVel = 0;
  function scrollState() {
    var nav = document.getElementById('nav');
    var prog = document.getElementById('scroll-prog');
    var maxCache = 0, resizeT;
    function recompute() { maxCache = document.documentElement.scrollHeight - window.innerHeight; }
    recompute();
    window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(recompute, 200); });
    document.addEventListener('scroll', function () {
      scrollY = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', scrollY > 40);
    }, { passive: true });
    if (nav) nav.classList.toggle('scrolled', scrollY > 40);
    onTick(function () {
      var v = scrollY - lastY; lastY = scrollY;
      smoothVel = lerp(smoothVel, v, 0.1);
      if (prog) prog.style.transform = 'scaleX(' + clamp(maxCache > 0 ? scrollY / maxCache : 0, 0, 1) + ')';
    });
  }

  /* ---------- preloader ---------- */
  function preloader() {
    var pl = document.getElementById('preloader');
    if (!pl) { startHero(); return; }
    var num = pl.querySelector('.pl-num');
    var bar = pl.querySelector('.pl-bar span');
    var start = performance.now();
    var dur = reduce ? 300 : 1700;
    (function step(now) {
      var p = clamp((now - start) / dur, 0, 1);
      var e = 1 - Math.pow(1 - p, 3);
      if (num) num.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (bar) bar.style.transform = 'scaleX(' + e + ')';
      if (p < 1) requestAnimationFrame(step);
      else {
        pl.classList.add('done');
        document.body.classList.add('loaded');
        setTimeout(function () { pl.style.display = 'none'; }, 900);
        startHero();
      }
    })(performance.now());
  }
  function startHero() {
    var els = [].slice.call(document.querySelectorAll('[data-hero]'));
    els.forEach(function (el) {
      var delay = parseFloat(el.getAttribute('data-hero')) || 0;
      if (reduce) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
      var rise = el.classList.contains('ch') ? 46 : 16;
      var dur = 760;
      el.style.opacity = '0';
      el.style.transform = 'translateY(' + rise + 'px)';
      setTimeout(function () {
        var t0 = null;
        (function anim(now) {
          if (t0 === null) t0 = now;
          var p = clamp((now - t0) / dur, 0, 1);
          var e = 1 - Math.pow(1 - p, 3);
          el.style.opacity = e.toFixed(3);
          el.style.transform = 'translateY(' + ((1 - e) * rise).toFixed(2) + 'px)';
          if (p < 1) requestAnimationFrame(anim);
          else { el.style.opacity = '1'; el.style.transform = 'none'; }
        })(performance.now());
      }, delay);
    });
  }

  /* ---------- custom cursor ---------- */
  function cursor() {
    if (isTouch) return;
    var ring = document.getElementById('cur-ring');
    var dot = document.getElementById('cur-dot');
    if (!ring || !dot) return;
    document.body.classList.add('cursor-on');
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    });
    onTick(function () {
      rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    });
    document.querySelectorAll('a,button,[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cur-hover');
        var label = el.getAttribute('data-cursor');
        if (label) { ring.setAttribute('data-label', label); document.body.classList.add('cur-label'); }
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cur-hover', 'cur-label');
        ring.removeAttribute('data-label');
      });
    });
    window.addEventListener('blur', function () { document.body.classList.add('cur-out'); });
    window.addEventListener('focus', function () { document.body.classList.remove('cur-out'); });
  }

  /* ---------- parallax (rect-based, no IO) ---------- */
  function parallax() {
    var states = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
      return { el: el, cur: 0, speed: parseFloat(el.getAttribute('data-parallax')) || 0.1 };
    });
    if (!states.length) return;
    onTick(function () {
      if (reduce) return;
      var vh = innerHeight;
      states.forEach(function (s) {
        var r = s.el.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) return;
        var off = (r.top + r.height / 2 - vh / 2) / vh;
        s.cur = lerp(s.cur, -off * s.speed * 100, 0.12);
        s.el.style.transform = 'translate3d(0,' + s.cur.toFixed(2) + 'px,0)';
      });
    });
  }

  /* ---------- reveal (JS-tweened, robust to frozen CSS transitions) ---------- */
  function tween(el, dur, apply, done) {
    var t0 = null;
    (function a(now) {
      if (t0 === null) t0 = now;
      var p = clamp((now - t0) / dur, 0, 1);
      var e = 1 - Math.pow(1 - p, 3);
      apply(e);
      if (p < 1) requestAnimationFrame(a);
      else if (done) done();
    })(performance.now());
  }
  function reveal() {
    var items = [].slice.call(document.querySelectorAll('.reveal,[data-reveal],[data-split]')).map(function (el) {
      return { el: el, shown: false };
    });
    function show(el) {
      var delay = parseFloat(el.getAttribute('data-reveal')) || 0;
      if (el.hasAttribute('data-split')) {
        var lines = [].slice.call(el.querySelectorAll('.line-inner'));
        el.style.opacity = '1';
        lines.forEach(function (ln, i) {
          setTimeout(function () {
            tween(ln, 950, function (e) { ln.style.transform = 'translateY(' + ((1 - e) * 110).toFixed(2) + '%)'; },
              function () { ln.style.transform = 'none'; });
          }, (reduce ? 0 : delay + i * 90));
        });
      } else {
        if (reduce) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
        var hasPar = el.hasAttribute('data-parallax');
        if (!hasPar) el.style.transform = 'translateY(44px)';
        setTimeout(function () {
          tween(el, 1000, function (e) {
            el.style.opacity = e.toFixed(3);
            if (!hasPar) el.style.transform = 'translateY(' + ((1 - e) * 44).toFixed(2) + 'px)';
          }, function () { el.style.opacity = '1'; if (!hasPar) el.style.transform = 'none'; });
        }, delay);
      }
    }
    function check() {
      var vh = innerHeight;
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        if (it.shown) continue;
        var r = it.el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > -80) { it.shown = true; show(it.el); }
      }
    }
    var queued = false;
    function onScroll() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; check(); }); }
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
    [120, 400, 900, 1800].forEach(function (t) { setTimeout(check, t); });
    // ultimate fallback: poll from the rAF ticker (scroll events may not fire in some embeds)
    var fc = 0, allDone = false;
    onTick(function () {
      if (allDone) return;
      if (++fc % 6 !== 0) return;
      check();
      allDone = items.every(function (it) { return it.shown; });
    });
  }

  /* ---------- split lines ---------- */
  function splitLines() {
    document.querySelectorAll('[data-split]').forEach(function (el) {
      el.innerHTML = el.innerHTML.split(/<br\b[^>]*>/i).map(function (ln) {
        return '<span class="line-mask"><span class="line-inner">' + ln + '</span></span>';
      }).join('');
    });
  }

  /* ---------- spinners (scroll-reactive) ---------- */
  function spinners() {
    var rots = [].slice.call(document.querySelectorAll('[data-spin]')).map(function (el) {
      return { el: el, r: Math.random() * 360, base: parseFloat(el.getAttribute('data-spin')) || 12 };
    });
    if (!rots.length) return;
    onTick(function (dt) {
      rots.forEach(function (s) {
        s.r = (s.r + dt * (360 / s.base) + smoothVel * 0.22) % 360;
        s.el.style.transform = 'rotate(' + s.r.toFixed(2) + 'deg)';
      });
    });
  }

  /* ---------- hero mouse parallax ---------- */
  function heroParallax() {
    if (isTouch) return;
    var layers = [].slice.call(document.querySelectorAll('[data-mouse]'));
    if (!layers.length) return;
    var tx = 0, ty = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5;
    });
    onTick(function () {
      if (reduce) return;
      cx = lerp(cx, tx, 0.06); cy = lerp(cy, ty, 0.06);
      layers.forEach(function (el) {
        var m = parseFloat(el.getAttribute('data-mouse')) || 20;
        el.style.setProperty('--mx', (cx * m).toFixed(2) + 'px');
        el.style.setProperty('--my', (cy * m).toFixed(2) + 'px');
      });
    });
  }

  /* ---------- magnetic ---------- */
  function magnetic() {
    if (isTouch) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnetic')) || 0.4;
      var x = 0, y = 0, tx = 0, ty = 0, raf = null;
      function loop() {
        x = lerp(x, tx, 0.2); y = lerp(y, ty, 0.2);
        el.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px)';
        if (Math.abs(x - tx) > 0.1 || Math.abs(y - ty) > 0.1) raf = requestAnimationFrame(loop); else raf = null;
      }
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * strength;
        ty = (e.clientY - (r.top + r.height / 2)) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener('mouseleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
    });
  }

  /* ---------- velocity marquee ---------- */
  function marquees() {
    document.querySelectorAll('[data-marquee]').forEach(function (track) {
      var dir = parseFloat(track.getAttribute('data-marquee')) || 1;
      var base = parseFloat(track.getAttribute('data-speed')) || 0.6;
      var x = 0, w = 0;
      function measure() { w = track.scrollWidth / 2; }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      measure();
      onTick(function () {
        if (!w) { measure(); return; }
        x -= dir * (base + Math.abs(smoothVel) * 0.06);
        if (x <= -w) x += w; if (x >= 0) x -= w;
        track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      });
    });
  }

  /* ---------- audio players + waveform (idle = static) ---------- */
  function players() {
    var current = null;
    [].slice.call(document.querySelectorAll('.track')).forEach(function (tr) {
      var canvas = tr.querySelector('.wave');
      var btn = tr.querySelector('.tplay');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var bars = 56, heights = [], playing = false, t = Math.random() * 100, needIdle = true;
      for (var i = 0; i < bars; i++) heights.push(Math.random());
      function resize() {
        var r = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, r.width * devicePixelRatio);
        canvas.height = Math.max(1, r.height * devicePixelRatio);
        needIdle = true;
      }
      resize();
      var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
      function frame(w, h, animate) {
        ctx.clearRect(0, 0, w, h);
        var bw = w / bars;
        for (var i = 0; i < bars; i++) {
          var amp = animate ? (0.32 + 0.68 * Math.abs(Math.sin(t * 0.06 + i * 0.5) * Math.cos(t * 0.03 + i)))
                            : (0.1 + heights[i] * 0.12);
          var bh = amp * h * 0.9;
          ctx.fillStyle = animate ? 'rgba(255,255,255,' + (0.45 + heights[i] * 0.55) + ')' : 'rgba(255,255,255,0.16)';
          ctx.fillRect(i * bw + bw * 0.2, (h - bh) / 2, bw * 0.6, bh);
        }
      }
      onTick(function () {
        if ((canvas.width <= 1 || needIdle) ) {
          var r = canvas.getBoundingClientRect();
          if (r.width > 0 && (canvas.width <= 1 || Math.abs(canvas.width - r.width * devicePixelRatio) > 2)) {
            canvas.width = Math.max(1, r.width * devicePixelRatio);
            canvas.height = Math.max(1, r.height * devicePixelRatio);
            needIdle = true;
          }
        }
        if (canvas.width <= 1) return;
        if (playing) { t += 1; frame(canvas.width, canvas.height, true); }
        else if (needIdle) { frame(canvas.width, canvas.height, false); needIdle = false; }
      });
      if (btn) btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (tr.classList.contains('soon')) return;
        if (current && current !== tr) { current.classList.remove('playing'); current._stop(); }
        playing = !playing; needIdle = true;
        tr.classList.toggle('playing', playing);
        current = playing ? tr : null;
      });
      tr._stop = function () { playing = false; needIdle = true; };
    });
  }

  /* ---------- nav / mobile / active ---------- */
  function nav() {
    var burger = document.getElementById('burger'), mm = document.getElementById('mobileMenu');
    if (burger && mm) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('open'); mm.classList.toggle('open'); document.body.classList.toggle('menu-open');
      });
      mm.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          burger.classList.remove('open'); mm.classList.remove('open'); document.body.classList.remove('menu-open');
        });
      });
    }
    var links = [].slice.call(document.querySelectorAll('.nav-links a')).map(function (a) {
      return { a: a, sec: document.getElementById(a.getAttribute('href').replace('#', '')) };
    }).filter(function (m) { return m.sec; });
    if (links.length) {
      function updateActive() {
        var y = scrollY + innerHeight * 0.42, cur = null;
        links.forEach(function (m) { if (m.sec.offsetTop <= y) cur = m; });
        links.forEach(function (m) { m.a.classList.toggle('active', m === cur); });
      }
      var q = false;
      document.addEventListener('scroll', function () { if (q) return; q = true; requestAnimationFrame(function () { q = false; updateActive(); }); }, { passive: true });
      updateActive();
    }
  }

  function init() {
    splitLines();
    scrollState();
    cursor();
    parallax();
    reveal();
    spinners();
    heroParallax();
    magnetic();
    marquees();
    players();
    nav();
    requestAnimationFrame(master);
    preloader();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
