import UploadSection from "../components/UploadSection";

// PUBLIC_INTERFACE
export default function ImportPage() {
  /** Page wrapper for the Upload/Import section */
  return (
    <div className="container-page py-6">
      <h2 className="text-xl font-bold text-gray-900">Import</h2>
      <p className="text-sm text-gray-600 mt-1">
        Upload images or videos for analysis.
      </p>
      <div className="mt-6">
        <UploadSection />
      </div>
    </div>
  );
}
