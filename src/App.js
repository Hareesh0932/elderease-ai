import React, { useState, useEffect } from 'react';
import './App.css';
import ActivitySimulator from './components/ActivitySimulator';
import MonitoringDashboard from './components/MonitoringDashboard';
import AlertCenter from './components/AlertCenter';
import CaregiverActions from './components/CaregiverActions';
import { AI_MONITOR } from './utils/aiMonitor';
import { RESIDENTS, INITIAL_ALERTS } from './data/demoData';

function App() {
  const [selectedResident, setSelectedResident] = useState(RESIDENTS[0].name);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [metrics, setMetrics] = useState({
    motionLevel: 'Normal',
    audioDetection: 'Talking',
    lastMovement: new Date(),
    confidence: 85
  });
  const [dailyTrend, setDailyTrend] = useState([]);
  const [eventFrequency, setEventFrequency] = useState([]);

  // Initialize daily trend on mount
  useEffect(() => {
    setDailyTrend(AI_MONITOR.generateDailyTrend());
    updateEventFrequency();
  }, []);

  // Update event frequency when alerts change
  useEffect(() => {
    updateEventFrequency();
  }, [alerts]);

  const updateEventFrequency = () => {
    const frequency = AI_MONITOR.calculateEventFrequency(alerts);
    setEventFrequency(frequency);
  };

  const handleEventSimulate = (eventType) => {
    // Step 1: AI simulation runs and generates event object
    const analysis = AI_MONITOR.analyzeEvent(eventType, selectedResident);
    
    // Step 2: Update metrics immediately
    setMetrics(analysis.metrics);
    
    // Step 3: Add alert if generated (alert log updates automatically)
    if (analysis.alert) {
      setAlerts(prevAlerts => [analysis.alert, ...prevAlerts]);
    } else if (eventType === 'normal') {
      // Add normal activity log
      const normalAlert = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        resident: selectedResident,
        type: 'Normal Activity',
        severity: 'Info',
        confidence: analysis.metrics.confidence,
        timestamp: new Date(),
        description: 'Regular movement patterns detected'
      };
      setAlerts(prevAlerts => [normalAlert, ...prevAlerts]);
    }
    
    // Step 4: Dashboard visualizations refresh (daily trend updates)
    const newTrend = AI_MONITOR.generateDailyTrend();
    setDailyTrend(newTrend);
    // Event frequency will auto-update via useEffect when alerts change
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };

  const handleCallResident = (resident) => {
    alert(`📞 Calling ${resident}...\n\n(Simulated: This would initiate a voice call to the resident's phone)`);
  };

  const handleNotifyEmergency = (resident) => {
    alert(`🚨 Emergency Contact Notification\n\nResident: ${resident}\n\n(Simulated: This would send an alert to the emergency contact on file)`);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🏠</span>
            ElderEase AI – Smart Elder Monitoring Dashboard
          </h1>
        </div>
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="left-section">
            <ActivitySimulator
              residents={RESIDENTS}
              selectedResident={selectedResident}
              onResidentChange={setSelectedResident}
              onEventSimulate={handleEventSimulate}
            />
            
            <MonitoringDashboard
              metrics={metrics}
              dailyTrend={dailyTrend}
              eventFrequency={eventFrequency}
            />
            
            <AlertCenter
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
            />
          </div>

          <aside className="right-sidebar">
            <CaregiverActions
              alerts={alerts}
              onCallResident={handleCallResident}
              onNotifyEmergency={handleNotifyEmergency}
              onAcknowledgeAlert={handleAcknowledgeAlert}
            />
          </aside>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 ElderEase AI | AI for Safer Independent Living</p>
      </footer>
    </div>
  );
}

export default App;

