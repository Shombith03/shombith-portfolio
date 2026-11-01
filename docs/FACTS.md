# FACTS

What Shombith built, and the figures that are safe to publish. Compiled from
his own curated contribution list, 2026-11-01, on top of a full git audit of
`froglet-studio/Cosmic-Shore` measured 2026-10-29.

**Rules for every session reading this file:**

1. This file is features-first. Lead with what a system does, not how many
   commits it took.
2. Quote any figure here exactly. Do not round, estimate or re-derive.
3. If a claim is not in this file, it does not go in the output.
4. Respect the attribution tiers below. They are deliberate.

---

## Attribution tiers

This is the most important section. Getting it wrong is the one failure that
cannot be recovered from in an interview.

**Fully his.** Amoebius, Froglet Compute, cs-asset, the MCP server, the agent
pipeline and skills, the camera system, the HUD rebuild, the analytics stack,
the PlayFab removal, the website work. Claim these outright.

**Co-worked — do not claim as his own.** Netcode for GameObjects and Photon
work, the party and multiplayer systems, the server-authoritative ecology, and
deterministic race-track spawning. He contributed to these alongside others,
mostly fixing bugs. **Leave them off the portfolio entirely.** Do not soften
them into "contributed to" — omit them.

**Worked on, not owned.** Vessels and abilities. Real work, shared ownership.
Put it in the collapsed section, phrased as work on the system rather than
authorship of it — "worked on the vessel ability system: each ability became a
data `ActionSO` with a runtime `ActionExecutor` resolved through
`ActionExecutorRegistry`." Never in the owned sections.

If a session is unsure which tier something falls in, it asks rather than
guesses.

---

## The lede

The original lede, still true and still used in the Amoebius tab:

> I wrote a .NET 10 engine that compiles and runs an existing Unity game
> without Unity.

**Live headline (chosen 2026-11-01, docs/COPY_OPTIONS.md option 2):** Game
systems, the engines under them, and the pipelines that ship them.
**Live intro (option 3):** Game developer at Froglet. I work on Cosmic Shore,
from its interface to its build pipeline, and I'm writing an engine that runs
it without Unity.
**Motto:** "Do not go gentle into that good night." (Dylan Thomas). Shown in
the opening animation and as a small labelled line at the top of the hero.
Not in the footer.

**Role line:** Software engineer. Location appears only in the About tab.
**Designations (from Shombith, 2026-11-01):** UX director, systems engineer,
game developer, game designer. Shown in the hero and on the Froglet Games job.
**Positioning:** I build engines, multiplayer systems and the pipelines that
ship them.
**Availability:** Open to contract work (on Unity multiplayer, tooling and
pipelines).
**Email:** shombithofficial@outlook.com
**GitHub:** https://github.com/Shombith03
**LinkedIn:** https://www.linkedin.com/in/shombith/
**Location:** Kolkata, India.

---

## Numbers policy

A number that describes **the work** stays. A number that describes **his
activity** goes.

**Publish these:**

| Figure | What it proves |
|---|---|
| 2,030 files byte-for-byte | cs-asset round-trips Unity assets without corruption |
| ~87,800 lines across 452 files removed | the PlayFab retirement was real, not cosmetic |
| 209 GUIDs with zero inbound references | he proved it was dead before deleting it |
| zero compile errors | the real game scripts build against his engine |
| 2,591 lines deleted across 80 files | the HUD rebuild replaced rather than layered |
| ~300 lines cut from `ShipHUDController` | the subscription model simplified it |
| 15 projects | the engine's scale |
| 4,700-file Unity project | the scale the agent tooling runs on |
| 35 Claude Code skills in the repo | the skill library's size (only name the ones he wrote) |

**Never publish these:** total commit counts, per-area commit counts, PR counts,
"57 of my commit messages name Sparrow", 1,262 / 1,952 / 3,214 / 258 / 217, or
any monthly commit figure. They measure typing, not engineering.

**One exception.** Where AI assistance is described, "1,952 commits from Claude
Code sessions I directed" may be used, because there the number is the point.
Use it once, in the AI-tools section only, never in a headline block.

---

## Section order

The live site is seven tabs, in this order. Cosmic Shore is the body of work;
Amoebius is one strong tab among several, not the whole page.

1. Cosmic Shore — the systems he owns
2. Shipping — the launch pipeline, four platforms
3. froglet.games — the studio site he built
4. Amoebius — his engine
5. Tooling — Froglet Compute, cs-asset, the agent pipeline, in-project tools
6. Experience — dated job timeline, then earlier projects
7. About — bio, hobbies, night-sky chart, toolbox (skills)

---

## 1. Cosmic Shore — systems he owns

