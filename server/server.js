const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// 🔥 FAKE AI RESPONSE
function generateFakeResult() {
  const isPlastic = Math.random() > 0.4;

  if (isPlastic) {
    return {
      class: "plastic",
      confidence: 0.75 + Math.random() * 0.2,
      all_scores: [
        Math.random() * 0.3,     // clean
        0.7 + Math.random() * 0.3, // plastic
        Math.random() * 0.1      // other
      ]
    };
  } else {
    return {
      class: "clean",
      confidence: 0.7 + Math.random() * 0.2,
      all_scores: [
        0.7 + Math.random() * 0.3,
        Math.random() * 0.3,
        Math.random() * 0.1
      ]
    };
  }
}

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("File received:", req.file?.originalname);

  // simulate delay (looks real)
  setTimeout(() => {
    const result = generateFakeResult();
    console.log("Mock Result:", result);
    res.json(result);
  }, 1000);
});
// 🔥 FAKE DRIFT GENERATOR
function generateDriftData() {
  const driftScore = Math.random();

  let risk = "LOW";
  if (driftScore > 0.7) risk = "HIGH";
  else if (driftScore > 0.4) risk = "MEDIUM";

  // fake time-series
  const trend = Array.from({ length: 10 }, () => ({
    value: Math.random()
  }));

  return {
    drift_score: driftScore,
    risk_level: risk,
    trend: trend
  };
}

// 🔥 DRIFT ENDPOINT
app.get("/drift", (req, res) => {
  setTimeout(() => {
    const data = generateDriftData();
    console.log("Drift Data:", data);
    res.json(data);
  }, 800);
});

app.listen(5000, () => console.log("🚀 Mock AI server running on port 5000"));