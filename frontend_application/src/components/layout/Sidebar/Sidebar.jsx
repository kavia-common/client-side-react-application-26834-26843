import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Collapsible sidebar navigation for Import, Analysis, and Dashboard with smooth slide animation.
 * Props:
 * - open: boolean — whether sidebar is visible
 * - onClose: function — optional handler to close (used on small screens)
 */
export default function Sidebar({ open = true, onClose }) {
  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}
      aria-hidden={!open}
      aria-label="Primary"
    >
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">WM</div>
        <div>
          <div className={styles.brandTitle}>Wildlife Monitor</div>
          <div className={styles.brandSubtitle}>Corporate Navy</div>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close sidebar"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <nav className={styles.nav} aria-label="Main navigation">
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
      <span className={styles.linkIcon} aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
