# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
npm install          # Install dependencies
npm start            # Start dev server at http://localhost:3000
npm test             # Run tests in watch mode (Jest via react-scripts)
npm run build        # Production build to build/ directory
npm run deploy       # Build and sync build/ to S3 bucket
```

## Project Overview

**Makpac Case Label Generator** is a React + TypeScript single-page application that generates printable PDF labels for Makita Makpac tool cases. The app is entirely client-side with no backend—data stays in the user's browser only.

**Live site:** https://caselabel.pikala.com/

**Stack:**
- React 19 + TypeScript
- Tailwind CSS 4 for styling
- pdf-lib for client-side PDF generation
- Create React App for build tooling
- AWS S3 + CloudFront for hosting

## Architecture

### Core Data Flow

`App.tsx` maintains the single source of truth for form state using React hooks:

```
App (form state)
├── CaseTypeSelector (case size: small/medium/large/extra large)
├── ToolSelector (loads tools from tools.json, selects a MakitaTool)
├── CustomDetailsForm (owner name, contact, additional info)
└── PDFGenerator (renders PDF using form data + pdf-lib)
```

### Key Types (`src/types/index.ts`)

- **CaseType** enum: small, medium, large, extra large
- **MakitaTool** interface: name, model, description
- **CustomDetails** interface: ownerName, contactDetails, additionalInfo
- **FormData** interface: caseType, tool, customDetails

### Tool Data

Tools are stored in `src/tools.json` as a static list. The build step copies this to `build/tools.json` so it's available after deploy. When adding or editing tools:

1. Update `src/tools.json` (array of MakitaTool objects)
2. This is loaded by `src/utils/toolsData.ts` 
3. Consumed by ToolSelector component for the dropdown

### Component Responsibilities

- **CaseTypeSelector** — Radio buttons for case size; directly maps to CaseType enum
- **ToolSelector** — Dropdown populated from tools.json; null when unselected
- **CustomDetailsForm** — Three text inputs for owner details; stored in CustomDetails
- **PDFGenerator** — Receives FormData and generates PDF using pdf-lib; downloads on button click
- **PDFUtils** (`src/utils/pdfUtils.ts`) — PDF layout logic (dimensions, text rendering, positioning by case size)

## Build and Deployment

**Local build:**
```bash
npm run build
```

This runs `react-scripts build` and then copies `src/tools.json` → `build/tools.json`. The build output is in `build/`.

**Deployment to S3:**
```bash
npm run deploy
```

Runs `build` then syncs the `build/` directory to `s3://caselabel` with `--delete` to clean up removed files. Assumes AWS CLI is configured with appropriate credentials.

**S3 Setup:**
- Bucket must be configured for static website hosting (index document: `index.html`)
- Production serves via CloudFront CDN for performance and caching

## Testing

```bash
npm test                          # Watch mode
npm test -- --coverage            # Coverage report
npm test -- App.test.tsx           # Run specific test file
```

Tests use Jest + React Testing Library (via react-scripts). Currently minimal coverage; App.test.tsx is the main test file.

## Development Notes

- **No backend** — form data is not persisted to any server (browser-only)
- **Privacy** — no personal data is sent externally; Simple Analytics may collect anonymous usage stats
- **PDF generation** — all PDF rendering happens client-side via pdf-lib; file downloads directly from the browser
- **Styling** — Tailwind CSS with PostCSS; see `postcss.config.mjs` for PostCSS setup
- **Browser support** — see `package.json` browserslist (modern browsers only in production)

## Key Files to Know

- `src/App.tsx` — Root component, form state management, component wiring
- `src/types/index.ts` — All TypeScript interfaces and enums
- `src/tools.json` — Static list of Makita tools (edit here to add/remove tools)
- `src/utils/pdfUtils.ts` — PDF layout and rendering logic
- `src/utils/toolsData.ts` — Tool data loading helper
- `src/components/PDFGenerator.tsx` — PDF download trigger and button
- `src/index.tsx` — React bootstrap and app mount
- `public/index.html` — HTML shell

## Common Tasks

**Add a new Makita tool:**
1. Edit `src/tools.json`, add a new object with name, model, description
2. On next build, it will be available in the tool dropdown

**Modify PDF layout:**
1. Edit `src/utils/pdfUtils.ts` — contains dimensions and text positioning logic for each case size
2. Test locally with `npm start`, try different case sizes and content

**Update Tailwind styling:**
1. Edit component CSS or inline `className` props
2. Tailwind scans all `.tsx` and `.css` files automatically
3. No separate CSS files needed unless creating component-specific styles

**Deploy a change:**
```bash
npm run deploy
# Or manually: npm run build && aws s3 sync build/ s3://caselabel --delete
```

## Troubleshooting

- **Build fails** — Ensure `src/tools.json` exists and is valid JSON
- **PDF not generating** — Check browser console for pdf-lib errors; ensure form is valid (caseType selected)
- **Deploy fails** — Verify AWS CLI is installed and credentials are configured (`aws s3 ls` to test)
- **Styles not updating** — Tailwind scans jsx/tsx/css files; if new class isn't showing, rebuild with `npm start`
