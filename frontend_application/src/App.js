import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import ImportPage from "./pages/Import/ImportPage";
import AnalysisPage from "./pages/Analysis/AnalysisPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { ApiModeProvider, useApiMode } from "./context/ApiModeContext";
import { MediaProvider } from "./context/MediaContext";

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Application shell with collapsible Sidebar and routed content.
   * Provides ApiMode and Media contexts for global state.
   */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => setSidebarOpen((s) => !s), []);

  return (
    <BrowserRouter>
      <ApiModeProvider initialMode="mock">
        <MediaProvider>
          <div className="min-h-screen flex bg-background text-textcolor transition-[padding-left]">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 min-w-0 flex flex-col">
              <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
              <section className="px-4 py-6">
                <Routes>
                  <Route path="/" element={<ImportPage />} />
                  <Route path="/analysis" element={<AnalysisPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
              </section>
              <footer className="mt-auto border-t border-gray-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-500">
                  © {new Date().getFullYear()} Wildlife Monitoring • React Scaffold
                </div>
              </footer>
            </main>
          </div>
        </MediaProvider>
      </ApiModeProvider>
    </BrowserRouter>
  );
}

function Header({ sidebarOpen, onToggleSidebar }) {
  const { mode, setMode } = useApiMode();
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-[34px] w-[38px] rounded-lg grid place-items-center border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={sidebarOpen}
            onClick={onToggleSidebar}
          >
            <span className="relative inline-block w-[18px] h-[14px]" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gray-900 rounded"></span>
              <span className="absolute inset-x-0 top-[6px] h-0.5 bg-gray-900 rounded"></span>
              <span className="absolute inset-x-0 top-[12px] h-0.5 bg-gray-900 rounded"></span>
            </span>
          </button>
          <h1 className="text-[18px] font-semibold text-slate-900 m-0">Wildlife Monitoring</h1>
        </div>

        <div className="text-xs text-gray-500 flex items-center">
          <label htmlFor="apimode-select" className="mr-2">
            API Mode
          </label>
          <select
            id="apimode-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border border-gray-200 bg-white rounded-md px-2 py-1 text-xs text-gray-900"
          >
            <option value="mock">Mock</option>
            <option value="real">Real</option>
          </select>
        </div>
      </div>
    </header>
  );
}
