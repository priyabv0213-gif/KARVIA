import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { analyzeCraftEvidence } from '../../services/aiService';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const CraftEvidenceModal = ({ visible, onClose, product }) => {
  const [hasProcessVideo, setHasProcessVideo] = useState(true);
  const [hasMacroPhoto, setHasMacroPhoto] = useState(true);
  const [hasMaterialReceipt, setHasMaterialReceipt] = useState(true);
  const [hasArtisanDeclaration, setHasArtisanDeclaration] = useState(true);
  const [hasGITag, setHasGITag] = useState(true);
  const [hasClusterVerification, setHasClusterVerification] = useState(true);

  const evidenceResult = analyzeCraftEvidence({
    hasProcessVideo,
    hasMacroPhoto,
    hasRawMaterialReceipt: hasMaterialReceipt,
    hasArtisanDeclaration,
    hasGITag,
    hasClusterVerification,
  });

  const getStatusColor = (val) => {
    if (val === 'Available' || val.includes('Verified') || val === 'Provided') return colors.success;
    return colors.warning;
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.tagRow}>
                <Text style={styles.heroBadge}>HERO INNOVATION</Text>
                <Badge label={evidenceResult.integrityLevel} variant="gold" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Multimodal Craft Evidence</Text>
              <Text style={styles.productName} numberOfLines={1}>{product?.title || 'Craft Product'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Transparency Disclaimer Alert */}
            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerIcon}>🛡️</Text>
              <Text style={styles.disclaimerText}>
                KARVIA Craft Evidence transparently verifies documented process steps rather than computing fabricated "100% handmade" AI confidence scores.
              </Text>
            </View>

            {/* Evidence Factor Grid */}
            <Text style={styles.sectionHeader}>Multimodal Evidence Verification Checklist</Text>

            {/* 1. Visual Craft Characteristics */}
            <View style={styles.evidenceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>1. Visual Craft Characteristics (Macro Weave/Grain)</Text>
                <Text style={[styles.itemStatus, { color: getStatusColor(evidenceResult.visualScore) }]}>
                  {evidenceResult.visualScore}
                </Text>
              </View>
              <Text style={styles.itemDesc}>High-magnification photography showing non-uniform artisanal hand-spun warp and weft nodes.</Text>
            </View>

            {/* 2. Process Evidence */}
            <View style={styles.evidenceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>2. Making Process Evidence (Loom / Workshop Video)</Text>
                <Text style={[styles.itemStatus, { color: getStatusColor(evidenceResult.processProof) }]}>
                  {evidenceResult.processProof}
                </Text>
              </View>
              <Text style={styles.itemDesc}>Timestamped video showing artisan operating traditional wooden pit-loom shuttle.</Text>
            </View>

            {/* 3. Material Declaration */}
            <View style={styles.evidenceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>3. Material Information & Sourcing Invoice</Text>
                <Text style={[styles.itemStatus, { color: getStatusColor(evidenceResult.materialProof) }]}>
                  {evidenceResult.materialProof}
                </Text>
              </View>
              <Text style={styles.itemDesc}>BIS Certified Silk Mark (#SM-TN-49821) and laboratory fastness certification.</Text>
            </View>

            {/* 4. Artisan Declaration */}
            <View style={styles.evidenceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>4. Artisan Personal Voice Declaration</Text>
                <Text style={[styles.itemStatus, { color: getStatusColor(evidenceResult.artisanDeclaration) }]}>
                  {evidenceResult.artisanDeclaration}
                </Text>
              </View>
              <Text style={styles.itemDesc}>Audio recording by master artisan confirming pure manual fabrication without mechanized assistance.</Text>
            </View>

            {/* 5. Craft Cluster Origin */}
            <View style={styles.evidenceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>5. Regional Cluster & Co-op Registry</Text>
                <Text style={[styles.itemStatus, { color: getStatusColor(evidenceResult.clusterInformation) }]}>
                  {evidenceResult.clusterInformation}
                </Text>
              </View>
              <Text style={styles.itemDesc}>Registered with Kanchipuram Handloom Silk Weavers Welfare Association roster.</Text>
            </View>

            {/* 6. Official GI Certification */}
            <View style={styles.evidenceItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>6. Official GI Registration Tag</Text>
                <Text style={[styles.itemStatus, { color: getStatusColor(evidenceResult.officialCertification) }]}>
                  {evidenceResult.officialCertification}
                </Text>
              </View>
              <Text style={styles.itemDesc}>Geographical Indication Registry Tag No. GI-12 issued under Govt of India GI Act, 1999.</Text>
            </View>

            {/* Authenticity Provenance Fingerprint Concept */}
            <View style={styles.fingerprintCard}>
              <View style={styles.fingerprintHeader}>
                <Text style={styles.fingerprintIcon}>🧬</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fingerprintTitle}>CRAFT PROVENANCE FINGERPRINT</Text>
                  <Text style={styles.fingerprintCode}>{evidenceResult.provenanceFingerprint}</Text>
                </View>
              </View>
              <Text style={styles.fingerprintDesc}>
                A deterministic integrity hash aggregating artisan Pehchan identity, GI registration, loom timestamp, and master self-declaration into a verifiable provenance record.
              </Text>
            </View>

            {/* Summary Box */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>CRAFT EVIDENCE AUDIT SUMMARY</Text>
              <Text style={styles.summaryText}>{evidenceResult.evidenceSummary}</Text>
              <Text style={styles.auditStamp}>Audited by: KARVIA Craft Integrity Engine & Cluster Peer Review</Text>
            </View>

            <Button
              title="Close Evidence Profile"
              onPress={onClose}
              style={{ marginTop: 16 }}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 20,
    maxHeight: '90%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  heroBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    letterSpacing: 0.5,
  },
  title: {
    color: colors.textPrimary,
  },
  productName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    maxWidth: 280,
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
    color: colors.textSecondary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 14,
    paddingBottom: 24,
  },
  disclaimerBox: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    alignItems: 'center',
  },
  disclaimerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  evidenceItem: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: colors.goldLight,
    padding: 14,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gold,
    marginTop: 10,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8A6D15',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  auditStamp: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  fingerprintCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 10,
  },
  fingerprintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fingerprintIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  fingerprintTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  fingerprintCode: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  fingerprintDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
});

export default CraftEvidenceModal;
