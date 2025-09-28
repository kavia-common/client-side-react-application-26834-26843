import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApiMode } from "../context/ApiModeContext";
import { getApi } from "../api";

/**
 * Utility to guess file kind
 */
function guessKind(file) {
  if (!file) return "unknown";
  const type = file.type || "";
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  const name = file.name?.toLowerCase() || "";
  if (/\.(png|jpg|jpeg|gif|bmp|webp|svg)$/.test(name)) return "image";
  if (/\.(mp4|webm|ogg|mov|avi|mkv)$/.test(name)) return "video";
  return "unknown";
}

/**
 * Create object URL for preview and auto-revoke on cleanup.
 */
function useObjectUrl(file) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url;
}

/**
 * PUBLIC_INTERFACE
 * useMediaUpload
 * Provides:
 * - file state and handlers (select, reset)
 * - local preview url
 * - startUpload() that uses API layer based on ApiModeContext
 * - progress, isUploading, error states
 */
export function useMediaUpload({ onUploaded } = {}) {
  const inputRef = useRef(null);
  const { mode } = useApiMode();
  const api = useMemo(() => getApi(mode), [mode]);

  const [file, setFile] = useState(null);
  const [kind, setKind] = useState("unknown");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const previewUrl = useObjectUrl(file);

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return `${file.name} • ${(file.size / (1024 * 1024)).toFixed(2)} MB`;
  }, [file]);

  const onPick = useCallback(() => inputRef.current?.click(), []);

  const handleFile = useCallback((f) => {
    setError("");
    const k = guessKind(f);
    if (k === "unknown") {
      setError("Unsupported file type. Please select an image or video.");
      setFile(null);
      setKind("unknown");
      return;
    }
    setFile(f);
    setKind(k);
    setProgress(0);
  }, []);

  const onChange = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e) => e.preventDefault(), []);

  const reset = useCallback(() => {
    setFile(null);
    setKind("unknown");
    setProgress(0);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const startUpload = useCallback(async () => {
    if (!file || isUploading) return;
    try {
      setIsUploading(true);
      setError("");
      const meta = await api.uploadMedia(file, setProgress);
      onUploaded && onUploaded(meta);
      return meta;
    } catch (err) {
      setError(err?.message || "Upload failed");
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [api, file, isUploading, onUploaded]);

  return {
    // input
    inputRef,
    onPick,
    onChange,
    onDrop,
    onDragOver,
    reset,
    // state
    file,
    kind,
    fileInfo,
    previewUrl,
    isUploading,
    progress,
    error,
    // action
    startUpload,
  };
}
