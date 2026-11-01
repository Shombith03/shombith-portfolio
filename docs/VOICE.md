# VOICE

How everything under Shombith's name reads. Applies to the portfolio site, the
GitHub profile, CONTRIBUTIONS.md, skill READMEs, blog posts and store listings.

Read this before writing any user-facing copy. These are rules, not preferences.

---

## Identity

- He is **Shombith Chakraborty**. Solo, under his own name.
- **Never write YethGameDev, YethGameDevv, or "Yeth" anywhere.** That brand is
  retired. Do not invent a replacement studio name either. No "Companies I Run"
  section, no logo, no alias.
- Roles he uses: **UX director, systems engineer, game developer, game
  designer**, at Froglet Games, working on Cosmic Shore. (LinkedIn says
  "Gameplay and Systems Developer"; see FACTS.md before changing either.)
- Location: Kolkata. Say it once, in the About section, not everywhere.
- Open to contract work on Unity multiplayer, tooling and pipelines.
- **Motto:** "Do not go gentle into that good night." (Dylan Thomas). Use the
  real line ("that good night", not "the good night"). It belongs in the
  opening and as a small labelled line at the top of the hero. Not in the
  footer, not repeated in every section.

## Banned, absolutely

- **Emoji.** None, anywhere, in any file. Not in headings, not as bullets, not
  in a README badge row.
- **"Passionate."** Also: "always leveling up", "let's build something
  amazing", "let's shape the future of games together", "driven", "enthusiast",
  "ninja", "rockstar", "10x".
- **"Coming Soon."** If a thing does not exist, it does not get a slot. Omit
  the section rather than promise it.
- **Capability lists in place of work.** No chip grids of "Rapid Prototyping",
  "Project Rescue", "4+ Years of Professional Experience". Name a system and
  give its commit instead.
- **Unverifiable superlatives.** No "expert", "specialist", "best-in-class".

## Tone

Plain statement, past or present tense, active voice. Say what was built, what
it does, and what it cost. Let the work carry the weight.

The register is a senior engineer describing their work to another engineer who
will check. Not a pitch, not a CV, not a LinkedIn post.

**Understate.** The work is strong enough that selling it makes it look weaker.
Describe the system; do not tell the reader it was impressive, ambitious or
hard. No "cutting-edge", "from the ground up", "complete overhaul". If a
sentence would survive being read aloud to the colleague who reviewed the PR,
it is the right register.

**Headings are plain names.** "Unity CI", "UI rebuild", "Runtime",
"Delivery pipeline". Not "CI that actually compiles Unity", not "Playable right
now", not "An engine agents can drive". A heading that tries to sell reads as
written by AI; he called those out and they were all replaced.

**Keep it short.** Two to four sentences per system. A visitor skims; the
details are in the linked PRs and that is what links are for.

Good:
> Rebuilt the ship HUD around subscriptions. `4500bd949` cut
> `ShipHUDController` by ~300 lines into `HudSubscriptionSO` and per-ability
> views; `662e300ed` then deleted 2,591 lines of superseded scripts across 80
> files.

Bad:
> Passionate about clean architecture! Refactored the entire HUD system for
> maximum maintainability and performance.

## Evidence

Every claim that can carry a commit hash, a PR link or a figure, carries one. A
claim that cannot be backed gets cut rather than softened.

All figures come from `FACTS.md`. Do not compute, estimate or round. If the
number you need is not there, stop and ask for it.

Commit hashes and PR links are a deliberate signature. Set them in mono and use
them often — they are the thing no other portfolio has.

## Numbers

**A number that describes the work stays. A number that describes his activity
goes.**

Keep: 2,030 files byte-for-byte. 87,800 lines removed. 209 GUIDs with zero
inbound references. Zero compile errors. 2,591 lines deleted across 80 files.
These prove the engineering happened.

Cut: commit counts of any kind, per-area commit counts, PR counts, "57 of my
commit messages name Sparrow". These measure typing. A reader does not think
"he commits a lot"; they think "why is he counting?"

`FACTS.md` carries the full publish/never-publish table. Follow it exactly.

