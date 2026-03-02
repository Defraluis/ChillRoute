import * as Location from 'expo-location';

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation() {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    throw new Error('Permesso di localizzazione negato');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

export async function reverseGeocode(latitude, longitude) {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (results.length > 0) {
      const addr = results[0];
      const parts = [addr.city, addr.region, addr.country].filter(Boolean);
      return parts.join(', ') || 'Posizione sconosciuta';
    }
    return 'Posizione sconosciuta';
  } catch {
    return 'Posizione sconosciuta';
  }
}
