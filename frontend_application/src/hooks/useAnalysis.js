import { useCallback, useEffect, useMemo, useState } from "react";
import { useApiMode } from "../context/ApiModeContext";
import { getApi } from "../api";
import { useMediaContext } from "../context/MediaContext";

/**
 * PUBLIC_INTERFACE
 * useAnalysis
 * Fetches analysis detections via API and exposes:
 * - media, detections, loading, error
 * - threshold filtering logic
 * - ability to select a detection globally (MediaContext)
 */
export function useAnalysis(initialThreshold = 0.7) {
  const { mode } = useApiMode();
  const api = useMemo(() => getApi(mode), [mode]);
  const { selectedDetection, setSelectedDetection } = useMediaContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [media, setMedia] = useState(null);
  const [detections, setDetections] = useState([]);
  const [threshold, setThreshold] = useState(initialThreshold);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .getDetections()
      .then((data) => {
        if (!mounted) return;
        setMedia(data.media);
        setDetections(data.detections || []);
      })
      .catch((e) => mounted && setError(e?.message || "Failed to load"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [api]);

  const visibleDetections = useMemo(
    () => detections.filter((d) => d.label === "bear" && (d.conf ?? 0) >= threshold),
    [detections, threshold]
  );

  const selectDetection = useCallback(
    (det) => setSelectedDetection(det),
    [setSelectedDetection]
  );

  return {
    media,
    detections,
    visibleDetections,
    loading,
    error,
    threshold,
    setThreshold,
    selectedDetection,
    selectDetection,
  };
}
