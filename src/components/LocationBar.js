import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function LocationBar({ locationName, loading, onRefresh }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onRefresh} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📍</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>La tua posizione</Text>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text style={styles.location} numberOfLines={1}>
            {locationName || 'Tocca per localizzarti'}
          </Text>
        )}
      </View>
      <View style={styles.refreshContainer}>
        <Text style={styles.refreshIcon}>🔄</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  location: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  refreshContainer: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 16,
  },
});
