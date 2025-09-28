# Frontend Architecture Notes

This app has been refactored for modularity and easy switching between mock and real APIs.

Key directories:
- src/api: API layer to abstract data fetching.
  - index.js: `getApi(mode)` returns a concrete API implementation (mock or real).
- src/context:
  - ApiModeContext.jsx: Provides global `mode` ('mock' | 'real') with setter.
  - MediaContext.jsx: Stores uploaded media, selected media, and selected detection.
- src/hooks:
  - useMediaUpload.js: Handles file selection, preview, and uploading via API.
  - useAnalysis.js: Fetches YOLO-like detections and manages threshold filtering.
  - useDashboardData.js: Fetches dashboard aggregates/time-series.

Switching API mode:
- Use the header dropdown (Mock/Real) to toggle.
- In real projects, implement `realApi` in `src/api/index.js` with actual fetch calls.

Integration points:
- App.js wraps the app in `ApiModeProvider` and `MediaProvider`.
- ImportPage uses `MediaContext` for uploaded items list.
- MediaFileInput uses `useMediaUpload` to handle uploads consistently.
- AnalysisPage uses `useAnalysis` for fetching and filtering detections.
- DashboardPage uses `useDashboardData` for chart data.

Testing:
- Hooks are pure and side-effect boundaries are contained within the API layer.
- Replace mock API with test doubles if needed for unit tests.

Environment variables:
- No env required yet; when integrating with a backend, store endpoints in .env and read them inside src/api/index.js (do not hardcode secrets).
