import { useMemo, useState } from "react";

/**
 * Mock detection data structure matching YOLO-like outputs.
 * Each detection: { id, label, confidence, bbox: [x, y, w, h] } normalized 0..1
 */
const MOCK_DETECTIONS = [
  { id: 1, label: "bear", confidence: 0.86, bbox: [0.15, 0.2, 0.25, 0.35] },
  { id: 2, label: "bear", confidence: 0.68, bbox: [0.55, 0.35, 0.18, 0.28] },
  { id: 3, label: "tree", confidence: 0.91, bbox: [0.72, 0.15, 0.18, 0.6] },
];

// PUBLIC_INTERFACE
export default function AnalysisDashboard() {
  /** Placeholder analysis view. Filters detections by confidence >= 0.7. */
  const [threshold, setThreshold] = useState(0.7);

  const filtered = useMemo(
    () => MOCK_DETECTIONS.filter((d) => d.confidence >= threshold),
    [threshold]
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800">Preview</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="th" className="text-sm text-gray-600">
              Confidence ≥
            </label>
            <input
              id="th"
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-24 border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100">
          {/* Placeholder background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-amber-600/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500">Video/Image Placeholder</span>
          </div>

          {/* Draw bounding boxes for filtered detections */}
          {filtered.map((d) => (
            <BBox key={d.id} detection={d} />
          ))}
        </div>
      </div>

      <div className="card p-4">
        <h3 className="text-base font-semibold text-gray-800">Detections</h3>
        <ul className="mt-3 space-y-2">
          {filtered.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                <span className="text-sm text-gray-800">{d.label}</span>
              </div>
              <span className="text-xs text-gray-600">
                {(d.confidence * 100).toFixed(1)}%
              </span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-sm text-gray-500">No detections at this threshold.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function BBox({ detection }) {
  const [x, y, w, h] = detection.bbox;
  const left = `${x * 100}%`;
  const top = `${y * 100}%`;
  const width = `${w * 100}%`;
  const height = `${h * 100}%`;

  return (
    <div
      className="absolute border-2 border-secondary/90 bg-secondary/10"
      style={{ left, top, width, height }}
      title={`${detection.label} (${(detection.confidence * 100).toFixed(0)}%)`}
    >
      <div className="absolute -top-6 left-0 bg-secondary text-gray-900 text-xs font-semibold px-2 py-0.5 rounded">
        {detection.label} • {(detection.confidence * 100).toFixed(0)}%
      </div>
    </div>
  );
}
