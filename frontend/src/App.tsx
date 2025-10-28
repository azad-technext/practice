import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://174.138.22.253:5004";

interface DataItem {
  id: number;
  name: string;
  status: string;
}

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [status, setStatus] = useState("");
  const [healthStatus, setHealthStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("WELCOME");

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/health`);
      const result = await response.json();
      setHealthStatus(`Status: ${result.status} | Time: ${result.timestamp}`);
      setMessage("");
    } catch {
      setMessage(
        "Error: Could not connect to backend. Make sure it's running!"
      );
      setHealthStatus("");
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/data`);
      const result = await response.json();
      setData(result.data);
      setMessage("Data fetched successfully!");
    } catch {
      setMessage("Error fetching data. Is the backend running?");
    }
    setLoading(false);
  };

  const createData = async () => {
    if (!newItemName.trim()) {
      setMessage("Please enter a name!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newItemName, status: status }),
      });
      const result = await response.json();
      setMessage(`Created: ${result.data.name}`);
      setNewItemName("");
      setStatus("");
      // Optionally refresh the data
      fetchData();
    } catch {
      setMessage("Error creating data. Is the backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>🚀 Backend Interaction Demo</h1>
      <p className="subtitle">Connect to Express API at {API_URL}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "2rem",
            gap: "2rem",
          }}
        >
          <Link
            to="/home"
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            Home
          </Link>
          <Link
            to="/page-two"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            Page Two
          </Link>
          <Link
            to="/page-three"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            Page Three
          </Link>
        </div>
      </div>
      {/* Health Check Section */}
      <div className="section">
        <h2>Health Check</h2>
        <button onClick={checkHealth} disabled={loading}>
          Check Backend Health
        </button>
        {healthStatus && (
          <div className="status-box success">{healthStatus}</div>
        )}
      </div>

      {/* Get Data Section */}
      <div className="section">
        <h2>Get Data</h2>
        <button onClick={fetchData} disabled={loading}>
          Fetch Data from Backend
        </button>
        {data?.length > 0 && (
          <div className="data-list">
            {data?.map((item) => (
              <div key={item.id} className="data-item">
                <strong>ID:</strong> {item.id} | <strong>Name:</strong>{" "}
                {item.name} | <strong>Status:</strong> {item.status}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Data Section */}
      <div className="section">
        <h2>Create Data</h2>
        <div className="input-group">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter item name"
            disabled={loading}
          />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter Status"
            disabled={loading}
          />
          <button onClick={createData} disabled={loading}>
            Create Item
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default App;
