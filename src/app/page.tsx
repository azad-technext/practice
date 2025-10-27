'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface DataItem {
  id: number;
  name: string;
}

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/health`);
      const result = await response.json();
      setHealthStatus(`Status: ${result.status} | Time: ${result.timestamp}`);
      setMessage('');
    } catch {
      setMessage(
        'Error: Could not connect to backend. Make sure it\'s running!'
      );
      setHealthStatus('');
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/data`);
      const result = await response.json();
      setData(result.data);
      setMessage('Data fetched successfully!');
    } catch {
      setMessage('Error fetching data. Is the backend running?');
    }
    setLoading(false);
  };

  const createData = async () => {
    if (!newItemName.trim()) {
      setMessage('Please enter a name!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName }),
      });
      const result = await response.json();
      setMessage(`Created: ${result.data.name}`);
      setNewItemName('');
      // Optionally refresh the data
      fetchData();
    } catch {
      setMessage('Error creating data. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>🚀 Next.js Fullstack Demo</h1>
      <p className="subtitle">Full-stack Next.js app with API routes at {API_URL}</p>

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
                <strong>ID:</strong> {item.id} | <strong>Name:</strong>{' '}
                {item.name}
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
          <button onClick={createData} disabled={loading}>
            Create Item
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`message ${
            message.includes('Error') ? 'error' : 'success'
          }`}
        >
          {message}
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}
