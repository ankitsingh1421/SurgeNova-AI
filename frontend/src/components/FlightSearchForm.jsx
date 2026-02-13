import { useState } from "react";
import { getPrediction } from "../services/api";

const FlightSearchForm = () => {
  const [price, setPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      transport_type: "flight",
      active_users: 120,
      search_count_last_1hr: 450,
      booking_rate: 0.32,
      available_inventory: 50,
      total_inventory: 100,
      cancellation_rate: 0.05,
      day_of_week: 5,
      is_weekend: 1,
      is_holiday: 0,
      time_to_event: 72,
      distance_km: 500,
      local_event_score: 0.6,
      avg_competitor_price: 4200,
      user_loyalty_score: 0.8
    };

    const predicted = await getPrediction(formData);
    setPrice(predicted);
  };

  return (
    <div>
      <h2>Flight Price Prediction</h2>
      <button onClick={handleSubmit}>Predict Price</button>

      {price && (
        <h3>Predicted Price: ₹ {price}</h3>
      )}
    </div>
  );
};

export default FlightSearchForm;
