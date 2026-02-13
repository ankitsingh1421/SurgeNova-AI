function Results({ results }) {

  if (results.length === 0) {
    return <p>No flights found</p>;
  }

  return (
    <div>
      {results.map((flight) => (
        <div key={flight.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{flight.airline}</h3>
          <p>{flight.from} → {flight.to}</p>
          <p>Duration: {flight.duration}</p>
          <p>Stops: {flight.stops}</p>
          <h4>₹ {flight.price}</h4>
        </div>
      ))}
    </div>
  );
}

export default Results;
