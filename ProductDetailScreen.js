import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const ProductDetailScreen = ({
  product,
  onBack,
  onOpen3D,
  onOpenTryOn,
  onOpenSpace,
  onOpenEvidence,
  onOpenImpactMirror,
  onOpenWhatsApp,
  onGoToCart,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  const favorited = isInWishlist(product.id);
  const images = product.images || ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'];

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    onGoToCart();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Floating Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBack} style={styles.navCircleBtn}>
          <Text style={styles.navBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.topNavRight}>
          <TouchableOpacity onPress={() => toggleWishlist(product.id)} style={styles.navCircleBtn}>
            <Text style={{ fontSize: 18 }}>{favorited ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoToCart} style={[styles.navCircleBtn, { marginLeft: 8 }]}>
            <Text style={{ fontSize: 18 }}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Gallery Image */}
        <View style={styles.imageGalleryBox}>
          <Image source={{ uri: images[selectedImageIndex] }} style={styles.mainImage} resizeMode="cover" />

          {/* Thumbnails if multiple images */}
          {images.length > 1 && (
            <View style={styles.thumbnailRow}>
              {images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedImageIndex(idx)}
                  style={[styles.thumbnail, selectedImageIndex === idx && styles.thumbnailActive]}
                >
                  <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* IMMERSIVE 3D & AR ACTION BAR (Section 60) */}
        <View style={styles.immersiveBar}>
          {product.tryOnSupported && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpenTryOn(product)}
              style={styles.immersiveActionBtn}
            >
              <Text style={styles.immersiveIcon}>👗</Text>
              <Text style={styles.immersiveText}>Virtual Try-On</Text>
            </TouchableOpacity>
          )}

          {product.arSupported && product.category === 'handloom_textiles' && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpen3D(product)}
              style={styles.immersiveActionBtn}
            >
              <Text style={styles.immersiveIcon}>🔄</Text>
              <Text style={styles.immersiveText}>View in 3D</Text>
            </TouchableOpacity>
          )}

          {product.arSupported && product.category !== 'handloom_textiles' && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpenSpace(product)}
              style={styles.immersiveActionBtn}
            >
              <Text style={styles.immersiveIcon}>🏡</Text>
              <Text style={styles.immersiveText}>Visualize in Space</Text>
            </TouchableOpacity>
          )}

          {/* Transparent Craft Evidence Trigger */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onOpenEvidence(product)}
            style={[styles.immersiveActionBtn, styles.evidenceBtn]}
          >
            <Text style={styles.immersiveIcon}>🛡️</Text>
            <Text style={[styles.immersiveText, { color: colors.gold }]}>Craft Evidence</Text>
          </TouchableOpacity>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsBox}>
          <Text style={styles.craftCategory}>{product.craftType || 'Handloom Craft'}</Text>
          <Text style={[typography.h2, styles.title]}>{product.title}</Text>

          {/* Rating and Reviews */}
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{product.rating || 4.9}</Text>
            <Text style={styles.reviewCount}>({product.reviewsCount || 38} patron reviews)</Text>
          </View>

          {/* Pricing & Transparency */}
          <View style={styles.priceRow}>
            <Text style={styles.priceVal}>₹{product.price.toLocaleString('en-IN')}</Text>
            {product.mrp && <Text style={styles.mrpVal}>₹{product.mrp.toLocaleString('en-IN')}</Text>}
            <Badge label="88% Direct to Maker" variant="success" size="sm" />
          </View>

          {/* BUYER IMPACT MIRROR TRIGGER CARD */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onOpenImpactMirror && onOpenImpactMirror(product)}
            style={styles.impactMirrorCard}
          >
            <View style={styles.impactIconCircle}>
              <Text style={{ fontSize: 20 }}>🌿</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.impactBadgeRow}>
                <Text style={styles.impactBadgeText}>PATRON IMPACT MIRROR</Text>
                <Text style={styles.impactTapText}>View Certificate ↗</Text>
              </View>
              <Text style={styles.impactHeadline}>
                Your purchase delivers ₹{Math.round(product.price * 0.88).toLocaleString('en-IN')} directly to this artisan.
              </Text>
              <Text style={styles.impactSub}>
                Guarantees living wages for {product.productionDays || 14} days of manual handcrafting.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Artisan Profile Card with Direct WhatsApp Chat */}
          <View style={styles.artisanCard}>
            <View style={styles.artisanTopRow}>
              <View style={styles.artisanAvatar}>
                <Text style={{ fontSize: 24 }}>🧑‍🎨</Text>
              </View>
              <View style={styles.artisanMeta}>
                <Text style={styles.artisanName}>{product.artisanName}</Text>
                <Text style={styles.artisanLocation}>📍 {product.artisanRegion}</Text>
              </View>
              <Badge label="Verified Maker" variant="gold" size="sm" />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onOpenWhatsApp && onOpenWhatsApp(product)}
              style={styles.artisanChatBtn}
            >
              <Text style={styles.artisanChatIcon}>💬</Text>
              <Text style={styles.artisanChatText}>Chat with {product.artisanName.split(' ')[0]} on WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* Craft Story */}
          <Text style={styles.sectionHeading}>The Craft Heritage Story</Text>
          <Text style={styles.storyText}>{product.story || product.description}</Text>

          {/* Product Specifications Table */}
          <Text style={styles.sectionHeading}>Specifications & Materials</Text>
          <View style={styles.specTable}>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Craft Technique:</Text>
              <Text style={styles.specVal}>{product.craftTechnique || 'Handloom Korvai'}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Material Purity:</Text>
              <Text style={styles.specVal}>{product.material}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Physical Dimensions:</Text>
              <Text style={styles.specVal}>{product.dimensions || 'Standard'}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Handcrafting Time:</Text>
              <Text style={styles.specVal}>{product.productionDays || 14} days of skilled manual labour</Text>
            </View>
          </View>

          {/* Fair Trade Escrow Guarantee */}
          <View style={styles.escrowGuaranteeCard}>
            <Text style={styles.escrowGIcon}>🔒</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.escrowGTitle}>Artisan Escrow Protection</Text>
              <Text style={styles.escrowGDesc}>
                Your payment is securely held in trust and disbursed directly to the artisan's verified bank account upon certified delivery.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Purchase Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleAddToCart} style={styles.addCartButton}>
          <Text style={styles.addCartText}>{addedNotice ? '✓ Added to Cart!' : '+ Add to Cart'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBuyNow} style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now • Direct</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topNav: {
    position: 'absolute',
    top: 10,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.subtle,
  },
  navBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  topNavRight: {
    flexDirection: 'row',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  imageGalleryBox: {
    height: 340,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.surfaceSubtle,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailRow: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  thumbnailActive: {
    borderColor: colors.primary,
  },
  immersiveBar: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  immersiveActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  evidenceBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  immersiveIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  immersiveText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  detailsBox: {
    padding: 16,
    backgroundColor: colors.surface,
  },
  craftCategory: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    fontSize: 15,
    color: colors.gold,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    gap: 12,
  },
  priceVal: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  mrpVal: {
    fontSize: 14,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  impactMirrorCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginTop: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.25)',
    alignItems: 'center',
  },
  impactIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  impactBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  impactBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.emerald,
    letterSpacing: 0.5,
  },
  impactTapText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.emerald,
  },
  impactHeadline: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 16,
  },
  impactSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  artisanCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  artisanTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artisanChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  artisanChatIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  artisanChatText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  artisanAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  artisanMeta: {
    flex: 1,
  },
  artisanName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  artisanLocation: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 14,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  storyText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  specTable: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  specKey: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  specVal: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
    maxWidth: '55%',
    textAlign: 'right',
  },
  escrowGuaranteeCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.emerald,
    marginTop: 16,
    alignItems: 'center',
  },
  escrowGIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  escrowGTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#064E3B',
  },
  escrowGDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: '#065F46',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    ...shadows.card,
  },
  addCartButton: {
    flex: 1,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addCartText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  buyNowButton: {
    flex: 1.3,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ProductDetailScreen;
