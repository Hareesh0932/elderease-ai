import React from 'react';
import './ActivitySimulator.css';

const ActivitySimulator = ({ residents, selectedResident, onResidentChange, onEventSimulate }) => {
  return (
    <div className="activity-simulator">
      <h2 className="section-title">Activity Input & Simulation</h2>
      
      <div className="simulator-controls">
        <div className="resident-selector">
          <label htmlFor="resident-select">Select Resident:</label>
          <select
            id="resident-select"
            value={selectedResident}
            onChange={(e) => onResidentChange(e.target.value)}
            className="resident-dropdown"
          >
            {residents.map(resident => (
              <option key={resident.id} value={resident.name}>
                {resident.name} ({resident.room})
              </option>
            ))}
          </select>
        </div>

        <div className="event-buttons">
          <button
            className="event-btn normal"
            onClick={() => onEventSimulate('normal')}
          >
            Normal Activity
          </button>
          <button
            className="event-btn fall"
            onClick={() => onEventSimulate('fall')}
          >
            Fall Detected
          </button>
          <button
            className="event-btn no-movement"
            onClick={() => onEventSimulate('no_movement')}
          >
            No Movement for 2 Hours
          </button>
          <button
            className="event-btn medication"
            onClick={() => onEventSimulate('missed_medication')}
          >
            Missed Medication
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitySimulator;




