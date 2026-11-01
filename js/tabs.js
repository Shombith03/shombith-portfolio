/*
  Tabs and the moving sky.

  Without this script every panel shows, stacked, and the tabs are plain
  links that jump to each section. With it, one panel shows at a time:
  - click a tab, or the Q / E buttons beside the tab bar
  - with focus on a tab: Left / Right arrows, Q / E, Home / End
  - links to #amoebius, #about and so on open that tab directly
  Each panel's data-bg photo fades in behind the page when its tab opens.
*/
(function () {
  var nav = document.querySelector("[data-tabs]");
  if (!nav) return;

  var list = nav.querySelector(".tablist");
  var tabs = Array.prototype.slice.call(nav.querySelectorAll("a[data-tab]"));
  var panels = tabs.map(function (t) {
    return document.getElementById(t.getAttribute("href").slice(1));
  });
  if (panels.some(function (p) { return !p; })) return;

  var photos = Array.prototype.slice.call(document.querySelectorAll(".sky-photo"));
  var photoFront = 0;
  var currentBg = null;
  var current = -1;

  document.documentElement.classList.add("has-tabs");
  list.setAttribute("role", "tablist");
  list.setAttribute("aria-label", "Sections");

  tabs.forEach(function (tab, i) {
    var panel = panels[i];
    tab.setAttribute("role", "tab");
    tab.id = "tab-" + panel.id;
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = -1;
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      select(i, { updateHash: true });
    });
  });

  function setSky(src) {
    if (!photos.length || !src || src === currentBg) return;
    currentBg = src;
    var next = photos[1 - photoFront];
    var prev = photos[photoFront];
    var img = new Image();
    img.onload = function () {
      next.style.backgroundImage = "url(\"" + src + "\")";
      next.classList.add("show");
      prev.classList.remove("show");
      photoFront = 1 - photoFront;
    };
    img.src = src;
  }

  function enter(panel) {
    var tiles = panel.querySelectorAll(".tile");
    Array.prototype.forEach.call(tiles, function (t, k) { t.style.setProperty("--i", k); });
    panel.classList.remove("entering");
    void panel.offsetWidth; // restart the animation
    panel.classList.add("entering");
  }

  function select(i, opts) {
    opts = opts || {};
    i = (i + tabs.length) % tabs.length;
    var changed = i !== current;
    tabs.forEach(function (tab, j) {
      var on = j === i;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      tab.classList.toggle("on", on);
      panels[j].hidden = !on;
    });
    current = i;
    tabs[i].scrollIntoView({ block: "nearest", inline: "nearest" });
    setSky(panels[i].getAttribute("data-bg"));
    if (changed) enter(panels[i]);
    if (opts.focus) tabs[i].focus();
    if (opts.updateHash && history.replaceState) {
      history.replaceState(null, "", "#" + panels[i].id);
    }
    if (opts.scroll) panels[i].scrollIntoView({ block: "start" });
  }

  list.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var next = null;
    switch (e.key) {
      case "ArrowRight": case "e": case "E": next = current + 1; break;
      case "ArrowLeft":  case "q": case "Q": next = current - 1; break;
      case "Home": next = 0; break;
      case "End":  next = tabs.length - 1; break;
    }
    if (next !== null) {
      e.preventDefault();
      select(next, { focus: true, updateHash: true });
    }
  });

  Array.prototype.forEach.call(nav.querySelectorAll("[data-step]"), function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      select(current + Number(btn.getAttribute("data-step")), { updateHash: true });
    });
  });

  function fromHash() {
    return panels.findIndex(function (p) { return "#" + p.id === location.hash; });
  }
  // In-page links such as "About me" change the hash: open that tab and bring it into view
  window.addEventListener("hashchange", function () {
    var i = fromHash();
    if (i >= 0) select(i, { scroll: true });
  });

  var start = fromHash();
  select(start >= 0 ? start : 0);
})();
