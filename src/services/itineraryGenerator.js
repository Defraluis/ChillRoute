import { TIME_SLOTS, TRAVEL_BUFFER_MINUTES } from '../utils/constants';
import { haversineDistance, estimateTravelTime, shuffleArray, formatTime } from '../utils/helpers';
import { generateNearbyPlaces, getPlacesForTimeSlot } from './placesService';

/**
 * Build an optimized itinerary based on user preferences.
 */
export function generateItinerary({ latitude, longitude, radiusKm, timeSlotId }) {
  const timeSlot = Object.values(TIME_SLOTS).find(ts => ts.id === timeSlotId);
  if (!timeSlot) {
    throw new Error('Fascia oraria non valida');
  }

  const totalMinutes = (timeSlot.endHour - timeSlot.startHour) * 60;
  const allPlaces = generateNearbyPlaces(latitude, longitude, radiusKm);
  const suitablePlaces = getPlacesForTimeSlot(allPlaces, timeSlotId);

  if (suitablePlaces.length === 0) {
    return { stops: [], timeSlot, totalDistance: 0 };
  }

  const selectedPlaces = selectAndOrderPlaces(
    suitablePlaces,
    latitude,
    longitude,
    totalMinutes,
    timeSlotId
  );

  const stops = buildSchedule(selectedPlaces, timeSlot.startHour * 60, totalMinutes);
  const totalDistance = calculateTotalDistance(stops, latitude, longitude);

  return {
    stops,
    timeSlot,
    totalDistance: Math.round(totalDistance * 10) / 10,
    startLocation: { latitude, longitude },
  };
}

/**
 * Select places ensuring variety and order them by proximity (nearest-neighbor).
 */
function selectAndOrderPlaces(places, startLat, startLon, totalMinutes, timeSlotId) {
  const categoryOrder = getCategoryOrder(timeSlotId);
  const selected = [];
  const usedCategories = new Set();
  let remainingMinutes = totalMinutes;

  for (const category of categoryOrder) {
    if (remainingMinutes <= 0) break;

    const categoryPlaces = shuffleArray(
      places.filter(p => p.category === category && !usedCategories.has(p.id))
    );

    if (categoryPlaces.length > 0) {
      const place = categoryPlaces[0];
      const travelTime = selected.length === 0
        ? estimateTravelTime(haversineDistance(startLat, startLon, place.latitude, place.longitude))
        : estimateTravelTime(haversineDistance(
            selected[selected.length - 1].latitude,
            selected[selected.length - 1].longitude,
            place.latitude,
            place.longitude
          ));

      const totalNeeded = travelTime + place.avgDuration + TRAVEL_BUFFER_MINUTES;

      if (remainingMinutes >= totalNeeded) {
        selected.push(place);
        usedCategories.add(place.id);
        remainingMinutes -= totalNeeded;
      }
    }
  }

  return selected;
}

/**
 * Define category visit order based on time slot for a natural flow.
 */
function getCategoryOrder(timeSlotId) {
  switch (timeSlotId) {
    case 'morning':
      return ['cafe', 'landmark', 'museum', 'park', 'sport', 'shopping', 'restaurant'];
    case 'afternoon':
      return ['restaurant', 'landmark', 'museum', 'park', 'shopping', 'entertainment', 'cafe', 'sport'];
    case 'evening':
      return ['restaurant', 'landmark', 'bar', 'entertainment', 'nightlife'];
    case 'full_day':
      return ['cafe', 'landmark', 'museum', 'park', 'restaurant', 'shopping', 'entertainment', 'bar', 'nightlife'];
    default:
      return Object.keys(places);
  }
}

/**
 * Build a timed schedule from the ordered list of places.
 */
function buildSchedule(places, startMinutes, totalMinutes) {
  const stops = [];
  let currentMinutes = startMinutes;
  let prevLat = null;
  let prevLon = null;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    let travelMinutes = 0;

    if (prevLat !== null) {
      const dist = haversineDistance(prevLat, prevLon, place.latitude, place.longitude);
      travelMinutes = Math.ceil(estimateTravelTime(dist)) + TRAVEL_BUFFER_MINUTES;
    }

    const arrivalTime = currentMinutes + travelMinutes;
    const departureTime = arrivalTime + place.avgDuration;

    if (departureTime > startMinutes + totalMinutes) break;

    stops.push({
      ...place,
      order: stops.length + 1,
      arrivalTime: formatTime(arrivalTime),
      departureTime: formatTime(departureTime),
      arrivalMinutes: arrivalTime,
      departureMinutes: departureTime,
      travelMinutes: Math.round(travelMinutes),
      stayDuration: place.avgDuration,
    });

    currentMinutes = departureTime;
    prevLat = place.latitude;
    prevLon = place.longitude;
  }

  return stops;
}

/**
 * Calculate total route distance in km.
 */
function calculateTotalDistance(stops, startLat, startLon) {
  let total = 0;
  let prevLat = startLat;
  let prevLon = startLon;

  for (const stop of stops) {
    total += haversineDistance(prevLat, prevLon, stop.latitude, stop.longitude);
    prevLat = stop.latitude;
    prevLon = stop.longitude;
  }

  return total;
}
