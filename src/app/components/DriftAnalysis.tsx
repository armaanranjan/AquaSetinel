import React, { useEffect, useState } from "react";
import { getDriftData } from "@/app/api";

export const DriftAnalysis = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrift();
  }, []);

  const fetchDrift = async () => {
    setLoading(true);
    const res = await getDriftData();
    setData(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">📊 Drift Analysis</h1>

        <button
          onClick={fetchDrift}
          className="mb-6 px-4 py-2 bg-teal-500 text-black rounded"
        >
          Refresh Analysis
        </button>

        {loading && <p className="text-teal-400">Analyzing environment...</p>}

        {data && (
          <>
            {/* Drift Score */}
            <div className="mb-6">
              <p className="text-slate-400">Drift Score</p>
              <p className="text-4xl font-bold text-teal-400">
                {data.drift_score.toFixed(2)}
              </p>
            </div>

            {/* Risk */}
            <div className="mb-6">
              <p className="text-slate-400">Risk Level</p>
              <p
                className={`text-xl font-bold ${
                  data.risk_level === "HIGH"
                    ? "text-red-400"
                    : data.risk_level === "MEDIUM"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {data.risk_level}
              </p>
            </div>

            {/* Trend Graph (simple bars) */}
            <div className="mt-8">
              <p className="text-slate-400 mb-2">Drift Trend</p>
              <div className="flex items-end gap-2 h-40">
                {data.trend.map((t: any, i: number) => (
                  <div
                    key={i}
                    className="bg-teal-400 w-6"
                    style={{ height: `${t.value * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};