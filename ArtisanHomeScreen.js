import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const ArtisanHomeScreen = ({
  onOpenVoiceAssistant,
  onOpenAddProduct,
  onOpenImageEnhance,
  onOpenFairPricing,
  onOpenMarketplace,
  onOpenCraftEvidence,
  onOpenLivingArchive,
  onOpenTrendFusion,
  onOpenBusinessInsights,
  onOpenSchemes,
  onOpenWhatsApp,
  onOpenVirtualTryOn,
  onOpenRawMaterials,
  onNavigateTab,
}) => {
  const { user } = useAuth();
  const { t, currentLocale } = useLanguage();
  const { products, drafts } = useProducts();
  const { orders } = useCart();

  // Artisan products & stats
  const artisanProducts = products.filter(
    (p) => p.artisanId === user?.uid || p.artisanId === 'art_meena_01' || p.artisanName === user?.name
  );
  const activeOrdersCount = orders.filter((o) => o.status !== 'DELIVERED').length;
  const totalSalesAmount = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const greeting = t('goodMorning', 'Good day');
  const artisanDisplayName = user?.name ? user.name.split(' ')[0] : 'Artisan';

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Personalized Dynamic Artisan Greeting Banner */}
      <View style={styles.welcomeBanner}>
        <View style={styles.welcomeInfo}>
          <Text style={styles.greetingText}>{greeting}, {artisanDisplayName} 👋</Text>
          <Text style={styles.regionText}>
            {user?.craftName || 'Traditional Handloom'} • {user?.region || 'India'}
          </Text>
          {user?.craftCluster && (
            <Text style={styles.clusterSub}>{user.craftCluster}</Text>
          )}
        </View>
        <View style={styles.avatarPill}>
          <Text style={styles.avatarEmoji}>🧵</Text>
        </View>
      </View>

      {/* 1. PROMINENT KARVIA VOICE-FIRST AI ASSISTANT HERO CARD */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onOpenVoiceAssistant}
        style={styles.voiceAssistantHeroCard}
      >
        <View style={styles.voiceHeroContent}>
          <View style={styles.voiceBadgeRow}>
            <Text style={styles.voicePillTag}>VOICE-FIRST AI ASSISTANT</Text>
            <Badge label="13 Languages" variant="gold" size="sm" />
          </View>
          <Text style={[typography.h3, styles.voiceHeroTitle]}>Speak to KARVIA in Your Language</Text>
          <Text style={styles.voiceHeroSub}>
            {currentLocale === 'ta'
              ? 'உங்கள் குரலில் பேசி கைவினைப் பொருட்களைச் சேர்க்கவும்...'
              : currentLocale === 'hi'
              ? 'अपनी भाषा में बोलें और शिल्प सूची बनाएं...'
              : 'Tap to catalog crafts, check prices, or find schemes with your voice...'}
          </Text>
        </View>

        <View style={styles.micCircle}>
          <Text style={styles.micCircleIcon}>🎙️</Text>
        </View>
      </TouchableOpacity>

      {/* Voice Quick Action Hints */}
      <View style={styles.voiceHintsRow}>
        <TouchableOpacity
          onPress={onOpenAddProduct}
          style={styles.voiceHintChip}
        >
          <Text style={styles.hintChipText}>"Add my craft"</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onOpenFairPricing}
          style={styles.voiceHintChip}
        >
          <Text style={styles.hintChipText}>"Fair price guide"</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onOpenImageEnhance}
          style={styles.voiceHintChip}
        >
          <Text style={styles.hintChipText}>"Enhance photo"</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onOpenLivingArchive}
          style={styles.voiceHintChip}
        >
          <Text style={styles.hintChipText}>"Living Archive"</Text>
        </TouchableOpacity>
      </View>

      {/* 2. BUSINESS PERFORMANCE OVERVIEW */}
      <Text style={styles.sectionTitle}>Craft Business Overview</Text>
      <View style={styles.metricsGrid}>
        {/* Products */}
        <TouchableOpacity
          onPress={() => onNavigateTab && onNavigateTab('products')}
          style={styles.metricCard}
        >
          <Text style={styles.metricIcon}>📦</Text>
          <Text style={styles.metricVal}>{artisanProducts.length}</Text>
          <Text style={styles.metricLabel}>Live Products</Text>
          {drafts.length > 0 && <Text style={styles.metricSub}>{drafts.length} drafts saved</Text>}
        </TouchableOpacity>

        {/* Orders */}
        <TouchableOpacity
          onPress={() => onNavigateTab && onNavigateTab('orders')}
          style={styles.metricCard}
        >
          <Text style={styles.metricIcon}>🚚</Text>
          <Text style={[styles.metricVal, { color: colors.primary }]}>{activeOrdersCount}</Text>
          <Text style={styles.metricLabel}>Active Orders</Text>
          <Text style={styles.metricSub}>India Post Escrow</Text>
        </TouchableOpacity>

        {/* Revenue */}
        <TouchableOpacity
          onPress={onOpenBusinessInsights}
          style={styles.metricCard}
        >
          <Text style={styles.metricIcon}>💰</Text>
          <Text style={[styles.metricVal, { color: colors.emerald }]}>
            ₹{totalSalesAmount.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.metricLabel}>Direct Escrow</Text>
          <Text style={styles.metricSub}>88% to Maker</Text>
        </TouchableOpacity>

        {/* Buyer Inquiries */}
        <TouchableOpacity
          onPress={onOpenWhatsApp}
          style={styles.metricCard}
        >
          <Text style={styles.metricIcon}>💬</Text>
          <Text style={[styles.metricVal, { color: colors.indigo }]}>4</Text>
          <Text style={styles.metricLabel}>Buyer Inquiries</Text>
          <Text style={styles.metricSub}>Direct WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* 3. COMPLETE KARVIA ECOSYSTEM TOOLS */}
      <Text style={styles.sectionTitle}>KARVIA Digital Ecosystem</Text>

      {/* 1. Multilingual AI Smart Cataloguer */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenAddProduct}
        style={styles.ecosystemCard}
      >
        <View style={styles.cardIconBox}>
          <Text style={styles.cardEmoji}>📸</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>AI Smart Product Cataloguer</Text>
            <Badge label="Multilingual" variant="primary" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Photograph your craft, speak details in your language, and let AI generate structured specs with cultural significance. You retain 100% edit control.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 2. AI Craft Image Enhancement */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenImageEnhance}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.goldLight }]}>
          <Text style={styles.cardEmoji}>✨</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Craft Image Enhancement</Text>
            <Badge label="Dye Hue Lock" variant="gold" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Balance studio lighting and sharpen zari and weave textures while strictly preserving natural dye colors and traditional motifs.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 3. Living-Wage Fair Pricing Assistant */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenFairPricing}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.emeraldLight }]}>
          <Text style={styles.cardEmoji}>⚖️</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Living-Wage Fair Pricing</Text>
            <Badge label="Skill & Complexity" variant="success" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Calculate fair cost-plus selling prices factoring in raw materials, weaving hours, Master vs Senior artisan skill tiers, and regional baselines.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 4. Guru–Shishya / Living Craft Archive */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenLivingArchive}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: 'rgba(212, 175, 55, 0.2)' }]}>
          <Text style={styles.cardEmoji}>📜</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Guru–Shishya Living Archive</Text>
            <Badge label="Tacit Knowledge" variant="gold" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Preserve tacit ancestral techniques, master-apprentice lineages, loom secrets, and voice oral histories for the next generation.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 5. Craft Evidence & GI Authenticity */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onOpenCraftEvidence && onOpenCraftEvidence(artisanProducts[0])}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.primaryLight }]}>
          <Text style={styles.cardEmoji}>🛡️</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Craft Evidence & GI Authenticity</Text>
            <Badge label="Provenance Hash" variant="primary" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Transparent multi-factor audit: macro warp photos, making videos, Silk Mark tests, master declarations, and unique Provenance Fingerprints.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 6. Trend Fusion Studio */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenTrendFusion}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.indigoLight }]}>
          <Text style={styles.cardEmoji}>🎨</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Trend Fusion Studio</Text>
            <Badge label="Heritage Preserved" variant="info" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Explore contemporary global palettes and sustainable fashion directions while strictly honoring sacred techniques and motifs.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 7. Business Intelligence Suite */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenBusinessInsights}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.surfaceSubtle }]}>
          <Text style={styles.cardEmoji}>📊</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Business Intelligence & Insights</Text>
            <Badge label="Traffic & Trends" variant="outline" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Track patron product views, buyer conversation conversions, popular motifs, escrow payout timelines, and regional customer interest.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 8. Government Schemes & Subsidies */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenSchemes}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.goldLight }]}>
          <Text style={styles.cardEmoji}>🏛️</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Government Schemes & Support</Text>
            <Badge label="PM Vishwakarma" variant="gold" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Check customized eligibility for toolkit subsidies (₹15,000), collateral-free credit, AHVY cluster grants, and Pehchan ID registration.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 9. Direct Buyer Communication & WhatsApp */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenWhatsApp}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.emeraldLight }]}>
          <Text style={styles.cardEmoji}>💬</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Direct Buyer Communication</Text>
            <Badge label="WhatsApp" variant="success" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Engage with conscious buyers for custom weave commissions, bespoke color choices, and direct patron relationships.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 10. Raw Material Collective Demand Pooling */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenRawMaterials}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.surfaceSubtle }]}>
          <Text style={styles.cardEmoji}>🌾</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Cluster Raw Material Pooling</Text>
            <Badge label="Save ~24%" variant="outline" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Pool silk yarn, gold zari, and natural indigo demand with regional cluster peers to procure raw materials at wholesale bulk rates.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 11. Virtual Try-On & 3D Visualization */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onOpenVirtualTryOn && onOpenVirtualTryOn(artisanProducts[0])}
        style={styles.ecosystemCard}
      >
        <View style={[styles.cardIconBox, { backgroundColor: 'rgba(15, 23, 42, 0.1)' }]}>
          <Text style={styles.cardEmoji}>🥽</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Virtual Try-On & 3D Space</Text>
            <Badge label="Immersive Tech" variant="outline" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            Preview saree drape styles on digital avatars and test pottery placement in living spaces to help patrons visualize your creations.
          </Text>
        </View>
      </TouchableOpacity>

      {/* 12. Browse Live Marketplace as Buyer */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenMarketplace}
        style={[styles.ecosystemCard, { borderColor: colors.primary }]}
      >
        <View style={[styles.cardIconBox, { backgroundColor: colors.primaryLight }]}>
          <Text style={styles.cardEmoji}>🏛️</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Marketplace & Patron View</Text>
            <Badge label="Live Market" variant="primary" size="sm" />
          </View>
          <Text style={styles.cardDesc}>
            See how conscious global buyers explore your craft catalog, discover authentic regional GI tags, and experience your story.
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeInfo: {
    flex: 1,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  regionText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  clusterSub: {
    fontSize: 11,
    color: colors.primary,
    marginTop: 1,
    fontWeight: '500',
  },
  avatarPill: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  voiceAssistantHeroCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.card,
  },
  voiceHeroContent: {
    flex: 1,
    paddingRight: 10,
  },
  voiceBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  voicePillTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    letterSpacing: 0.6,
  },
  voiceHeroTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  voiceHeroSub: {
    color: '#FBECE5',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  micCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.subtle,
  },
  micCircleIcon: {
    fontSize: 28,
  },
  voiceHintsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    gap: 6,
  },
  voiceHintChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  hintChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 18,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: borderRadius.lg,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  metricIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  metricVal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  metricSub: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },
  ecosystemCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardEmoji: {
    fontSize: 22,
  },
  cardInfo: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 6,
  },
  cardDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
});

export default ArtisanHomeScreen;
