/**
 * Simulated AI Monitoring Logic
 * Analyzes activity patterns and generates alerts
 */

export const AI_MONITOR = {
  /**
   * Analyze activity event and generate AI insights
   * Simulates AI reasoning with confidence scores and pattern analysis
   */
  analyzeEvent: (eventType, resident) => {
    const timestamp = new Date();
    let alert = null;
    let metrics = {
      motionLevel: 'Normal',
      audioDetection: 'Talking',
      lastMovement: timestamp,
      confidence: 85
    };

    switch (eventType) {
      case 'normal':
        // Normal activity with high confidence
        metrics.motionLevel = 'Normal';
        metrics.audioDetection = 'Talking';
        metrics.confidence = 88 + Math.floor(Math.random() * 7); // 88-95%
        break;

      case 'fall':
        // Fall detection with high confidence
        const fallConfidence = 92 + Math.floor(Math.random() * 6); // 92-98%
        alert = {
          id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          resident: resident,
          type: 'Fall Detected',
          severity: 'Critical',
          confidence: fallConfidence,
          timestamp: timestamp,
          description: 'Sudden motion pattern detected consistent with a fall. Accelerometer spike: 8.2g. Immediate attention required.'
        };
        metrics.motionLevel = 'High';
        metrics.audioDetection = 'Unusual Sound';
        metrics.confidence = fallConfidence;
        break;

      case 'no_movement':
        // No movement detection
        const inactivityConfidence = 85 + Math.floor(Math.random() * 8); // 85-93%
        alert = {
          id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          resident: resident,
          type: 'No Movement Detected',
          severity: 'Warning',
          confidence: inactivityConfidence,
          timestamp: timestamp,
          description: `No movement detected for ${2 + Math.floor(Math.random() * 3)} hours. Last activity: ${new Date(timestamp.getTime() - (2 + Math.floor(Math.random() * 3)) * 3600000).toLocaleTimeString()}`
        };
        metrics.motionLevel = 'Low';
        metrics.audioDetection = 'Silent';
        metrics.confidence = inactivityConfidence;
        break;

      case 'missed_medication':
        // Missed medication alert
        const medConfidence = 87 + Math.floor(Math.random() * 8); // 87-95%
        const medicationTimes = ['8:00 AM', '12:00 PM', '6:00 PM', '10:00 PM'];
        const missedTime = medicationTimes[Math.floor(Math.random() * medicationTimes.length)];
        alert = {
          id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          resident: resident,
          type: 'Missed Medication',
          severity: 'Warning',
          confidence: medConfidence,
          timestamp: timestamp,
          description: `Medication not taken at scheduled time (${missedTime}). Pill dispenser not activated.`
        };
        metrics.motionLevel = 'Normal';
        metrics.audioDetection = 'Talking';
        metrics.confidence = medConfidence;
        break;

      default:
        break;
    }

    return {
      metrics,
      alert
    };
  },

  /**
   * Generate daily activity trend data (24 hours)
   * Creates a more realistic pattern with variations
   */
  generateDailyTrend: () => {
    const hours = [];
    const now = new Date();
    
    // Base activity pattern throughout the day
    const basePattern = [
      15, 10, 8, 12, 18, 25, 35, 45, 55, 60, 65, 70, // 12am-11am
      75, 80, 75, 70, 65, 60, 55, 50, 45, 40, 30, 20  // 12pm-11pm
    ];
    
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now);
      hour.setHours(hour.getHours() - i);
      const hourIndex = hour.getHours();
      
      // Get base activity for this hour
      let activity = basePattern[hourIndex];
      
      // Add realistic random variation (±15%)
      const variation = (Math.random() - 0.5) * 0.3; // -15% to +15%
      activity = activity * (1 + variation);
      
      // Ensure activity stays within bounds
      activity = Math.max(5, Math.min(100, Math.round(activity)));
      
      hours.push({
        time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        hour: hour.getHours(),
        activity: activity
      });
    }
    
    return hours;
  },

  /**
   * Calculate event frequency by type
   */
  calculateEventFrequency: (alerts) => {
    const frequency = {
      'Fall Detected': 0,
      'No Movement Detected': 0,
      'Missed Medication': 0,
      'Normal Activity': 0
    };

    alerts.forEach(alert => {
      if (frequency.hasOwnProperty(alert.type)) {
        frequency[alert.type]++;
      }
    });

    return Object.entries(frequency).map(([type, count]) => ({
      type,
      count
    }));
  }
};

