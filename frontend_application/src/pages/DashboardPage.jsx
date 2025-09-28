import ChartsSection from "../components/ChartsSection";

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Page wrapper for metadata charts and trend analysis */
  return (
    <div className="container-page py-6">
      <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
      <p className="text-sm text-gray-600 mt-1">
        Explore detection metadata and trends.
      </p>
      <div className="mt-6">
        <ChartsSection />
      </div>
    </div>
  );
}
