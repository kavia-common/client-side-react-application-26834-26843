import styles from "./DashboardPage.module.css";

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /**
   * Dashboard page placeholder.
   * Future: Recharts visualizations and summary metrics.
   */
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.subtitle}>
        Explore detection metadata and trends.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Probability Over Time</h3>
          <div className={styles.chartPlaceholder}>Chart Placeholder</div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Mobility</h3>
          <div className={styles.chartPlaceholder}>Chart Placeholder</div>
        </div>
      </div>
    </div>
  );
}
