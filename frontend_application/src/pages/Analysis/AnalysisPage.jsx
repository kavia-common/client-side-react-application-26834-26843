import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AnalysisPage.module.css";

/**
 * Fake API to fetch YOLO-like detection results for the latest media.
 * Returns boxes in normalized [0..1] coordinates for width/height proportional overlay.
 */
function fakeFetchDetections() {
  // Simulate API latency
  return new Promise((resolve) => {
    setTimeout(() => {
      // A small mock list including items below threshold to be filtered
      resolve({
        media: {
          // The demo uses a stock image if no prior upload exists.
          // In a real app this would point to the latest uploaded media path.
          url:
            "https://images.unsplash.com/photo-1558981033-0f30ed1911c0?q=80&w=1200&auto=format&fit=crop",
          kind: "image",
          width: 1200,
          height: 800,
          uploadedAt: new Date().toISOString(),
        },
        detections: [
          {
            id: "1",
            label: "bear",
            conf: 0.91,
            state: "resting",
            // x, y, w, h are normalized [0..1]
            box: { x: 0.12, y: 0.22, w: 0.22, h: 0.18 },
            ts: Date.now() - 12000,
          },
          {
            id: "2",
            label: "bear",
            conf: 0.84,
            state: "moving",
            box: { x: 0.55, y: 0.30, w: 0.27, h: 0.35 },
            ts: Date.now() - 9000,
          },
          {
            id: "3",
            label: "bear",
            conf: 0.63, // Should be filtered out by threshold 0.7
            state: "moving",
            box: { x: 0.40, y: 0.62, w: 0.16, h: 0.14 },
            ts: Date.now() - 6000,
          },
        ],
      });
    }, 550);
  });
}

/**
 * Color map by mobility state.
 * - resting => blue
 * - moving => gold
 */
function stateColor(state) {
  return state === "moving" ? "#F59E0B" : "#1E3A8A";
}

function formatTs(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

// PUBLIC_INTERFACE
export default function AnalysisPage() {
  /**
   * Analysis page
   * - Fetch mock detections via fake API
   * - Show latest media (image/video) with overlay boxes for conf ≥ threshold
   * - Each box shows probability and mobility label
   * - Responsive side panel lists detection metadata
   */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [media, setMedia] = useState(null);
  const [detections, setDetections] = useState([]);
  const [threshold, setThreshold] = useState(0.7);

  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Fetch mock data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fakeFetchDetections()
      .then((data) => {
        if (!isMounted) return;
        setMedia(data.media);
        setDetections(data.detections || []);
      })
      .catch((e) => isMounted && setError(e?.message || "Failed to load"))
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  // Resize observer to track preview area size for absolute overlays
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setContainerSize({ w: cr.width, h: cr.height });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Filter detections by threshold and class 'bear'
  const visibleDetections = useMemo(() => {
    return detections.filter(
      (d) => d.label === "bear" && (d.conf ?? 0) >= threshold
    );
  }, [detections, threshold]);

  // Compute positioned boxes in pixels from normalized coordinates
  const positionedBoxes = useMemo(() => {
    if (!media || !containerSize.w || !containerSize.h) return [];
    // We assume media is letterboxed inside the container maintaining aspect ratio.
    // We'll compute the displayed media rect to translate normalized coordinates.
    const containerAspect = containerSize.w / containerSize.h;
    const mediaAspect =
      media && media.width && media.height
        ? media.width / media.height
        : 16 / 9;

    let drawW, drawH, offsetX, offsetY;
    if (mediaAspect > containerAspect) {
      // Media wider than container: limit by width
      drawW = containerSize.w;
      drawH = drawW / mediaAspect;
      offsetX = 0;
      offsetY = (containerSize.h - drawH) / 2;
    } else {
      // Media taller: limit by height
      drawH = containerSize.h;
      drawW = drawH * mediaAspect;
      offsetX = (containerSize.w - drawW) / 2;
      offsetY = 0;
    }

    return visibleDetections.map((d) => {
      const { x, y, w, h } = d.box;
      const left = offsetX + x * drawW;
      const top = offsetY + y * drawH;
      const width = w * drawW;
      const height = h * drawH;
      return { ...d, left, top, width, height };
    });
  }, [media, containerSize, visibleDetections]);

  const handleThresholdChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!Number.isNaN(val)) setThreshold(Math.max(0, Math.min(1, val)));
  };

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
              <label htmlFor="conf" className={styles.label}>
                Confidence ≥
              </label>
              <input
                id="conf"
                type="number"
                min="0"
                max="1"
                step="0.05"
                className={styles.input}
                value={threshold.toFixed(2)}
                onChange={handleThresholdChange}
              />
            </div>
          </div>

          <div className={styles.previewArea} ref={containerRef}>
            {loading && <span className={styles.placeholderText}>Loading…</span>}
            {!loading && error && (
              <span className={styles.errorText}>{error}</span>
            )}
            {!loading && !error && media && (
              <>
                {media.kind === "image" ? (
                  <img
                    src={media.url}
                    alt="Analyzed"
                    className={styles.media}
                  />
                ) : (
                  <video
                    className={styles.media}
                    src={media.url}
                    controls
                    autoPlay
                    muted
                    loop
                  />
                )}

                {/* Bounding boxes overlay */}
                <div className={styles.overlay} aria-hidden="true">
                  {positionedBoxes.map((b) => (
                    <div
                      key={b.id}
                      className={styles.box}
                      style={{
                        left: `${b.left}px`,
                        top: `${b.top}px`,
                        width: `${b.width}px`,
                        height: `${b.height}px`,
                        borderColor: stateColor(b.state),
                        boxShadow: `0 0 0 1px ${stateColor(
                          b.state
                        )}, inset 0 0 0 1px ${stateColor(b.state)}`,
                      }}
                    >
                      <div
                        className={styles.boxLabel}
                        style={{
                          background: stateColor(b.state),
                        }}
                      >
                        <span className={styles.badge}>
                          {b.state === "moving" ? "Moving" : "Resting"}
                        </span>
                        <span className={styles.conf}>
                          {(b.conf * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <aside className={styles.sidePanel}>
          <h3 className={styles.cardTitle}>Detections</h3>
          {loading && <p className={styles.muted}>Loading…</p>}
          {!loading && visibleDetections.length === 0 && (
            <p className={styles.muted}>No detections above threshold.</p>
          )}

          <ul className={styles.list}>
            {visibleDetections.map((d) => (
              <li key={d.id} className={styles.listItem}>
                <div className={styles.row}>
                  <span className={styles.metaLabel}>Bear</span>
                  <span
                    className={styles.statePill}
                    style={{ background: stateColor(d.state) }}
                  >
                    {d.state === "moving" ? "Moving" : "Resting"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.kvLabel}>Confidence</span>
                  <span className={styles.kvValue}>
                    {(d.conf * 100).toFixed(1)}%
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.kvLabel}>Timestamp</span>
                  <span className={styles.kvValue}>{formatTs(d.ts)}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
