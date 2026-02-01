import React from 'react';
import './AlertCenter.css';

const AlertCenter = ({ alerts, onAcknowledge }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#E53935';
      case 'Warning': return '#FF9800';
      case 'Info': return '#4CAF50';
      default: return '#718096';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleString();
  };

  return (
    <div className="alert-center">
      <h2 className="section-title">Alert Center</h2>
      
      {alerts.length === 0 ? (
        <div className="no-alerts">
          <p>No active alerts. All systems normal.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className="alert-item">
              <div className="alert-header">
                <div className="alert-type-section">
                  <span 
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  >
                    {alert.severity}
                  </span>
                  <span className="alert-type">{alert.type}</span>
                </div>
                <button
                  className="acknowledge-btn"
                  onClick={() => onAcknowledge(alert.id)}
                  title="Acknowledge Alert"
                >
                  ✓
                </button>
              </div>
              
              <div className="alert-body">
                <div className="alert-resident">
                  <strong>Resident:</strong> {alert.resident}
                </div>
                <div className="alert-description">
                  {alert.description}
                </div>
                <div className="alert-meta">
                  <span className="alert-confidence">
                    AI Confidence: {alert.confidence}%
                  </span>
                  <span className="alert-time">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertCenter;

