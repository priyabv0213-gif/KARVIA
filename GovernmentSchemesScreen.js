import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import { GOVERNMENT_SCHEMES, evaluateSchemeRelevance } from '../../services/schemesData';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const GovernmentSchemesScreen = () => {
  const { user } = useAuth();
  const [selectedCraftFilter, setSelectedCraftFilter] = useState('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('all');

  const craftFilters = [
    { key: 'all', label: 'All Crafts' },
    { key: 'handloom_textiles', label: 'Handloom & Weaving' },
    { key: 'pottery_ceramics', label: 'Pottery & Clay' },
    { key: 'metal_crafts', label: 'Bell Metal & Brass' },
    { key: 'folk_paintings', label: 'Folk & Traditional Art' },
    { key: 'wood_carving', label: 'Woodwork & Toys' },
  ];

  const regionFilters = [
    { key: 'all', label: 'All India (Central Schemes)' },
    { key: 'Tamil Nadu', label: 'Tamil Nadu' },
    { key: 'Rajasthan', label: 'Rajasthan' },
    { key: 'Chhattisgarh', label: 'Chhattisgarh' },
    { key: 'Bihar', label: 'Bihar' },
    { key: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  ];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    const matchesCraft = selectedCraftFilter === 'all' || (scheme.supportedCrafts && scheme.supportedCrafts.includes(selectedCraftFilter));
    return matchesCraft;
  });

  const handleOpenSource = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.warn('Cannot open url:', err));
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Disclaimer Header */}
      <View style={styles.disclaimerCard}>
        <Text style={styles.disclaimerIcon}>🏛️</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.disclaimerTitle}>Verified Government Welfare & Support Schemes</Text>
          <Text style={styles.disclaimerDesc}>
            Direct linkages to official Ministry of Textiles and MSME welfare, toolkit grants, and collateral-free enterprise credit. No fabricated claims.
          </Text>
        </View>
      </View>

      {/* 1. Craft Trade Filter */}
      <Text style={styles.filterTitle}>Filter by Craft Trade</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {craftFilters.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setSelectedCraftFilter(f.key)}
            style={[styles.filterChip, selectedCraftFilter === f.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, selectedCraftFilter === f.key && styles.filterChipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 2. Region Filter */}
      <Text style={styles.filterTitle}>Filter by Region / State</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {regionFilters.map((r) => (
          <TouchableOpacity
            key={r.key}
            onPress={() => setSelectedRegionFilter(r.key)}
            style={[styles.filterChip, selectedRegionFilter === r.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, selectedRegionFilter === r.key && styles.filterChipTextActive]}>
              {r.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultsCount}>
        Showing {filteredSchemes.length} verified government support schemes
      </Text>

      {/* Schemes List */}
      {filteredSchemes.map((scheme) => {
        const relevance = evaluateSchemeRelevance(user, scheme);

        return (
          <View key={scheme.id} style={styles.schemeCard}>
            {/* Top Status & Name */}
            <View style={styles.schemeHeader}>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: relevance.color }]} />
                <Text style={[styles.statusLabel, { color: relevance.color }]}>
                  {relevance.label}
                </Text>
              </View>
              <Text style={styles.verifiedDate}>Verified: {scheme.lastVerifiedDate}</Text>
            </View>

            <Text style={styles.schemeName}>{scheme.name}</Text>
            <Text style={styles.ministryText}>{scheme.ministry}</Text>

            {/* Financial Benefit Highlight */}
            <View style={styles.benefitBox}>
              <Text style={styles.benefitLabel}>FINANCIAL & ENTERPRISE INCENTIVE:</Text>
              <Text style={styles.benefitValue}>{scheme.financialBenefit}</Text>
            </View>

            {/* Why Relevant */}
            <View style={styles.reasonsBox}>
              <Text style={styles.reasonsLabel}>Why this is relevant to you:</Text>
              {relevance.reasons.map((r, i) => (
                <Text key={i} style={styles.reasonText}>• {r}</Text>
              ))}
            </View>

            {/* Documents Required */}
            <Text style={styles.docsLabel}>Documents Required:</Text>
            <View style={styles.docsWrap}>
              {scheme.documentsRequired.map((doc, idx) => (
                <View key={idx} style={styles.docChip}>
                  <Text style={styles.docChipText}>✓ {doc}</Text>
                </View>
              ))}
            </View>

            {/* Application Process & Portal Link */}
            <View style={styles.applicationBox}>
              <Text style={styles.appProcessTitle}>How to Apply:</Text>
              <Text style={styles.appProcessText}>{scheme.applicationProcess}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleOpenSource(scheme.officialSource)}
              style={styles.portalLinkBtn}
            >
              <Text style={styles.portalLinkText}>Visit Official Portal ({scheme.officialSource.replace('https://', '')}) ↗</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  disclaimerCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    alignItems: 'center',
  },
  disclaimerIcon: {
    fontSize: 26,
    marginRight: 12,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  disclaimerDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  filterTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 6,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsCount: {
    fontSize: 11,
    color: colors.textMuted,
    marginVertical: 6,
    fontStyle: 'italic',
  },
  schemeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  verifiedDate: {
    fontSize: 10,
    color: colors.textMuted,
  },
  schemeName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  ministryText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  benefitBox: {
    backgroundColor: colors.goldLight,
    padding: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gold,
    marginBottom: 12,
  },
  benefitLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8A6D15',
    letterSpacing: 0.6,
  },
  benefitValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
    lineHeight: 18,
  },
  reasonsBox: {
    backgroundColor: colors.surfaceSubtle,
    padding: 10,
    borderRadius: borderRadius.md,
    marginBottom: 12,
  },
  reasonsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  docsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  docsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  docChip: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  docChipText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  applicationBox: {
    backgroundColor: colors.surfaceSubtle,
    padding: 10,
    borderRadius: borderRadius.md,
    marginBottom: 12,
  },
  appProcessTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  appProcessText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  portalLinkBtn: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  portalLinkText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default GovernmentSchemesScreen;
