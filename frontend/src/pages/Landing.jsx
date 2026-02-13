import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>SmartPrice AI</h1>
      <p>AI Powered Dynamic Pricing Engine</p>
      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default Landing;
