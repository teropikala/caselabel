# Makpac Case Label Generator

Generate clean, printable labels for Makita Makpac tool cases. Pick your case size, choose a Makita tool model, add optional owner/contact details, and download a ready‑to‑print PDF label.

Live stack: React + TypeScript + Tailwind CSS + pdf-lib. Static site deploy (S3 + CloudFront).


## Features

- Select Makpac case type (Small, Medium, Large)
- Choose a Makita tool from the built‑in list
- Add optional details (owner name, contact info, notes)
- One‑click PDF export
- Privacy friendly: no backend, data stays in your browser


## Quick Start

Prerequisites:
- Node.js and npm

Install and run locally:

```bash
npm install
npm start
```

Then open http://localhost:3000


## How to Use

1. Pick your Makpac case size. Smaller cases have less label space; you may choose to show either the tool name or your contact details on the smallest sizes.
2. Select the tool model. This will prefill the label with the correct tool information.
3. Optionally add owner name, contact details, and extra notes.
4. Click “Download PDF” to export a print‑ready label.


## Tech Overview

- React + TypeScript — UI and state management
- Tailwind CSS — styling
- pdf-lib — client‑side PDF generation
- Create React App — build tooling

There is no server or database. Information you type remains in the browser and is not sent to any backend.


## Project Structure

```
caselabel/
├─ public/                # Static assets and HTML shell
├─ src/
│  ├─ components/         # UI components (selectors, form, PDF generator)
│  ├─ tools.json          # Tool list used by the selector
│  ├─ App.tsx             # App layout and wiring
│  └─ index.tsx           # App bootstrap
├─ requirements.md        # Background, features, deployment notes
└─ package.json
```


## Scripts

- `npm start` — start dev server at http://localhost:3000
- `npm test` — run tests in watch mode
- `npm run build` — production build to `build/`
  - Copies `src/tools.json` to `build/tools.json` so the tool list is available after deploy
- `npm run eject` — CRA eject (one‑way)
- `npm run deploy` — build and sync `build/` to the configured S3 bucket


## Building and Deploying

Build locally:

```bash
npm run build
```

Deploy to S3 (requires AWS CLI configured):

```bash
# package.json contains a deploy script similar to:
npm run deploy
```

Notes:
- Ensure your bucket is set up for static website hosting (index document: `index.html`).
- The default script syncs to `s3://caselabel`. Update this in `package.json` if you use a different bucket.
- For production, it’s recommended to serve the S3 website via Amazon CloudFront.

More on S3 hosting: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html


## Privacy

- No personal data is sent to a server. Data you enter stays in the browser only.
- Anonymous usage stats may be collected via Simple Analytics (no personal data).


## Acknowledgements

Makita® and Makpac® are registered trademarks of Makita Corporation. This project is not affiliated with or endorsed by Makita.


## License

MIT — see `LICENSE` if provided, otherwise assume standard MIT terms.
