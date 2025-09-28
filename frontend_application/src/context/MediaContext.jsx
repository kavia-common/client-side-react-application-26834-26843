import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Shape:
 * - uploaded: array of uploaded media metadata
 * - selectedMedia: currently selected media (optional)
 * - selectedDetection: active detection item (optional)
 */

// PUBLIC_INTERFACE
export const MediaContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * MediaProvider
 * Stores uploaded media list and analysis selection across the app.
 */
export function MediaProvider({ children }) {
  const [uploaded, setUploaded] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedDetection, setSelectedDetection] = useState(null);

  const addUploaded = useCallback((meta) => {
    setUploaded((prev) => [meta, ...prev].slice(0, 20));
    setSelectedMedia((prevSel) => prevSel ?? meta);
  }, []);

  const value = useMemo(
    () => ({
      uploaded,
      addUploaded,
      selectedMedia,
      setSelectedMedia,
      selectedDetection,
      setSelectedDetection,
    }),
    [uploaded, addUploaded, selectedMedia, selectedDetection]
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

// PUBLIC_INTERFACE
export function useMediaContext() {
  /** Access uploaded media and analysis selection state. */
  const ctx = useContext(MediaContext);
  if (!ctx) {
    throw new Error("useMediaContext must be used within MediaProvider");
  }
  return ctx;
}
