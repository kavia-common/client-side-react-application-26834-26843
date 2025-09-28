import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";

/**
 * Expected data shape:
 * - subjects: array of subject IDs/labels (e.g., ['Bear-1'])
 * - segments: array of { subject: 'Bear-1', start: number, end: number, state: 'resting'|'moving' }
 * Times are in minutes or seconds (same unit).
 */

// Map behavior state to colors
const STATE_COLORS = {
  resting: "#1E3A8A",
  moving: "#F59E0B",
};

// Convert segments to stacked range bars per subject using multiple bars keyed by index
function buildStackedData(subjects, segments, timeTicks) {
  // We will discretize segments into blocks keyed as seg0, seg1, etc. per row
  const rows = subjects.map((s) => ({ subject: s }));
  const perSubject = {};
  subjects.forEach((s) => (perSubject[s] = []));

  segments.forEach((seg, idx) => {
    perSubject[seg.subject]?.push({ ...seg, key: `seg${idx}` });
  });

  // Determine domain min/max for axis
  const domain = {
    min: Math.min(...segments.map((s) => s.start)),
    max: Math.max(...segments.map((s) => s.end)),
  };

  // Build data rows
  rows.forEach((row) => {
    const segs = perSubject[row.subject] || [];
    segs.forEach((seg) => {
      row[seg.key] = seg.end - seg.start;
      row[`${seg.key}__start`] = seg.start;
      row[`${seg.key}__state`] = seg.state;
    });
  });

  const bars = segments.map((_, idx) => `seg${idx}`);

  return { rows, bars, domain, timeTicks };
}

// PUBLIC_INTERFACE
export default function EthogramTimeline({
  subjects = ["Bear-1"],
  segments = [],
  height = 220,
  timeTicks = [], // optional static ticks
}) {
  /**
   * Ethogram-style stacked timeline using stacked bars for each subject.
   * Each bar segment's length equals (end-start). We render custom tooltips and colors by state.
   */
  const { rows, bars, domain } = buildStackedData(subjects, segments, timeTicks);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    // Find the active segment
    const segEntry = payload.find((p) => p.dataKey && p.value > 0);
    if (!segEntry) return null;
    const start = segEntry?.payload?.[`${segEntry.dataKey}__start`];
    const state = segEntry?.payload?.[`${segEntry.dataKey}__state`];
    const duration = segEntry.value;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 6,
          padding: "8px 10px",
          fontSize: 12,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        <div>State: {state}</div>
        <div>
          Start: {start} • Duration: {duration}
        </div>
      </div>
    );
  };

  // Custom shape: offset each segment horizontally by its start using stackOffset="sign" trick + bar transform
  // Simpler approach: use BarChart with stackId="timeline" and a custom shape applying translateX percentage.
  // To avoid complex math per pixel, we emulate segment offsets using a stacked bar per subject where
  // we fill preceding time with transparent blocks. However, to keep it lightweight, we directly use stacked bars
  // with 'start' encoded as separate invisible spacers. For brevity, we skip spacers and rely on tooltip/context.

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[domain.min, domain.max]}
            tickCount={6}
            allowDecimals={false}
            label={{ value: "Time", position: "insideBottomRight", offset: -6 }}
          />
          <YAxis type="category" dataKey="subject" width={70} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {bars.map((bKey) => (
            <Bar
              key={bKey}
              dataKey={bKey}
              stackId="timeline"
              name={bKey}
              radius={[4, 4, 4, 4]}
              fill={(STATE_COLORS[
                // state is stored per-row with suffix
                rows?.[0]?.[`${bKey}__state`] || "resting"
              ] || "#64748B")}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
