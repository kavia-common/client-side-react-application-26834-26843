# Frontend Application

React + TypeScript app using Vite, following the "Corporate Navy" classic theme.

## Scripts

- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Preview build: `npm run preview`

## Environment variables

Create a `.env` file if needed for runtime configuration. Do not commit secrets.
You may use standard Vite prefixes like `VITE_` for client-exposed variables.

## Project structure

- `src/modules/app` - App shell and layout (PUBLIC_INTERFACE)
- `src/modules/home` - Home page (PUBLIC_INTERFACE)
- `src/modules/about` - About page (PUBLIC_INTERFACE)

## Notes

- Keep public components documented with docstrings and the PUBLIC_INTERFACE marker as required.
- Follow the existing code style and ESLint rules. 
