import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function GenerateButton({ onPress, loading, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        <>
          <Text style={styles.icon}>🗺️</Text>
          <Text style={styles.text}>Genera Itinerario</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: colors.surfaceLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  icon: {
    fontSize: 22,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
});