### The UI, rebuilt
He redid the game's entire UI — the architecture and the look. The ship HUD
moved onto subscriptions, `ShipHUDController` cut by ~300 lines into
`HudSubscriptionSO` and per-ability views, then 2,591 lines of superseded HUD
scripts deleted across 80 files. On top of that, a new visual language across
every screen: menus, the hangar, the arcade flow, the event feed and toasts.
[`4500bd949`](https://github.com/froglet-studio/Cosmic-Shore/commit/4500bd94900401be9b8c7cce90eecdb8d4002c45)
[`662e300ed`](https://github.com/froglet-studio/Cosmic-Shore/commit/662e300ed46206479ece25160692e9ad305158d5)
[#87](https://github.com/froglet-studio/Cosmic-Shore/pull/87)
[#343](https://github.com/froglet-studio/Cosmic-Shore/pull/343)
[#364](https://github.com/froglet-studio/Cosmic-Shore/pull/364)

This is the strongest Cosmic Shore claim. Lead the section with it.

### Backend: PlayFab to UGS
Migrated the game's whole backend onto Unity Gaming Services and took the old
one out. Anonymous sign-in and player profiles
([#93](https://github.com/froglet-studio/Cosmic-Shore/pull/93)), one
`UGSDataService` as the single entry point for cloud save and data
([#346](https://github.com/froglet-studio/Cosmic-Shore/pull/346)), profiles and
avatars moved onto a live `PlayerDataService` across every menu
([#136](https://github.com/froglet-studio/Cosmic-Shore/pull/136)
[#537](https://github.com/froglet-studio/Cosmic-Shore/pull/537)), leaderboards,
Cloud Code, and Unity IAP with web checkout
([#405](https://github.com/froglet-studio/Cosmic-Shore/pull/405)). PlayFab then
came out entirely: 452 files, ~87,800 lines, after proving 209 GUIDs had zero
inbound references.

### Data-driven cameras
A custom camera controller, `CameraSettingsSO` assets and an interface-based
`CameraManager`, replacing ad-hoc follow logic. Trailer and cinematic cameras
on top.
[#50](https://github.com/froglet-studio/Cosmic-Shore/pull/50)
[#59](https://github.com/froglet-studio/Cosmic-Shore/pull/59)

### Analytics and consent
Retired Firebase for one facade behind a consent and age gate, fanning out to
UGS and a PostHog sink batched with an on-disk queue. Debounced cloud saves,
per-vessel tracking, UGS stat keys.
[#101](https://github.com/froglet-studio/Cosmic-Shore/pull/101)
[#546](https://github.com/froglet-studio/Cosmic-Shore/pull/546)

### Tooling inside the project
Central logging — `CSDebug` with per-type flags and a tabbed control window,
replacing raw `Debug.Log` across the codebase
([#102](https://github.com/froglet-studio/Cosmic-Shore/pull/102)
[#530](https://github.com/froglet-studio/Cosmic-Shore/pull/530)). A performance
benchmark tool with CPU/GPU split and bound-verdict overlays
([#529](https://github.com/froglet-studio/Cosmic-Shore/pull/529)
[#544](https://github.com/froglet-studio/Cosmic-Shore/pull/544)). A dialogue
system driven by SOAP events
([#434](https://github.com/froglet-studio/Cosmic-Shore/pull/434)). The Unity
6.3 LTS migration ([#555](https://github.com/froglet-studio/Cosmic-Shore/pull/555)).

---

## 2. Shipping it — four platforms

He handles the whole delivery pipeline. It is automated and scheduled: builds
run on their own, not on someone remembering to press a button.

- **iOS.** TestFlight uploads from GitHub Actions, signing a Windows-made Xcode
  export on a macOS runner.
  [`566bd5888`](https://github.com/froglet-studio/Cosmic-Shore/commit/566bd5888)
- **Android.** Scripted release App Bundle build with a pre-upload Play check.
  [`dc0613aa2`](https://github.com/froglet-studio/Cosmic-Shore/commit/dc0613aa2)
- **WebGL.** Build entry point, pre-export and browser template, published to
  Cloudflare R2 and **playable right now at
  [froglet.games/play](https://www.froglet.games/play)**. Rollback is one file.
  [`402b61929`](https://github.com/froglet-studio/Cosmic-Shore/commit/402b61929)
- **Steam.** Steamworks.NET integration and release tooling.
- **CI that actually compiles Unity.** The Unity job had never run — the runner
  label was never set, so every green build was Python checks only. Replaced
  with a push-triggered guard that validates, compiles and opens an autofix PR.
  [`14129ba73`](https://github.com/froglet-studio/Cosmic-Shore/commit/14129ba73)

---

## 3. froglet.games

The studio site, built by him. Jekyll on GitHub Pages, Cloudflare Pages
previews on every branch, Google Consent Mode v2, forms posting through a
Google Apps Script to a Sheet, WebGL builds served from R2, and a browser
Studio where the team edits their own profiles — GitHub sign-in, every save a
commit through the API. <https://www.froglet.games/>

---

## 4. Amoebius — a .NET 10 engine that runs Cosmic Shore without Unity

Started June 2026. 15 projects under `Port/`.

- **Engine runtime.** Scene graph with reflective lifecycle discovery, a
  deterministic `GameLoop`, `GameTask` replacing UniTask, an injection
  container replacing Reflex, a SOAP layer replacing Obvious.Soap.
- **Runs the real game.** The actual `Assets/_Scripts` compile against
  engine-side API surfaces with zero errors.
  [`6a4ace506`](https://github.com/froglet-studio/Cosmic-Shore/commit/6a4ace506ca9d93ae349289743521df55de21672)
- **Cross-process networking.** TCP transport, RPC routing and a session
  directory, carrying Netcode's own model between processes.
  [`aeba7a882`](https://github.com/froglet-studio/Cosmic-Shore/commit/aeba7a882eb423f03af98dc6271c00d5f914c83c)
- **Online play.** Runs through the same UGS Lobby and Relay as the Unity build.
  [`01f582228`](https://github.com/froglet-studio/Cosmic-Shore/commit/01f582228d37ae69b06ae85648bb15e082def605)
- **Graphics parity.** Matched the Unity build's rendering, including a
  reimplementation of URP 17.3's Gaussian bloom.
  [`fa16d6115`](https://github.com/froglet-studio/Cosmic-Shore/commit/fa16d6115ebfd06440e69d9bd815e6639934a84c)
- **Launcher and phone builds.** Fetches a branch, compiles it, runs it, and
  builds Android and iOS.
  [`8fddab744`](https://github.com/froglet-studio/Cosmic-Shore/commit/8fddab744d7f09594c0d5388fcab27cd3bd5a1cd)
- **An engine agents can drive.** An MCP server lets an agent build the game,
  start it, take screenshots, click and steer, and read live values.
- **A capture studio.** Because the loop is deterministic, the engine doubles
  as a controlled capture and render environment for the game's trailers and
  marketing footage — exact repeatable runs instead of hand-flown takes.

---

## 5. Tooling

### Froglet Compute
An automated compute server on a VM. Takes job requests through git, runs them,
and writes each job's best result and a heartbeat back to the repo. Drives
per-vessel tuning runs, a bioform forge, and Unity training. No public repo —
describe it, do not link code.

### cs-asset
Edits Unity scenes and prefabs and writes them back byte for byte, with no
Unity involved. Verified across 2,030 files.

### The agent pipeline
Skills and hooks that make agent work viable on a 4,700-file Unity project, and
the `/ship` protocol — review the branch, prove any editor tool's output landed,
finish the docs, make a go/no-go call, then open the PR. Three lanes:
`/ship-quick`, `/ship-deep`, `/ship-tools`. 1,952 commits landed through his
pull requests from sessions he directed. **This is the only place that figure
appears.**

---

## Collapsed — present but quiet

**More Cosmic Shore work.** Arcade game modes — Drag Scouting, Dog Fight,
Explosive Joust, Needle Thread, BlockBandit
([#424](https://github.com/froglet-studio/Cosmic-Shore/pull/424)
[#444](https://github.com/froglet-studio/Cosmic-Shore/pull/444)); team
selection, four-player co-op scoring and team-aware win detection
([#436](https://github.com/froglet-studio/Cosmic-Shore/pull/436)
[#492](https://github.com/froglet-studio/Cosmic-Shore/pull/492)); crystal
rewards and late-joiner spawning
([#418](https://github.com/froglet-studio/Cosmic-Shore/pull/418)); lobby
lifecycle and debounced polling
([#487](https://github.com/froglet-studio/Cosmic-Shore/pull/487)); quest-driven
progression ([#223](https://github.com/froglet-studio/Cosmic-Shore/pull/223));
QuickPlay and the hangar unlock grid.

**Experience, with dates (from Shombith's LinkedIn, 2026-11-01).** Froglet Games,
Apr 2025 to present. Virtualize Technologies, May 2024 to Apr 2025. LOKII Software
Development, Aug 2021 to Apr 2024. (The freelance founder entry is left off the site.)

**Earlier work.** Mind Arcade — Lead Unity Developer; Gridlock Escape, Match
Master, AssetBundle systems, a React Native–Unity bridge. Moon Racer, 3D ZigZag,
Ultimate Beer Pong (hypercasual, 2022–2024). Scene Switcher Master, a Unity
editor tool on the Asset Store. Companies: Lokii Software Development,
Virtualize Technologies, Froglet Games.

**Skills.** C#, .NET 10, Unity 6 / 6.3 LTS, Unity UI and TextMeshPro,
ScriptableObjects and SOAP, dependency injection (Reflex), UniTask and async,
DOTween, UGS Lobby and Relay, UGS Authentication and Cloud Save, PlayFab,
Firebase, PostHog, Unity IAP, AssetBundles, React Native–Unity bridge, URP and
shaders, OpenGL, FMOD, Silk.NET and Dear ImGui, Android and iOS builds, Unity
editor tooling, performance profiling, Jekyll and GitHub Pages, Cloudflare
Pages and R2, git and pull-request workflow, Claude Code skills and hooks, MCP,
Claude artifacts, optimisation and AI-training jobs, Linux VMs and job queues.

**Do not list** Netcode for GameObjects or Photon in the skills section. See
the attribution tiers.

---

## Writing

- *Amoebius: building our own engine, one script at a time* — dev log on
  froglet.games, 23 October 2026.
  <https://www.froglet.games/blog/amoebius-our-own-engine/>
- *Porting a Unity game to a .NET engine I wrote* — draft on the portfolio
  branch. **Read it before it goes live.** It was drafted from commits and has
  not been checked.

## Claude artifacts

Around thirty interactive labs and tools built on claude.ai — Serpent Studio,
Froglet Compute Console, Intro Cam Lab, Tandava Form Lab, Menu Redesign B,
Threat Board and others.

**Not on the public site.** They are private links a visitor cannot open, and a
gallery of dead links reads worse than no gallery. Keep them for interviews and
direct conversations.

---

## Known gaps — do not claim

- **No Discord bot code exists** in any repo audited. Found only in docs.
- **Amoebius has no standalone repo.** It lives under `Port/` inside the game
  repo.
- **The skills repo does not exist** until stream D creates it.
- **Froglet Compute has no public repo.** Describe it; do not link code.

---

## Personal (for the About tab)

- **Bio line (chosen, option 2):** I live in Kolkata and build Cosmic Shore at
  Froglet Games. Outside work it's the night sky, film (Interstellar above
  all), music, psychology and travel.
- **Quote from his froglet.games profile, verbatim:** "I love exploring new
  ideas and bringing them to life. Music philosophy and the cosmic land is my
  nirvana."
- **Hobbies:** stargazing and night-sky photography, deep space, film,
  music, psychology, travel.
- **Favourite film:** Interstellar. The site's look and the black hole come
  from this.
- **His own photographs:** he shoots the night sky. The site's space photos
  are NASA/ESA public-domain placeholders until his frames replace them.

## Experience (from LinkedIn, 2026-11-01)

| Dates | Company | Role on the site | Title on LinkedIn |
|---|---|---|---|
| Apr 2025 – Present | Froglet Games (full-time, Michigan, US, remote) | UX director, systems engineer, game developer, game designer | Gameplay and Systems Developer |
| May 2024 – Apr 2025 | Virtualize Technologies Private Limited (Chandigarh) | Game Developer II | Game Developer |
| Aug 2021 – Apr 2024 | LOKII Software Development (Pune, remote) | Unity Developer | Software Engineer |

- The site titles are the ones Shombith gave; LinkedIn's differ. Decide
  which wins before changing either.
- **Virtualize:** led Unity development on Mind Arcade (Gridlock Escape, Match
  Master), built client projects, made Ultimate Beer Pong.
- **LOKII:** Unity development on in-house projects and client projects.
- **Left off on purpose:** the freelance "Founder | Unity Tools Developer"
  entry (Mar 2025 – present).
- LOKII has no company logo on LinkedIn; the site uses a lettered "L" mark.

## Decisions made during the rebuild (2026-11-01)

These are Shombith's calls. They override earlier defaults in this file and
in VOICE.md.

- **Never list:** the co-op and lobby PRs #436, #492, #418, #487 (team
  selection, four-player scoring, late-joiner spawning, lobby lifecycle).
- **Removed from Cosmic Shore:** the Cameras card (#50, #59). Still fully his;
  he chose not to feature it. The hero intro also no longer mentions cameras.
- **Unity 6.3 LTS migration (#555):** folded into a "Delivery pipeline" card
  rather than its own card.
- **iOS card:** no commit hash shown (566bd5888 removed on request).
- **Writing tab:** removed. The Amoebius dev log is linked from the Amoebius
  tab instead. The second post is still an unchecked draft; do not publish it.
- **Cosmic Shore repo is public,** so commit and PR links work for visitors.
- **Tooling tab** has seven cards: Froglet Compute, cs-asset, /ship, skills
  and hooks, CSDebug, the benchmark tool, the dialogue system. The repo's
  skill library is 35 skills; only /ship and its lanes are named as his.
