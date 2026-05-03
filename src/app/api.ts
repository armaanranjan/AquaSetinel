export const uploadImage = async (file: File) => {
  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: file,
  });

  return await response.json();
};


// 🔥 ADD THIS (for DriftAnalysis)
export const getDriftData = async () => {
  return {
    drift_score: Math.random() * 0.5 + 0.5, // 0.5–1.0
    risk_level: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)],
    trend: [
      { value: 0.2 },
      { value: 0.35 },
      { value: 0.5 },
      { value: 0.65 },
      { value: 0.8 }
    ]
  };
};