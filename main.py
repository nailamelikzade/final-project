import json
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/universities")
def get_universities():
    try:
        with open("universities.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            return data  
    except Exception as e:
        return {"error": str(e), "universities": []}

if __name__ == "__main__":
    # Render-in verdiyi portu götürür, yoxdursa 10000 istifadə edir
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)