import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Brauzer icazələri (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Köhnə test endpointimiz (bunu saxlayaq)
@app.get("/menim-api-endpointim")
def test_metodu():
    return {
        "mesaj": "Salam! Bu mənim ilk şəxsi API-ımdır.",
        "status": "Uğurlu"
    }

# YENİ: Universitetləri gətirən endpoint
@app.get("/api/universities")
def get_universities():
    # Kompüterdəki universities.json faylını açırıq və oxuyuruq
    with open("universities.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    
    # Faylın içindəki "universities" siyahısını birbaşa API cavabı kimi qaytarırıq
    return data["universities"]