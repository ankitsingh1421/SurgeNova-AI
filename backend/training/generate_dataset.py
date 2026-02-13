import pandas as pd
import numpy as np
import os

np.random.seed(42)
rows = 10000  # Large dataset

# Base features
data = {
    "active_users": np.random.randint(50, 2000, rows),
    "search_count_last_1hr": np.random.randint(10, 1000, rows),
    "booking_rate": np.random.uniform(0.01, 0.7, rows),
    "available_inventory": np.random.randint(5, 500, rows),
    "total_inventory": np.random.randint(50, 500, rows),
    "cancellation_rate": np.random.uniform(0, 0.3, rows),
    "day_of_week": np.random.randint(0, 7, rows),
    "is_weekend": np.random.randint(0, 2, rows),
    "is_holiday": np.random.randint(0, 2, rows),
    "time_to_event": np.random.randint(1, 120, rows),
    "distance_km": np.random.randint(50, 2000, rows),  # smaller max for realistic scaling
    "local_event_score": np.random.uniform(0, 10, rows),
    "avg_competitor_price": np.random.randint(2000, 5000, rows),  # realistic base price
    "user_loyalty_score": np.random.uniform(0, 1, rows),
}

df = pd.DataFrame(data)

# -----------------------------
# Generate realistic dynamic price
# -----------------------------
# Start with base price (competitor price)
base_price = df["avg_competitor_price"]

# Apply balanced factors
demand_factor = 0.15 * (df["active_users"] / (df["available_inventory"] + 1))  # smaller effect
booking_factor = 0.1 * df["booking_rate"]  # small effect
urgency_factor = 0.1 * (1 / (df["time_to_event"] + 1))  # small effect
distance_factor = 0.0008 * df["distance_km"]  # distance effect proportional
event_factor = 0.05 * df["local_event_score"] / 10
loyalty_factor = -0.03 * df["user_loyalty_score"]  # loyal users slight discount
cancellation_factor = 0.05 * df["cancellation_rate"]
weekend_factor = 0.05 * df["is_weekend"]
holiday_factor = 0.08 * df["is_holiday"]

# Final dynamic price
df["dynamic_price"] = base_price * (
    1
    + demand_factor
    + booking_factor
    + urgency_factor
    + distance_factor
    + event_factor
    + loyalty_factor
    + cancellation_factor
    + weekend_factor
    + holiday_factor
)

# Clip to avoid extreme outliers
df["dynamic_price"] = df["dynamic_price"].clip(1000, 8000)

# Save dataset
os.makedirs("data", exist_ok=True)
df.to_csv("data/dynamic_pricing_data.csv", index=False)
print("✅ Realistic and balanced dataset generated.")
