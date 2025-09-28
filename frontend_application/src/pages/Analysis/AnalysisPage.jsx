import styles from "./AnalysisPage.module.css";

// PUBLIC_INTERFACE
export default function AnalysisPage() {
  /**
   * Analysis page placeholder.
   * Future: YOLO detection overlay preview and metadata panel.
   */
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Analysis</h2>
      <p className={styles.subtitle}>
        Visualize detections with bounding boxes and metadata.
      </p>

      <div className={styles.grid}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <h3 className={styles.cardTitle}>Preview</h3>
            <div className={styles.previewControls}>
              <label htmlFor="conf" className={styles.label}>Confidence ≥</label>
              <input id="conf" type="number" min="0" max="1" step="0.05" className={styles.input} defaultValue="0.70" />
            </div>
          </div>
          <div className={styles.previewArea}>
            <span className={styles.placeholderText}>Media Preview Placeholder</span>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Detections</h3>
          <p className={styles.muted}>No detections yet.</p>
        </div>
      </div>
    </div>
  );
}
