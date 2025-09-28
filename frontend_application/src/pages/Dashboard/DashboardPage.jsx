import { useEffect, useMemo, useState } from "react";
import styles from "./DashboardPage.module.css";
import ActivityOverTimeChart from "../../components/charts/ActivityOverTimeChart";
import RestVsMoveBarChart from "../../components/charts/RestVsMoveBarChart";
import EthogramTimeline from "../../components/charts/EthogramTimeline";

/**
 * Mock API: returns detection metadata aggregated in simple shapes.
 * We simulate a few time buckets and a set of ethogram segments.
 */
function mockFetchDetectionMeta() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Build time series for the last 8 time steps (e.g., hours)
      const timeSeries = Array.from({ length: 8 }).map((_, i) => {
        const t = new Date(Date.now() - (7 - i) * 60 * 60 * 1000);
        const label = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const resting = Math.floor(Math.random() * 6) + 2; // 2-7
        const moving = Math.floor(Math.random() * 6) + 1; // 1-6
        return {
          time: label,
          resting,
          moving,
          count: resting + moving,
        };
      });

      const totals = {
        resting: timeSeries.reduce((acc, d) => acc + d.resting, 0),
        moving: timeSeries.reduce((acc, d) => acc + d.moving, 0),
      };

      // Ethogram: single subject with 5 segments (units are minutes)
      const subjects = ["Bear-1"];
      const base = 0;
      const segments = [
        { subject: "Bear-1", start: base + 0, end: base + 12, state: "resting" },
        { subject: "Bear-1", start: base + 12, end: base + 25, state: "moving" },
        { subject: "Bear-1", start: base + 25, end: base + 33, state: "resting" },
        { subject: "Bear-1", start: base + 33, end: base + 47, state: "moving" },
        { subject: "Bear-1", start: base + 47, end: base + 60, state: "resting" },
      ];

      resolve({ timeSeries, totals, ethogram: { subjects, segments } });
    }, 450);
  });
}

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /**
   * Dashboard page that fetches mock detection meta and renders:
   * 1) Activity over time (combo chart)
   * 2) Resting vs Moving totals (bar chart)
   * 3) Ethogram timeline (stacked segments)
   */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeSeries, setTimeSeries] = useState([]);
  const [totals, setTotals] = useState({ resting: 0, moving: 0 });
  const [ethogram, setEthogram] = useState({ subjects: [], segments: [] });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    mockFetchDetectionMeta()
      .then((data) => {
        if (!isMounted) return;
        setTimeSeries(data.timeSeries || []);
        setTotals(data.totals || { resting: 0, moving: 0 });
        setEthogram(data.ethogram || { subjects: [], segments: [] });
      })
      .catch((e) => isMounted && setError(e?.message || "Failed to load"))
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const restMoveData = useMemo(
    () => [
      { label: "Resting", value: totals.resting },
      { label: "Moving", value: totals.moving },
    ],
    [totals]
  );

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
