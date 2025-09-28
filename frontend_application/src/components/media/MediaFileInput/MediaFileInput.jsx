import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MediaFileInput.module.css";
import layout from "../../../AppLayout.module.css";

/**
 * Utility to check file type (image/video) via MIME and extension fallback.
 */
function guessKind(file) {
  if (!file) return "unknown";
  const type = file.type || "";
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  const name = file.name?.toLowerCase() || "";
  if (/\.(png|jpg|jpeg|gif|bmp|webp|svg)$/.test(name)) return "image";
  if (/\.(mp4|webm|ogg|mov|avi|mkv)$/.test(name)) return "video";
  return "unknown";
}

/**
 * Create an object URL and ensure it is revoked when not needed.
 */
function useObjectUrl(file) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);
  return url;
}

/**
 * Mock uploader to simulate progress for UX demo purposes.
 * Calls onProgress(0..100) and resolves with a mock response.
 */
function mockUpload(file, onProgress) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file to upload"));
      return;
    }
    let progress = 0;
    const tick = () => {
      progress += Math.floor(Math.random() * 12) + 6; // 6-17% per step
      if (progress >= 100) {
        onProgress(100);
        setTimeout(() => {
          resolve({
            id: `${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
          });
        }, 200);
      } else {
        onProgress(progress);
        timer = setTimeout(tick, 200);
      }
    };
    let timer = setTimeout(tick, 350);
  });
}

// PUBLIC_INTERFACE
export default function MediaFileInput({
  label = "Select media",
  accept = "image/*,video/*",
  onUploaded, // callback with uploaded item metadata
  className = "",
}) {
  /**
   * Reusable file input component that:
   * - Accepts image/video files
   * - Shows local preview
   * - Simulates upload with a progress bar
   * - Emits onUploaded(metadata) when done
   */
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [kind, setKind] = useState("unknown");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const previewUrl = useObjectUrl(file);
  const fileInfo = useMemo(() => {
    if (!file) return null;
    return `${file.name} • ${(file.size / (1024 * 1024)).toFixed(2)} MB`;
  }, [file]);

  const onPick = useCallback(() => inputRef.current?.click(), []);
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      handleFile(dropped);
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFile = (f) => {
    setError("");
    const k = guessKind(f);
    if (k === "unknown") {
      setError("Unsupported file type. Please select an image or video.");
      setFile(null);
      setKind("unknown");
      return;
    }
    setFile(f);
    setKind(k);
    setProgress(0);
  };

  const onChange = useCallback((e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }, []);

  const startUpload = useCallback(async () => {
    if (!file || isUploading) return;
    try {
      setIsUploading(true);
      setError("");
      const meta = await mockUpload(file, setProgress);
      onUploaded && onUploaded(meta);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [file, isUploading, onUploaded]);

  const reset = useCallback(() => {
    setFile(null);
    setKind("unknown");
    setProgress(0);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

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
