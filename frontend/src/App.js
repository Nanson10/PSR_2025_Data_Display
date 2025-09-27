import React, { useState } from 'react';
// import CarData from './components/CarData';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('speed');

  const tabs = [
    { id: 'speed', label: 'Car Speed', icon: '🚗' },
    { id: 'slope', label: 'Slope', icon: '⛰️' },
    { id: 'charge_level', label: 'Charge Level', icon: '🔋' },
    { id: 'recharge_rate', label: 'Recharge Rate', icon: '⚡️' },
    { id: 'battery_consumption', label: 'Battery Consuption', icon: '🪫' },
    { id: 'temperature', label: 'Temperature', icon: '🌡️' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚗 Car Data Dashboard</h1>
        <p>Real-time vehicle monitoring and analytics</p>
      </header>

      <nav className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {/* Showing DB contents instead of CarData for now */}
        <DatabaseViewer />
      </main>
    </div>
  );
};

export default App;

function DatabaseViewer() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    async function fetchRows() {
      try {
        const res = await fetch('http://localhost:8000/data/all');
        const data = await res.json();
        if (mounted) setRows(data);
      } catch (err) {
        console.error('failed to fetch rows', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchRows();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading database rows…</div>;
  if (!rows || rows.length === 0) return <div>No rows in database.</div>;

  return (
    <div className="db-viewer">
      <h2>vehicle_data rows</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>timestamp</th>
            <th>speed</th>
            <th>slope</th>
            <th>recharge_rate</th>
            <th>battery_consumption</th>
            <th>temperature</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.timestamp}</td>
              <td>{r.speed}</td>
              <td>{r.slope}</td>
              <td>{r.recharge_rate}</td>
              <td>{r.battery_consumption}</td>
              <td>{r.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
