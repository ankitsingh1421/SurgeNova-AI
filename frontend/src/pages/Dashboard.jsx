import { useState } from "react";
import FlightSearchForm from "../components/FlightSearchForm";
import TrainSearchForm from "../components/TrainSearchForm";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab("flights")}>
          Flights
        </button>
        <button onClick={() => setActiveTab("trains")}>
          Trains
        </button>
      </div>

      {activeTab === "flights" ? (
        <FlightSearchForm />
      ) : (
        <TrainSearchForm />
      )}
    </div>
  );
}

export default Dashboard;
