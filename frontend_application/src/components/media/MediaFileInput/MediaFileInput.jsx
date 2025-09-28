import styles from "./MediaFileInput.module.css";
import layout from "../../../AppLayout.module.css";
import { useMediaUpload } from "../../../hooks/useMediaUpload";

// PUBLIC_INTERFACE
export default function MediaFileInput({
  label = "Select media",
  accept = "image/*,video/*",
  onUploaded,
  className = "",
}) {
  /**
   * Reusable file input component that delegates logic to useMediaUpload hook.
   */
  const {
    inputRef,
    onPick,
    onChange,
    onDrop,
    onDragOver,
    reset,
    file,
    kind,
    fileInfo,
    previewUrl,
    isUploading,
    progress,
    error,
    startUpload,
  } = useMediaUpload({ onUploaded });

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.dropZone}
        onClick={onPick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick()}
        aria-label="Upload area. Click to select a file or drag and drop."
      >
        <div className={styles.dropInner}>
          <div className={styles.dropIcon}>⬆️</div>
          <div>
            <div className={styles.dropTitle}>Click to upload</div>
            <div className={styles.dropHint}>or drag and drop (image/video)</div>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className={layout.visuallyHidden}
          onChange={onChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {fileInfo && (
        <div className={styles.fileInfo}>
          <span className={styles.fileBadge}>{kind === "image" ? "Image" : "Video"}</span>
          <span className={styles.fileText}>{fileInfo}</span>
        </div>
      )}

      {previewUrl && (
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <div className={styles.previewTitle}>Preview</div>
            <div className={styles.previewActions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={reset}
                disabled={isUploading}
              >
                Clear
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={startUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          <div className={styles.previewArea}>
            {kind === "image" ? (
              <img className={styles.previewMedia} src={previewUrl} alt="Selected preview" />
            ) : (
              <video className={styles.previewMedia} src={previewUrl} controls />
            )}
          </div>

          {isUploading && (
            <div className={styles.progress}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
