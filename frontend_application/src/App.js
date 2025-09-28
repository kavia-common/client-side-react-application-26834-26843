import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarNavigation from "./components/SidebarNavigation";
import ImportPage from "./pages/ImportPage";
import AnalysisPage from "./pages/AnalysisPage";
import DashboardPage from "./pages/DashboardPage";

// PUBLIC_INTERFACE
export default function App() {
  /** App shell with Sidebar + routed content; Tailwind-only styling */
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text flex">
        <SidebarNavigation />
        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="container-page py-3 flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">Vision Analysis Platform</h1>
              <div className="text-xs text-gray-500">Classic • Corporate Navy</div>
            </div>
          </header>

          <section className="py-6">
            <Routes>
              <Route path="/" element={<ImportPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </section>

          <footer className="mt-auto border-t border-gray-200 bg-white">
            <div className="container-page py-3 text-xs text-gray-500">
              © {new Date().getFullYear()} Vision Analyzer • Tailwind React Scaffold
            </div>
          </footer>
        </main>
      </div>
    </BrowserRouter>
  );
}
