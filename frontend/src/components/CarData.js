import React from 'react';
import './CarData.css';

const CarData = ({ activeTab }) => {
  // Sample car data
  const carData = {
    speed: {
      current: 75,
      max: 120,
      average: 45,
      unit: 'mph',
      status: 'Normal',
      history: [65, 70, 68, 75, 72, 78, 75],
    },
    slope: {
      current: 2,
      max: 8.5,
      average: 1.8,
      unit: 'm/m',
      status: 'Moderate',
      history: [1.5, 2.1, 1.8, 2.3, 2.0, 2.5, 2.3],
    },
    charge_level: {
      current: 75,
      max: 100,
      unit: '%',
      status: 'Good',
      range: 400,
      rangeUnit: 'km',
      estimated_range: Math.round((400 * 75) / 100),
      history: [70, 68, 66, 65, 67, 65, 65],
    },
    recharge_rate: {
      current: 100,
      max: 150,
      unit: 'W',
      status: 'Excellent',
    },
    temperature: {
      engine: 85,
      coolant: 90,
      ambient: 22,
      unit: '°C',
      status: 'Normal',
      history: [82, 84, 85, 87, 85, 86, 85],
    },
    // remove redundant sections and keep only those matching tabs in App.js
    battery_consumption: {
      current: 12.5,
      max: 25,
      unit: 'kW',
      status: 'Normal',
      history: [11.8, 12.0, 12.3, 12.1, 12.5, 12.7, 12.5],
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
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSlopeData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Current Slope</h3>
        <div className="metric-value">
          {carData.slope.current}{' '}
          <span className="unit">{carData.slope.unit}</span>
        </div>
        <div className="metric-status">{carData.slope.status}</div>
      </div>

      <div className="metric-card">
        <h3>Max Slope</h3>
        <div className="metric-value">
          {carData.slope.max} <span className="unit">{carData.slope.unit}</span>
        </div>
      </div>

      <div className="metric-card">
        <h3>Average Slope</h3>
        <div className="metric-value">
          {carData.slope.average}{' '}
          <span className="unit">{carData.slope.unit}</span>
        </div>
      </div>

      <div className="metric-card chart">
        <h3>Slope History</h3>
        <div className="mini-chart">
          {carData.slope.history.map((value, index) => {
            // normalize to max for a percent height
            const pct = carData.slope.max
              ? Math.min(100, (value / carData.slope.max) * 100)
              : Math.min(100, value * 10);
            return (
              <div
                key={index}
                className="chart-bar"
                style={{ height: `${pct}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAccelerationData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Current Acceleration</h3>
        <div className="metric-value">
          {carData.acceleration?.current ?? '—'}
        </div>
        <div className="metric-status">
          {carData.acceleration?.status ?? ''}
        </div>
      </div>
    </div>
  );

  const renderFuelData = () => (
    <div className="data-grid">
      <div className="metric-card">
        <h3>Fuel</h3>
        <div className="metric-value">{carData.fuel?.current ?? '—'}</div>
      </div>
    </div>
  );

  const renderEngineData = () => (
    <div className="data-grid">
      <div className="metric-card">
        <h3>Engine</h3>
        <div className="metric-value">{carData.engine?.status ?? '—'}</div>
      </div>
    </div>
  );

  const renderChargeLevelData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Charge Level</h3>
        <div className="metric-value">
          {carData.charge_level.current}{' '}
          <span className="unit">{carData.charge_level.unit}</span>
        </div>
        <div className="metric-status">{carData.charge_level.status}</div>
        <div className="fuel-bar">
          <div
            className="fuel-fill"
            style={{ width: `${carData.charge_level.current}%` }}
          />
        </div>
      </div>

      <div className="metric-card">
        <h3>Estimated Range</h3>
        <div className="metric-value">
          {carData.charge_level.estimated_range}{' '}
          <span className="unit">{carData.charge_level.rangeUnit}</span>
        </div>
      </div>

      <div className="metric-card chart">
        <h3>Charge History</h3>
        <div className="mini-chart">
          {carData.charge_level.history.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${Math.min(100, value)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderRechargeRateData = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Recharge Rate</h3>
        <div className="metric-value">
          {carData.recharge_rate.current}{' '}
          <span className="unit">{carData.recharge_rate.unit}</span>
        </div>
        <div className="metric-status">{carData.recharge_rate.status}</div>
      </div>
      <div className="metric-card">
        <h3>Max Recharge Rate</h3>
        <div className="metric-value">
          {carData.recharge_rate.max}{' '}
          <span className="unit">{carData.recharge_rate.unit}</span>
        </div>
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
              style={{ height: `${Math.min(100, value)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderBatteryConsumption = () => (
    <div className="data-grid">
      <div className="metric-card primary">
        <h3>Battery Consumption</h3>
        <div className="metric-value">
          {carData.battery_consumption.current}{' '}
          <span className="unit">{carData.battery_consumption.unit}</span>
        </div>
        <div className="metric-status">
          {carData.battery_consumption.status}
        </div>
      </div>
      <div className="metric-card chart">
        <h3>Consumption History</h3>
        <div className="mini-chart">
          {carData.battery_consumption.history.map((value, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${Math.min(100, value)}%` }}
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
      case 'slope':
        return renderSlopeData();
      case 'charge_level':
        return renderChargeLevelData();
      case 'recharge_rate':
        return renderRechargeRateData();
      case 'battery_consumption':
        return renderBatteryConsumption();
      case 'temperature':
        return renderTemperatureData();
      default:
        return renderSpeedData();
    }
  };

  return <div className="car-data">{renderContent()}</div>;
};

export default CarData;
