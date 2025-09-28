import styles from "./DashboardPage.module.css";
import ActivityOverTimeChart from "../../components/charts/ActivityOverTimeChart";
import RestVsMoveBarChart from "../../components/charts/RestVsMoveBarChart";
import EthogramTimeline from "../../components/charts/EthogramTimeline";
import { useDashboardData } from "../../hooks/useDashboardData";

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /**
   * Dashboard page using useDashboardData hook to retrieve data.
   */
  const { loading, error, timeSeries, restMoveData, ethogram } = useDashboardData();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.subtitle}>Explore detection metadata and trends.</p>

      {loading && <div className={styles.infoCard}>Loading dashboard…</div>}
      {!loading && error && <div className={styles.errorCard}>{error}</div>}

      {!loading && !error && (
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Bear Activity Over Time</h3>
              <div className={styles.cardHint}>Total + Resting/Moving</div>
            </div>
            <ActivityOverTimeChart data={timeSeries} variant="combo" height={300} />
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Resting vs Moving</h3>
              <div className={styles.cardHint}>Aggregate counts</div>
            </div>
            <RestVsMoveBarChart data={restMoveData} height={300} />
          </div>

          <div className={styles.card} style={{ gridColumn: "1 / -1" }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Behavior Ethogram</h3>
              <div className={styles.cardHint}>Timeline of behavior states</div>
            </div>
            <EthogramTimeline
              subjects={ethogram.subjects}
              segments={ethogram.segments}
              height={260}
            />
          </div>
        </div>
      )}
    </div>
  );
}
