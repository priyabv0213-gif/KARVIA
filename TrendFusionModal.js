import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { generateTrendFusionConcepts } from '../../services/aiService';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const TrendFusionModal = ({ visible, onClose, craftInfo }) => {
  const craftName = craftInfo?.craftName || 'Bandhani Tie & Dye';
  const technique = craftInfo?.technique || 'Handloom Korvai Weaving';
  const concepts = generateTrendFusionConcepts({ craftName, traditionalTechnique: technique });

  const [selectedConcept, setSelectedConcept] = useState(null);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.tagRow}>
                <Text style={styles.studioBadge}>TREND FUSION STUDIO</Text>
                <Badge label="Craft-Constrained AI" variant="info" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Contemporary Trend Fusion</Text>
              <Text style={styles.subtitle}>Balancing Modern Market Demands with Sacred Craft Heritage</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Respect Craft Philosophy */}
            <View style={styles.philosophyCard}>
              <Text style={styles.philosophyIcon}>🌿</Text>
              <Text style={styles.philosophyText}>
                "The AI is a design assistant, never the owner of your craft. Traditional techniques, sacred motifs, and artisan sovereignty remain strictly preserved."
              </Text>
            </View>

            <Text style={styles.sectionHeading}>Current Global Market Trend Fusion Suggestions</Text>

            {concepts.map((concept) => (
              <View key={concept.id} style={styles.conceptCard}>
                <View style={styles.conceptHeader}>
                  <Text style={styles.conceptTitle}>{concept.title}</Text>
                  <Badge label={concept.productionComplexity} variant="outline" size="sm" />
                </View>

                {/* Color Swatches */}
                <View style={styles.swatchRow}>
                  {concept.colorPalette.map((col, idx) => (
                    <View key={idx} style={styles.swatchBadge}>
                      <View style={[styles.swatchColorDot, { backgroundColor: col.split('(')[1]?.split(')')[0] || colors.primary }]} />
                      <Text style={styles.swatchLabel}>{col.split('(')[0]}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailKey}>Target Market:</Text>
                  <Text style={styles.detailVal}>{concept.targetMarket}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailKey}>Technique Preserved:</Text>
                  <Text style={[styles.detailVal, { color: colors.emerald, fontWeight: '700' }]}>
                    ✓ {concept.techniquePreserved}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailKey}>Cultural Consideration:</Text>
                  <Text style={styles.detailVal}>{concept.culturalSignificance}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailKey}>Recommended Product:</Text>
                  <Text style={styles.detailVal}>{concept.recommendedProduct}</Text>
                </View>

                <Button
                  title={selectedConcept === concept.id ? '✓ Concept Selected for Next Weave' : 'Adopt This Color Palette'}
                  variant={selectedConcept === concept.id ? 'primary' : 'outline'}
                  size="sm"
                  onPress={() => setSelectedConcept(concept.id)}
                  style={{ marginTop: 10 }}
                />
              </View>
            ))}

            <Button
              title="Close Trend Fusion"
              onPress={onClose}
              style={{ marginTop: 14 }}
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
  studioBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
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
    color: colors.textSecondary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 14,
    paddingBottom: 24,
  },
  philosophyCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.emerald,
    marginBottom: 16,
    alignItems: 'center',
  },
  philosophyIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  philosophyText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#064E3B',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  conceptCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  conceptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  conceptTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6,
  },
  swatchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  swatchColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  swatchLabel: {
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  detailRow: {
    marginVertical: 3,
  },
  detailKey: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  detailVal: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 17,
  },
});

export default TrendFusionModal;
