# Portfolio Website

Joseph Sanchez's personal portfolio site — a single-page React app covering about/skills/projects sections, a contact form, and downloadable resume/recommendation letter.

## Tech Stack

- **Frontend:** React 19 (Create React App, PWA template)
- **Backend:** Node.js / Express — currently used only to serve the built client in production; API routes/DB models are scaffolded but not wired in (see [Server notes](#server-notes))
- **Infrastructure:** Terraform (AWS CloudFront module)

## Project Structure

```
.
├── client/               # React frontend (CRA)
│   ├── public/           # Static assets, resume PDF, project images
│   └── src/App.js        # All page content/sections live here
├── server/               # Express app
│   ├── config/           # MongoDB connection (Mongoose)
│   ├── controllers/      # User controller (unused, not mounted)
│   ├── models/           # User/Book models (unused, not mounted)
│   └── routes/           # API routes (unused, not mounted)
└── terraform/            # AWS infra (CloudFront module)
```

## Getting Started

### Prerequisites

- Node.js + npm

### Install

```bash
npm run install   # installs deps in both server/ and client/
```

### Develop

```bash
npm run develop    # client dev server (localhost:3000) + server with nodemon (localhost:3001), concurrently
```

### Production build

```bash
npm run build      # builds the React client
npm start          # rebuilds client, then serves it via the Express server
```

## Server notes

`server/server.js` only serves `client/build` as static assets in production — the MongoDB connection (`server/config/connection.js`) and API routes (`server/routes`) are present but commented out/unmounted. The live contact form instead posts directly to an external API (see `handlesMessage` in `client/src/App.js`), so the local server currently has no active backend logic.

> `server/config/connection.js` has a MongoDB URI with hardcoded credentials committed to the repo. Worth moving to `server/.env` and rotating the credentials if this is ever re-enabled.
