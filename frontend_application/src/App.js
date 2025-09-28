import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import ImportPage from "./pages/Import/ImportPage";
import AnalysisPage from "./pages/Analysis/AnalysisPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import styles from "./AppLayout.module.css";
import { ApiModeProvider, useApiMode } from "./context/ApiModeContext";
import { MediaProvider } from "./context/MediaContext";

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Application shell with persistent Sidebar and routed content.
   * Provides ApiMode and Media contexts for global state.
   */
  return (
    <BrowserRouter>
      <ApiModeProvider initialMode="mock">
        <MediaProvider>
          <div className={styles.appShell}>
            <Sidebar />
            <main className={styles.mainArea}>
              <Header />
              <section className={styles.content}>
                <Routes>
                  <Route path="/" element={<ImportPage />} />
                  <Route path="/analysis" element={<AnalysisPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
              </section>
              <footer className={styles.footer}>
                <div className={styles.footerInner}>
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

function Header() {
  const { mode, setMode } = useApiMode();
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h1 className={styles.appTitle}>Wildlife Monitoring</h1>
        <div className={styles.appTheme}>
          <label htmlFor="apimode-select" style={{ marginRight: 8, color: "#6b7280", fontSize: 12 }}>
            API Mode
          </label>
          <select
            id="apimode-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={{
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 12,
              color: "#111827",
            }}
          >
            <option value="mock">Mock</option>
            <option value="real">Real</option>
          </select>
        </div>
      </div>
    </header>
  );
}
