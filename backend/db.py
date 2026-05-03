from pymongo import MongoClient
from datetime import datetime

# 🔥 CHANGE THIS IF USING ATLAS
MONGO_URI = "mongodb://localhost:27017"

client = MongoClient(MONGO_URI)

db = client["marine_plastic_db"]
collection = db["detections"]


def save_detection(data):
    document = {
        "class": data.get("class"),
        "confidence": float(data.get("confidence")),
        "all_scores": data.get("all_scores"),
        "timestamp": datetime.utcnow()
    }

    result = collection.insert_one(document)
    return str(result.inserted_id)