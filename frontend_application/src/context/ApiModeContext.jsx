import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ApiModeProvider and useApiMode
 * Holds and exposes the current API mode ('mock' | 'real') for the whole app.
 */
const ApiModeContext = createContext(null);

export function ApiModeProvider({ initialMode = "mock", children }) {
  const [mode, setMode] = useState(initialMode);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      isMock: mode === "mock",
      isReal: mode === "real",
    }),
    [mode]
  );

  return (
    <ApiModeContext.Provider value={value}>{children}</ApiModeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useApiMode() {
  /** Hook to access api mode context. */
  const ctx = useContext(ApiModeContext);
  if (!ctx) {
    throw new Error("useApiMode must be used within ApiModeProvider");
  }
  return ctx;
}
