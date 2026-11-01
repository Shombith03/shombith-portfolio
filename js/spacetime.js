/*
  Spacetime: an original animated hero background.

  A sheet of spacetime bends into a gravity well. The sheet twists into the
  well (frame dragging) and gravitational ripples run outward through it.
  At the bottom of the well sits a black hole: a dark shadow inside a thin
  photon ring, a thin accretion disk brighter on the side turning towards
  us, the far side of the disk lensed into a soft halo, and dust spiralling
  in. Plain canvas 2D, no libraries.

  Colours come from CSS custom properties (--st-*), so each theme can tint
  it. It pauses off screen or when the page is hidden, and draws one still
  frame under prefers-reduced-motion.
*/
(function () {
  var canvas = document.querySelector("canvas.spacetime");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W = 0, H = 0, DPR = 1, running = false, visible = true, raf = 0, t0 = performance.now();
  var C = {};

  function readColours() {
    var cs = getComputedStyle(document.documentElement);
    function v(name, fallback) { return (cs.getPropertyValue(name) || fallback).trim(); }
    C.gridA = v("--st-grid-a", "143, 179, 217");
    C.gridB = v("--st-grid-b", "210, 224, 240");
    C.hot   = v("--st-hot", "255, 248, 236");
    C.warm  = v("--st-warm", "240, 196, 132");
    C.cool  = v("--st-cool", "190, 110, 70");
    C.glow  = v("--st-glow", "240, 190, 130");
  }
  function rgba(c, a) { return "rgba(" + c + "," + a + ")"; }

  // Dust in the disk: radius (in units of rs), angle, speed
  var dust = [];
  for (var i = 0; i < 90; i++) dust.push(spawn(true));
  function spawn(anywhere) {
    return { r: anywhere ? 1.6 + Math.random() * 4.2 : 5.4 + Math.random() * 0.6, a: Math.random() * Math.PI * 2, b: 0.6 + Math.random() * 0.8 };
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!running) draw(calm ? 6 : (performance.now() - t0) / 1000);
  }

  function frame() {
    var narrow = W < 960;
    return {
      cx: narrow ? W * 0.6 : W * 0.72,
      cy: narrow ? 70 : H * 0.3,
      s:  narrow ? Math.min(W, 560) * 0.62 : Math.min(W * 0.5, H) * 0.95
    };
  }

  function depth(r, t) {
    var c = 0.16;
    var well = -0.85 * c / Math.sqrt(r * r + c * c);
    var pulse = 0.6 + 0.4 * Math.sin(t * 0.45);
    var ripple = 0.032 * pulse * Math.sin(r * 11 - t * 1.9) * Math.exp(-r * 1.0) * Math.min(1, r * 4);
    return well + ripple;
  }

  function project(x, y, z, f, rot) {
    var c = Math.cos(rot), s = Math.sin(rot);
    var rx = x * c - z * s, rz = x * s + z * c;
    var pitch = 0.62, cp = Math.cos(pitch), sp = Math.sin(pitch);
    var py = y * cp - rz * sp, pz = y * sp + rz * cp;
    var cam = 2.6, k = cam / (cam + pz);
    return [f.cx + rx * f.s * k, f.cy - py * f.s * k];
  }

  function grid(t, f) {
    var rot = t * 0.05, N = 24, R = 1.25, steps = 52;
    ctx.lineWidth = 1;
    for (var pass = 0; pass < 2; pass++) {
      for (var i = 0; i <= N; i++) {
        var u = -R + (2 * R * i) / N;
        ctx.beginPath();
        for (var j = 0; j <= steps; j++) {
          var v = -R + (2 * R * j) / steps;
          var x = pass ? u : v, z = pass ? v : u;
          var r = Math.sqrt(x * x + z * z);
          // Frame dragging: the sheet twists more the closer it is to the hole
          var twist = 1.1 * Math.exp(-r * 2.4);
          var ct = Math.cos(twist), st = Math.sin(twist);
          var p = project(x * ct - z * st, depth(r, t), x * st + z * ct, f, rot);
          if (j) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]);
        }
        var edge = 1 - Math.abs(u) / R;
        ctx.strokeStyle = rgba(pass ? C.gridB : C.gridA, 0.04 + 0.26 * edge);
        ctx.stroke();
      }
    }
    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    var m = ctx.createRadialGradient(f.cx, f.cy, f.s * 0.1, f.cx, f.cy, f.s * 1.25);
    m.addColorStop(0, "rgba(0,0,0,1)");
    m.addColorStop(0.6, "rgba(0,0,0,0.75)");
    m.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = m;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // Half of the disk: upper (behind the hole) or lower (in front of it)
  function diskHalf(x, y, rs, front, t) {
    var start = front ? 0 : Math.PI, end = front ? Math.PI : Math.PI * 2;
    var bands = 16;
    for (var k = 0; k < bands; k++) {
      var f = k / (bands - 1);                    // 0 inner .. 1 outer
      var a = rs * (1.55 + f * 3.6), b = a * 0.085;
      var g = ctx.createLinearGradient(x - a, 0, x + a, 0);
      // Doppler beaming: the left side, turning towards us, is brighter
      var inner = 1 - f;
      g.addColorStop(0, rgba(C.hot, 0.55 * inner + 0.06));
      g.addColorStop(0.45, rgba(C.warm, 0.32 * inner + 0.04));
      g.addColorStop(1, rgba(C.cool, 0.14 * inner + 0.02));
      ctx.strokeStyle = g;
      ctx.lineWidth = rs * (0.16 - f * 0.08);
      ctx.beginPath(); ctx.ellipse(x, y, a, b, 0, start, end); ctx.stroke();
    }
  }

  function hole(t, f) {
    var c = project(0, -0.62, 0, f, 0);
    var x = c[0], y = c[1], rs = f.s * 0.07;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    // Faint glow round the whole system
    var g = ctx.createRadialGradient(x, y, rs * 1.2, x, y, rs * 7);
    g.addColorStop(0, rgba(C.glow, 0.16));
    g.addColorStop(1, rgba(C.glow, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, rs * 7, 0, Math.PI * 2); ctx.fill();

    // Far side of the disk, then its lensed image arching over and under the hole
    diskHalf(x, y, rs, false, t);
    ctx.shadowColor = rgba(C.warm, 0.8);
    ctx.shadowBlur = rs * 0.7;
    var lens = ctx.createLinearGradient(x - rs * 2, 0, x + rs * 2, 0);
    lens.addColorStop(0, rgba(C.hot, 0.75));
    lens.addColorStop(1, rgba(C.warm, 0.35));
    ctx.strokeStyle = lens;
    ctx.lineWidth = rs * 0.09;
    ctx.beginPath(); ctx.ellipse(x, y, rs * 1.62, rs * 1.52, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = rs * 0.035;
    ctx.beginPath(); ctx.ellipse(x, y, rs * 1.86, rs * 1.74, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // The shadow
    ctx.fillStyle = "#000";
    ctx.beginPath(); ctx.arc(x, y, rs * 1.38, 0, Math.PI * 2); ctx.fill();

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Photon ring: thin and bright
    ctx.shadowColor = rgba(C.hot, 0.9);
    ctx.shadowBlur = rs * 0.25;
    ctx.strokeStyle = rgba(C.hot, 0.85);
    ctx.lineWidth = Math.max(1, rs * 0.025);
    ctx.beginPath(); ctx.arc(x, y, rs * 1.4, 0, Math.PI * 2); ctx.stroke();
    ctx.shadowBlur = 0;

    // Near side of the disk, in front of the shadow
    diskHalf(x, y, rs, true, t);

    // Dust spiralling in
    for (var i = 0; i < dust.length; i++) {
      var d = dust[i];
      d.a += (0.9 / Math.pow(d.r, 1.5)) * d.b * 0.016 * 2.2;
      d.r -= 0.0035 * d.b;
      if (d.r < 1.45) { dust[i] = spawn(false); continue; }
      var px = x + Math.cos(d.a) * d.r * rs, py = y + Math.sin(d.a) * d.r * rs * 0.085;
      var behind = Math.sin(d.a) < 0;
      if (behind && Math.hypot(px - x, py - y) < rs * 1.4) continue;
      var bright = Math.cos(d.a) < 0 ? 0.9 : 0.45;  // the approaching side is brighter
      ctx.fillStyle = rgba(C.hot, bright * Math.min(1, (5.8 - d.r) / 2));
      ctx.fillRect(px, py, 1.4, 1.4);
    }
    ctx.restore();
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    var f = frame();
    grid(t, f);
    hole(t, f);
  }

  function loop(now) {
    if (!running) return;
    draw((now - t0) / 1000);
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (calm || running || !visible || document.hidden) return;
    running = true; raf = requestAnimationFrame(loop);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  readColours();
  window.addEventListener("themechange", function () {
    readColours();
    if (!running) draw(calm ? 6 : (performance.now() - t0) / 1000);
  });
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });

  resize();
  start();
})();
