import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TIME_SLOTS } from '../utils/constants';
import { colors } from '../theme/colors';

export default function TimeSlotPicker({ selected, onSelect }) {
  const slots = Object.values(TIME_SLOTS);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quando vuoi uscire?</Text>
      <View style={styles.grid}>
        {slots.map((slot) => {
          const isSelected = selected === slot.id;
          return (
            <TouchableOpacity
              key={slot.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onSelect(slot.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{slot.emoji}</Text>
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {slot.label}
              </Text>
              <Text style={[styles.desc, isSelected && styles.descSelected]}>
                {slot.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceLight,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  labelSelected: {
    color: colors.primary,
  },
  desc: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
  descSelected: {
    color: colors.textSecondary,
  },
});
