/*
  The opening: a big bang, then the motto.

  A point of light brightens, flashes, and throws out matter that cools from
  white through amber to blue as it spreads. The motto settles in the middle,
  then the curtain lifts and the page's details arrive one by one (their
  animations wait on the "intro" class, which this script removes).

  Plays once per visit (sessionStorage). Skip with the button or Escape.
  Under prefers-reduced-motion the inline script in <head> never adds the
  "intro" class, so none of this runs.
*/
(function () {
  var root = document.documentElement;
  if (!root.classList.contains("intro")) return;

  var overlay = document.createElement("div");
  overlay.className = "intro-overlay";
  overlay.innerHTML =
    '<canvas class="intro-canvas" aria-hidden="true"></canvas>' +
    '<figure class="intro-quote">' +
      '<blockquote>Do not go gentle into that good night.</blockquote>' +
      '<figcaption>Dylan Thomas</figcaption>' +
    '</figure>' +
    '<button class="intro-skip" type="button">Skip intro</button>';
  document.body.appendChild(overlay);

  var canvas = overlay.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var W, H, DPR, cx, cy;
  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = W / 2; cy = H / 2;
  }
  size();
  window.addEventListener("resize", size);

  // Matter thrown out by the bang
  var parts = [];
  function bang() {
    var n = Math.min(900, Math.round((W * H) / 1400));
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2;
      var sp = 60 + Math.pow(Math.random(), 0.6) * 900;
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, size: 0.6 + Math.random() * 1.8 });
    }
  }
  // White, then amber, then a cold blue as each grain ages
  function colour(age, alpha) {
    var r, g, b;
    if (age < 0.25)      { var k = age / 0.25; r = 255; g = 255 - k * 60; b = 245 - k * 135; }
    else if (age < 0.6)  { var k2 = (age - 0.25) / 0.35; r = 255 - k2 * 99; g = 195 + k2 * 5; b = 110 + k2 * 135; }
    else                 { r = 156; g = 200; b = 245; }
    return "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + alpha + ")";
  }

  var start = performance.now(), banged = false, finished = false, raf = 0;
  var BANG = 650, QUOTE = 1500, END = 3900;

  function frame(now) {
    var t = now - start;
    // Long-exposure trails
    ctx.fillStyle = "rgba(2, 4, 8, 0.22)";
    ctx.fillRect(0, 0, W, H);

    if (t < BANG) {
      // The point brightens and flickers
      var k = t / BANG, r = 1.5 + k * 5 + Math.sin(t / 30) * 0.8;
      var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 6);
      g.addColorStop(0, "rgba(255,255,255," + (0.4 + k * 0.6) + ")");
      g.addColorStop(1, "rgba(255,220,170,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, r * 6, 0, Math.PI * 2); ctx.fill();
    } else {
      if (!banged) { banged = true; bang(); }
      var s = (t - BANG) / 1000;
      // Flash and shock ring
      if (s < 0.6) {
        var fr = 40 + s * Math.max(W, H) * 1.6;
        var fl = ctx.createRadialGradient(cx, cy, 0, cx, cy, fr);
        fl.addColorStop(0, "rgba(255,250,240," + (0.9 * (1 - s / 0.6)) + ")");
        fl.addColorStop(1, "rgba(255,200,140,0)");
        ctx.fillStyle = fl;
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = "rgba(255,230,200," + (0.6 * (1 - s / 0.6)) + ")";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, fr * 0.55, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.life += 1 / 60;
        p.vx *= 0.975; p.vy *= 0.975;
        p.x += p.vx / 60; p.y += p.vy / 60;
        var age = Math.min(1, p.life / 2.6);
        ctx.fillStyle = colour(age, 0.85 * (1 - age * 0.55));
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalCompositeOperation = "source-over";
    }

    if (t > QUOTE && !overlay.classList.contains("speak")) overlay.classList.add("speak");
    if (t > END) return finish();
    raf = requestAnimationFrame(frame);
  }

  function finish(quick) {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(raf);
    try { sessionStorage.setItem("introSeen", "1"); } catch (e) {}
    overlay.classList.add(quick ? "gone-quick" : "gone");
    root.classList.remove("intro");     // lets the page's own animations run
    setTimeout(function () { overlay.remove(); window.removeEventListener("resize", size); }, quick ? 350 : 900);
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape") finish(true); }

  overlay.querySelector(".intro-skip").addEventListener("click", function () { finish(true); });
  document.addEventListener("keydown", onKey);
  ctx.fillStyle = "#020408"; ctx.fillRect(0, 0, W, H);
  raf = requestAnimationFrame(frame);
})();
