import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Share } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const BuyerImpactMirrorModal = ({ visible, onClose, product }) => {
  const [copiedShareNotice, setCopiedShareNotice] = useState(false);

  const price = product?.price || 18500;
  const artisanSharePercent = 88;
  const directArtisanAmount = Math.round((price * artisanSharePercent) / 100);
  const productionDays = product?.productionDays || 18;
  const craftingHours = productionDays * 7;

  const handleShareCertificate = async () => {
    try {
      await Share.share({
        message: `I proudly support authentic Indian craft heritage through KARVIA. My patronage for "${product?.title || 'Heritage Handcraft'}" directly delivered ₹${directArtisanAmount.toLocaleString('en-IN')} (88% living wage) to Master Artisan ${product?.artisanName || 'Traditional Maker'}. #KarviaArtisans #HandmadeHeritage`,
      });
    } catch (e) {
      setCopiedShareNotice(true);
      setTimeout(() => setCopiedShareNotice(false), 2000);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.badgeRow}>
                <Text style={styles.headerBadge}>PATRON IMPACT MIRROR</Text>
                <Badge label="Direct Escrow" variant="success" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Your Patronage Impact</Text>
              <Text style={styles.subtitle}>See Exactly Where Your Purchase Goes</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Main Certificate Card */}
            <View style={styles.certificateCard}>
              <View style={styles.certBorderDecoration}>
                <View style={styles.certHeader}>
                  <Text style={styles.certEmblem}>🪷</Text>
                  <Text style={styles.certTitle}>CONSCIOUS PATRON HERITAGE RECORD</Text>
                  <Text style={styles.certSub}>Verifiable Economic & Cultural Livelihood Contribution</Text>
                </View>

                {/* Direct Financial Transfer Comparison */}
                <View style={styles.comparisonBox}>
                  <View style={styles.compColumn}>
                    <Text style={styles.compLabel}>MIDDLEMEN RETAIL</Text>
                    <Text style={styles.compValOld}>&lt; 15%</Text>
                    <Text style={styles.compSub}>Artisans receive marginal scrap wages</Text>
                  </View>
                  <View style={styles.compDivider} />
                  <View style={styles.compColumn}>
                    <Text style={[styles.compLabel, { color: colors.emerald }]}>KARVIA DIRECT</Text>
                    <Text style={styles.compValNew}>{artisanSharePercent}%</Text>
                    <Text style={styles.compSub}>₹{directArtisanAmount.toLocaleString('en-IN')} straight to artisan bank</Text>
                  </View>
                </View>

                {/* Core Impact Metrics */}
                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricIcon}>⏳</Text>
                    <Text style={styles.metricValue}>{craftingHours} Hours</Text>
                    <Text style={styles.metricLabel}>Dedicated Handcrafting Time</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricIcon}>🌱</Text>
                    <Text style={styles.metricValue}>100%</Text>
                    <Text style={styles.metricLabel}>Natural Fibers & Botanical Dyes</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricIcon}>🏛️</Text>
                    <Text style={styles.metricValue}>Living Craft</Text>
                    <Text style={styles.metricLabel}>Cultural Continuity Preserved</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricIcon}>🛡️</Text>
                    <Text style={styles.metricValue}>GI Tagged</Text>
                    <Text style={styles.metricLabel}>Authentic Cluster Origin</Text>
                  </View>
                </View>

                {/* Beneficiary Details */}
                <View style={styles.artisanBeneficiaryCard}>
                  <Text style={styles.artisanIcon}>🧵</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.beneficiaryTitle}>DIRECT BENEFICIARY</Text>
                    <Text style={styles.artisanName}>{product?.artisanName || 'Master Weaver Meenakshi'}</Text>
                    <Text style={styles.artisanDetails}>
                      {product?.artisanRegion || 'Kanchipuram, Tamil Nadu'} • Living Wage Escrow Protection
                    </Text>
                    <Text style={styles.artisanNote}>
                      "Your direct purchase ensures my apprentice daughter Priya can continue our family pit-loom weaving without seeking low-wage factory work in the city."
                    </Text>
                  </View>
                </View>

                <View style={styles.footerNote}>
                  <Text style={styles.footerText}>
                    KARVIA Escrow guarantees payment release directly to the artisan upon delivery verification.
                  </Text>
                </View>
              </View>
            </View>

            {/* Share / Save Certificate */}
            <Button
              title="Share Patron Heritage Certificate ↗"
              onPress={handleShareCertificate}
              variant="primary"
              size="lg"
              style={{ marginTop: 12 }}
            />

            {copiedShareNotice && (
              <View style={styles.shareNotice}>
                <Text style={styles.shareNoticeText}>✓ Certificate details ready to share!</Text>
              </View>
            )}

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 20,
    maxHeight: '92%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  headerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.emerald,
    backgroundColor: colors.emeraldLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 14,
  },
  certificateCard: {
    backgroundColor: '#FAF8F5',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.gold,
    padding: 12,
    ...shadows.card,
  },
  certBorderDecoration: {
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: borderRadius.md,
    padding: 14,
  },
  certHeader: {
    alignItems: 'center',
    marginBottom: 14,
  },
  certEmblem: {
    fontSize: 32,
    marginBottom: 4,
  },
  certTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
    textAlign: 'center',
  },
  certSub: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  comparisonBox: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  compColumn: {
    flex: 1,
    alignItems: 'center',
  },
  compDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  compLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  compValOld: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textMuted,
    marginVertical: 4,
  },
  compValNew: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.emerald,
    marginVertical: 2,
  },
  compSub: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metricItem: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  artisanBeneficiaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  artisanIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  beneficiaryTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  artisanName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 1,
  },
  artisanDetails: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  artisanNote: {
    fontSize: 11,
    fontStyle: 'italic',
    lineHeight: 16,
    color: colors.textPrimary,
    marginTop: 6,
    backgroundColor: colors.surfaceSubtle,
    padding: 8,
    borderRadius: 4,
  },
  footerNote: {
    marginTop: 4,
  },
  footerText: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },
  shareNotice: {
    backgroundColor: colors.emeraldLight,
    padding: 10,
    borderRadius: borderRadius.sm,
    marginTop: 8,
    alignItems: 'center',
  },
  shareNoticeText: {
    fontSize: 12,
    color: colors.emerald,
    fontWeight: '700',
  },
});

export default BuyerImpactMirrorModal;
