# Pacta — website

Bilingual (EN/ES) website for **Pacta Protocol** — the trust layer for AI that
does real business. Static HTML/CSS/JS — no build step, no dependencies.

Pacta is an open trust protocol for AI agents and real-world businesses. Its
reference implementation — the marketplace explorer that exercises the full
protocol lifecycle — lives in
[Pacta-Protocol/pacta](https://github.com/Pacta-Protocol/pacta). Commercial
products can be built on top of the protocol; [Avalta](https://avalta.ai)
connects real businesses to the agentic economy, powered by Pacta.

## Run locally

```bash
npm start   # → http://localhost:3240
```

(Or open `index.html` directly, or use any static file server.)

## Deploy

This repo is named `pacta-protocol.github.io`, so GitHub Pages publishes it
automatically at <https://pacta-protocol.github.io>. Any other static host
(Netlify, Vercel, Cloudflare Pages) works the same way — serve the repo root.

## Configuration

`assets/config.js` sets `window.PACTA_APP_URL`; every "Open the app / Abrir la
app" link rewrites itself to that URL on page load. Point it at the deployed
marketplace app.

## Supporting documents

`documents/` holds the public PDFs (explainer and pitch) served at
`/documents/`. They are generated from the brand HTML decks and committed so
GitHub Pages can serve them.

## License

[MIT](LICENSE)
