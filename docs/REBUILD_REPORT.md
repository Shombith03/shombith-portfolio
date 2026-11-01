# Portfolio rebuild: report

What was done to `shombith03.github.io/shombith-portfolio` on 2026-11-01, why,
and where things stand. Written to hand to another session. Read it together
with `docs/FACTS.md` (what may be claimed), `docs/VOICE.md` (how it reads and
looks) and `docs/PORTFOLIO_BRIEF.md` (the original brief, with a status note
at the top).

## Where things are

| | |
|---|---|
| Live site | https://shombith03.github.io/shombith-portfolio/ (serves `main`) |
| Repo | `Shombith03/shombith-portfolio` |
| Working branch | `rebuild` |
| PR #1 (merged) | https://github.com/Shombith03/shombith-portfolio/pull/1 — the rebuild |
| PR #2 (open) | https://github.com/Shombith03/shombith-portfolio/pull/2 — job dates, company logos, CSS/JS cache-busting, these docs |
| Design board | https://claude.ai/artifact/T4Pr8TSFYUaRjonGPMGgNw (private; pages: Rebuild steps, 6 mockups, Built, Fonts, Tints) |
| Live preview | https://claude.ai/artifact/Cxg3qpfgMi72oMXmSWFCXe (private; the site as an artifact) |

