import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../theme/colors';
import { MIN_KM_RANGE, MAX_KM_RANGE } from '../utils/constants';

export default function RadiusSlider({ value, onValueChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raggio di ricerca</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.unitText}>km</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={MIN_KM_RANGE}
        maximumValue={MAX_KM_RANGE}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.surfaceLight}
        thumbTintColor={colors.primaryLight}
      />
      <View style={styles.labels}>
        <Text style={styles.labelText}>{MIN_KM_RANGE} km</Text>
        <Text style={styles.labelText}>{MAX_KM_RANGE} km</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
  },
  unitText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
