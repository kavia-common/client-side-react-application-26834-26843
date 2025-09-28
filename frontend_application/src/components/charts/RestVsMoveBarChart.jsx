import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// PUBLIC_INTERFACE
export default function RestVsMoveBarChart({
  data = [], // [{ label: 'Resting', value: 10 }, { label: 'Moving', value: 14 }]
  height = 280,
  colors = { Resting: "#1E3A8A", Moving: "#F59E0B" },
}) {
  /**
   * Simple bar chart showing counts for Resting vs Moving.
   * Accepts flexible labels but maps colors for 'Resting' and 'Moving' defaults.
   */
  const normalized = data.map((d) => ({
    ...d,
    fill: colors[d.label] || "#64748B",
  }));

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart data={normalized} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
            {normalized.map((entry, index) => (
              <cell key={`c-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
