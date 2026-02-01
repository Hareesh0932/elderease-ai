import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './MonitoringDashboard.css';

const MonitoringDashboard = ({ metrics, dailyTrend, eventFrequency }) => {
  const getMotionLevelColor = (level) => {
    switch (level) {
      case 'High': return '#E53935';
      case 'Normal': return '#4CAF50';
      case 'Low': return '#FF9800';
      default: return '#718096';
    }
  };

  const getAudioColor = (audio) => {
    switch (audio) {
      case 'Talking': return '#4CAF50';
      case 'Silent': return '#FF9800';
      case 'Unusual Sound': return '#E53935';
      default: return '#718096';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'Fall Detected': return '#E53935'; // Red for critical
      case 'No Movement Detected': return '#FF9800'; // Orange for warnings
      case 'Missed Medication': return '#FF9800'; // Orange for warnings
      case 'Normal Activity': return '#4CAF50'; // Green for normal
      default: return '#0891b2'; // Sky blue default
    }
  };

  return (
    <div className="monitoring-dashboard">
      <h2 className="section-title">AI Monitoring Dashboard</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Motion Activity Level</span>
            <span 
              className="metric-badge"
              style={{ backgroundColor: getMotionLevelColor(metrics.motionLevel) }}
            >
              {metrics.motionLevel}
            </span>
          </div>
          <div className="metric-value">
            {metrics.motionLevel === 'High' ? '🔴' : metrics.motionLevel === 'Normal' ? '🟢' : '🟠'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Audio Detection</span>
            <span 
              className="metric-badge"
              style={{ backgroundColor: getAudioColor(metrics.audioDetection) }}
            >
              {metrics.audioDetection}
            </span>
          </div>
          <div className="metric-value">
            {metrics.audioDetection === 'Talking' ? '🗣️' : metrics.audioDetection === 'Silent' ? '🔇' : '⚠️'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Last Movement</span>
          </div>
          <div className="metric-value timestamp">
            {metrics.lastMovement ? new Date(metrics.lastMovement).toLocaleTimeString() : 'N/A'}
          </div>
          <div className="metric-subtext">
            {metrics.lastMovement ? new Date(metrics.lastMovement).toLocaleDateString() : ''}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">AI Confidence Score</span>
          </div>
          <div className="metric-value confidence">
            {metrics.confidence}%
          </div>
          <div className="confidence-bar">
            <div 
              className="confidence-fill"
              style={{ width: `${metrics.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Daily Activity Trend (24 Hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#718096"
                tick={{ fill: '#718096', fontSize: 12 }}
              />
              <YAxis 
                stroke="#718096"
                tick={{ fill: '#718096', fontSize: 12 }}
                label={{ value: 'Activity Level', angle: -90, position: 'insideLeft', fill: '#718096' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="activity" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Activity Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Event Frequency by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="type" 
                stroke="#718096"
                tick={{ fill: '#718096', fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#718096"
                tick={{ fill: '#718096', fontSize: 12 }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#718096' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                radius={[8, 8, 0, 0]}
                name="Event Count"
              >
                {eventFrequency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getEventColor(entry.type)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;

