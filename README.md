# shombith-portfolio

My portfolio: <https://shombith03.github.io/shombith-portfolio/>

A single static page, served by GitHub Pages. No build step, no framework.

## Files

| File | What it is |
|---|---|
| `index.html` | All of the copy. Each tab is one `<section class="panel">`. |
| `style.css` | The look. Colours, fonts and the background photo are tokens at the top. |
| `js/spacetime.js`, `js/companion.js`, `js/intro.js` | The hero animation; the robot and card motifs; the opening big bang. |
| `js/tabs.js` | Turns the sections into tabs and fades each tab's photo in. Without it, every section shows, stacked. |
| `404.html` | Shown by GitHub Pages for any address that does not exist. |
| `images/` | Screenshots, my photo, old project art (`work/`), the backgrounds (`bg/`) and the link-preview card. |

## Common edits

- **Change copy.** Edit the text in `index.html`.
- **Add a tab.** Add a link in `.tablist` (`<a class="tab" href="#my-id" data-tab>`)
  and a matching `<section id="my-id" class="panel">` inside `#panels`.
- **Use my own night-sky photos.** Each tab has a `data-bg` photo that fades in
  behind it (`images/bg/`). Replace any of those files with my own frames, then
  update the credit line in the footer of `index.html`. Behind the photos are
  animated nebula clouds and star layers, all CSS, in the sky section of `style.css`.
- **The black hole in the hero.** `js/spacetime.js` draws it on a canvas: a
  spacetime grid bending into a gravity well, ripples running outward, and a
  black hole with a lensed accretion disk. Its size and position are in
  `frame()`; colours are in `grid()` and `hole()`.
- **Constellations.** Orion, Cassiopeia and Ursa Major, plotted from real star
  positions, take turns drawing themselves in the Night sky tile on the About tab.
- **The opening.** `js/intro.js` plays a big bang and the motto once per visit
  (skip button, Escape; reduced motion skips it).
- **The companion robot.** `js/companion.js`. It patrols the bottom of the screen,
  drives round any card you hover, and follows the cursor after a click. Card
  motifs come from `data-motif` on each card (orbit, pulse, flow, transfer,
  scan, wave, signal, grid).
- **Change the tint.** The space photos are black and white; `--tint` (an R G B
  colour) and `--tint-mix` (0 to 1) at the top of `style.css` colour all of them.
  `--tint-mix: 0` gives pure black and white.
- **Change colours or fonts.** Edit the tokens at the top of `style.css`.
- **Refresh the link preview.** `images/og.jpg` is 1200 × 630 and is what
  LinkedIn, Slack and Discord show when the link is shared.

## After changing CSS or JS

`index.html` and `404.html` load `style.css` and the scripts with `?v=…`.
Bump that value whenever those files change, so returning visitors get the
new files instead of a cached copy.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>. `404.html` uses paths under
`/shombith-portfolio/`, so it only looks right once deployed.
