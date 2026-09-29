import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { calculateFairPrice } from '../../services/aiService';
import Button from '../common/Button';

export const FairPricingModal = ({ visible, onClose, onApplyPrice }) => {
  const [materialsCost, setMaterialsCost] = useState('3200');
  const [labourHours, setLabourHours] = useState('48');
  const [hourlyWage, setHourlyWage] = useState('125');
  const [packagingCost, setPackagingCost] = useState('250');
  const [overheadCost, setOverheadCost] = useState('400');
  const [marginPercent, setMarginPercent] = useState('25');
  const [skillLevel, setSkillLevel] = useState('senior'); // 'master' | 'senior' | 'skilled'
  const [craftComplexity, setCraftComplexity] = useState('high'); // 'high' | 'medium' | 'standard'

  const handleSelectSkill = (level) => {
    setSkillLevel(level);
    if (level === 'master') setHourlyWage('160');
    else if (level === 'senior') setHourlyWage('125');
    else setHourlyWage('95');
  };

  const pricingResult = calculateFairPrice({
    materialCost: materialsCost,
    labourHours,
    hourlyWage,
    packagingCost,
    overheadCost,
    desiredMarginPercent: marginPercent,
    skillLevel,
    craftComplexity,
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={[typography.h3, styles.title]}>Living-Wage Fair Pricing</Text>
              <Text style={styles.subtitle}>AI-Assisted Cost-Plus Guidance for Traditional Artisans</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Guidance Advisory Note */}
            <View style={styles.guidanceBox}>
              <Text style={styles.guidanceIcon}>⚖️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.guidanceTitle}>Living-Wage Advisory Guidance</Text>
                <Text style={styles.guidanceDesc}>
                  This calculation provides fair wage guidance based on regional benchmarks and craft skill level. It is not an enforced price; you retain full sovereign pricing authority.
                </Text>
              </View>
            </View>

            {/* Skill Level Tier Selector */}
            <Text style={styles.sectionTitle}>1. Artisan Skill Level & Fair Wage</Text>
            <View style={styles.tierSelectorRow}>
              {[
                { key: 'master', label: 'Master (Guru)', wage: '₹160/hr' },
                { key: 'senior', label: 'Senior Artisan', wage: '₹125/hr' },
                { key: 'skilled', label: 'Skilled / Journeyman', wage: '₹95/hr' },
              ].map((tier) => (
                <TouchableOpacity
                  key={tier.key}
                  onPress={() => handleSelectSkill(tier.key)}
                  style={[styles.tierChip, skillLevel === tier.key && styles.tierChipActive]}
                >
                  <Text style={[styles.tierChipLabel, skillLevel === tier.key && styles.tierChipLabelActive]}>
                    {tier.label}
                  </Text>
                  <Text style={[styles.tierChipWage, skillLevel === tier.key && styles.tierChipWageActive]}>
                    {tier.wage}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Craft Complexity Selector */}
            <Text style={styles.sectionTitle}>2. Craft Complexity & Technique</Text>
            <View style={styles.complexityRow}>
              {[
                { key: 'high', label: 'High (Three-Shuttle / Lost-Wax / Fine Filigree)' },
                { key: 'medium', label: 'Medium (Standard Handloom / Wheel-thrown)' },
                { key: 'standard', label: 'Standard (Base Finishing / Assembly)' },
              ].map((comp) => (
                <TouchableOpacity
                  key={comp.key}
                  onPress={() => setCraftComplexity(comp.key)}
                  style={[styles.complexityChip, craftComplexity === comp.key && styles.complexityChipActive]}
                >
                  <Text style={[styles.complexityText, craftComplexity === comp.key && styles.complexityTextActive]}>
                    {craftComplexity === comp.key ? '● ' : '○ '}{comp.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>3. Craft Input Expenses</Text>

            {/* Inputs */}
            <View style={styles.inputRow}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Raw Materials (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={materialsCost}
                  onChangeText={setMaterialsCost}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Handcrafting Time (Hours)</Text>
                <TextInput
                  style={styles.input}
                  value={labourHours}
                  onChangeText={setLabourHours}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Fair Hourly Wage (₹/hr)</Text>
                <TextInput
                  style={styles.input}
                  value={hourlyWage}
                  onChangeText={setHourlyWage}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Packaging & Finishing (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={packagingCost}
                  onChangeText={setPackagingCost}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Loom/Studio Overhead (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={overheadCost}
                  onChangeText={setOverheadCost}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Desired Profit Margin (%)</Text>
                <TextInput
                  style={styles.input}
                  value={marginPercent}
                  onChangeText={setMarginPercent}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Calculation Output Card */}
            <View style={styles.resultCard}>
              <Text style={styles.resultHeader}>FAIR PRICING BREAKDOWN</Text>

              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Direct Materials:</Text>
                <Text style={styles.breakdownVal}>₹{pricingResult.materialsCost.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Artisan Labour ({labourHours} hrs @ ₹{hourlyWage}):</Text>
                <Text style={styles.breakdownVal}>₹{pricingResult.labourCost.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Finishing & Packaging:</Text>
                <Text style={styles.breakdownVal}>₹{pricingResult.packagingCost.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Overhead & Tool Wear:</Text>
                <Text style={styles.breakdownVal}>₹{pricingResult.overheadCost.toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.breakdownRow}>
                <Text style={styles.totalBaseLabel}>Total Craft Cost:</Text>
                <Text style={styles.totalBaseVal}>₹{pricingResult.totalBaseCost.toLocaleString('en-IN')}</Text>
              </View>

              {/* Highlight Minimum & Recommended Selling Price */}
              <View style={styles.highlightPriceBox}>
                <View>
                  <Text style={styles.minSustainableLabel}>Min Sustainable Price:</Text>
                  <Text style={styles.minSustainableVal}>₹{pricingResult.minimumSustainablePrice.toLocaleString('en-IN')}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.suggestedLabel}>Recommended Selling Price:</Text>
                  <Text style={styles.suggestedVal}>₹{pricingResult.suggestedPrice.toLocaleString('en-IN')}</Text>
                </View>
              </View>

              <Text style={styles.marketRangeText}>Recommended Market Range: {pricingResult.marketRange}</Text>
              <Text style={styles.explanationText}>{pricingResult.explanation}</Text>
            </View>

            <View style={styles.btnRow}>
              {onApplyPrice && (
                <Button
                  title={`Apply Price: ₹${pricingResult.suggestedPrice.toLocaleString('en-IN')}`}
                  onPress={() => {
                    onApplyPrice(pricingResult.suggestedPrice);
                    onClose();
                  }}
                  style={{ flex: 1, marginRight: 8 }}
                />
              )}
              <Button
                title="Done"
                variant={onApplyPrice ? 'outline' : 'primary'}
                onPress={onClose}
                style={{ flex: onApplyPrice ? 1 : undefined }}
              />
            </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.textPrimary,
  },
  resultCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  breakdownLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  breakdownVal: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  totalBaseLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalBaseVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  highlightPriceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.goldLight,
    padding: 12,
    borderRadius: borderRadius.md,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  minSustainableLabel: {
    fontSize: 11,
    color: '#7B5D0F',
    fontWeight: '600',
  },
  minSustainableVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7B5D0F',
    marginTop: 2,
  },
  suggestedLabel: {
    fontSize: 11,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  suggestedVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  marketRangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 10,
  },
  explanationText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  guidanceBox: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginBottom: 12,
  },
  guidanceIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  guidanceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  guidanceDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tierSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tierChip: {
    width: '31%',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tierChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  tierChipLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tierChipLabelActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  tierChipWage: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  tierChipWageActive: {
    color: colors.primary,
  },
  complexityRow: {
    marginBottom: 10,
  },
  complexityChip: {
    backgroundColor: colors.surfaceSubtle,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 6,
  },
  complexityChipActive: {
    borderColor: colors.gold,
    backgroundColor: colors.goldLight,
  },
  complexityText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  complexityTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});

export default FairPricingModal;
