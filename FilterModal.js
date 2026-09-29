import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius } from '../../theme/typography';
import { CRAFT_CATEGORIES } from '../../services/craftTaxonomy';
import Button from '../common/Button';

export const FilterModal = ({ visible, onClose, filters, onApplyFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
  const [only3D, setOnly3D] = useState(filters?.only3D || false);
  const [onlyTryOn, setOnlyTryOn] = useState(filters?.onlyTryOn || false);
  const [onlyEvidence, setOnlyEvidence] = useState(filters?.onlyEvidence || false);
  const [priceRange, setPriceRange] = useState(filters?.priceRange || 'all');

  const priceOptions = [
    { id: 'all', label: 'All Prices' },
    { id: 'under_3000', label: 'Under ₹3,000' },
    { id: '3000_10000', label: '₹3,000 - ₹10,000' },
    { id: 'above_10000', label: 'Above ₹10,000' },
  ];

  const handleApply = () => {
    onApplyFilters({
      category: selectedCategory,
      only3D,
      onlyTryOn,
      onlyEvidence,
      priceRange,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setOnly3D(false);
    setOnlyTryOn(false);
    setOnlyEvidence(false);
    setPriceRange('all');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={[typography.h3, styles.title]}>Filter Marketplace</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Immersive & Verified Features */}
            <Text style={styles.sectionLabel}>Immersive Experience & Integrity</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                onPress={() => setOnlyTryOn(!onlyTryOn)}
                style={[styles.togglePill, onlyTryOn && styles.togglePillActive]}
              >
                <Text style={[styles.toggleText, onlyTryOn && styles.toggleTextActive]}>
                  👗 Virtual Try-On Available
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setOnly3D(!only3D)}
                style={[styles.togglePill, only3D && styles.togglePillActive]}
              >
                <Text style={[styles.toggleText, only3D && styles.toggleTextActive]}>
                  🔄 3D View / AR Space
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setOnlyEvidence(!onlyEvidence)}
                style={[styles.togglePill, onlyEvidence && styles.togglePillActive]}
              >
                <Text style={[styles.toggleText, onlyEvidence && styles.toggleTextActive]}>
                  🛡️ Craft Evidence Verified
                </Text>
              </TouchableOpacity>
            </View>

            {/* Price Filter */}
            <Text style={styles.sectionLabel}>Price Range</Text>
            <View style={styles.optionsWrap}>
              {priceOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setPriceRange(opt.id)}
                  style={[styles.optionPill, priceRange === opt.id && styles.optionPillActive]}
                >
                  <Text style={[styles.optionText, priceRange === opt.id && styles.optionTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Category Filter */}
            <Text style={styles.sectionLabel}>Craft Category</Text>
            <View style={styles.optionsWrap}>
              <TouchableOpacity
                onPress={() => setSelectedCategory('all')}
                style={[styles.optionPill, selectedCategory === 'all' && styles.optionPillActive]}
              >
                <Text style={[styles.optionText, selectedCategory === 'all' && styles.optionTextActive]}>
                  All Crafts
                </Text>
              </TouchableOpacity>

              {CRAFT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[styles.optionPill, selectedCategory === cat.id && styles.optionPillActive]}
                >
                  <Text style={[styles.optionText, selectedCategory === cat.id && styles.optionTextActive]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.btnRow}>
              <Button
                title="Apply Filters"
                onPress={handleApply}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Cancel"
                variant="outline"
                onPress={onClose}
                style={{ flex: 1 }}
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
    maxHeight: '85%',
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
  resetText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 14,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'column',
    gap: 8,
  },
  togglePill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  togglePillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  optionPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionPillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default FilterModal;
