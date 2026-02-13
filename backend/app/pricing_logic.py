import numpy as np
from .model_loader import get_model

model = get_model()

def predict_price(data):
    features = np.array([[
        data.active_users,
        data.search_count_last_1hr,
        data.booking_rate,
        data.available_inventory,
        data.total_inventory,
        data.cancellation_rate,
        data.day_of_week,
        data.is_weekend,
        data.is_holiday,
        data.time_to_event,
        data.distance_km,
        data.local_event_score,
        data.avg_competitor_price,
        data.user_loyalty_score
    ]])

    predicted_price = model.predict(features)[0]

    # Slight adjustment for flight
    if data.transport_type == "flight":
        predicted_price *= 1.05
    elif data.transport_type == "train":
        predicted_price *= .6

    return round(float(predicted_price), 2)
