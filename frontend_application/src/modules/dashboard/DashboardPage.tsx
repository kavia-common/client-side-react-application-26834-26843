import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ChartPoint = { label: string; mobility: number; nonMobility: number; accuracy: number };

/** PUBLIC_INTERFACE */
export default function DashboardPage(): JSX.Element {
  /**
   * Dashboard with widgets/cards for upload/import, analysis results summary, and charts.
   */
  const data: ChartPoint[] = useMemo(
    () => [
      { label: 'Mon', mobility: 42, nonMobility: 18, accuracy: 92 },
      { label: 'Tue', mobility: 51, nonMobility: 12, accuracy: 90 },
      { label: 'Wed', mobility: 38, nonMobility: 20, accuracy: 93 },
      { label: 'Thu', mobility: 60, nonMobility: 14, accuracy: 91 },
      { label: 'Fri', mobility: 55, nonMobility: 16, accuracy: 94 },
      { label: 'Sat', mobility: 72, nonMobility: 10, accuracy: 95 },
      { label: 'Sun', mobility: 48, nonMobility: 22, accuracy: 92 }
    ],
    []
  );

  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    setFiles((prev) => [...prev, ...dropped]);
  };

  const onBrowse = () => inputRef.current?.click();

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Overall Accuracy" value="93.1%" hint="Last 7 days" />
        <StatCard title="Mobility Detections" value="366" hint="+12% vs prev." />
        <StatCard title="Non-Mobility Detections" value="112" hint="+4% vs prev." />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold mb-2">Upload & Import</h2>
          <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">
            Drag and drop images or videos, or browse files. You can proceed to analysis after upload.
          </p>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="border-2 border-dashed border-primary/30 rounded-xl p-4 text-center bg-primary/5 dark:bg-white/5"
          >
            <div className="mb-2 font-medium">Drag & drop media here</div>
            <div className="text-sm text-gray-500 dark:text-slate-300 mb-3">Supported: .jpg, .png, .mp4</div>
            <div className="flex items-center justify-center gap-2">
              <button className="button-primary" onClick={onBrowse}>Browse Files</button>
              <Link to="/analysis" className="button-secondary">Go to Analysis</Link>
            </div>
            <input
              ref={inputRef}
              onChange={onFiles}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Queued files</div>
              <ul className="space-y-2 max-h-56 overflow-auto pr-1">
                {files.map((f, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-black/5 dark:bg-white/5 rounded-md px-3 py-2">
                    <span className="truncate">{f.name}</span>
                    <span className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 card">
          <h2 className="text-lg font-semibold mb-2">Detections & Accuracy</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <defs>
                  <linearGradient id="gMob" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gNon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="mobility" stroke="#10B981" fill="url(#gMob)" />
                <Area type="monotone" dataKey="nonMobility" stroke="#3B82F6" fill="url(#gNon)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-slate-300">
            Accuracy avg: <strong>93%</strong>. Mobility higher on Sat.
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="card">
      <div className="text-sm text-gray-500 dark:text-slate-300">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{hint}</div>
    </div>
  );
}
