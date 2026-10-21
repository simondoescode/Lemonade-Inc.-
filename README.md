## Vite PWA quick start

Install Node.js 22+, then run `npm install` and `npm run dev` for local development. Build the production installable PWA with `npm run build` (output in `dist/`) and test it with `npm run preview`. `npm test` runs the gameplay tests. On GitHub Pages, select **Settings → Pages → Source: GitHub Actions**. The Pages workflow builds the app with `/Lemonade-Inc.-/` as its base path and deploys `dist/`.

The Vite PWA plugin generates the web manifest and a Workbox service worker, precaches the built game assets for offline play, and updates installed clients on subsequent deployments. Game progress continues to be saved in your browser; exporting a save file remains available. Browser installation prompts appear only when eligible.

# 🍋 Lemonade Inc. — Squeeze Street

**Lemonade Inc.** is a lively, original browser game inspired by the *genre* of classic lemonade stand / tycoon simulations. Runs on desktop and mobile. Built from scratch in JavaScript and inline SVG with **no external dependencies, servers or third-party game assets**.

## Play locally

For the simplest offline experience, **double-click `play.html`**. All code and styling are embedded in that one file. You can also serve the project as normal:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Or run `npm run dev` (Node 22+, fully offline). No build step required to run the modular version. Run `npm run build:standalone` after changing the source to regenerate `play.html`.

## Publish to GitHub Pages

1. Create a new public repository, e.g. `Lemonade-Inc.-`.
2. Upload the **contents** of this folder to the repository's `main` branch (include `.github/`).
3. Visit **Settings → Pages → Build and deployment → GitHub Actions**.
4. The included `.github/workflows/pages.yml` deploys on pushes to main.
5. Your game appears at `https://simondoescode.github.io/Lemonade-Inc.-/` after the deployment succeeds.

## How to play

1. Start in the Suburbs with $40.
2. Choose a recipe and buy lemons, sugar, ice and cups. Every pitcher makes 12 drinks.
3. Set a selling price; spend on advertising if you can afford it.
4. Open your stand and watch a day of business unfold. Skip to the report any time.
5. Review profits and losses, move to busier (more expensive) neighbourhoods, improve the stand, hire staff and build location-specific reputation.
6. Use Career mode for open-ended play or Challenge mode to complete 30 days.

## Features

- Day-by-day deterministic simulation, price elasticity, customer taste, weather and random news
- Queue times, customer patience and service-speed management
- Six distinct business districts with custom original vector illustrations
- Four stocked inventory types; discounted bulk packs, spoilage and melting ice
- Six permanent upgrades and three optional employees with daily wages
- Expense tracking, customer satisfaction, reputation, daily reports and history chart
- Career and 30-day challenge; responsive UI, click sound effects, offline PWA
- Automatic local saves with manual JSON export/import
- Unit tests using Node's built-in test runner and GitHub Actions workflows

## How it was researched

The supplied `Lemonade-Tycoon_Win_EN_Versions-119.exe` is a PE32 **Windows installer** (not source code). A static string/section inspection identified installer references to `Lemonade.exe`, `Lemonade.RB`, `Lemonade.dat` and `Lemonade.ico`. No commercial artwork, data files or original program code is included in this project; gameplay is an independent implementation of public high-level mechanics, adapted and balanced for browser play.

## Security, licensing and trade marks

All code and visuals here are new and MIT-licensed. `Lemonade Tycoon` and related artwork remain the intellectual property of their respective owners. This is an independent game and is **not** affiliated with or endorsed by those owners. Do not upload the source installer or extracted original assets into a public repository.

## Development

```sh
npm run check
npm test
```

`engine.mjs` is framework-free and fully unit-testable. `app.mjs` handles rendering, browser persistence and animations; `scene.mjs` holds all original SVG artwork.

## Branding

The `assets/lemonade-inc-icon.webp` and `assets/lemonade-inc-logo.webp` graphics contain original Lemonade Inc. artwork. The icon is used in the top bar, and the lockup appears on the welcome panel. The game builds a standalone copy that embeds both graphics.


## HD pixel-art game assets

The approved HD suburban illustration is in `assets/hd/suburbs.webp`. Vendor, adult and child characters have **transparent 4-column × 3-row animated sheets** in `assets/hd/{vendor,adult,child}.webp` (1280×1080 atlas, each 320×360). Rows represent idle, walking, and lemonade interaction; `assets/hd/animation.json` defines the layout. Frame bottoms are aligned, animation steps use CSS background-position rather than distorting character pixels, and motion preferences are respected. These are original game illustrations and not copied assets.

All six locations now use original HD isometric backgrounds: **Suburbs, Park, Beach, Station, Downtown and Mall**. Each 1672×941 WebP is stored under `assets/hd/`, with the same vendor/adult/child sprite animation system layered above. Positions are configured per scene in `HD_SCENE_SPOTS` in `app.mjs` so the characters appear near each location’s lemonade cart. The older SVG scenery remains available only as a fallback for unknown locations. The single-file `play.html` build embeds all nine HD images as data URIs for offline use, while the PWA bundles local WebP files without external image dependencies.
