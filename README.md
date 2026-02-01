# ElderEase AI – Smart Elder Care Monitoring Dashboard

A React web application that simulates an AI-powered home monitoring system designed for elderly individuals living independently. The app visualizes activity levels, detects anomalies such as falls, long inactivity, or missed medication, and sends simulated caregiver alerts.

## 🏠 Features

### 1. Activity Input & Simulation Panel
- Dropdown to select resident (John Doe, Mary Smith, Eleanor Lee)
- Buttons to simulate events:
  - Normal Activity
  - Fall Detected
  - No Movement for 2 Hours
  - Missed Medication

### 2. AI Monitoring Dashboard
- Real-time metrics cards:
  - Motion Activity Level (Low / Normal / High)
  - Audio Detection (Talking / Silent / Unusual Sound)
  - Last Movement Timestamp
  - AI Confidence Score (%)
- Line Chart: Daily Activity Trend (simulated 24-hour movement levels)
- Bar Chart: Event Frequency by Type

### 3. Alert Center
- List of recent alerts with:
  - Resident name
  - Alert type
  - Severity tag (Critical / Warning / Info)
  - AI confidence score
  - Timestamp
- Auto-scroll newest alert to top

### 4. Caregiver Actions Sidebar
- "Acknowledge Alert" button
- "Call Resident" / "Notify Emergency Contact" buttons (simulated)
- Display of "Last Caregiver Response Time"
- Active alerts counter

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🧠 AI Logic

The app includes simulated AI monitoring logic (`src/utils/aiMonitor.js`) that:
- Analyzes activity events and generates insights
- Calculates confidence scores
- Generates daily activity trends
- Tracks event frequencies

## 📁 Project Structure

```
elderease/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ActivitySimulator.js
│   │   ├── ActivitySimulator.css
│   │   ├── MonitoringDashboard.js
│   │   ├── MonitoringDashboard.css
│   │   ├── AlertCenter.js
│   │   ├── AlertCenter.css
│   │   ├── CaregiverActions.js
│   │   └── CaregiverActions.css
│   ├── data/
│   │   └── demoData.js
│   ├── utils/
│   │   └── aiMonitor.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Technologies Used

- **React** - UI framework
- **Recharts** - Charting library for data visualization
- **CSS3** - Modern styling with gradients and animations

## 📝 License

This project is for demonstration purposes.




