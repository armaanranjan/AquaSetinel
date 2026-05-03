import React from 'react';
import { Scan, AlertTriangle } from 'lucide-react';
import { AIModel } from '../App';

interface Props {
  selectedModel: AIModel;
  onUpload: (file: File) => void;
  result: any;
  imageURL: string | null;
}

export const DetectionDashboard: React.FC<Props> = ({
  selectedModel,
  onUpload,
  result,
  imageURL
}) => {

  const isPlastic = result?.class === "plastic";

  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto flex gap-8">

        {/* LEFT */}
        <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden">

          <div className="p-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return;

                const file = e.target.files[0];

                console.log("Uploading file:", file);

                if (!file.type.includes("image")) {
                  alert("Upload image only");
                  return;
                }

                onUpload(file);
              }}
              className="text-white"
            />
          </div>

          <div className="aspect-video flex items-center justify-center bg-black">
            {imageURL ? (
              <img src={imageURL} className="w-full h-full object-cover" />
            ) : (
              <p className="text-slate-400">Upload an image</p>
            )}
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-80 space-y-4">

          <div className="p-6 bg-slate-900 rounded-2xl">
            <Scan className="text-teal-400" />

            <p className="text-white mt-4 text-lg font-semibold">
              {result ? result.class : "No result"}
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Confidence: {result
                ? (result.confidence * 100).toFixed(2) + "%"
                : "--"}
            </p>

            <p className={isPlastic ? "text-red-400 mt-3" : "text-green-400 mt-3"}>
              {result
                ? (isPlastic ? "⚠ Plastic Detected" : "✅ Clean")
                : "Waiting for prediction..."}
            </p>
          </div>

          {/* DEBUG PANEL */}
          <div className="p-4 bg-slate-900 rounded-2xl text-xs text-slate-400">
            <p>Debug:</p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>

          {isPlastic && (
            <div className="p-4 bg-red-500/10 rounded">
              <AlertTriangle className="text-red-400" />
              <p className="text-red-200 text-xs mt-2">
                Plastic pollution detected
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};