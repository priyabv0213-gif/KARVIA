import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const ArtisanProductsScreen = ({ onOpenAddProduct, onOpen3D, onOpenEvidence }) => {
  const { user } = useAuth();
  const { products, drafts, updateProduct, deleteProduct } = useProducts();
  const [activeSegment, setActiveSegment] = useState('published'); // 'published' | 'drafts'

  const artisanProducts = products.filter((p) => p.artisanId === user?.uid || p.artisanId === 'art_meena_01');

  const handleToggleStock = (product) => {
    updateProduct(product.id, { inStock: !product.inStock });
  };

  const handleUpdatePricePrompt = (product) => {
    const newPrice = Math.round(product.price * 1.05); // Sample price bump
    updateProduct(product.id, { price: newPrice });
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  return (
    <View style={styles.container}>
      {/* Top Controls & Segment Picker */}
      <View style={styles.topBar}>
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            onPress={() => setActiveSegment('published')}
            style={[styles.segmentBtn, activeSegment === 'published' && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, activeSegment === 'published' && styles.segmentTextActive]}>
              Published ({artisanProducts.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveSegment('drafts')}
            style={[styles.segmentBtn, activeSegment === 'drafts' && styles.segmentBtnActive]}
          >
            <Text style={[styles.segmentText, activeSegment === 'drafts' && styles.segmentTextActive]}>
              Offline Drafts ({drafts.length})
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="+ Add Craft"
          onPress={onOpenAddProduct}
          size="sm"
          style={styles.addBtn}
        />
      </View>

      {/* Product List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
        {activeSegment === 'published' ? (
          artisanProducts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🧵</Text>
              <Text style={styles.emptyTitle}>Your catalog is empty.</Text>
              <Text style={styles.emptySub}>Add your first handcrafted creation using the AI Smart Catalog.</Text>
              <Button title="Add Product Now" onPress={onOpenAddProduct} style={{ marginTop: 14 }} />
            </View>
          ) : (
            artisanProducts.map((p) => (
              <View key={p.id} style={styles.productCard}>
                <View style={styles.cardMain}>
                  <Image
                    source={{ uri: p.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.cardInfo}>
                    <View style={styles.statusBadgeRow}>
                      <Badge
                        label={p.inStock ? 'In Stock' : 'Sold Out'}
                        variant={p.inStock ? 'success' : 'warning'}
                        size="sm"
                      />
                      {p.arSupported && (
                        <TouchableOpacity onPress={() => onOpen3D && onOpen3D(p)}>
                          <Badge label="3D Live" variant="gold" size="sm" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text style={styles.productTitle} numberOfLines={2}>{p.title}</Text>
                    <Text style={styles.productMeta}>{p.craftTechnique}</Text>
                    <Text style={styles.productPrice}>₹{p.price.toLocaleString('en-IN')}</Text>
                  </View>
                </View>

                {/* Card Action Buttons (CRUD) */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    onPress={() => handleToggleStock(p)}
                    style={styles.actionPill}
                  >
                    <Text style={styles.actionPillText}>
                      {p.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => onOpenEvidence && onOpenEvidence(p)}
                    style={styles.actionPill}
                  >
                    <Text style={styles.actionPillText}>Evidence 🛡️</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(p.id)}
                    style={[styles.actionPill, styles.deletePill]}
                  >
                    <Text style={[styles.actionPillText, { color: colors.error }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        ) : (
          /* Drafts Tab */
          drafts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTitle}>No offline drafts.</Text>
              <Text style={styles.emptySub}>Products created while offline are safely saved here until connection returns.</Text>
            </View>
          ) : (
            drafts.map((d) => (
              <View key={d.id} style={styles.productCard}>
                <View style={styles.cardMain}>
                  <View style={[styles.cardImage, styles.draftPlaceholder]}>
                    <Text style={{ fontSize: 28 }}>📝</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Badge label="Offline Draft" variant="outline" size="sm" />
                    <Text style={styles.productTitle}>{d.title}</Text>
                    <Text style={styles.productMeta}>{d.category}</Text>
                    <Text style={styles.productPrice}>₹{d.price}</Text>
                  </View>
                </View>
              </View>
            ))
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 3,
  },
  segmentBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  segmentBtnActive: {
    backgroundColor: colors.surface,
    ...shadows.subtle,
  },
  segmentText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  addBtn: {
    paddingHorizontal: 12,
  },
  scrollList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  cardMain: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSubtle,
  },
  draftPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  productMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  actionPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deletePill: {
    borderColor: colors.errorLight,
    backgroundColor: colors.errorLight,
  },
  actionPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 30,
  },
});

export default ArtisanProductsScreen;
