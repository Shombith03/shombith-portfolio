/*
  Companion, card motifs and the theme switch.

  The companion is a small slab-bodied robot (an original design).
  - It patrols the bottom of the screen.
  - Hover a card and it drives round the card's border until you leave.
  - Click it and it follows your cursor; click again, or press Escape,
    and it goes back to patrolling.
  On touch screens it only patrols. Under prefers-reduced-motion it stands
  still in the corner and the card motifs hold still.

  Each card with data-motif="…" gets a small animated motif in its corner
  (orbit, pulse, flow, transfer, scan, wave, signal, grid).
*/
(function () {
  var root = document.documentElement;
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  /* ---------- Theme switch ---------- */
  var switches = Array.prototype.slice.call(document.querySelectorAll("[data-theme-set]"));
  function markTheme() {
    var cur = root.getAttribute("data-theme");
    switches.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-theme-set") === cur ? "true" : "false");
    });
  }
  switches.forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-theme-set");
      root.setAttribute("data-theme", t);
      try { localStorage.setItem("theme", t); } catch (e) {}
      markTheme();
      window.dispatchEvent(new CustomEvent("themechange", { detail: t }));
    });
  });
  markTheme();

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
  bot.hidden = false;

  var W = window.innerWidth, H = window.innerHeight;
  var BH = 46;                       // bot height; it rides this far off an edge
  var pos = { x: W - 70, y: H - BH / 2 - 14 }, angle = 0;
  var mode = "patrol", dir = -1, pauseUntil = 0, nextPause = 0;
  var card = null, along = 0, approaching = false;
  var pointer = { x: W / 2, y: H / 2 };
  var last = performance.now(), raf = 0;

  function place() {
    bot.style.transform = "translate3d(" + (pos.x - 17).toFixed(1) + "px," + (pos.y - BH / 2).toFixed(1) + "px,0) rotate(" + angle.toFixed(1) + "deg)";
  }

  window.addEventListener("resize", function () { W = window.innerWidth; H = window.innerHeight; });

  if (calm) {
    // Stand still in the corner
    pos = { x: W - 40, y: H - BH / 2 - 14 };
    place();
    return;
  }

  // Perimeter of a rectangle, walked clockwise from the top-left corner.
  // Returns the point just outside the edge and the bot's rotation there.
  function perimeter(r, s) {
    var w = r.width, h = r.height, P = 2 * (w + h), off = BH / 2 - 2;
    s = ((s % P) + P) % P;
    if (s < w)          return { x: r.left + s,         y: r.top - off,     a: 0 };
    s -= w;
    if (s < h)          return { x: r.right + off,      y: r.top + s,       a: 90 };
    s -= h;
    if (s < w)          return { x: r.right - s,        y: r.bottom + off,  a: 180 };
    s -= w;
    return                     { x: r.left - off,       y: r.bottom - s,    a: 270 };
  }
  function nearestAlong(r, x, y) {
    var best = 0, bd = Infinity, P = 2 * (r.width + r.height);
    for (var s = 0; s < P; s += 8) {
      var p = perimeter(r, s), d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }
  function turnTo(target, k) {
    var d = ((target - angle + 540) % 360) - 180;
    angle += d * k;
  }
  function moveTo(tx, ty, k) {
    pos.x += (tx - pos.x) * k;
    pos.y += (ty - pos.y) * k;
    return Math.abs(tx - pos.x) + Math.abs(ty - pos.y);
  }

  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    var walking = false;

    if (mode === "follow") {
      var d = moveTo(pointer.x + 22, pointer.y + 26, 0.14);
      turnTo(0, 0.2);
      walking = d > 2;
    } else if (mode === "card" && card) {
      var r = card.getBoundingClientRect();
      if (approaching) {
        var p0 = perimeter(r, along);
        if (moveTo(p0.x, p0.y, 0.18) < 3) approaching = false;
        turnTo(p0.a, 0.2);
      } else {
        along += 170 * dt;
        var p = perimeter(r, along);
        pos.x = p.x; pos.y = p.y;
        turnTo(p.a, 0.25);
      }
      walking = true;
    } else {
      // Patrol along the bottom, with the odd pause to look around
      var floorY = H - BH / 2 - 14;
      if (Math.abs(pos.y - floorY) > 2 || Math.abs(angle) > 1) {
        moveTo(pos.x, floorY, 0.12);
        turnTo(0, 0.15);
        walking = true;
      } else if (now < pauseUntil) {
        walking = false;
      } else {
        pos.x += dir * 46 * dt;
        if (pos.x < 40) { pos.x = 40; dir = 1; }
        if (pos.x > W - 40) { pos.x = W - 40; dir = -1; }
        walking = true;
        if (now > nextPause) {
          pauseUntil = now + 1800 + Math.random() * 2200;
          nextPause = pauseUntil + 6000 + Math.random() * 6000;
          if (Math.random() < 0.4) dir = -dir;
        }
      }
    }

    bot.classList.toggle("walking", walking);
    bot.classList.toggle("facing-left", mode === "patrol" && dir < 0);
    place();
    raf = requestAnimationFrame(tick);
  }

  // Hovering a card sends the bot round it
  if (finePointer) {
    document.addEventListener("pointerover", function (e) {
      if (mode === "follow") return;
      var t = e.target.closest && e.target.closest(".tile");
      if (!t || t === card) return;
      card = t;
      mode = "card";
      var r = t.getBoundingClientRect();
      along = nearestAlong(r, pos.x, pos.y);
      approaching = true;
    });
    document.addEventListener("pointerout", function (e) {
      if (mode !== "card" || !card) return;
      var to = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(".tile");
      if (to === card) return;
      if (!card.contains(e.relatedTarget)) { card = null; mode = "patrol"; }
    });
    document.addEventListener("pointermove", function (e) { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });

    bot.addEventListener("click", function () {
      mode = mode === "follow" ? "patrol" : "follow";
      card = null;
      bot.setAttribute("aria-pressed", mode === "follow" ? "true" : "false");
      bot.classList.toggle("following", mode === "follow");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mode === "follow") bot.click();
    });
  } else {
    bot.setAttribute("tabindex", "-1");
    bot.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancelAnimationFrame(raf);
    else { last = performance.now(); raf = requestAnimationFrame(tick); }
  });

  place();
  raf = requestAnimationFrame(tick);
})();
