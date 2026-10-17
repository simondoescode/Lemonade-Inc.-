# Lemonade Tycoon Deluxe — gameplay research notes

These are analysis notes for the **independent** browser implementation *Squeeze Street*. The original game, branding, sprites, audio and packaged data are not distributed, modified or bundled here.

## Supplied file: static inspection

Source supplied by the user: `Lemonade-Tycoon_Win_EN_Versions-119.exe` (4,277,944 bytes). Inspecting the file's PE headers and ordinary, readable string metadata without executing it yielded:

- Windows PE32 executable, Intel x86, GUI subsystem, 6 sections (1999 timestamp in PE header; this is an installer compiler timestamp, **not** reliable game release dating).
- Includes an installer section named `_mvdata` holding most of the file (likely compressed/packaged install payload).
- Installer's file list references `Lemonade.exe`, `Lemonade.ico`, `Lemonade.RB` and `Lemonade.dat`.
- The installer's product name is **Lemonade Tycoon Deluxe** and its licence text calls the included game a demo application.
- **Important limit:** inspecting an installer is not equivalent to inspecting the original game engine. We did not run the installer, unpack any proprietary graphics, disassemble commercial game code, remove protection or test original binary behaviour.

## High-level gameplay established from public sources

- Starts with $40, with a casual unlimited Career mode and a 30-day Challenge mode.
- Each day the player selects a location and manages a per-pitcher recipe (lemons, sugar and ice), per-cup price, stock (lemons, sugar, ice and cups) and advertising.
- Weather, the location and news events change demand; customers react to drink quality, price and waiting time.
- Ice melts overnight, some lemons spoil and larger inventory bundles offer a discount.
- The business expands through stand upgrades, employees and moving to locations with higher rent/traffic.
- The player reviews sales, expenses, satisfaction, reputation and daily results; popularity is local to each location.

Research references:

- https://en.wikipedia.org/wiki/Lemonade_Tycoon
- https://strategywiki.org/wiki/Lemonade_Tycoon/Walkthrough
- https://www.supercheats.com/pc/walkthroughs/lemonadetycoon-walkthrough01.txt
- https://www.gamespot.com/reviews/lemonade-tycoon-review/1900-6093255/
- https://games.softpedia.com/get/Shareware-Games/Lemonade-Tycoon.shtml (historical screenshots used for genre/layout research only)

## How Squeeze Street differs

- Brand, title, UI styling and inline-vector illustration are **new**.
- Gameplay is independently balanced (it does not claim to be a byte-for-byte or formula-identical engine).
- No original source, sprites, sounds, maps, fonts, copyrighted text or game data were copied.
- Ships as dependency-free HTML/CSS/JS with a mobile-friendly responsive UI, offline PWA, JSON save export/import and deterministic day simulation.
- Modern upgrades, venue names, prices, event flavour, staff attributes and reputation formula are our own new design.

## Scope for future work

Deep fidelity could be improved through user-observed behaviour (play sessions with the legitimately obtained original game) rather than republishing copyrighted resources. Candidate improvements include character queue animations, venue-specific visitors, difficulty tuning, better sales/customer breakdowns, achievements, ambient audio and additional daily news.
