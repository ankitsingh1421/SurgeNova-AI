const API_BASE_URL = "http://127.0.0.1:8000";

export const getPrediction = async (formData) => {
  const fallbackBase = Number(formData?.avg_competitor_price) || 4200;
  const available = Number(formData?.available_inventory) || 50;
  const total = Number(formData?.total_inventory) || 100;
  const bookingRate = Number(formData?.booking_rate) || 0.2;
  const activeUsers = Number(formData?.active_users) || 100;

  // Fallback keeps UI useful even if API is down or returns malformed data.
  const fallbackPrice = Math.max(
    1,
    Math.round(
      fallbackBase *
      (1 + bookingRate * 0.2) *
      (1 + Math.max(0, 1 - available / Math.max(total, 1)) * 0.15) *
      (1 + Math.min(activeUsers, 1000) / 10000)
    )
  );

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch prediction");
    }

    const data = await response.json();
    const parsedPrice = Number(
      data?.predicted_price ??
      data?.predictedPrice ??
      data?.price ??
      data?.best_predicted_value
    );

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      throw new Error("Prediction payload did not contain a valid price");
    }

    return Math.round(parsedPrice);

  } catch (error) {
    console.error("API Error:", error);
    return fallbackPrice;
  }
};
