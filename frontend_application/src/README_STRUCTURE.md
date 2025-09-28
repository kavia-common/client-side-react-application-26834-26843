# Source Structure (CSS Modules)

- App.js — App shell and routes
- AppLayout.module.css — global tokens and app layout
- styles/global.css — base resets and typography
- components/layout/Sidebar — persistent sidebar navigation
- pages/Import — Import Media placeholder
- pages/Analysis — Analysis placeholder
- pages/Dashboard — Dashboard placeholder

Notes:
- Styling uses CSS Modules; avoid global CSS except for resets in styles/global.css.
- Business logic, API integration, and charts are intentionally omitted at this stage.
