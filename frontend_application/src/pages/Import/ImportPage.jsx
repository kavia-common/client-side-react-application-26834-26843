import styles from "./ImportPage.module.css";

// PUBLIC_INTERFACE
export default function ImportPage() {
  /**
   * Import Media page placeholder.
   * No business logic, just base layout and copy.
   */
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Import Media</h2>
      <p className={styles.subtitle}>
        Upload videos or images for later analysis.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>File Upload</h3>
          <p className={styles.muted}>
            Placeholder for drag-and-drop area and file picker.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Recent Imports</h3>
          <ul className={styles.list}>
            <li>No recent items yet.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
