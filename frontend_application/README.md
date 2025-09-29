# VizAI Frontend Application

React + TypeScript app using Vite, styled with Tailwind CSS, blending the "Corporate Navy" classic theme with a wildlife-inspired gradient.

## Features

- Dashboard with sidebar/top bar, stat cards, and Recharts graphs
- Upload & Import drag-and-drop area with file list
- YOLO Analysis page with media preview, mock detections and bounding boxes
- Analysis type dropdown (Mobility / Species ID)
- Light/Dark mode toggle (persisted)
- Responsive design with rounded cards and soft shadows

## Scripts

- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Preview build: `npm run preview`

## Environment variables

Create a `.env` file if needed for runtime configuration. Use `VITE_` prefix for client-exposed variables.

## Project structure

- `src/modules/app` - App shell and layout (PUBLIC_INTERFACE)
- `src/modules/home` - Dashboard as home (PUBLIC_INTERFACE)
- `src/modules/analysis` - YOLO analysis page (PUBLIC_INTERFACE)
- `src/modules/about` - About page (PUBLIC_INTERFACE)

## Notes

- Keep public components documented with docstrings and the PUBLIC_INTERFACE marker.
- Follow existing code style and ESLint rules.
- No backend is required; analysis logic is mocked on the client.
