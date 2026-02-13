from pydantic import BaseModel
from typing import Literal


class PricingRequest(BaseModel):
    # Transport type
    transport_type: Literal["flight", "train"]

    # Demand & user behavior
    active_users: float
    search_count_last_1hr: float
    booking_rate: float

    # Inventory metrics
    available_inventory: float
    total_inventory: float
    cancellation_rate: float

    # Time & calendar
    day_of_week: int
    is_weekend: int
    is_holiday: int
    time_to_event: float

    # Route & market data
    distance_km: float
    local_event_score: float
    avg_competitor_price: float
    user_loyalty_score: float


class PricingResponse(BaseModel):
    predicted_price: float
