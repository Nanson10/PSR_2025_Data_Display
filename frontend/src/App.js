import React, { useState } from 'react';
import CarData from './components/CarData';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('speed');

  const tabs = [
    { id: 'speed', label: 'Car Speed', icon: '🚗' },
    { id: 'acceleration', label: 'Car Acceleration', icon: '⚡' },
    { id: 'fuel', label: 'Fuel Level', icon: '⛽' },
    { id: 'engine', label: 'Engine Status', icon: '🔧' },
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
        <CarData activeTab={activeTab} />
      </main>
    </div>
  );
};

export default App;
