from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import numpy as np
import random

from db import save_detection

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_NAMES = ["clean", "plastic", "other"]
IMG_SIZE = (128, 128)


@app.get("/")
def home():
    return {"message": "API running"}


@app.post("/predict")
async def predict(request: Request):
    body = await request.body()

    image = Image.open(io.BytesIO(body)).convert("RGB")
    image = image.resize(IMG_SIZE)

    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    # 🔥 FAKE MODEL (for demo)
    predicted_class = random.choice([0, 1, 2])
    confidence = round(random.uniform(0.79, 0.96), 2)

    scores = [0.1, 0.8, 0.1]

    result = {
        "class": CLASS_NAMES[predicted_class],
        "confidence": confidence,
        "all_scores": scores
    }

    # 🔥 SAVE TO MONGODB
    inserted_id = save_detection(result)

    return {
        "id": inserted_id,
        **result
    }