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
    { id: 'battery_consumption', label: 'Battery Consumption', icon: '🪫' },
    { id: 'temperature', label: 'Temperature', icon: '🌡️' },
    { id: 'debug', label: 'Debug', icon: '🐞' },
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
        <DatabaseViewer activeMetric={activeTab} />
      </main>
    </div>
  );
};

export default App;

function DatabaseViewer({ activeMetric }) {
  const [records, setRecords] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    async function fetchRecords() {
      try {
        const res = await fetch('http://localhost:8000/data/all');
        const data = await res.json();
        if (mounted) setRecords(data);
      } catch (err) {
        console.error('failed to fetch records', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    fetchRecords();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) return <div>Loading database rows…</div>;

  const hasRecords = !!(records && records.length);

  // Build a history array for the selected metric (most recent first)
  const history = records.map((r) => ({
    speed: r.speed,
    slope: r.slope,
    charge_level: r.recharge_rate
      ? r.recharge_rate > 0
        ? Math.round((r.recharge_rate / r.recharge_rate) * 100)
        : 0
      : 0,
    recharge_rate: r.recharge_rate,
    battery_consumption: r.battery_consumption,
    temperature: r.temperature,
  }));

  // helper to compute metric stats
  const computeMetricStats = (key) => {
    const values = records
      .map((r) => r[key])
      .filter((v) => typeof v === 'number');
    if (values.length === 0) return null;
    const current = values[0];
    const max = Math.max(...values);
    const avg =
      Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
    const unitMap = {
      speed: 'mph',
      slope: 'm/m',
      charge_level: '%',
      recharge_rate: 'W',
      battery_consumption: 'kW',
      temperature: '°C',
    };
    return {
      current,
      max,
      average: avg,
      unit: unitMap[key] || '',
      history: values,
    };
  };

  const metricKey = activeMetric;
  const metricStats = computeMetricStats(metricKey) || {
    current: '—',
    max: '—',
    average: '—',
    unit: '',
  };

  async function clearDatabase() {
    try {
      await fetch('http://localhost:8000/data/all', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      // refresh records
      setIsLoading(true);
      const res = await fetch('http://localhost:8000/data/all');
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error('failed to add sample row', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addSampleRow() {
    // If we have an existing latest record, randomize slightly from it.
    const latest = records && records.length ? records[0] : null;

    const rand = (base, pct = 0.05, minDelta = 0.1) => {
      // vary by +/- pct of base or at least minDelta
      const scale = Math.max(Math.abs(base) * pct, minDelta);
      return Math.round((base + (Math.random() * 2 - 1) * scale) * 10) / 10;
    };

    const sample = latest
      ? {
          timestamp: new Date().toISOString(),
          speed: Math.max(0, rand(latest.speed || 50, 0.08, 0.5)),
          slope:
            Math.round(
              (rand(latest.slope || 0, 0.2, 0.1) + Number.EPSILON) * 10
            ) / 10,
          recharge_rate:
            Math.round(
              (rand(latest.recharge_rate || 0, 0.2, 1) + Number.EPSILON) * 10
            ) / 10,
          battery_consumption:
            Math.round(
              (rand(latest.battery_consumption || 10, 0.15, 0.1) +
                Number.EPSILON) *
                10
            ) / 10,
          temperature:
            Math.round(
              (rand(latest.temperature || 20, 0.03, 0.1) + Number.EPSILON) * 10
            ) / 10,
        }
      : {
          timestamp: new Date().toISOString(),
          speed: 75.0,
          slope: 2.0,
          recharge_rate: 100.0,
          battery_consumption: 12.5,
          temperature: 22.0,
        };
    try {
      await fetch('http://localhost:8000/data/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample),
      });
      // refresh records
      setIsLoading(true);
      const res = await fetch('http://localhost:8000/data/all');
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error('failed to add sample row', err);
    } finally {
      setIsLoading(false);
    }
  }

  if (activeMetric === 'debug') {
    return (
      <div className="db-debug">
        <div style={{ marginBottom: 12 }}>
          <button onClick={addSampleRow}>Add sample row</button>
        </div>
        <div style={{ marginBottom: 14 }}>
          <button onClick={clearDatabase}>Clear Database</button>
        </div>
        <h2>Debug — raw rows (most recent first)</h2>
        <pre
          style={{
            maxHeight: 300,
            overflow: 'auto',
            background: '#f5f5f5',
            padding: 12,
          }}
        >
          {JSON.stringify(records, null, 2)}
        </pre>
        <h3>Table view</h3>
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
            {records.map((r) => (
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
  if (!hasRecords) {
    // No data yet: show button to add a sample and a hint
    return (
      <div className="no-rows">
        <div>
          No rows in the database yet. Click "Add sample row" to insert test
          data.
        </div>
      </div>
    );
  }

  // helpers using records
  const getValuesFor = (key) =>
    records.map((r) => r[key]).filter((v) => typeof v === 'number');
  const getCurrentFor = (key) =>
    records[0] && typeof records[0][key] === 'number' ? records[0][key] : '—';
  const getMetricStats = (key, unit) => {
    const vals = getValuesFor(key);
    if (!vals.length)
      return {
        current: '—',
        max: '—',
        average: '—',
        unit: unit || '',
        history: [],
      };
    const current = vals[0];
    const max = Math.max(...vals);
    const avg =
      Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
    return { current, max, average: avg, unit: unit || '', history: vals };
  };

  const renderMetricCards = (s) => (
    <div className="car-data">
      <div className="data-grid">
        <div className="metric-card primary">
          <h3>Current</h3>
          <div className="metric-value">
            {s.current} <span className="unit">{s.unit}</span>
          </div>
        </div>

        <div className="metric-card">
          <h3>Max</h3>
          <div className="metric-value">
            {s.max} <span className="unit">{s.unit}</span>
          </div>
        </div>

        <div className="metric-card">
          <h3>Average</h3>
          <div className="metric-value">
            {s.average} <span className="unit">{s.unit}</span>
          </div>
        </div>

        <div className="metric-card chart">
          <h3>History</h3>
          <div className="mini-chart">
            {s.history &&
              s.history.map((v, i) => (
                <div
                  key={i}
                  className="chart-bar"
                  style={{ height: `${Math.min(100, Math.abs(v))}%` }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  // per-tab renderers
  const renderSpeedTab = () =>
    renderMetricCards(getMetricStats('speed', 'mph'));
  const renderSlopeTab = () =>
    renderMetricCards(getMetricStats('slope', 'm/m'));
  const renderRechargeRateTab = () =>
    renderMetricCards(getMetricStats('recharge_rate', 'W'));
  const renderBatteryConsumptionTab = () =>
    renderMetricCards(getMetricStats('battery_consumption', 'kW'));
  const renderTemperatureTab = () =>
    renderMetricCards(getMetricStats('temperature', '°C'));

  const renderChargeLevelTab = () => {
    // charge_level not in DB; show related metrics (recharge_rate and battery_consumption)
    const s1 = getMetricStats('recharge_rate', 'W');
    const s2 = getMetricStats('battery_consumption', 'kW');
    return (
      <div className="car-data">
        <div className="data-grid">
          <div className="metric-card primary">
            <h3>Charge-related (recharge rate)</h3>
            <div className="metric-value">
              {s1.current} <span className="unit">{s1.unit}</span>
            </div>
          </div>

          <div className="metric-card">
            <h3>Battery Consumption</h3>
            <div className="metric-value">
              {s2.current} <span className="unit">{s2.unit}</span>
            </div>
          </div>

          <div className="metric-card chart">
            <h3>Recharge History</h3>
            <div className="mini-chart">
              {s1.history &&
                s1.history.map((v, i) => (
                  <div
                    key={i}
                    className="chart-bar"
                    style={{ height: `${Math.min(100, Math.abs(v))}%` }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // choose renderer
  switch (activeMetric) {
    case 'speed':
      return renderSpeedTab();
    case 'slope':
      return renderSlopeTab();
    case 'charge_level':
      return renderChargeLevelTab();
    case 'recharge_rate':
      return renderRechargeRateTab();
    case 'battery_consumption':
      return renderBatteryConsumptionTab();
    case 'temperature':
      return renderTemperatureTab();
    default:
      return renderSpeedTab();
  }
}
