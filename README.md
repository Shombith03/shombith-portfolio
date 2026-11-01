# shombith-portfolio

My portfolio: <https://shombith03.github.io/shombith-portfolio/>

A single static page, served by GitHub Pages. No build step, no framework.

## Files

| File | What it is |
|---|---|
| `index.html` | All of the copy. Each tab is one `<section class="panel">`. |
| `style.css` | The look. Colours, fonts and the background photo are tokens at the top. |
| `js/tabs.js` | Turns the sections into tabs. Without it, every section shows, stacked. |
| `404.html` | Shown by GitHub Pages for any address that does not exist. |
| `images/` | Screenshots, my photo, the sky background and the link-preview card. |
| `docs/` | `PORTFOLIO_BRIEF.md`, `FACTS.md` and `VOICE.md`: what to build, what may be claimed, how it reads. |

## Common edits

- **Change copy.** Edit the text in `index.html`. Every claim must come from
  `docs/FACTS.md`, and the writing follows `docs/VOICE.md`.
- **Add a tab.** Add a link in `.tablist` (`<a class="tab" href="#my-id" data-tab>`)
  and a matching `<section id="my-id" class="panel">` inside `#panels`.
- **Use my own night-sky photo.** Replace `images/sky.jpg` with the new frame,
  then update the credit line in the footer of `index.html`.
- **Change colours or fonts.** Edit the tokens at the top of `style.css`.
- **Refresh the link preview.** `images/og.jpg` is 1200 × 630 and is what
  LinkedIn, Slack and Discord show when the link is shared.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>. `404.html` uses paths under
`/shombith-portfolio/`, so it only looks right once deployed.
