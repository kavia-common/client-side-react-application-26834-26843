# React Frontend Scaffold — Wildlife Monitoring

This scaffold provides a modular React UI with:
- Persistent Sidebar navigation on all pages
- Routed pages: Import, Analysis, Dashboard
- CSS Modules for styling (no Tailwind)
- Responsive, classic "Corporate Navy" theme
- Modular hooks and contexts for clean separation of concerns
- API layer to switch between mock and real integrations

Structure:
- src/components/layout/Sidebar — App-wide sidebar
- src/components/media/MediaFileInput — Upload input using useMediaUpload
- src/components/charts — Reusable charts
- src/pages/Import — Upload Media (uses MediaContext)
- src/pages/Analysis — Analysis overlay (uses useAnalysis)
- src/pages/Dashboard — Charts and ethogram (uses useDashboardData)
- src/context — ApiMode and Media contexts
- src/hooks — useMediaUpload, useAnalysis, useDashboardData
- src/api — API layer with mock and placeholder real implementations
- src/styles/global.css — Global resets and base styles
- src/AppLayout.module.css — App shell and tokens

API Mode:
- Use the header dropdown to toggle between "Mock" and "Real".
- Implement `realApi` in `src/api/index.js` to connect to a backend.

See ARCHITECTURE_NOTES.md for detailed guidance.
