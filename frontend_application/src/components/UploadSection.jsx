import { useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function UploadSection() {
  /**
   * Upload section for images/videos with drag-and-drop UI.
   * Handlers are stubbed; integrate with backend or client-side processing later.
   */
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const onSelectFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    setFiles((prev) => [...prev, ...dropped]);
  };

  const onDragOver = (e) => e.preventDefault();

  const onUpload = () => {
    // TODO: integrate with processing flow
    alert(`Stub: Ready to upload/process ${files.length} file(s).`);
  };

  return (
    <div className="space-y-6">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white text-center hover:border-primary/60 transition-colors"
        onDrop={onDrop}
        onDragOver={onDragOver}
        role="region"
        aria-label="Drag and drop upload"
      >
        <p className="text-gray-700 font-medium">
          Drag & drop your videos or images here
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Supported: .mp4, .mov, .jpg, .png
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-blue-800"
          onClick={() => inputRef.current?.click()}
        >
          Browse Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="video/*,image/*"
          multiple
          className="hidden"
          onChange={onSelectFiles}
        />
      </div>

      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-800">Selected Files</h3>
        {files.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">No files selected.</p>
        ) : (
          <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((f, idx) => (
              <li key={idx} className="border border-gray-200 rounded-md p-3">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {f.name}
                </p>
                <p className="text-xs text-gray-500">{Math.round(f.size / 1024)} KB</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <button
            type="button"
            onClick={onUpload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-gray-900 hover:bg-amber-500"
            disabled={files.length === 0}
          >
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
