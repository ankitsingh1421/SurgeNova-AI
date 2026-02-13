const API_BASE_URL = "http://127.0.0.1:8000";

export const getPrediction = async (formData) => {
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
    return data.predicted_price;

  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
