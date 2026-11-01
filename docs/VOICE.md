# VOICE

How everything under Shombith's name reads. Applies to the portfolio site, the
GitHub profile, CONTRIBUTIONS.md, skill READMEs, blog posts and store listings.

Read this before writing any user-facing copy. These are rules, not preferences.

---

## Identity

- He is **Shombith**. Solo, under his own name.
- **Never write YethGameDev, YethGameDevv, or "Yeth" anywhere.** That brand is
  retired. Do not invent a replacement studio name either. No "Companies I Run"
  section, no logo, no alias.
- Role: Unity developer at Froglet Inc, working on Cosmic Shore. Based in
  Kolkata. Open to contract work on Unity multiplayer, tooling and pipelines.

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

**Deep space, observed rather than downloaded.** He is into deep space,
stargazing, film, music, psychology and travel, and the site should feel like
it came from someone who actually looks up. Synthwave is welcome — he likes it
— but the current site is template-grade synthwave and that is the thing to
fix, not the genre.

What that means concretely:

- **Palette from astrophotography, not from a vaporwave pack.** Deep blue-black
  grounds, the magenta-into-cyan a nebula actually makes, one warm accent for
  anything that matters. No #FF00FF, no purple-to-pink hero gradient, no
  grid-horizon-and-sun.
- **Glow is used once, where it means something.** The current site glows
  everything, which flattens it. One element earns a bloom; the rest stays
  crisp.
- **His own photographs beat stock.** He shoots the night sky. A real frame of
  his makes the site unmistakably his, where a stock nebula makes it anyone's.
  Prefer his images wherever he has them.
- **Dark-first is fine here.** This design can commit to dark rather than
  shipping two themes, as long as every colour is set explicitly and the
  background is a real token. If it does ship both, the light theme gets the
  same care.
- **Typography carries it.** A display face with character plus a clean body
  face. Avoid Inter and Space Grotesk — they read as the default choice.
- **One orchestrated moment of motion**, not scattered hovers. Respect
  `prefers-reduced-motion`. Everything readable at rest.

The test: it should look like a working engineer's site that happens to be
beautiful, not a theme with his name dropped into it.
