import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import ItineraryCard from '../components/ItineraryCard';

export default function ItineraryScreen({ route, navigation }) {
  const { itinerary } = route.params;
  const { stops, timeSlot, totalDistance } = itinerary;

  const renderStop = ({ item, index }) => (
    <ItineraryCard
      stop={item}
      isFirst={index === 0}
      isLast={index === stops.length - 1}
    />
  );

  const ListHeader = () => (
    <View style={styles.headerSection}>
      {/* Summary card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryEmoji}>{timeSlot.emoji}</Text>
        <Text style={styles.summaryTitle}>{timeSlot.label}</Text>
        <Text style={styles.summaryTime}>{timeSlot.description}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{stops.length}</Text>
            <Text style={styles.statLabel}>Tappe</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalDistance}</Text>
            <Text style={styles.statLabel}>km totali</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {stops.length > 0 ? stops[0].arrivalTime : '--'}
            </Text>
            <Text style={styles.statLabel}>Inizio</Text>
          </View>
        </View>
      </View>

      {/* Section title */}
      <Text style={styles.sectionTitle}>Il tuo percorso</Text>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.footerSection}>
      {/* View on Map button */}
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate('Map', { itinerary })}
        activeOpacity={0.8}
      >
        <Text style={styles.mapButtonIcon}>🗺️</Text>
        <Text style={styles.mapButtonText}>Vedi sulla Mappa</Text>
      </TouchableOpacity>

      {/* Regenerate button */}
      <TouchableOpacity
        style={styles.regenerateButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.regenerateIcon}>🔄</Text>
        <Text style={styles.regenerateText}>Genera nuovo itinerario</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Indietro</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Itinerario</Text>
        <View style={styles.backButton} />
      </View>

      <FlatList
        data={stops}
        renderItem={renderStop}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  summaryTime: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  footerSection: {
    marginTop: 16,
    gap: 12,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mapButtonIcon: {
    fontSize: 20,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  regenerateIcon: {
    fontSize: 16,
  },
  regenerateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
