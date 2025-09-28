//
// API layer to abstract data fetching. Exposes a single getApi(mode) function.
// This enables easy switching between mock and real implementations throughout the app.
//

/**
 * PUBLIC_INTERFACE
 * getApi
 * Returns an API interface implementation (mock or real).
 */
export function getApi(mode = "mock") {
  if (mode === "real") {
    return realApi;
  }
  return mockApi;
}

/**
 * Mock API implementation
 * Simulates:
 * - uploadMedia: resolves with meta & fake remote URL
 * - getDetections: YOLO-like detections for analysis
 * - getDashboard: aggregate counts and ethogram segments
 */
const mockApi = {
  // PUBLIC_INTERFACE
  async uploadMedia(file, onProgress) {
    /** Mock uploader for demo; does not leave the browser */
    let progress = 0;
    await new Promise((resolve) => {
      const tick = () => {
        progress += Math.floor(Math.random() * 12) + 6;
        if (progress >= 100) {
          onProgress?.(100);
          setTimeout(resolve, 200);
          return;
        }
        onProgress?.(progress);
        setTimeout(tick, 180);
      };
      setTimeout(tick, 280);
    });

    return {
      id: `${Date.now()}`,
      name: file?.name ?? "unnamed",
      size: file?.size ?? 0,
      type: file?.type ?? "",
      uploadedAt: new Date().toISOString(),
      // For demo analysis preview use a public image as "remote URL"
      remoteUrl:
        "https://images.unsplash.com/photo-1558981033-0f30ed1911c0?q=80&w=1200&auto=format&fit=crop",
      kind: (file?.type || "").startsWith("video/") ? "video" : "image",
      width: 1200,
      height: 800,
    };
  },

  // PUBLIC_INTERFACE
  async getDetections() {
    /** YOLO-like detections for demo (normalized coords). */
    await new Promise((r) => setTimeout(r, 550));
    return {
      media: {
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
          box: { x: 0.12, y: 0.22, w: 0.22, h: 0.18 },
          ts: Date.now() - 12000,
        },
        {
          id: "2",
          label: "bear",
          conf: 0.84,
          state: "moving",
          box: { x: 0.55, y: 0.3, w: 0.27, h: 0.35 },
          ts: Date.now() - 9000,
        },
        {
          id: "3",
          label: "bear",
          conf: 0.63,
          state: "moving",
          box: { x: 0.4, y: 0.62, w: 0.16, h: 0.14 },
          ts: Date.now() - 6000,
        },
      ],
    };
  },

  // PUBLIC_INTERFACE
  async getDashboard() {
    /** Aggregated series + ethogram data for dashboard demo. */
    await new Promise((r) => setTimeout(r, 450));
    const timeSeries = Array.from({ length: 8 }).map((_, i) => {
      const t = new Date(Date.now() - (7 - i) * 60 * 60 * 1000);
      const label = t.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const resting = Math.floor(Math.random() * 6) + 2;
      const moving = Math.floor(Math.random() * 6) + 1;
      return {
        time: label,
        resting,
        moving,
        count: resting + moving,
      };
    });

    const totals = {
      resting: timeSeries.reduce((acc, d) => acc + d.resting, 0),
      moving: timeSeries.reduce((acc, d) => acc + d.moving, 0),
    };

    const subjects = ["Bear-1"];
    const base = 0;
    const segments = [
      { subject: "Bear-1", start: base + 0, end: base + 12, state: "resting" },
      { subject: "Bear-1", start: base + 12, end: base + 25, state: "moving" },
      { subject: "Bear-1", start: base + 25, end: base + 33, state: "resting" },
      { subject: "Bear-1", start: base + 33, end: base + 47, state: "moving" },
      { subject: "Bear-1", start: base + 47, end: base + 60, state: "resting" },
    ];

    return { timeSeries, totals, ethogram: { subjects, segments } };
  },
};

/**
 * Placeholder "real" API implementation. In a future integration, replace
 * fetch calls here with real endpoints. For now, it throws to highlight
 * that real mode is not wired.
 */
const realApi = {
  async uploadMedia() {
    throw new Error("Real API not configured. Switch API mode to 'mock'.");
  },
  async getDetections() {
    throw new Error("Real API not configured. Switch API mode to 'mock'.");
  },
  async getDashboard() {
    throw new Error("Real API not configured. Switch API mode to 'mock'.");
  },
};
