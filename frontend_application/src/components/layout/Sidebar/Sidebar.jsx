import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

// PUBLIC_INTERFACE
export default function Sidebar() {
  /**
   * Sidebar navigation for Import, Analysis, Dashboard.
   * Present on all pages.
   */
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>WM</div>
        <div>
          <div className={styles.brandTitle}>Wildlife Monitor</div>
          <div className={styles.brandSubtitle}>Corporate Navy</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <NavItem to="/" label="Import Media" icon="⬆️" end />
        <NavItem to="/analysis" label="Analysis" icon="🧠" />
        <NavItem to="/dashboard" label="Dashboard" icon="📊" />
      </nav>

      <div className={styles.hints}>
        <p className={styles.hintsTitle}>Hints</p>
        <ul className={styles.hintsList}>
          <li>Upload files in Import</li>
          <li>Overlay detections in Analysis</li>
          <li>View trends in Dashboard</li>
        </ul>
      </div>
    </aside>
  );
}

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.linkActive : ""}`
      }
    >
      <span className={styles.linkIcon}>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
