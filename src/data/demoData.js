/**
 * Demo data for ElderEase AI
 */

export const RESIDENTS = [
  { id: 1, name: 'John Doe', age: 78, room: 'Room 101' },
  { id: 2, name: 'Mary Smith', age: 82, room: 'Room 205' },
  { id: 3, name: 'Eleanor Lee', age: 75, room: 'Room 312' }
];

export const INITIAL_ALERTS = [
  {
    id: 'alert-1',
    resident: 'John Doe',
    type: 'Normal Activity',
    severity: 'Info',
    confidence: 92,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    description: 'Regular movement patterns detected'
  },
  {
    id: 'alert-2',
    resident: 'Mary Smith',
    type: 'Missed Medication',
    severity: 'Warning',
    confidence: 90,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: 'Medication not taken at scheduled time'
  }
];




