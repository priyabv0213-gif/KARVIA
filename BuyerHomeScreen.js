import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useProducts } from '../../context/ProductsContext';
import { CRAFT_CATEGORIES } from '../../services/craftTaxonomy';
import ProductCard from '../../components/buyer/ProductCard';
import Badge from '../../components/common/Badge';

export const BuyerHomeScreen = ({
  onSelectProduct,
  onOpen3D,
  onOpenTryOn,
  onOpenSpace,
  onOpenEvidence,
  onNavigateTab,
}) => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Search Header Banner */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => onNavigateTab('explore')}
        style={styles.searchBarFake}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search authentic GI crafts, artisans, regions...</Text>
        <Text style={styles.filterIcon}>⚙️</Text>
      </TouchableOpacity>

      {/* Hero Artisan Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Badge label="Direct from Maker" variant="gold" size="sm" />
          <Text style={[typography.h2, styles.heroTitle]}>Preserving Living Craft Traditions</Text>
          <Text style={styles.heroSub}>
            Every purchase directly empowers rural Indian weavers, potters, and folk artists.
          </Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }}
          style={styles.heroImg}
          resizeMode="cover"
        />
      </View>

      {/* Craft Categories Horizontal Carousel */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Explore Regional Crafts</Text>
        <TouchableOpacity onPress={() => onNavigateTab('explore')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        <TouchableOpacity
          onPress={() => setSelectedCategory('all')}
          style={[styles.categoryChip, selectedCategory === 'all' && styles.categoryChipActive]}
        >
          <Text style={styles.catEmoji}>🌟</Text>
          <Text style={[styles.categoryChipText, selectedCategory === 'all' && styles.categoryChipTextActive]}>
            All Crafts
          </Text>
        </TouchableOpacity>

        {CRAFT_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            style={[styles.categoryChip, selectedCategory === cat.id && styles.categoryChipActive]}
          >
            <Text style={styles.catEmoji}>
              {cat.id === 'handloom_textiles' ? '🧵' : cat.id === 'pottery_ceramics' ? '🏺' : cat.id === 'metal_crafts' ? '🔔' : '🎨'}
            </Text>
            <Text style={[styles.categoryChipText, selectedCategory === cat.id && styles.categoryChipTextActive]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 3D & Immersive AR Spotlight Banner */}
      <View style={styles.arSpotlightBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.arSpotlightBadge}>NEW TECHNOLOGY</Text>
          <Text style={styles.arSpotlightTitle}>3D Saree Try-On & Space AR</Text>
          <Text style={styles.arSpotlightDesc}>
            Inspect intricate Zari borders in 360° and place pottery directly in your living room.
          </Text>
        </View>
        <Text style={styles.arSpotlightEmoji}>🥽</Text>
      </View>

      {/* Marketplace Products Grid */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'Featured GI-Tagged Crafts' : 'Filtered Creations'}
        </Text>
        <Text style={styles.itemCountText}>{filteredProducts.length} items</Text>
      </View>

      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onPress={() => onSelectProduct(product)}
          onOpen3D={onOpen3D}
          onOpenTryOn={onOpenTryOn}
          onOpenSpace={onOpenSpace}
          onOpenEvidence={onOpenEvidence}
        />
      ))}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  searchBarFake: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    ...shadows.subtle,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
  },
  filterIcon: {
    fontSize: 16,
  },
  heroBanner: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 16,
    ...shadows.card,
  },
  heroContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 6,
  },
  heroSub: {
    color: '#FBECE5',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 6,
  },
  heroImg: {
    width: 110,
    height: '100%',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  itemCountText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    ...shadows.subtle,
  },
  categoryChipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  catEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  arSpotlightBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 14,
  },
  arSpotlightBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.6,
  },
  arSpotlightTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  arSpotlightDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },
  arSpotlightEmoji: {
    fontSize: 32,
    marginLeft: 10,
  },
});

export default BuyerHomeScreen;
