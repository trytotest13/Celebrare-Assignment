# Picsum Gallery

A small photo gallery built from scratch with **React + Vite + Tailwind CSS** for the Celebrare frontend internship pre-screening assignment.

## What it does

Fetches 30 photos from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30), shows them on a masonry wall (4 columns on desktop, 2 on tablet, 1 on mobile), filters by author name as you type (no extra API calls), and lets you mark photos as favourites. Favourites live in `useReducer` state and persist across refreshes via `localStorage`.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## How the requirements map to the code

| Requirement | Where |
|---|---|
| Project setup (React + Vite + Tailwind, no UI libraries) | `package.json`, `vite.config.js`, `src/index.css` |
| Fetch 30 photos, loading + error states | `src/hooks/useFetchPhotos.js` |
| Responsive layout: 4 / 2 / 1 columns (masonry wall) | `src/App.jsx` (`columns-1 sm:columns-2 lg:columns-4`) |
| Search filter by author, real-time, client-side | `src/App.jsx` (`filteredPhotos` via `useMemo`), `src/components/SearchBar.jsx` |
| Favourites with `useReducer` + `localStorage` | `src/hooks/useFavourites.js`, heart in `src/components/PhotoCard.jsx` |
| Custom hook `useFetchPhotos` returning `{ photos, loading, error }` | `src/hooks/useFetchPhotos.js`, consumed by `App` |
| `useCallback` on the search handler, `useMemo` on the filtered list | `src/App.jsx` |

## The design

The layout is a quiet editorial wall: a Fraunces italic masthead over hairline rules, a search bar that stays pinned while you scroll, and a masonry wall built with CSS columns where every photograph keeps its natural aspect ratio (reserved from the API's width/height, so the page never jumps as images stream in). Captions read like catalog plates: "No. 17" is the photo's real Picsum archive id.

The palette is three colors plus one accent: warm paper `#FAF7F2`, ink `#1C1917`, stone-600 `#57534E` for secondary text (7.1:1 contrast, AA), and rose `#E11D48` reserved for the heart.

## Motion (and why)

One motion idea carries the whole page: things settle into place, like paper laid on a table.

| Animation | Purpose |
|---|---|
| Settle on header, search bar, and cards (staggered 30ms per card, capped at 10) | First load reads as one calm arrival rather than a flash of content; the stagger makes the grid feel laid down |
| Heart pop (0.3s spring-ish scale) on favouriting | Confirms the tap landed; the button is small, so feedback has to be felt |
| Card lift + subtle image zoom on hover | Marks the card as interactive before you click |
| Spinner | Loading state, unchanged |

Entrance and pop animations are wrapped in `prefers-reduced-motion: no-preference`, so users with reduced motion get the same layout with no entrance or pop movement (the small hover feedback stays). Only `transform` and `opacity` are animated, never layout properties.

## Notes on two choices

- **Card images use `https://picsum.photos/id/<id>/600/...` instead of the list's `download_url`.** The list endpoint returns full-size originals (5000px wide in many cases); the id endpoint serves a resized crop that matches each photo's own aspect ratio, so the grid loads fast and nothing looks squashed.
- **The error state includes a "Try again" button.** It re-runs the same fetch logic from the hook, so it's part of error handling rather than an extra feature.
