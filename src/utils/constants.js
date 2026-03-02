export const TIME_SLOTS = {
  MORNING: {
    id: 'morning',
    label: 'Mattina',
    icon: 'sunrise',
    emoji: '🌅',
    startHour: 8,
    endHour: 13,
    description: 'Dalle 8:00 alle 13:00',
  },
  AFTERNOON: {
    id: 'afternoon',
    label: 'Pomeriggio',
    icon: 'sun',
    emoji: '☀️',
    startHour: 13,
    endHour: 19,
    description: 'Dalle 13:00 alle 19:00',
  },
  EVENING: {
    id: 'evening',
    label: 'Sera',
    icon: 'moon',
    emoji: '🌙',
    startHour: 19,
    endHour: 24,
    description: 'Dalle 19:00 alle 00:00',
  },
  FULL_DAY: {
    id: 'full_day',
    label: 'Giornata Intera',
    icon: 'calendar',
    emoji: '📅',
    startHour: 9,
    endHour: 23,
    description: 'Dalle 9:00 alle 23:00',
  },
};

export const PLACE_CATEGORIES = {
  restaurant: { label: 'Ristorante', emoji: '🍽️', avgDuration: 75 },
  cafe: { label: 'Caffè/Bar', emoji: '☕', avgDuration: 30 },
  bar: { label: 'Bar/Pub', emoji: '🍸', avgDuration: 60 },
  museum: { label: 'Museo', emoji: '🏛️', avgDuration: 90 },
  park: { label: 'Parco', emoji: '🌳', avgDuration: 45 },
  shopping: { label: 'Shopping', emoji: '🛍️', avgDuration: 60 },
  entertainment: { label: 'Intrattenimento', emoji: '🎭', avgDuration: 120 },
  landmark: { label: 'Punto d\'interesse', emoji: '📍', avgDuration: 30 },
  nightlife: { label: 'Vita notturna', emoji: '🎶', avgDuration: 90 },
  sport: { label: 'Sport/Attività', emoji: '⚽', avgDuration: 60 },
};

export const DEFAULT_KM_RANGE = 5;
export const MIN_KM_RANGE = 1;
export const MAX_KM_RANGE = 30;

export const WALKING_SPEED_KMH = 5;
export const DRIVING_SPEED_KMH = 30;

export const TRAVEL_BUFFER_MINUTES = 10;
