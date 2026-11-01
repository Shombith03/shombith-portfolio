# Portfolio rebuild brief

For `shombith03.github.io/shombith-portfolio`. Read this in full, and read
`FACTS.md` and `VOICE.md` in the `shombith-brand` repo, before changing any
file.

`FACTS.md` is the only source of claims and figures. `VOICE.md` governs the
copy. This brief governs the structure.

---

## 1. What is wrong with the current site

Not the theme. The content.

The site shows Scene Switcher Master, MindArcade, Ultimate Beer Pong, 3D ZigZag,
Moon Racer, and three "Coming Soon" tiles. It does not show Amoebius, Froglet
Compute, cs-asset, the agent pipeline, or froglet.games. A visitor concludes
"competent mid-level Unity dev". The real record is someone who wrote an engine
that runs a shipping Unity game without Unity.

Four things to fix:

1. **It lists capabilities, not work.** Thirteen skill chips — "Rapid
   Prototyping", "Project Rescue & Bug Fixing", "4+ Years of Professional
   Experience". Anyone can claim those. Replace with named systems and PR links.
2. **Three of six project tiles say "Coming Soon."** Delete them.
3. **The register is junior.** Heavy emoji, "always leveling up". See
   `VOICE.md`.
4. **Everything is weighted equally.** The structure below fixes that.

One thing the rebuild must not do: overcorrect into a page that sells. Simple,
modern, understated. Short paragraphs, real links, no adjectives doing work the
systems already do. See the tone rules in `VOICE.md`.

Also: remove every mention of **Yeth GameDev** / **YethGameDevv**, including
"Companies I Run". He is solo under his own name. Do not invent a replacement.

---

## 2. The lede

One sentence carries this site:

> I wrote a .NET 10 engine that compiles and runs an existing Unity game
> without Unity.

Hero: name, the role line (*Software engineer · Kolkata*), the positioning line
(*I build engines, multiplayer systems and the pipelines that ship them*), then
that sentence. No tagline, no emoji, no scroll prompt. Size the hero to its
content, not the viewport.

---

## 3. Five sections

The current site is a flat grid where everything weighs the same. Replace it
with five sections of roughly equal weight, in this order. Cosmic Shore is the
body of work. Amoebius is one strong section among several — **do not give it
the whole page.**

1. **Cosmic Shore — systems I own.** The largest section. Five subsections from
   `FACTS.md`, led by the UI rebuild — he redid the game's entire UI, the
   architecture and the look, and it is the strongest claim here. Then the
   PlayFab-to-UGS backend migration, data-driven cameras, analytics and consent,
   and in-project tooling. Each two to four sentences with its PR links.
   **Vessels and abilities is not in this section** — it is shared ownership
   and goes in the collapsed material, phrased as work on, not authorship of.

2. **Shipping it.** The launch pipeline across four platforms — iOS via
   TestFlight from Actions, Android App Bundle with a pre-upload check, WebGL on
   Cloudflare R2 and **playable right now at froglet.games/play**, and Steam.
   Plus the CI guard that made Unity actually compile in CI. Make the live WebGL
   build a real link; a visitor can play the game from this section.

3. **froglet.games.** The studio site, built by him. Jekyll, Cloudflare previews
   per branch, Consent Mode v2, forms through Apps Script, WebGL from R2, and
   the browser Studio where the team edits their own profiles through the GitHub
   API. Screenshot, and a link.

4. **Amoebius.** His engine. The runtime, the real scripts compiling with zero
   errors, cross-process networking, online through UGS Lobby and Relay,
   graphics parity, the launcher and phone builds, the MCP server an agent can
   drive it through, and the capture-studio angle — the loop is deterministic,
   so it doubles as a controlled render environment for trailers.

5. **Tooling.** Froglet Compute, cs-asset, and the agent pipeline. The
   1,952-commit figure appears here and nowhere else on the site.

**Do not include party and multiplayer, the server-authoritative ecology, or
deterministic race tracks.** See the attribution tiers in `FACTS.md`. They are
co-worked and are omitted entirely.

### Below those

**More work, collapsed.** The PR-linked list, vessels, earlier work and
companies, the skills list. Present and scannable, visually quieter.

**Writing.** The published Amoebius dev log. The second post is a draft written
from commits — do not publish it from this session.

**Contact.** Email, GitHub, LinkedIn. One line: *Kolkata. Open to contract
work.* No contact form.

**Not on the site:** the ~30 Claude artifacts. They are private links a visitor
cannot open, and a gallery of dead links reads worse than no gallery.

---

## 4. Design direction

The current look is synthwave — purple gradient, neon pink, starfield, glow
text. It reads as a 2021 hobby template.

- **Mood:** instrument panel, not arcade flyer. Deep desaturated base, one
  restrained accent, generous whitespace, type doing the work.
- **Typography carries the page.** A display face with real character plus a
  clean body face. Avoid Inter and Space Grotesk. Set a type scale and keep to
  it.
- **The few numbers that survive are design material.** 2,030 files. 87,800
  lines. Zero errors. Set them large, in a tabular face, as part of the layout.
- **Commit hashes and PR links are the signature detail.** Mono, used often.
  Nobody else's portfolio has verifiable receipts in it.
- **Animation in one place only.** One orchestrated moment — the hero resolving,
  or tier 1 revealing — not scattered hovers. Respect
  `prefers-reduced-motion`. Everything readable at rest, no scroll triggers.
- Keep the existing photo.
- Light and dark themes, both, defined as tokens on `:root` and redefined under
  `@media (prefers-color-scheme: dark)`.

---

## 5. Technical requirements

- Responsive to 400px, no horizontal scroll.
- Real screenshots: Cosmic Shore, froglet.games, and the Amoebius launcher
  (in-engine shots are in the dev log on froglet.games).
- No images of people other than himself.
- Deployable from the same GitHub Pages repo.
- Visible focus states on every link. Do not regress accessibility.

---

## 6. Order of work

1. **Strip.** Remove the Coming Soon tiles, the capability chip list, Yeth
   GameDev, "Companies I Run", all emoji.
2. **Restructure** the HTML to the three tiers with placeholder copy.
3. **Write section 1,** Cosmic Shore. It is the body of work and the longest.
4. **Write sections 2 to 5,** then the collapsed material.
5. **Then** the theme and type.
6. **Then** the single animated moment.
7. **Blog last.**

Do not start with the theme. Show the rendered result after each section before
moving to the next.
