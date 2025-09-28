import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import ImportPage from "./pages/Import/ImportPage";
import AnalysisPage from "./pages/Analysis/AnalysisPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import styles from "./AppLayout.module.css";

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Application shell with persistent Sidebar and routed content.
   * Uses CSS modules for layout and base styling.
   */
  return (
    <BrowserRouter>
      <div className={styles.appShell}>
        <Sidebar />
        <main className={styles.mainArea}>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <h1 className={styles.appTitle}>Wildlife Monitoring</h1>
              <span className={styles.appTheme}>Corporate Navy</span>
            </div>
          </header>

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
    </BrowserRouter>
  );
}
