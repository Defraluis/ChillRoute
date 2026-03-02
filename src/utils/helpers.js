/**
 * Calculate distance between two coordinates using Haversine formula.
 * Returns distance in km.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Format minutes into HH:MM string.
 */
export function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = Math.round(totalMinutes % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Estimate travel time in minutes between two points.
 */
export function estimateTravelTime(distanceKm, mode = 'walking') {
  const speed = mode === 'walking' ? 5 : 30;
  return (distanceKm / speed) * 60;
}

/**
 * Shuffle an array using Fisher-Yates.
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a random rating between min and max.
 */
export function randomRating(min = 3.5, max = 5.0) {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10;
}

/**
 * Generate a random coordinate offset within a km radius.
 */
export function randomCoordOffset(centerLat, centerLon, radiusKm) {
  const radiusDeg = radiusKm / 111.32;
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.sqrt(Math.random()) * radiusDeg;
  const latOffset = distance * Math.cos(angle);
  const lonOffset = distance * Math.sin(angle) / Math.cos(toRad(centerLat));
  return {
    latitude: centerLat + latOffset,
    longitude: centerLon + lonOffset,
  };
}
