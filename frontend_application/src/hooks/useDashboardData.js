import { useEffect, useMemo, useState } from "react";
import { useApiMode } from "../context/ApiModeContext";
import { getApi } from "../api";

/**
 * PUBLIC_INTERFACE
 * useDashboardData
 * Fetches time series, totals, and ethogram data for the dashboard from API layer.
 */
export function useDashboardData() {
  const { mode } = useApiMode();
  const api = useMemo(() => getApi(mode), [mode]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeSeries, setTimeSeries] = useState([]);
  const [totals, setTotals] = useState({ resting: 0, moving: 0 });
  const [ethogram, setEthogram] = useState({ subjects: [], segments: [] });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .getDashboard()
      .then((data) => {
        if (!mounted) return;
        setTimeSeries(data.timeSeries || []);
        setTotals(data.totals || { resting: 0, moving: 0 });
        setEthogram(data.ethogram || { subjects: [], segments: [] });
      })
      .catch((e) => mounted && setError(e?.message || "Failed to load"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [api]);

  const restMoveData = useMemo(
    () => [
      { label: "Resting", value: totals.resting },
      { label: "Moving", value: totals.moving },
    ],
    [totals]
  );

  return {
    loading,
    error,
    timeSeries,
    totals,
    restMoveData,
    ethogram,
  };
}
