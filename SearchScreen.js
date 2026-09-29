import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/buyer/ProductCard';
import FilterModal from '../../components/buyer/FilterModal';

export const SearchScreen = ({
  onSelectProduct,
  onOpen3D,
  onOpenTryOn,
  onOpenSpace,
  onOpenEvidence,
}) => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    only3D: false,
    onlyTryOn: false,
    onlyEvidence: false,
    priceRange: 'all',
  });

  const popularSearches = ['Kanchipuram Silk', 'Jaipur Blue Pottery', 'Bastar Dhokra', 'Zari Saree', 'Terracotta'];

  // Filter and search computation
  const filteredProducts = products.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.artisanName?.toLowerCase().includes(q) ||
      item.artisanRegion?.toLowerCase().includes(q) ||
      item.craftType?.toLowerCase().includes(q) ||
      item.material?.toLowerCase().includes(q);

    if (!matchQuery) return false;

    if (activeFilters.category !== 'all' && item.category !== activeFilters.category) {
      return false;
    }

    if (activeFilters.only3D && !item.arSupported) return false;
    if (activeFilters.onlyTryOn && !item.tryOnSupported) return false;
    if (activeFilters.onlyEvidence && !item.craftEvidence) return false;

    if (activeFilters.priceRange === 'under_3000' && item.price >= 3000) return false;
    if (activeFilters.priceRange === '3000_10000' && (item.price < 3000 || item.price > 10000)) return false;
    if (activeFilters.priceRange === 'above_10000' && item.price <= 10000) return false;

    return true;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar Input Row */}
      <View style={styles.searchHeader}>
        <View style={styles.inputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search crafts, artisans, regions..."
            placeholderTextColor={colors.textSecondary}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFilterModalVisible(true)}
          style={[styles.filterButton, activeFilters.category !== 'all' && styles.filterButtonActive]}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search suggestions tags */}
      {searchQuery === '' && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsHeading}>Popular Searches:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
            {popularSearches.map((s, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSearchQuery(s)}
                style={styles.tagChip}
              >
                <Text style={styles.tagChipText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results Count Line */}
      <View style={styles.resultsInfoRow}>
        <Text style={styles.resultsCount}>
          Showing {filteredProducts.length} authentic crafts
        </Text>
        {(activeFilters.only3D || activeFilters.onlyTryOn || activeFilters.onlyEvidence) && (
          <Text style={styles.activeFiltersIndicator}>• Filters applied</Text>
        )}
      </View>

      {/* Results Scroll */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultsList}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyResults}>
            <Text style={{ fontSize: 44 }}>🔍</Text>
            <Text style={styles.emptyTitle}>No matching crafts found</Text>
            <Text style={styles.emptyDesc}>Try searching for "silk", "saree", "pottery", or adjust filters.</Text>
          </View>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => onSelectProduct(p)}
              onOpen3D={onOpen3D}
              onOpenTryOn={onOpenTryOn}
              onOpenSpace={onOpenSpace}
              onOpenEvidence={onOpenEvidence}
            />
          ))
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={activeFilters}
        onApplyFilters={setActiveFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.full,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  clearText: {
    fontSize: 14,
    color: colors.textSecondary,
    paddingHorizontal: 6,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  filterIcon: {
    fontSize: 18,
  },
  tagsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tagsHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  tagsScroll: {
    flexDirection: 'row',
  },
  tagChip: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagChipText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  activeFiltersIndicator: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 6,
  },
  resultsList: {
    padding: 16,
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptyDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 24,
  },
});

export default SearchScreen;
