import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors } from '../theme/colors';

export default function MapScreen({ route, navigation }) {
  const { itinerary } = route.params;
  const { stops, startLocation } = itinerary;
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && stops.length > 0) {
      const coords = [
        startLocation,
        ...stops.map(s => ({ latitude: s.latitude, longitude: s.longitude })),
      ];
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(coords, {
          edgePadding: { top: 80, right: 40, bottom: 200, left: 40 },
          animated: true,
        });
      }, 500);
    }
  }, [stops, startLocation]);

  const routeCoords = [
    { latitude: startLocation.latitude, longitude: startLocation.longitude },
    ...stops.map(s => ({ latitude: s.latitude, longitude: s.longitude })),
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Indietro</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Mappa</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: startLocation.latitude,
            longitude: startLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={mapDarkStyle}
        >
          {/* Start marker */}
          <Marker
            coordinate={startLocation}
            title="Partenza"
            description="La tua posizione"
            pinColor={colors.accent}
          />

          {/* Stop markers */}
          {stops.map((stop, index) => (
            <Marker
              key={stop.id}
              coordinate={{
                latitude: stop.latitude,
                longitude: stop.longitude,
              }}
              title={`${stop.order}. ${stop.name}`}
              description={`${stop.arrivalTime} - ${stop.departureTime}`}
              pinColor={colors.category[stop.category] || colors.primary}
            />
          ))}

          {/* Route line */}
          <Polyline
            coordinates={routeCoords}
            strokeColor={colors.primary}
            strokeWidth={3}
            lineDashPattern={[8, 4]}
          />
        </MapView>

        {/* Legend overlay */}
        <View style={styles.legend}>
          {stops.map((stop) => (
            <View key={stop.id} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.category[stop.category] || colors.primary }]} />
              <Text style={styles.legendText} numberOfLines={1}>
                {stop.order}. {stop.name}
              </Text>
              <Text style={styles.legendTime}>{stop.arrivalTime}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#255763' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#283d6a' }] },
  { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#023e58' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 80,
  },
  backText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  legend: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 16,
    left: 12,
    right: 12,
    backgroundColor: colors.surface + 'F0',
    borderRadius: 16,
    padding: 14,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  legendTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 8,
  },
});
