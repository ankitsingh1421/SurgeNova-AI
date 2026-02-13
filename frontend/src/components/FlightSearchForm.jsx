import { useState } from "react";
import demoData from "../data/demo.json";
import Results from "./Results";

function FlightSearchForm() {

  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    travelClass: "Economy"
  });

  const [results, setResults] = useState([]);

  const handleSearch = () => {

    // Filter local demo data
    const filtered = demoData.filter((flight) =>
      flight.from.toLowerCase() === form.from.toLowerCase() &&
      flight.to.toLowerCase() === form.to.toLowerCase() &&
      flight.travelClass === form.travelClass
    );

    setResults(filtered);
  };

  return (
    <div>
      <input
        placeholder="From"
        onChange={(e) => setForm({ ...form, from: e.target.value })}
      />

      <input
        placeholder="To"
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setForm({ ...form, departure: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, travelClass: e.target.value })}
      >
        <option>Economy</option>
        <option>Business</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      <Results results={results} />
    </div>
  );
}

export default FlightSearchForm;
