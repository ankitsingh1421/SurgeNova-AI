function AirlineCard({ data }) {
  return (
    <div className="card">
      <h3>{data.airline}</h3>
      <p>Price: ₹ {data.price}</p>
      <p>Class: {data.class}</p>
    </div>
  );
}

export default AirlineCard;