## Attribution

`FACTS.md` has an attribution-tiers section. It is the one rule that cannot be
got wrong.

Work he co-worked on — Netcode and Photon systems, party and multiplayer, the
server-authoritative ecology, deterministic race tracks — is **omitted
entirely**. Not softened to "contributed to", not listed smaller. Omitted.

A claim that does not survive an interview question is worse than no claim.
Never list Netcode for GameObjects or Photon as a skill.

## On AI assistance

State it plainly, as part of how the work gets done. Never hide it, never
apologise for it, never lead with it.

Approved phrasing:
> I work heavily with Claude Code, and I write the skills and hooks that make
> it useful on a 4,700-file Unity project. A further 1,952 commits landed
> through my pull requests that way. Directing that well is its own skill.

Where the combined 3,214 figure is used, the split is stated in the same
sentence. Never present the combined number alone.

## Formatting

- Sentence case for headings. No Title Case, no ALL CAPS headings.
- Em dashes sparingly. No decorative dividers between every section.
- Lists only where the content is genuinely a list. Prose by default.
- Numbers in tabular figures where they line up in columns.
- Link text says what it is. Never "click here".

## Design

The site went through several directions (night-sky editorial, pause menu,
synthwave, vaporwave) before landing here. **This section describes the
current design; it replaces the earlier rules about one glow and one moment
of motion, which he overrode.**

**Theme: Interstellar, tinted.** His favourite film sets the mood. Deep-space
photographs in black and white with a soft violet cast, a near-black violet
ground, lilac accents. No gold (he disliked it), no heavy blue (he disliked
that too), no vaporwave or synthwave city (tried and dropped).

- **One tint setting.** Photos are stored black and white. `--tint` and
  `--tint-mix` in `style.css` colour all of them. Current: Tesseract violet
  (92 70 176) at 0.5, a mix of the "Tesseract" and "Silver screen" options.
- **Palette tokens:** ground `#06060b`, panel `#121118`, text `#eeebf3`, muted
  `#c4bfce`, faint `#978fa6`, accent lilac `#c9b8ff`, link lavender `#e2dcf2`.
  Every text colour passes WCAG AA.
- **Type:** "Movie poster". Bebas Neue for headings, the name, tabs, buttons
  and card titles (single weight, no faked bold); Barlow for body and the
  italic motto line; JetBrains Mono for commit hashes, tags and labels.
  Avoid Inter and Space Grotesk.
- **Photos:** NASA/ESA/CSA/STScI/JPL-Caltech public-domain images (Saturn,
  Earth's limb, the Hubble deep field, two black holes, Carina, Andromeda),
  credited in the footer as placeholders. His own night-sky photographs
  should replace them when he has them. Cosmic Shore screenshots appear on
  cards only, not as page backgrounds.
- **Every card has a background:** its own darkened, tinted patch of space.
  Plain flat cards were rejected as bland.
- **Footer:** the Carina cliffs, tinted. Never a flat footer.
- **Layout:** a sticky tab bar (seven tabs, Q/E to switch), a hero, then one
  panel at a time. Tiles in a grid; the selected tile carries a screenshot.

**Motion is wanted, not minimised.** He asked for more animation. Current set:
a big-bang opening that ends on the motto (once per visit, skippable);
an animated spacetime grid bending into a black hole behind the hero (keep it
realistic, not cartoonish); drifting star layers, shooting stars and slow
nebula clouds; a warp jump on tab change; tiles that stagger in and lift on
hover; a small animated motif on each card; and a companion robot.

**The companion robot** is an original three-slab design in the spirit of
TARS, never a copy of the film's character and never named TARS on the site.
It patrols the bottom of the screen, drives round any card you hover, and
follows the cursor after a click. Keep it cute: rounded slabs, a face screen
with blinking eyes, an antenna light.

**Always:** respect `prefers-reduced-motion` (every animation off, intro
skipped), keep focus states visible, no horizontal scroll at 400px, and make
the page readable with JavaScript off.

The test: it should look like a working engineer's site that happens to be
beautiful, not a theme with his name dropped into it.
