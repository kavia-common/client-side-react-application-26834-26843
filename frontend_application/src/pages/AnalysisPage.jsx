import AnalysisDashboard from "../components/AnalysisDashboard";

// PUBLIC_INTERFACE
export default function AnalysisPage() {
  /** Page wrapper for the Analysis Dashboard view */
  return (
    <div className="container-page py-6">
      <h2 className="text-xl font-bold text-gray-900">Analysis</h2>
      <p className="text-sm text-gray-600 mt-1">
        Visualize detections with bounding boxes and filter by confidence.
      </p>
      <div className="mt-6">
        <AnalysisDashboard />
      </div>
    </div>
  );
}
