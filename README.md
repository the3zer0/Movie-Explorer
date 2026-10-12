# Cinemaza — Movie Explorer

A responsive React app for browsing TVMaze shows, searching by title, and opening show details in a modal.

## Features

- Home page with a hero section and navigation to the movie/show catalogue.
- Dedicated `/movies` page with a debounced title search.
- Responsive show cards with poster, name, year, rating, and a **See Details** action.
- Details modal with summary, genres, rating, runtime, status, and TVMaze link.
- Loading and error states, plus support for closing the modal with Escape or by clicking its backdrop.

## Built with

- React and Vite
- Tailwind CSS
- [TVMaze API](https://www.tvmaze.com/api)

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run:

```bash
npm run build
```

The app requests show data from TVMaze at runtime and needs an internet connection for live catalogue/search results and remote images.

## Deployment

Deploy the project as a Vite static site. Set the build command to `npm run build` and the output directory to `dist`. Configure the host to serve `index.html` for direct `/movies` visits.

Add the published repository and live deployment URLs here after publishing:

- GitHub repository: (https://github.com/the3zer0/Movie-Explorer)

