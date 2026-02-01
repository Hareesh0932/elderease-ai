import React, { useState } from 'react';
import './CaregiverActions.css';

const CaregiverActions = ({ alerts, onCallResident, onNotifyEmergency, onAcknowledgeAlert }) => {
  const [lastResponseTime, setLastResponseTime] = useState(null);

  const handleAcknowledge = () => {
    if (alerts.length > 0) {
      // Acknowledge the most recent (first) alert
      onAcknowledgeAlert(alerts[0].id);
      setLastResponseTime(new Date());
    }
  };

  const handleCallResident = () => {
    if (alerts.length > 0) {
      const resident = alerts[0].resident;
      onCallResident(resident);
      setLastResponseTime(new Date());
    }
  };

  const handleNotifyEmergency = () => {
    if (alerts.length > 0) {
      const resident = alerts[0].resident;
      onNotifyEmergency(resident);
      setLastResponseTime(new Date());
    }
  };

  return (
    <div className="caregiver-actions">
      <h2 className="section-title">Caregiver Actions</h2>
      
      <div className="actions-container">
        <button
          className="action-btn acknowledge"
          onClick={handleAcknowledge}
          disabled={alerts.length === 0}
        >
          <span className="btn-icon">✓</span>
          <span className="btn-text">Acknowledge Alert</span>
        </button>

        <button
          className="action-btn call"
          onClick={handleCallResident}
          disabled={alerts.length === 0}
        >
          <span className="btn-icon">📞</span>
          <span className="btn-text">Call Resident</span>
        </button>

        <button
          className="action-btn emergency"
          onClick={handleNotifyEmergency}
          disabled={alerts.length === 0}
        >
          <span className="btn-icon">🚨</span>
          <span className="btn-text">Notify Emergency Contact</span>
        </button>
      </div>

      {lastResponseTime && (
        <div className="response-time">
          <h3 className="response-title">Last Caregiver Response</h3>
          <div className="response-timestamp">
            {lastResponseTime.toLocaleString()}
          </div>
          <div className="response-ago">
            {Math.floor((new Date() - lastResponseTime) / 1000)} seconds ago
          </div>
        </div>
      )}

      <div className="stats-section">
        <h3 className="stats-title">Active Alerts</h3>
        <div className="stats-value">{alerts.length}</div>
        <div className="stats-label">
          {alerts.length === 0 
            ? 'No active alerts' 
            : alerts.length === 1 
            ? 'alert requires attention' 
            : 'alerts require attention'}
        </div>
      </div>
    </div>
  );
};

export default CaregiverActions;

