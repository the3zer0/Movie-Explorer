<div align="center">

# Cinemaza · Movie Explorer

**Explore shows, search by title, and discover what to watch next.**

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**[🌐 Live Demo](https://movie-explorer-sooty-eta.vercel.app) · [💻 Source Code](https://github.com/the3zer0/Movie-Explorer)**

</div>

---

## Overview

**Cinemaza** is a responsive TV-show discovery web app built with React and Vite. It fetches listings from the public **TVMaze API**, provides title-based search, and displays details in an interactive modal. Despite the project's "Movie Explorer" name, the upstream TVMaze API primarily catalogs television shows and series.

## Features

- A home page with a prominent hero section and a browsing CTA.
- A dedicated `/movies` route for show discovery.
- Debounced search by title to reduce unnecessary API requests.
- Responsive show cards with posters, ratings, release years, and network information.
- Detailed modal featuring summary, genres, runtime, status, ratings, and a TVMaze link.
- Escape-key and backdrop-click modal dismissal.
- Loading placeholders, empty search states, and API error messaging.

## Tech stack

| Category | Technology |
| --- | --- |
| Interface | React 18 |
| Build tool | Vite 6 |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS 3 and CSS |
| HTTP data | Native browser fetch |
| Data source | [TVMaze API](https://www.tvmaze.com/api) |
| Hosting | Vercel-compatible static deployment |

### Dependencies

As defined in [package.json](./package.json):

- **Runtime dependencies:** `react`, `react-dom`, `vite`, and `@vitejs/plugin-react`.
- **Development dependencies:** `tailwindcss`, `postcss`, and `autoprefixer`.

The app uses the browser's built-in `fetch` API rather than an additional HTTP client.

## Run locally

**Prerequisites:** Node.js and npm.

```bash
git clone https://github.com/the3zer0/Movie-Explorer.git
cd Movie-Explorer
npm install
npm run dev
```

Open the URL displayed in the terminal (typically **http://localhost:5173**).

### Other commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Generate production files in `dist/` |
| `npm run preview` | Preview the production build locally |

## Data API

The project consumes TVMaze endpoints such as:

```text
https://api.tvmaze.com/shows
https://api.tvmaze.com/search/shows?q=QUERY
```

Show metadata and posters come from TVMaze, so internet access is required for fresh search results. The project is an independent demo and is not affiliated with TVMaze.

## Project structure

```text
src/main.jsx        Main React UI and interactions
src/styles.css      Custom project styling
Public/             Source artwork used by the project
index.html          Application HTML entry
tailwind.config.js  Tailwind configuration
vite.config.js      Vite configuration
vercel.json         Deployment configuration
package.json        Scripts and dependencies
```

> The source repository currently uses a capitalized `Public/` asset directory. On case-sensitive systems, check static asset path handling if any fallback images fail to load. This README does not change the source layout.

## Deployment

This is a Vite-based static app:

1. Run `npm run build`.
2. Publish the generated `dist/` directory.
3. Configure the hosting provider to serve the SPA entry page for direct visits to `/movies`, if required.

**Live site:** https://movie-explorer-sooty-eta.vercel.app

## Author

Built by [Md Rahat Mahmud](https://github.com/the3zer0).

[Explore Cinemaza →](https://movie-explorer-sooty-eta.vercel.app)
