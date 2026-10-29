---
title: "Porting a Unity game to a .NET engine I wrote"
description: "Amoebius runs Cosmic Shore's own scripts, scenes and assets without Unity. Five commits that got it there."
tags: [amoebius]
image: /assets/img/amoebius-skim-race.webp
---

Cosmic Shore is a Unity game, and it ships from Unity. Since June 2026 it has also run on Amoebius, a .NET 10 engine that lives next to it in the same repository: 334 commits and 15 projects so far. This post walks through how the port works, using the commits that moved it.

## Why build an engine at all

Most of the work on Cosmic Shore now goes through Claude Code sessions. An agent writes a change. Then a person opens Unity, waits for the import, presses Play, watches, and pastes the errors back. The agent can write code all day, but it can't open the editor or play a match, so every change waits on a person.

I wanted that loop closed: the agent builds the game, runs it, looks at it, drives it, and fixes what it finds. You can't get that loop out of an engine you don't own. The plan we wrote down in June had one rule: lose nothing.

## Don't rewrite the game

The obvious way to port a game is to rewrite it. Amoebius doesn't. It compiles the game's own `Assets/_Scripts`, the same files Unity builds, and runs them. It reads Unity's scene, prefab and asset files directly. When someone changes the game in Unity, Amoebius runs that change too.

That decision sets the whole job. The engine has to present the Unity API surface the scripts expect, plus the libraries they lean on:

- a scene graph that discovers lifecycle methods like `Awake`, `Start` and `Update` by reflection, the way Unity does;
- a deterministic `GameLoop` to drive them;
- `GameTask` in place of UniTask;
- an injection container in place of Reflex;
- a SOAP layer in place of Obvious.Soap.

None of this is the game. It's the floor the game stands on.

## Zero errors

The first real milestone was a compile. On 29 September, {% include hash.html h="6a4ace506ca9d93ae349289743521df55de21672" %} closed the last gaps, and the real `Assets/_Scripts` built against the engine with zero errors.

The last gaps were the long tail you'd expect. `TMP_Text` as a `MaskableGraphic` with `textInfo`, `SetText` and `ForceMeshUpdate`. `TMP_InputField` editing from the keyboard with TMP's validation rules. `TMP_Dropdown` building its real popup from its template. `JsonUtility`. `UnityWebRequest` on top of `HttpClient`, completing on the main thread. `Resources.LoadAll`, `Graphics.Blit`, `Debug.unityLogger`. Each is a small API. Together they are the difference between "most of it compiles" and the game running.

Zero errors is a blunt metric, and it's the right one. Until the scripts compile unmodified, every other number describes a different game.

## Netcode between processes

Cosmic Shore is multiplayer, so a single-process engine proves little. The same day, {% include hash.html h="aeba7a882eb423f03af98dc6271c00d5f914c83c" %} got two instances of the Unity-free player to party up and fly together.

The first transport was TCP, and it carries Netcode for GameObjects' own model: connection approval, scene sync with a spawn snapshot, player objects, ownership, `NetworkVariable` and `NetworkList` replication at the tick rate, `NetworkTransform` interpolation, networked scene loads and named messages. The game's `[ServerRpc]` and `[ClientRpc]` methods stay as they are. The source sync inserts a prologue into every RPC body, and the prologue routes the call.

The check was a real flow across two processes: invite, accept, join, menu sync, both vessels replicated, then a client calling `RequestSetDomain_ServerRpc` and the hull repainting on both sides.

## One click to play a branch

An engine only helps if people use it. {% include hash.html h="8fddab744d7f09594c0d5388fcab27cd3bd5a1cd" %} added the launcher, a single executable to hand a tester. Pick a branch and press START: it fetches that branch into its own shallow clone or a worktree beside an existing one, pulls the FMOD library from LFS, compiles that branch's source and launches it. The BUILD page makes an Android APK or AAB, and an iOS export.

The same commit rewrote `Mathf.SmoothDamp` from the exact critically damped spring. The first version had followed Unity's reference source too closely.

<figure>
  <img src="{{ '/assets/img/amoebius-launcher.webp' | relative_url }}" width="1360" height="820" alt="The Amoebius launcher's Play page, with a branch picker and START and START ONLINE buttons" loading="lazy">
  <figcaption>The launcher. START builds the chosen branch and runs it offline; START ONLINE signs in to UGS.</figcaption>
</figure>

## Graphics parity

Next to the Unity build, Amoebius rendered darker, and wrong. {% include hash.html h="fa16d6115ebfd06440e69d9bd815e6639934a84c" %} traced that to its causes and fixed each one.

Bloom was about six times too weak. The fix was to reimplement URP 17.3's Gaussian bloom exactly: gamma threshold and knee, clamp, URP's pyramid depth, the 9- and 5-tap blurs, scatter, luminance-normalised tint and high-quality bicubic upsampling. Colour space was the second cause. Unity applies linear-space rules on every path, so now the engine does too: plain colours linearised, HDR colours as stored, particle, trail and line vertex colours linearised. Crystals are drawn from their own shader graphs instead of guesses from material names. URP Lit got its BRDF with an ambient probe, the skybox projected to L2 spherical harmonics, and no invented key light.

The commit records what it verified: 1,704 engine tests and 352 of the game's own edit-mode tests passing, and before-and-after screenshots of gameplay and menus.

<figure>
  <img src="{{ '/assets/img/amoebius-menu.webp' | relative_url }}" width="1600" height="900" alt="Cosmic Shore's main menu rendered by Amoebius, with a frame-time overlay" loading="lazy">
  <figcaption>Cosmic Shore's main menu in Amoebius, from the same scene and scripts as the Unity build.</figcaption>
</figure>

## Online, the same way as Unity

{% include hash.html h="01f582228d37ae69b06ae85648bb15e082def605" %} put START ONLINE next to START. It signs in to Unity Gaming Services and runs parties, invites and matches through UGS Lobby and Relay, the services the Unity build uses. The Lobby client is written against Unity's public REST reference. Sessions are lobbies with a 15-second host heartbeat, and the Relay join code lives in member-visible lobby data. Amoebius uses its own UGS environment, so its lobbies stay apart from the Unity build's.

The same commit removed the custom server, LAN discovery and shared-folder sessions. There is one online path now, and it's the real one.

<figure>
  <img src="{{ '/assets/img/amoebius-skim-race.webp' | relative_url }}" width="1280" height="720" alt="The finish of a Skim Race match, played in Amoebius" loading="lazy">
  <figcaption>A Skim Race finish, played in Amoebius.</figcaption>
</figure>

## How the work gets done

Most of the commits above are authored by Claude. They come from Claude Code sessions I directed: I set the target, the constraints and the check that proves it, and I review what lands. Each commit message says what was verified and what wasn't, down to "Unity /verify-unity was not run". That is the loop Amoebius exists to speed up, and the engine is also the thing that loop built.

## What it can't do yet

Amoebius doesn't replace Unity, and Cosmic Shore still ships from Unity. As of October, 19 of the game's 81 shaders have a proper translation; the rest draw with a stand-in. The heaviest scene went from about 150 ms a frame to 22–26 ms, which is still slower than Unity. Phones build, but they aren't where the PC version is.

The next milestone is gameplay parity: a blind test where nobody can tell the two builds apart. After that, one full release cycle without anyone opening Unity.
