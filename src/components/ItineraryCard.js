import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function ItineraryCard({ stop, isFirst, isLast }) {
  return (
    <View style={styles.container}>
      {/* Timeline connector */}
      <View style={styles.timeline}>
        <View style={[styles.lineTop, isFirst && styles.lineHidden]} />
        <View style={[styles.dot, { backgroundColor: colors.category[stop.category] || colors.primary }]} />
        <View style={[styles.lineBottom, isLast && styles.lineHidden]} />
      </View>

      {/* Card content */}
      <View style={styles.card}>
        {/* Time badge */}
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{stop.arrivalTime}</Text>
          <Text style={styles.timeSeparator}>-</Text>
          <Text style={styles.timeText}>{stop.departureTime}</Text>
        </View>

        {/* Place info */}
        <View style={styles.placeInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.emoji}>{stop.emoji}</Text>
            <View style={styles.headerText}>
              <Text style={styles.placeName} numberOfLines={1}>{stop.name}</Text>
              <Text style={styles.categoryLabel}>{stop.categoryLabel}</Text>
            </View>
          </View>

          <Text style={styles.description}>{stop.description}</Text>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{stop.stayDuration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⭐</Text>
              <Text style={styles.metaText}>{stop.rating}</Text>
            </View>
            {stop.travelMinutes > 0 && (
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>🚶</Text>
                <Text style={styles.metaText}>{stop.travelMinutes} min</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timeline: {
    width: 40,
    alignItems: 'center',
  },
  lineTop: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
  },
  lineBottom: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
  },
  lineHidden: {
    backgroundColor: 'transparent',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.background,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  timeSeparator: {
    fontSize: 14,
    color: colors.textMuted,
    marginHorizontal: 4,
  },
  placeInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  emoji: {
    fontSize: 28,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  categoryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
