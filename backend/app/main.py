from fastapi import FastAPI
from .schemas import PricingRequest, PricingResponse
from .pricing_logic import predict_price
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Dynamic Pricing Engine",
    description="AI-powered pricing engine for flights and trains",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "status": "Pricing API Running 🚀",
        "docs": "/docs"
    }


@app.get("/predict")
def predict_info():
    return {
        "message": "Use POST /predict with JSON body to get prediction"
    }


@app.post("/predict", response_model=PricingResponse)
def predict_price_endpoint(data: PricingRequest):
    price = predict_price(data)

    return PricingResponse(
        predicted_price=price
    )
