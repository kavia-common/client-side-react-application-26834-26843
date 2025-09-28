import { useCallback } from "react";
import styles from "./ImportPage.module.css";
import MediaFileInput from "../../components/media/MediaFileInput/MediaFileInput";
import { useMediaContext } from "../../context/MediaContext";

// PUBLIC_INTERFACE
export default function ImportPage() {
  /**
   * Import Media page using MediaContext to persist uploaded items app-wide.
   */
  const { uploaded, addUploaded } = useMediaContext();

  const handleUploaded = useCallback(
    (meta) => {
      addUploaded(meta);
    },
    [addUploaded]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Import Media</h2>
      <p className={styles.subtitle}>
        Upload videos or images for later analysis.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>File Upload</h3>
          <MediaFileInput onUploaded={handleUploaded} label="Select a media file" />
          <p className={styles.muted} style={{ marginTop: 8 }}>
            This simulates an upload for demonstration. No files leave your browser.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Recent Imports</h3>
          <ul className={styles.list}>
            {uploaded.length === 0 && <li>No recent items yet.</li>}
            {uploaded.slice(0, 5).map((r) => (
              <li key={r.id}>
                <span style={{ fontWeight: 600 }}>{r.name}</span>{" "}
                <span style={{ color: "#6B7280" }}>
                  • {(r.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                  {new Date(r.uploadedAt).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