**Merge PR #2.** Until it is merged the live site has no job dates or logos,
and a visitor whose browser cached the old site's `style.css` may see the new
page unstyled (this happened once; a hard refresh fixed it; PR #2 prevents it).

## The site as it stands

**Stack:** one static page. `index.html` (all copy), `style.css` (all looks;
tokens at the top), `js/tabs.js`, `js/spacetime.js`, `js/companion.js`,
`js/intro.js`, `404.html`, `images/`, `docs/`. No build step. CSS and JS are
loaded with `?v=20261101`; bump it when they change.

**Page, top to bottom**
1. **Opening (once per visit, skippable):** a big bang — a point of light,
   a flash, matter cooling from white to lilac to silver — then the motto
   "Do not go gentle into that good night." (Dylan Thomas). The page then
   arrives piece by piece.
2. **Tab bar (sticky):** Cosmic Shore, Shipping, froglet.games, Amoebius,
   Tooling, Experience, About. Q/E buttons, arrow keys and `#links` switch
   tabs; each tab fades in its own space photo; the starfield jumps to warp.
3. **Hero:** motto (small, labelled), photo with a rotating ring, name, role
   tags (UX director, systems engineer, game developer, game designer),
   headline "Game systems, the engines under them, and the pipelines that ship
   them.", intro, Play and About buttons. Behind it, an animated spacetime
   grid bending into a black hole.
4. **Panels:** cards with their commits and PRs, each with a tinted
   deep-space background and an animated motif in the corner.
   - Cosmic Shore: UI rebuild, PlayFab to UGS, analytics and consent,
     delivery pipeline, also worked on (vessels, arcade modes), play link.
   - Shipping: WebGL (live), iOS, Android, Steam, Unity CI.
   - froglet.games: the site, the team Studio, a link.
   - Amoebius: running Cosmic Shore, runtime, networking, online play,
     rendering, MCP server, capture, dev log.
   - Tooling: Froglet Compute, cs-asset, /ship, skills and hooks, CSDebug,
     benchmark tool, dialogue system.
   - Experience: dated timeline with logos (Froglet Games, Virtualize
     Technologies, LOKII Software Development), then earlier projects
     (Mind Arcade, Scene Switcher Master, Moon Racer, 3D ZigZag, Ultimate
     Beer Pong).
   - About: bio, froglet.games profile quote, hobbies, a night-sky chart
     (Orion, Cassiopeia, Ursa Major from real star positions), toolbox.
5. **Footer:** "Open to contract work.", email, GitHub, LinkedIn, credits,
   over the Carina cliffs.
6. **Companion robot:** patrols the bottom of the screen, drives round hovered
   cards, follows the cursor after a click (Escape sends it back).

**Look:** see VOICE.md, Design. In short: tinted black-and-white space photos
(violet, half strength), lilac accent, Bebas Neue / Barlow / JetBrains Mono,
dark only.

**Quality:** no console errors; no horizontal scroll 400–1440px; tabs fit
from 1100px up; keyboard and no-JavaScript fallback work; WCAG AA text
contrast; every animation off under `prefers-reduced-motion`; favicon, link
preview image, canonical URL, schema.org Person, themed 404.

## How we got here

1. **Saved the docs** (brief, facts, voice) to `docs/`.
2. **Strip** (brief step 1): removed Coming Soon tiles, skill chips, Yeth
   GameDev, "Companies I Run", emoji; Instagram/YouTube links went too
   (they pointed at yethgamedev accounts).
3. **Brief steps 2–7:** restructured, wrote every section from FACTS.md, a
   night-sky editorial theme, one animation, the dev log link.
4. **Six mockups** on the board (Observatory, Froglet HUD, Pause menu, Star
   atlas, Case files, Engine console). He chose **Pause menu**: tabs on top,
   tiles as an inventory.
5. **Iterations on his feedback:**
   - removed the Writing tab; added About (hobbies, location) and Experience;
     filled out Tooling; made headings plain ("too AI-sounding" before)
   - roles in the hero; job cards with dates; his edits from board comments
     (Virtualize: Game Developer II; LOKII: Unity Developer; Cameras card
     removed; Unity 6.3 folded into a pipeline card; iOS hash removed)
   - synthwave, then a vaporwave variant, both dropped for **Interstellar**
   - animated spacetime and a realistic black hole; the robot companion;
     card motifs; the big-bang intro with the motto
   - copy from `docs/COPY_OPTIONS.md`: headline 2, intro 3, bio 2
   - fonts: 10 pairings shown, he chose **10, Movie poster** (Bebas Neue +
     Barlow)
   - tints: 8 shown, he chose **D (Tesseract) mixed with A (Silver
     screen)** and footer image **4 (Carina)**; no gold, less blue
   - job dates and logos taken from his LinkedIn (freelance founder entry
     left off)
6. **PR #1** opened and merged; **PR #2** for the dates, logos and a
   cache-busting fix after the old stylesheet showed up cached.

## Open items

- **Merge PR #2.**
- **Job titles differ from LinkedIn.** Site: UX director / systems engineer /
  game developer / game designer (Froglet), Game Developer II (Virtualize),
  Unity Developer (LOKII). LinkedIn: Gameplay and Systems Developer, Game
  Developer, Software Engineer. Pick one version.
- **LOKII logo:** none published; the site shows an "L" mark. Swap in a real
  one if it exists (`images/logos/`, then the Experience tab in `index.html`).
- **His own night-sky photos** should replace the NASA placeholders
  (`images/bg/`, black and white; the tint colours them).
- **Board:** the "Built" page screenshots are older than the site; the
  editable frame ("Site · editable") is current. A separate "Shombith
  Vaporwave" preview artifact still exists and can be deleted.
- **Unpublished:** the second blog post draft is still unchecked; do not
  publish it from the site.

## Commits

PR #1 (merged into `main`):

```
a775f12 Add portfolio rebuild docs: brief, facts and voice
59269c1 Strip: remove Coming Soon tiles, skills chips, Yeth GameDev and emoji
0c0cdc2 Restructure into the brief's sections with placeholder copy
778f722 Write the Cosmic Shore section and the hero
9edf5c6 Write sections 2 to 5, the collapsed material and contact
20a3e30 Theme and type: a night sky in dark mode, a star atlas in light
dcf1e93 One moment of motion: the sky resolves on load
96b32b6 Writing: link the published Amoebius dev log
4047fd8 Rebuild as a pause menu over the night sky, with working tabs
17b7f17 Finish the page: icons, link previews, 404, README, tab fit
b5e4682 Synthwave sky, About and Earlier work tabs, fuller Tooling, plainer headings
dad9356 Experience tab in place of Earlier work
14e9807 Experience: roles, dates column, related links, fill-in slots; roles in the hero
2e6dfe8 Deep-space sky with constellations and more motion; apply board comments
4af26cf Animated spacetime and black hole in the hero; black hole backgrounds
b1d1412 Interstellar and vaporwave themes, companion robot, card motifs, the quote
d5f21eb Interstellar only; big-bang opening with the motto; cuter robot; footer background
cd5ec51 Chosen copy, photo-backed cards, warmer neutrals
da6005e Movie-poster type: Bebas Neue headings over Barlow
1da09ad Tint D mixed with A: black-and-white photos with a soft violet cast
a40d53b Experience: drop the empty year slots until dates are known
```

PR #2 (open): job dates and logos, a merge of `main`, CSS/JS cache-busting,
and this documentation update.

## Notes for the next session

- Edit copy in `index.html`; every claim must be in FACTS.md.
- Change the tint with `--tint` / `--tint-mix` in `style.css`; fonts with
  `--font-display` / `--font-body` (and the Google Fonts link in both HTML
  files).
- After changing CSS or JS, bump `?v=` in `index.html` and `404.html`.
- Test with reduced motion on and JavaScript off; check 400px width.
- Don't force-push `rebuild`; merge `main` into it instead (a force-push was
  blocked by the session's safety rules).
