import React, { useMemo, useRef, useState } from 'react';

type Detection = { id: number; label: string; confidence: number; box: [number, number, number, number] };

/** PUBLIC_INTERFACE */
export default function AnalysisPage(): JSX.Element {
  /**
   * YOLO Analysis page to select files, choose analysis type, run mock analysis,
   * and visualize detections with bounding boxes and metrics.
   */
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [type, setType] = useState<'mobility' | 'species'>('mobility');
  const [running, setRunning] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const isVideo = useMemo(() => (file?.type || '').startsWith('video/'), [file]);
  const isImage = useMemo(() => (file?.type || '').startsWith('image/'), [file]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreviewURL(url);
      setDetections([]);
      setAccuracy(null);
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setRunning(true);

    // Mock processing delay
    await new Promise((r) => setTimeout(r, 800));

    // Fake YOLO-like boxes normalized (x, y, w, h)
    const mocks: Detection[] = [
      { id: 1, label: type === 'mobility' ? 'Moving' : 'Deer', confidence: 0.92, box: [0.15, 0.2, 0.3, 0.35] },
      { id: 2, label: type === 'mobility' ? 'Stationary' : 'Fox', confidence: 0.87, box: [0.55, 0.4, 0.25, 0.28] }
    ];
    setDetections(mocks);
    setAccuracy(93 + Math.round(Math.random() * 3));
    setRunning(false);
  };

  return (
    <section className="space-y-4">
      <div className="card">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm font-medium">Analysis type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'mobility' | 'species')}
            className="rounded-md bg-white dark:bg-slate-900 border border-black/10 px-2 py-1 text-sm"
          >
            <option value="mobility">Mobility</option>
            <option value="species">Species ID</option>
          </select>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={onPick}
            className="ml-auto"
          />
          <button
            className="button-primary disabled:opacity-60"
            onClick={runAnalysis}
            disabled={!file || running}
          >
            {running ? 'Analyzing…' : 'Start Analysis'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Media Preview</h2>
          {!previewURL && <div className="text-gray-500 text-sm">Select an image or video to preview.</div>}
          <div className="relative max-h-[420px] overflow-hidden rounded-lg">
            {isImage && previewURL && (
              <img ref={imageRef} src={previewURL} alt="preview" className="max-h-[420px] w-auto mx-auto" />
            )}
            {isVideo && previewURL && (
              <video ref={videoRef} src={previewURL} controls className="max-h-[420px] w-auto mx-auto" />
            )}

            {/* Bounding boxes overlay */}
            {(isImage || isVideo) && detections.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {detections.map((d) => (
                  <BoxOverlay key={d.id} det={d} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          {accuracy != null ? (
            <div className="mb-3 text-sm">
              Accuracy: <span className="font-semibold">{accuracy}%</span>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Run analysis to see results.</div>
          )}

          <ul className="space-y-2">
            {detections.map((d) => (
              <li key={d.id} className="flex items-center justify-between bg-black/5 dark:bg-white/5 rounded-md px-3 py-2">
                <span className="font-medium">{d.label}</span>
                <span className="text-xs">Conf: {(d.confidence * 100).toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BoxOverlay({ det }: { det: Detection }) {
  // det.box is [x, y, w, h] in normalized coords (0..1)
  const [x, y, w, h] = det.box;
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${x * 100}%`,
    top: `${y * 100}%`,
    width: `${w * 100}%`,
    height: `${h * 100}%`,
    boxShadow: 'inset 0 0 0 2px rgba(59,130,246,0.9)',
    borderRadius: '6px'
  };
  return (
    <div style={style}>
      <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-md shadow">
        {det.label} • {(det.confidence * 100).toFixed(0)}%
      </div>
    </div>
  );
}
