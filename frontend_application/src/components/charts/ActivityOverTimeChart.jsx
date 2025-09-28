import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/**
 * Shape of data item: { time: string, count: number, [moving]: number, [resting]: number }
 */

// PUBLIC_INTERFACE
export default function ActivityOverTimeChart({
  data = [],
  variant = "line", // 'line' | 'bar' | 'combo'
  height = 280,
  color = "#1E3A8A",
  secondaryColor = "#F59E0B",
}) {
  /**
   * Reusable chart to visualize activity counts over time.
   * Supports line, bar, or combo (stacked bars per state + line for total).
   */
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        {variant === "bar" ? (
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Detections" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : variant === "combo" ? (
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="resting" stackId="a" name="Resting" fill={color} radius={[4, 4, 0, 0]} />
            <Bar dataKey="moving" stackId="a" name="Moving" fill={secondaryColor} radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="count"
              name="Total"
              stroke="#334155"
              strokeWidth={2}
              dot={false}
            />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" name="Detections" stroke={secondaryColor} strokeWidth={2} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
