import React from 'react';
import { Scan, AlertTriangle } from 'lucide-react';
import { AIModel } from '@/app/App';

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
              onChange={(e) => {
                if (e.target.files?.[0]) onUpload(e.target.files[0]);
              }}
              className="text-white"
            />
          </div>

          <div className="aspect-video">
            {imageURL ? (
              <img src={imageURL} className="w-full h-full object-cover" />
            ) : (
              <div className="text-white p-10">Upload an image</div>
            )}
          </div>

          {result && (
            <div className="p-6 bg-slate-900">
              <p className="text-white">Class: {result?.class}</p>
              <p className="text-white">
                Confidence: {result?.confidence ? (result.confidence * 100).toFixed(2) : "—"}%
              </p>

              <p className={isPlastic ? "text-red-400" : "text-green-400"}>
                {isPlastic ? "⚠ Plastic Detected" : "✅ Clean"}
              </p>

              {Array.isArray(result?.all_scores) &&
                result.all_scores.map((score: number, i: number) => (
                  <div key={i}>
                    <p className="text-xs text-slate-400">
                      {["Clean", "Plastic", "Other"][i]}
                    </p>
                    <div className="bg-slate-800 h-2">
                      <div
                        className="bg-teal-400 h-2"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-80">
          <div className="p-6 bg-slate-900 rounded-2xl">
            <Scan className="text-teal-400" />
            <p className="text-white mt-4">
              {result?.class || "—"}
            </p>
          </div>

          {isPlastic && (
            <div className="p-4 bg-red-500/10 mt-4 rounded">
              <AlertTriangle className="text-red-400" />
              <p className="text-red-200 text-xs">
                Plastic pollution detected
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};