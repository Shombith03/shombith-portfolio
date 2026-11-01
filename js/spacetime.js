/*
  Spacetime: an original animated hero background.
  A grid of spacetime bends into a gravity well, gravitational ripples run
  outward through it, and a black hole with a lensed accretion disk sits at
  the bottom of the well. Plain canvas 2D, no libraries.

  It pauses when the hero is off screen or the page is hidden, and draws a
  single still frame under prefers-reduced-motion.
*/
(function () {
  var canvas = document.querySelector("canvas.spacetime");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W = 0, H = 0, DPR = 1, running = false, visible = true, raf = 0, t0 = performance.now();

  function resize() {
    var r = canvas.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!running) draw(calm ? 6 : (performance.now() - t0) / 1000);
  }

  // Layout: where the well sits and how big it is
  function frame() {
    var narrow = W < 960;
    return {
      cx: narrow ? W * 0.6 : W * 0.72,
      cy: narrow ? 70 : H * 0.3,
      s:  narrow ? Math.min(W, 560) * 0.62 : Math.min(W * 0.5, H) * 0.95
    };
  }

  // Height of the sheet: a funnel plus outgoing ripples
  function depth(x, z, t) {
    var r = Math.sqrt(x * x + z * z);
    var c = 0.16;
    var well = -0.85 * c / Math.sqrt(r * r + c * c);
    var ripple = 0.018 * Math.sin(r * 11 - t * 1.8) * Math.exp(-r * 1.2) * Math.min(1, r * 4);
    return well + ripple;
  }

  function project(x, y, z, f, rot) {
    var c = Math.cos(rot), s = Math.sin(rot);
    var rx = x * c - z * s, rz = x * s + z * c;
    var pitch = 0.62, cp = Math.cos(pitch), sp = Math.sin(pitch);
    var py = y * cp - rz * sp, pz = y * sp + rz * cp;
    var cam = 2.6, k = cam / (cam + pz);
    return [f.cx + rx * f.s * k, f.cy - py * f.s * k, k];
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
          var p = project(x, depth(x, z, t), z, f, rot);
          if (j) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]);
        }
        var edge = 1 - Math.abs(u) / R;
        ctx.strokeStyle = pass
          ? "rgba(63, 228, 255, " + (0.05 + 0.28 * edge) + ")"
          : "rgba(255, 79, 163, " + (0.05 + 0.28 * edge) + ")";
        ctx.stroke();
      }
    }
    // Fade the sheet out towards its edges
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

  function hole(t, f) {
    var c = project(0, -0.62, 0, f, 0);
    var x = c[0], y = c[1], rs = f.s * 0.075;

    // Warm glow
    var g = ctx.createRadialGradient(x, y, rs, x, y, rs * 5);
    g.addColorStop(0, "rgba(255, 196, 130, 0.35)");
    g.addColorStop(1, "rgba(255, 140, 80, 0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, rs * 5, 0, Math.PI * 2); ctx.fill();

    // Lensed image of the far side of the disk: a ring over the top and under the bottom
    var lens = ctx.createLinearGradient(x - rs * 2, 0, x + rs * 2, 0);
    lens.addColorStop(0, "rgba(255, 246, 225, 0.95)");
    lens.addColorStop(0.5, "rgba(255, 190, 110, 0.8)");
    lens.addColorStop(1, "rgba(220, 110, 60, 0.55)");
    ctx.strokeStyle = lens;
    ctx.save();
    ctx.shadowColor = "rgba(255, 190, 120, 0.9)";
    ctx.shadowBlur = rs * 0.6;
    ctx.lineWidth = rs * 0.16;
    ctx.beginPath(); ctx.arc(x, y, rs * 1.5, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = rs * 0.5;
    ctx.beginPath(); ctx.arc(x, y, rs * 1.62, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // The shadow
    ctx.fillStyle = "#000";
    ctx.beginPath(); ctx.arc(x, y, rs * 1.32, 0, Math.PI * 2); ctx.fill();

    // Photon ring
    ctx.strokeStyle = "rgba(255, 244, 220, 0.9)";
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(x, y, rs * 1.34, 0, Math.PI * 2); ctx.stroke();

    // The disk, edge-on, crossing in front of the shadow
    var disk = ctx.createLinearGradient(x - rs * 4, 0, x + rs * 4, 0);
    disk.addColorStop(0, "rgba(255, 250, 235, 0)");
    disk.addColorStop(0.18, "rgba(255, 248, 230, 0.95)");
    disk.addColorStop(0.5, "rgba(255, 185, 105, 0.95)");
    disk.addColorStop(0.82, "rgba(210, 95, 50, 0.75)");
    disk.addColorStop(1, "rgba(160, 60, 40, 0)");
    ctx.fillStyle = disk;
    ctx.beginPath();
    ctx.ellipse(x, y, rs * 4.6, rs * 0.3, 0, 0, Math.PI * 2);
    ctx.ellipse(x, y, rs * 1.45, rs * 0.06, 0, 0, Math.PI * 2);
    ctx.fill("evenodd");

    // Streaks orbiting in the disk
    ctx.lineWidth = 1;
    for (var k = 0; k < 7; k++) {
      var a = rs * (1.6 + k * 0.4), b = rs * (0.1 + k * 0.026);
      ctx.strokeStyle = "rgba(255, 236, 200, " + (0.35 - k * 0.035) + ")";
      ctx.setLineDash([rs * (0.3 + k * 0.1), rs * (0.5 + k * 0.15)]);
      ctx.lineDashOffset = -t * rs * (2.4 - k * 0.22);
      ctx.beginPath(); ctx.ellipse(x, y, a, b, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.setLineDash([]);
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
