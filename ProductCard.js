import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import Badge from '../common/Badge';

export const ProductCard = ({
  product,
  onPress,
  onOpen3D,
  onOpenTryOn,
  onOpenSpace,
  onOpenEvidence,
}) => {
  const { isInWishlist, toggleWishlist } = useProducts();
  const { addToCart } = useCart();
  const favorited = isInWishlist(product.id);

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.cardContainer}
    >
      {/* Product Image Box with Action Badges */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Wishlist Heart Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleWishlist(product.id)}
          style={styles.wishlistBtn}
        >
          <Text style={styles.wishlistIcon}>{favorited ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        {/* 3D / AR / Try-On Interactive Trigger Badges */}
        <View style={styles.techPillsRow}>
          {product.tryOnSupported && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(e) => {
                e.stopPropagation();
                if (onOpenTryOn) onOpenTryOn(product);
              }}
              style={styles.pillTryOn}
            >
              <Text style={styles.pillText}>👗 Try-On</Text>
            </TouchableOpacity>
          )}

          {product.arSupported && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(e) => {
                e.stopPropagation();
                if (product.category === 'handloom_textiles') {
                  if (onOpen3D) onOpen3D(product);
                } else {
                  if (onOpenSpace) onOpenSpace(product);
                }
              }}
              style={styles.pill3D}
            >
              <Text style={styles.pillText}>
                {product.category === 'handloom_textiles' ? '🔄 3D View' : '🏡 In Space'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Product Metadata & Artisan Info */}
      <View style={styles.detailsContainer}>
        {/* Craft Type & GI Badge */}
        <View style={styles.craftMetaRow}>
          <Text style={styles.craftType}>{product.craftType || 'Traditional Craft'}</Text>
          {product.craftEvidence && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                if (onOpenEvidence) onOpenEvidence(product);
              }}
            >
              <Badge label="Evidence ✓" variant="gold" size="sm" />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Artisan & Region */}
        <View style={styles.artisanRow}>
          <Text style={styles.artisanIcon}>🧑‍🎨</Text>
          <Text style={styles.artisanName} numberOfLines={1}>
            {product.artisanName} • {product.artisanRegion?.split(',')[0]}
          </Text>
        </View>

        {/* Price & Add to Cart Button */}
        <View style={styles.priceActionRow}>
          <View>
            <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
            {product.mrp && <Text style={styles.mrp}>₹{product.mrp.toLocaleString('en-IN')}</Text>}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            style={styles.addCartBtn}
          >
            <Text style={styles.addCartText}>+ Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 8,
    ...shadows.card,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.surfaceSubtle,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.subtle,
  },
  wishlistIcon: {
    fontSize: 16,
  },
  techPillsRow: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    gap: 6,
  },
  pillTryOn: {
    backgroundColor: 'rgba(217, 83, 30, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  pill3D: {
    backgroundColor: 'rgba(30, 58, 138, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  detailsContainer: {
    padding: 12,
  },
  craftMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  craftType: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 19,
    marginBottom: 6,
  },
  artisanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  artisanIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  artisanName: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  priceActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  mrp: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  addCartBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
  },
  addCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ProductCard;
