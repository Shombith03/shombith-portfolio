/*
  Companion and card motifs.

  The companion is a small slab robot (an original design): four hinged
  metal slabs and a visor with a scanning light.

  Desktop (fine pointer, wider than 640px):
  - With nothing hovered it glides slowly across the page, behind the cards
    (smaller and dimmer, for depth).
  - Hover a card and it lifts in front, dashes to the card with its slabs
    folded, then walks the card's border, swinging its slabs like legs.
  - Leave the card and it drifts away and back behind the page.
  - Click it and it follows your cursor; click again, or press Escape,
    and it goes back to gliding.

  Phones and touch screens: it lives in the footer and glides across the
  photo there, behind the text, and only moves while the footer is on
  screen. It never covers a link.

  Under prefers-reduced-motion it stands still (bottom corner on desktop,
  in the footer on phones) and the card motifs hold still.

  Each card with data-motif="…" gets a small animated motif in its corner
  (orbit, pulse, flow, transfer, scan, wave, signal, grid).
*/
(function () {
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q) : { matches: false, addEventListener: function () {} }; };
  var calm = mq("(prefers-reduced-motion: reduce)").matches;
  var fineQ = mq("(pointer: fine)");
  var narrowQ = mq("(max-width: 640px)");

  /* ---------- Card motifs ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-motif]"), function (el) {
    var m = document.createElement("span");
    m.className = "motif";
    m.setAttribute("data-m", el.getAttribute("data-motif"));
    m.setAttribute("aria-hidden", "true");
    m.innerHTML = "<i></i><i></i><i></i><i></i>";
    el.appendChild(m);
  });

  /* ---------- Companion ---------- */
  var bot = document.querySelector(".bot");
  if (!bot) return;
  var footer = document.querySelector(".footer");
  bot.hidden = false;

  var BW = 36, BH = 50;               // the bot's box
  var W = window.innerWidth, H = window.innerHeight;
  var pos = { x: W * 0.8, y: H * 0.7 }, vel = { x: 0, y: 0 }, angle = 0;
  var mode = "glide";                  // glide | card | follow | footer
  var card = null, along = 0, approaching = false, frontUntil = 0;
  var pointer = { x: W / 2, y: H / 2 };
  var last = performance.now(), raf = 0, t0 = Math.random() * 100;
  var footerVisible = false;

  function inFooterMode() { return !fineQ.matches || narrowQ.matches; }

  function place() {
    bot.style.transform = "translate3d(" + (pos.x - BW / 2).toFixed(1) + "px," + (pos.y - BH / 2).toFixed(1) + "px,0) rotate(" + angle.toFixed(1) + "deg)";
  }
  function setClass(name, on) { bot.classList.toggle(name, !!on); }

  // Exponential smoothing that behaves the same at any frame rate
  function ease(rate, dt) { return 1 - Math.exp(-rate * dt); }
  function moveTo(tx, ty, k) {
    var ox = pos.x, oy = pos.y;
    pos.x += (tx - pos.x) * k;
    pos.y += (ty - pos.y) * k;
    vel.x = pos.x - ox; vel.y = pos.y - oy;
    return Math.abs(tx - pos.x) + Math.abs(ty - pos.y);
  }
  function turnTo(target, k) {
    var d = ((target - angle + 540) % 360) - 180;
    angle += d * k;
  }

  // Perimeter of a rectangle, walked clockwise from the top-left corner.
  // Returns the point just outside the edge and the bot's rotation there.
  function perimeter(r, s) {
    var w = r.width, h = r.height, P = 2 * (w + h), off = BH / 2 - 3;
    s = ((s % P) + P) % P;
    if (s < w) return { x: r.left + s, y: r.top - off, a: 0 };
    s -= w;
    if (s < h) return { x: r.right + off, y: r.top + s, a: 90 };
    s -= h;
    if (s < w) return { x: r.right - s, y: r.bottom + off, a: 180 };
    s -= w;
    return { x: r.left - off, y: r.bottom - s, a: 270 };
  }
  function nearestAlong(r, x, y) {
    var best = 0, bd = Infinity, P = 2 * (r.width + r.height);
    for (var s = 0; s < P; s += 8) {
      var p = perimeter(r, s), d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }

  // A slow, looping flight path across a box (two sines at unrelated rates)
  function path(t, w, h, padX, top, bottom) {
    return {
      x: padX + (w - 2 * padX) * (0.5 + 0.5 * Math.sin(t * 0.11) * Math.cos(t * 0.037)),
      y: top + (bottom - top) * (0.5 + 0.5 * Math.sin(t * 0.083 + 1.3))
    };
  }

  /* ----- Where the bot lives: the page (desktop) or the footer (phones) ----- */
  function enterFooter() {
    mode = "footer";
    card = null;
    if (footer && bot.parentNode !== footer) footer.appendChild(bot);
    setClass("in-footer", true);
    setClass("front", false); setClass("far", false); setClass("dash", false); setClass("walking", false);
    bot.setAttribute("tabindex", "-1");
    bot.setAttribute("aria-hidden", "true");
    var r = footer ? footer.getBoundingClientRect() : { width: W, height: 200 };
    pos = { x: r.width * 0.7, y: r.height * 0.45 }; angle = 0;
  }
  function enterPage() {
    mode = "glide";
    if (bot.parentNode !== document.body) document.body.appendChild(bot);
    setClass("in-footer", false);
    bot.removeAttribute("tabindex");
    bot.removeAttribute("aria-hidden");
    pos = { x: W * 0.8, y: H * 0.7 };
  }
  function chooseHome() {
    var want = inFooterMode();
    if (want && mode !== "footer") enterFooter();
    if (!want && mode === "footer") enterPage();
  }

  window.addEventListener("resize", function () {
    W = window.innerWidth; H = window.innerHeight;
    chooseHome();
  });

  if (footer && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { footerVisible = es[0].isIntersecting; }, { rootMargin: "80px" }).observe(footer);
  } else {
    footerVisible = true;
  }

  chooseHome();

  if (calm) {
    // Stand still
    if (mode === "footer") {
      var fr = footer.getBoundingClientRect();
      pos = { x: fr.width - 40, y: 40 };
    } else {
      pos = { x: W - 40, y: H - BH / 2 - 14 };
      setClass("front", true);
    }
    place();
    return;
  }

  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    var t = t0 + now / 1000;
    var walking = false, dash = false, gliding = false;

    if (mode === "footer") {
      if (footerVisible && footer) {
        var fr = footer.getBoundingClientRect();
        var g = path(t * 1.4, fr.width, fr.height, 28, 34, Math.max(60, fr.height * 0.42));
        moveTo(g.x, g.y, ease(1.6, dt));
        turnTo(Math.max(-14, Math.min(14, vel.x * 9)), ease(4, dt));
        gliding = true;
      }
    } else if (mode === "follow") {
      var d = moveTo(pointer.x + 24, pointer.y + 30, ease(9, dt));
      turnTo(Math.max(-16, Math.min(16, vel.x * 3)), ease(8, dt));
      walking = d > 3;
    } else if (mode === "card" && card) {
      var r = card.getBoundingClientRect();
      if (approaching) {
        // A quick dash to the nearest point on the card's edge
        var p0 = perimeter(r, along);
        if (moveTo(p0.x, p0.y, ease(11, dt)) < 4) approaching = false;
        turnTo(p0.a, ease(10, dt));
        dash = true;
      } else {
        along += 150 * dt;
        var p = perimeter(r, along);
        pos.x = p.x; pos.y = p.y;
        turnTo(p.a, ease(14, dt));
        walking = true;
      }
    } else {
      // Glide across the page, behind the cards
      var gp = path(t, W, H, 60, 110, H - 60);
      moveTo(gp.x, gp.y, ease(0.9, dt));
      turnTo(Math.max(-12, Math.min(12, vel.x * 6)), ease(3, dt));
      gliding = true;
    }

    var front = mode === "card" || mode === "follow" || now < frontUntil;
    if (mode !== "footer") { setClass("front", front); setClass("far", !front); }
    setClass("walking", walking);
    setClass("dash", dash);
    setClass("gliding", gliding);
    setClass("facing-left", vel.x < -0.05);
    place();
    raf = requestAnimationFrame(tick);
  }

  // Desktop: hovering a card sends the bot to it
  document.addEventListener("pointerover", function (e) {
    if (mode === "follow" || mode === "footer") return;
    var tile = e.target.closest && e.target.closest(".tile");
    if (!tile || tile === card) return;
    card = tile;
    mode = "card";
    along = nearestAlong(tile.getBoundingClientRect(), pos.x, pos.y);
    approaching = true;
  });
  document.addEventListener("pointerout", function (e) {
    if (mode !== "card" || !card) return;
    var to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(".tile");
    if (to === card) return;
    if (!card.contains(e.relatedTarget)) {
      card = null;
      mode = "glide";
      frontUntil = performance.now() + 900;   // drift clear of the card before going behind
    }
  });
  document.addEventListener("pointermove", function (e) { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });

  bot.addEventListener("click", function () {
    if (mode === "footer") return;
    mode = mode === "follow" ? "glide" : "follow";
    card = null;
    if (mode === "glide") frontUntil = performance.now() + 900;
    bot.setAttribute("aria-pressed", mode === "follow" ? "true" : "false");
    setClass("following", mode === "follow");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mode === "follow") bot.click();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancelAnimationFrame(raf);
    else { last = performance.now(); raf = requestAnimationFrame(tick); }
  });

  place();
  raf = requestAnimationFrame(tick);
})();
