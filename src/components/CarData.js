import React from 'react';
import './CarData.css';

const CarData = ({ activeTab }) => {
  // Sample car data
  const carData = {
    speed: {
      current: 75,
      max: 120,
      average: 45,
      unit: 'km/h',
      status: 'Normal',
      history: [65, 70, 68, 75, 72, 78, 75],
    },
    acceleration: {
      current: 2.3,
      max: 8.5,
      average: 1.8,
      unit: 'm/s²',
      status: 'Moderate',
      history: [1.5, 2.1, 1.8, 2.3, 2.0, 2.5, 2.3],
    },
    fuel: {
      current: 65,
      max: 100,
      unit: '%',
      status: 'Good',
      range: 420,
      rangeUnit: 'km',
      history: [70, 68, 66, 65, 67, 65, 65],
    },
    engine: {
      rpm: 2500,
      temperature: 85,
      oilPressure: 45,
      status: 'Running',
      health: 'Good',
      lastService: '2024-01-15',
    },
    temperature: {
      engine: 85,
      coolant: 90,
      ambient: 22,
      unit: '°C',
      status: 'Normal',
      history: [82, 84, 85, 87, 85, 86, 85],
    },
  };

  const renderSpeedData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Current Speed</h3>
        <div className="metric-value">
          {carData.speed.current}{' '}
          <span className="unit">{carData.speed.unit}</span>
        </div>
        <div className="metric-status">{carData.speed.status}</div>
      </div>

      <div className="metric-card">
        <h3>Max Speed</h3>
        <div className="metric-value">
          {carData.speed.max} <span className="unit">{carData.speed.unit}</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Average Speed</h3>
        <div className="metric-value">
          {carData.speed.average}{' '}
          <span className="unit">{carData.speed.unit}</span>
        </div>
      </div>

      <div className="metric-card chart">
        <h3>Speed History</h3>
        <div className="mini-chart">
          {carData.speed.history.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${(value / 100) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccelerationData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Current Acceleration</h3>
        <div className="metric-value">
          {carData.acceleration.current}{' '}
          <span className="unit">{carData.acceleration.unit}</span>
        </div>
        <div className="metric-status">{carData.acceleration.status}</div>
      </div>

      <div className="metric-card">
        <h3>Max Acceleration</h3>
        <div className="metric-value">
          {carData.acceleration.max}{' '}
          <span className="unit">{carData.acceleration.unit}</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Average Acceleration</h3>
        <div className="metric-value">
          {carData.acceleration.average}{' '}
          <span className="unit">{carData.acceleration.unit}</span>
        </div>
      </div>

      <div className="metric-card chart">
        <h3>Acceleration History</h3>
        <div className="mini-chart">
          {carData.acceleration.history.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${(value / 10) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderFuelData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Fuel Level</h3>
        <div className="metric-value">
          {carData.fuel.current}{' '}
          <span className="unit">{carData.fuel.unit}</span>
        </div>
        <div className="metric-status">{carData.fuel.status}</div>
        <div className="fuel-bar">
          <div
            className="fuel-fill"
            style={{ width: `${carData.fuel.current}%` }}
          />
        </div>
      </div>

      <div className="metric-card">
        <h3>Range</h3>
        <div className="metric-value">
          {carData.fuel.range}{' '}
          <span className="unit">{carData.fuel.rangeUnit}</span>
        </div>
      </div>

      <div className="metric-card chart">
        <h3>Fuel History</h3>
        <div className="mini-chart">
          {carData.fuel.history.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderEngineData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Engine Status</h3>
        <div className="metric-value">{carData.engine.status}</div>
        <div className="metric-status">{carData.engine.health}</div>
      </div>

      <div className="metric-card">
        <h3>RPM</h3>
        <div className="metric-value">
          {carData.engine.rpm.toLocaleString()}{' '}
          <span className="unit">rpm</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Temperature</h3>
        <div className="metric-value">
          {carData.engine.temperature} <span className="unit">°C</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Oil Pressure</h3>
        <div className="metric-value">
          {carData.engine.oilPressure} <span className="unit">psi</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Last Service</h3>
        <div className="metric-value">{carData.engine.lastService}</div>
      </div>
    </div>
  );

  const renderTemperatureData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Engine Temperature</h3>
        <div className="metric-value">
          {carData.temperature.engine}{' '}
          <span className="unit">{carData.temperature.unit}</span>
        </div>
        <div className="metric-status">{carData.temperature.status}</div>
      </div>

      <div className="metric-card">
        <h3>Coolant Temperature</h3>
        <div className="metric-value">
          {carData.temperature.coolant}{' '}
          <span className="unit">{carData.temperature.unit}</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Ambient Temperature</h3>
        <div className="metric-value">
          {carData.temperature.ambient}{' '}
          <span className="unit">{carData.temperature.unit}</span>
        </div>
      </div>

      <div className="metric-card chart">
        <h3>Temperature History</h3>
        <div className="mini-chart">
          {carData.temperature.history.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${(value / 100) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'speed':
        return renderSpeedData();
      case 'acceleration':
        return renderAccelerationData();
      case 'fuel':
        return renderFuelData();
      case 'engine':
        return renderEngineData();
      case 'temperature':
        return renderTemperatureData();
      default:
        return renderSpeedData();
    }
  };

  return <div className="car-data">{renderContent()}</div>;
};

export default CarData;
