import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar,
} from "recharts";

// Example static data structure for metadata: timestamp, mobility, probability
const sampleData = [
  { t: "00:00", mobility: 0.2, prob: 0.72 },
  { t: "00:05", mobility: 0.4, prob: 0.81 },
  { t: "00:10", mobility: 0.1, prob: 0.65 },
  { t: "00:15", mobility: 0.6, prob: 0.92 },
  { t: "00:20", mobility: 0.5, prob: 0.88 },
];

// PUBLIC_INTERFACE
export default function ChartsSection() {
  /** Charts placeholders for detection metadata; wire in real data later. */
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h3 className="text-base font-semibold text-gray-800">Probability Over Time</h3>
        <div className="h-64 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="prob" stroke="#1E3A8A" strokeWidth={2} dot={false} name="Probability" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-4">
        <h3 className="text-base font-semibold text-gray-800">Bear Mobility</h3>
        <div className="h-64 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="mobility" fill="#F59E0B" name="Mobility" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
