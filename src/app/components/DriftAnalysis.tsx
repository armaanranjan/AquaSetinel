import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { getDriftData } from "../api";

const oceanCoords: any = {
  "Indian Ocean": { center: [10, 80], zoom: 4 },
  "Pacific Ocean": { center: [0, -140], zoom: 3 },
  "Atlantic Ocean": { center: [20, -40], zoom: 4 },
  "Arabian Sea": { center: [15, 65], zoom: 5 },
  "Bay of Bengal": { center: [15, 90], zoom: 5 }
};

const oceanData: any = {
  "Indian Ocean": { current: "Monsoon-driven flow", speed: "1.2 m/s", risk: "HIGH" },
  "Pacific Ocean": { current: "Trade wind circulation", speed: "0.9 m/s", risk: "MEDIUM" },
  "Atlantic Ocean": { current: "Gulf Stream system", speed: "1.1 m/s", risk: "LOW" },
  "Arabian Sea": { current: "Cyclonic gyre", speed: "0.8 m/s", risk: "HIGH" },
  "Bay of Bengal": { current: "Seasonal reversal flow", speed: "1.3 m/s", risk: "HIGH" }
};

const MapUpdater = ({ ocean }: any) => {
  const map = useMap();

  React.useEffect(() => {
    const { center, zoom } = oceanCoords[ocean];
    map.flyTo(center, zoom, { duration: 2 });
  }, [ocean]);

  return null;
};

export const DriftAnalysis = () => {
  const [data, setData] = useState<any>(null);
  const [selectedOcean, setSelectedOcean] = useState("Indian Ocean");
  const [videoName, setVideoName] = useState<string | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDrift = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    const res = await getDriftData();
    setData(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">🌊 Drift Analysis</h1>

        {/* 🔥 UPLOAD */}
        <div className="mb-6">
          <label className="inline-block cursor-pointer bg-teal-500 hover:bg-teal-400 text-black px-6 py-3 rounded-xl font-semibold transition">
            🎥 Upload Video
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];

                  if (!file.type.includes("video")) {
                    alert("⚠ Please upload a video file.");
                    return;
                  }

                  setVideoName(file.name);
                  setHasVideo(true);
                  fetchDrift();
                }
              }}
            />
          </label>

          {videoName && (
            <p className="text-teal-400 mt-2 text-sm">
              🎥 Loaded: {videoName}
            </p>
          )}
        </div>

        {/* 🔥 RESULTS AT TOP */}
        {loading && (
          <p className="text-teal-400 mb-6">Analyzing ocean drift...</p>
        )}

        {hasVideo && data && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="p-6 bg-slate-900 rounded-xl">
              <p className="text-slate-400 text-sm">Drift Score</p>
              <p className="text-3xl font-bold text-teal-400">
                {data.drift_score.toFixed(2)}
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl">
              <p className="text-slate-400 text-sm">Risk Level</p>
              <p className="text-xl font-bold text-yellow-400">
                {data.risk_level}
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl">
              <p className="text-slate-400 text-sm">Predicted Spread</p>
              <p className="text-white text-lg">
                {Math.round(data.drift_score * 100)} km²
              </p>
            </div>

          </div>
        )}

        {/* 🌍 OCEAN SELECT */}
        <div className="mb-6">
          <label className="text-slate-400 mr-3">Select Ocean:</label>
          <select
            value={selectedOcean}
            onChange={(e) => setSelectedOcean(e.target.value)}
            className="bg-slate-900 text-white p-2 rounded"
          >
            {Object.keys(oceanCoords).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* 🗺 MAP */}
        <div className="rounded-xl overflow-hidden mb-8 border border-white/10">
          <MapContainer
            center={[10, 80]}
            zoom={4}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater ocean={selectedOcean} />
          </MapContainer>
        </div>

        {/* EXTRA INFO */}
        {hasVideo && data && !loading && (
          <div className="grid grid-cols-3 gap-6">

            <div className="p-6 bg-slate-900 rounded-xl">
              {oceanData[selectedOcean].current}
            </div>

            <div className="p-6 bg-slate-900 rounded-xl">
              {oceanData[selectedOcean].speed}
            </div>

            <div className="p-6 bg-slate-900 rounded-xl">
              {oceanData[selectedOcean].risk}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};