/*
  Tabs for the pause-menu layout.

  Without this script every panel shows, stacked, and the tabs are plain
  links that jump to each section. With it, one panel shows at a time:
  - click a tab, or the Q / E buttons beside the tab bar
  - with focus on a tab: Left / Right arrows, Q / E, Home / End
  - links to #amoebius, #shipping and so on open that tab directly
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

  var current = 0;
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

  function select(i, opts) {
    opts = opts || {};
    i = (i + tabs.length) % tabs.length;
    tabs.forEach(function (tab, j) {
      var on = j === i;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      tab.classList.toggle("on", on);
      panels[j].hidden = !on;
    });
    current = i;
    tabs[i].scrollIntoView({ block: "nearest", inline: "nearest" });
    if (opts.focus) tabs[i].focus();
    if (opts.updateHash && history.replaceState) {
      history.replaceState(null, "", "#" + panels[i].id);
    }
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
    var i = panels.findIndex(function (p) { return "#" + p.id === location.hash; });
    return i;
  }
  window.addEventListener("hashchange", function () {
    var i = fromHash();
    if (i >= 0) select(i);
  });

  var start = fromHash();
  select(start >= 0 ? start : 0);
})();
