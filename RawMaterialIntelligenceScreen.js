import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { CLUSTER_RAW_MATERIALS, calculateClusterSavings } from '../../services/rawMaterialsData';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const RawMaterialIntelligenceScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Cluster Demand Pooling Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.badgeRow}>
          <Text style={styles.clusterBadge}>ANONYMIZED CLUSTER POOLING</Text>
          <Badge label="14-Day Forecast" variant="gold" size="sm" />
        </View>
        <Text style={[typography.h3, styles.heroTitle]}>Raw Material Demand Intelligence</Text>
        <Text style={styles.heroDesc}>
          Aggregated material requirements across regional weaving and craft clusters to negotiate collective bulk procurement discounts. All figures are verified estimates.
        </Text>
      </View>

      {/* Materials List */}
      {CLUSTER_RAW_MATERIALS.map((material) => {
        const savings = calculateClusterSavings(material);

        return (
          <View key={material.id} style={styles.materialCard}>
            {/* Header */}
            <View style={styles.materialHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.materialName}>{material.name}</Text>
                <Text style={styles.clusterLocation}>📍 {material.clusterName} ({material.state})</Text>
              </View>
              <View style={styles.savingsPill}>
                <Text style={styles.savingsPercent}>Save {savings.savingsPercentage}%</Text>
              </View>
            </View>

            {/* Demand Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>14-Day Demand:</Text>
                <Text style={styles.statVal}>{material.demandForecast14d} {material.unit}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Artisans Pooling:</Text>
                <Text style={styles.statVal}>{material.participatingArtisansCount} verified</Text>
              </View>
            </View>

            {/* Procurement Pricing Comparison Table */}
            <View style={styles.priceComparisonCard}>
              <View style={styles.compRow}>
                <Text style={styles.compLabel}>Individual Procurement Rate:</Text>
                <Text style={styles.compOldPrice}>₹{material.individualProcurementPricePerUnit.toLocaleString('en-IN')} / {material.unit}</Text>
              </View>

              <View style={styles.compRow}>
                <Text style={styles.compLabel}>Collective Bulk Pooled Rate:</Text>
                <Text style={styles.compNewPrice}>₹{material.collectiveProcurementPricePerUnit.toLocaleString('en-IN')} / {material.unit}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.compRow}>
                <Text style={styles.savingsTotalLabel}>Estimated Cluster Savings:</Text>
                <Text style={styles.savingsTotalVal}>₹{savings.totalSavings.toLocaleString('en-IN')}</Text>
              </View>
              <Text style={styles.perArtisanSaving}>
                Avg. savings per artisan: ~₹{savings.avgSavingPerArtisan.toLocaleString('en-IN')}
              </Text>
            </View>

            {/* Purity Standard & Suppliers */}
            <Text style={styles.purityText}>🛡️ Quality Standard: {material.purityStandard}</Text>
            <Text style={styles.notesText}>📅 {material.notes}</Text>

            <Button
              title="Join Bulk Procurement Pool"
              variant="outline"
              size="sm"
              onPress={() => alert(`Joined collective procurement pool for ${material.name}. Coordination details sent.`)}
              style={{ marginTop: 10 }}
            />
          </View>
        );
      })}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  heroBanner: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: 18,
    marginBottom: 16,
    ...shadows.card,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  clusterBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: '#FBECE5',
    marginTop: 6,
  },
  materialCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  materialName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  clusterLocation: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  savingsPill: {
    backgroundColor: colors.emeraldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.emerald,
  },
  savingsPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.emerald,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 10,
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  priceComparisonCard: {
    backgroundColor: colors.goldLight,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold,
    marginBottom: 10,
  },
  compRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  compLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  compOldPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  compNewPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gold,
    opacity: 0.4,
    marginVertical: 6,
  },
  savingsTotalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  savingsTotalVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.emerald,
  },
  perArtisanSaving: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  purityText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  notesText: {
    fontSize: 11,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});

export default RawMaterialIntelligenceScreen;
