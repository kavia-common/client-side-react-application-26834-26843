# Source Structure (CSS Modules)

- App.js — App shell and routes
- AppLayout.module.css — global tokens and app layout
- styles/global.css — base resets and typography

Core Architecture:
- api/ — API layer to abstract data sources (mock vs real)
  - index.js — getApi(mode) returning concrete implementations
- context/
  - ApiModeContext.jsx — global API mode ('mock' | 'real')
  - MediaContext.jsx — uploaded media and selected analysis state
- hooks/
  - useMediaUpload.js — upload/progress/preview workflow
  - useAnalysis.js — fetch & filter detections for analysis
  - useDashboardData.js — fetch dashboard aggregates and series

UI:
- components/layout/Sidebar — persistent sidebar navigation
- components/media/MediaFileInput — file upload input
- components/charts — reusable charts (Recharts)
- pages/Import — Uploads page using hooks/context
- pages/Analysis — Analysis page using hooks/context
- pages/Dashboard — Dashboard page using hooks/context

Notes:
- Styling uses CSS Modules; avoid global CSS except for resets in styles/global.css.
- The API layer currently exposes a mock implementation; to integrate a real backend, implement the "realApi" in api/index.js and switch the header dropdown to "Real".
