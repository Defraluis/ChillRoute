import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { DEFAULT_KM_RANGE } from '../utils/constants';
import { getCurrentLocation, reverseGeocode } from '../services/locationService';
import { generateItinerary } from '../services/itineraryGenerator';
import TimeSlotPicker from '../components/TimeSlotPicker';
import RadiusSlider from '../components/RadiusSlider';
import LocationBar from '../components/LocationBar';
import GenerateButton from '../components/GenerateButton';

export default function HomeScreen({ navigation }) {
  const [timeSlot, setTimeSlot] = useState(null);
  const [radius, setRadius] = useState(DEFAULT_KM_RANGE);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const fetchLocation = useCallback(async () => {
    setLocationLoading(true);
    try {
      const coords = await getCurrentLocation();
      setLocation(coords);
      const name = await reverseGeocode(coords.latitude, coords.longitude);
      setLocationName(name);
    } catch (error) {
      Alert.alert(
        'Posizione non disponibile',
        'Assicurati di aver concesso i permessi di localizzazione.',
        [{ text: 'OK' }]
      );
    } finally {
      setLocationLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const handleGenerate = useCallback(async () => {
    if (!location) {
      Alert.alert('Posizione necessaria', 'Per favore, consenti l\'accesso alla posizione.');
      return;
    }
    if (!timeSlot) {
      Alert.alert('Seleziona un orario', 'Per favore, scegli quando vuoi uscire.');
      return;
    }

    setGenerating(true);
    try {
      // Small delay for UX feedback
      await new Promise(resolve => setTimeout(resolve, 800));

      const itinerary = generateItinerary({
        latitude: location.latitude,
        longitude: location.longitude,
        radiusKm: radius,
        timeSlotId: timeSlot,
      });

      if (itinerary.stops.length === 0) {
        Alert.alert(
          'Nessun risultato',
          'Non sono stati trovati luoghi per i criteri selezionati. Prova ad aumentare il raggio.',
        );
        return;
      }

      navigation.navigate('Itinerary', { itinerary });
    } catch (error) {
      Alert.alert('Errore', 'Si è verificato un errore nella generazione dell\'itinerario.');
    } finally {
      setGenerating(false);
    }
  }, [location, timeSlot, radius, navigation]);

  const isReady = location && timeSlot;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>ChillRoute</Text>
          <Text style={styles.subtitle}>Il tuo itinerario su misura</Text>
        </View>

        {/* Location */}
        <LocationBar
          locationName={locationName}
          loading={locationLoading}
          onRefresh={fetchLocation}
        />

        {/* Time Slot */}
        <TimeSlotPicker selected={timeSlot} onSelect={setTimeSlot} />

        {/* Radius */}
        <RadiusSlider value={radius} onValueChange={setRadius} />

        {/* Generate */}
        <GenerateButton
          onPress={handleGenerate}
          loading={generating}
          disabled={!isReady}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Seleziona fascia oraria e raggio per scoprire i migliori posti vicino a te
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 28,
  },
  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
