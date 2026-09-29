import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export const ArtisanEarningsScreen = () => {
  const { orders } = useCart();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'traffic' | 'motifs'

  const completedOrders = orders.filter((o) => o.status === 'DELIVERED');
  const pendingOrders = orders.filter((o) => o.status !== 'DELIVERED');

  const totalCompletedAmount = completedOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalPendingAmount = pendingOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalGrossVolume = totalCompletedAmount + totalPendingAmount;

  // Business Intelligence Simulated Analytics
  const analyticsData = {
    monthlyViews: 1420,
    uniquePatrons: 840,
    inquiryConversations: 18,
    conversionRate: '4.2%',
    popularMotifs: [
      { name: 'Temple Spire (Gopuram)', craft: 'Kanchipuram Silk', views: 580, interest: 'Very High' },
      { name: 'Persian Arabesque Floral', craft: 'Blue Pottery', views: 420, interest: 'High' },
      { name: 'Sacred Nandi Spiral', craft: 'Lost-Wax Bell Metal', views: 310, interest: 'Moderate' },
      { name: 'Kohbar Tree of Life', craft: 'Madhubani Art', views: 240, interest: 'Growing' },
    ],
    patronGeography: [
      { city: 'Chennai & Tamil Nadu', percentage: '38%' },
      { city: 'Bengaluru & Karnataka', percentage: '26%' },
      { city: 'Mumbai & Pune', percentage: '18%' },
      { city: 'Delhi NCR', percentage: '11%' },
      { city: 'International (Diaspora)', percentage: '7%' },
    ],
    marketTrends: [
      { title: 'Upcoming Festive Wedding Season', recommendation: 'Increased demand for 3-ply gold zari sarees in crimson and forest green.' },
      { title: 'Sustainable Interior Decor Demand', recommendation: 'High buyer search for natural clay pottery and bell-metal desk sculptures.' },
    ],
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Analytics Disclaimer Notice */}
      <View style={styles.prototypeNotice}>
        <Text style={styles.noticeIcon}>📊</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.noticeTitle}>Artisan Business Intelligence Suite</Text>
          <Text style={styles.noticeDesc}>
            Real-time analytics aggregating patron views, inquiries, and India Post escrow settlements. Sample benchmarks active.
          </Text>
        </View>
      </View>

      {/* Gross Revenue Hero */}
      <View style={styles.revenueHeroCard}>
        <Text style={styles.heroSub}>TOTAL DIRECT ESCROW SETTLEMENTS</Text>
        <Text style={styles.heroAmount}>₹{totalGrossVolume.toLocaleString('en-IN')}</Text>
        <View style={styles.escrowNotice}>
          <Text style={styles.escrowIcon}>🔒</Text>
          <Text style={styles.escrowText}>Direct-to-Artisan Bank Account • Zero Middlemen Commission</Text>
        </View>
      </View>

      {/* Payout Balance Split */}
      <View style={styles.balanceSplitRow}>
        <View style={[styles.balanceBox, styles.balanceAvailable]}>
          <Text style={styles.balanceBoxLabel}>Available for Payout</Text>
          <Text style={[styles.balanceBoxVal, { color: colors.emerald }]}>
            ₹{totalCompletedAmount.toLocaleString('en-IN')}
          </Text>
          <Badge label="Released to Bank" variant="success" size="sm" />
        </View>

        <View style={[styles.balanceBox, styles.balancePending]}>
          <Text style={styles.balanceBoxLabel}>In-Transit Escrow</Text>
          <Text style={[styles.balanceBoxVal, { color: colors.primary }]}>
            ₹{totalPendingAmount.toLocaleString('en-IN')}
          </Text>
          <Badge label="Dispatches Active" variant="warning" size="sm" />
        </View>
      </View>

      {/* 4 Core Business Metric Pills */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiIcon}>👁️</Text>
          <Text style={styles.kpiVal}>{analyticsData.monthlyViews.toLocaleString()}</Text>
          <Text style={styles.kpiLabel}>Product Views</Text>
          <Text style={styles.kpiTrend}>+18% this month</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiIcon}>💬</Text>
          <Text style={styles.kpiVal}>{analyticsData.inquiryConversations}</Text>
          <Text style={styles.kpiLabel}>Buyer Inquiries</Text>
          <Text style={styles.kpiTrend}>via WhatsApp</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiIcon}>📦</Text>
          <Text style={styles.kpiVal}>{orders.length}</Text>
          <Text style={styles.kpiLabel}>Total Orders</Text>
          <Text style={styles.kpiTrend}>100% verified</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiIcon}>🎯</Text>
          <Text style={styles.kpiVal}>{analyticsData.conversionRate}</Text>
          <Text style={styles.kpiLabel}>Conversion</Text>
          <Text style={styles.kpiTrend}>Patron to buyer</Text>
        </View>
      </View>

      {/* Popular Motifs & Craft Interest */}
      <Text style={styles.sectionHeader}>Most Popular Traditional Motifs</Text>
      <View style={styles.cardSection}>
        {analyticsData.popularMotifs.map((motif, i) => (
          <View key={i} style={styles.motifRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.motifName}>{motif.name}</Text>
              <Text style={styles.motifCraft}>{motif.craft} • {motif.views} patron views</Text>
            </View>
            <Badge
              label={motif.interest}
              variant={i === 0 ? 'primary' : i === 1 ? 'gold' : 'outline'}
              size="sm"
            />
          </View>
        ))}
      </View>

      {/* Patron Demographics & Geography */}
      <Text style={styles.sectionHeader}>Patron Locations & Geographic Reach</Text>
      <View style={styles.cardSection}>
        {analyticsData.patronGeography.map((geo, i) => (
          <View key={i} style={styles.geoRow}>
            <Text style={styles.geoCity}>{geo.city}</Text>
            <View style={styles.geoBarContainer}>
              <View style={[styles.geoBarFill, { width: geo.percentage }]} />
            </View>
            <Text style={styles.geoPercent}>{geo.percentage}</Text>
          </View>
        ))}
      </View>

      {/* Emerging Market Trends & Design Fusion */}
      <Text style={styles.sectionHeader}>Emerging Market Demands</Text>
      {analyticsData.marketTrends.map((trend, i) => (
        <View key={i} style={styles.trendCard}>
          <Text style={styles.trendTitle}>📈 {trend.title}</Text>
          <Text style={styles.trendRec}>{trend.recommendation}</Text>
        </View>
      ))}

      {/* Monthly Sales Breakdown */}
      <Text style={styles.sectionHeader}>Monthly Escrow Payout History</Text>
      <View style={styles.cardSection}>
        <View style={styles.monthRow}>
          <View>
            <Text style={styles.monthName}>August 2026</Text>
            <Text style={styles.monthOrders}>2 handloom silk saree orders completed</Text>
          </View>
          <Text style={styles.monthAmount}>₹37,000</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.monthRow}>
          <View>
            <Text style={styles.monthName}>July 2026</Text>
            <Text style={styles.monthOrders}>1 ceremonial silk saree order</Text>
          </View>
          <Text style={styles.monthAmount}>₹18,500</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.monthRow}>
          <View>
            <Text style={styles.monthName}>June 2026</Text>
            <Text style={styles.monthOrders}>2 custom weave orders</Text>
          </View>
          <Text style={styles.monthAmount}>₹31,200</Text>
        </View>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  prototypeNotice: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    alignItems: 'center',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  noticeDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  revenueHeroCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.card,
  },
  heroSub: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: 6,
  },
  escrowNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    marginTop: 2,
  },
  escrowIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  escrowText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  balanceSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 10,
  },
  balanceBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  balanceAvailable: {
    borderLeftWidth: 4,
    borderLeftColor: colors.emerald,
  },
  balancePending: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  balanceBoxLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  balanceBoxVal: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 4,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  kpiIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  kpiVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  kpiLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  kpiTrend: {
    fontSize: 10,
    color: colors.emerald,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 14,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    ...shadows.subtle,
  },
  motifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  motifName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  motifCraft: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  geoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  geoCity: {
    width: 130,
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  geoBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  geoBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  geoPercent: {
    width: 34,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    textAlign: 'right',
  },
  trendCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trendTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  trendRec: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  monthOrders: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  monthAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.emerald,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
});

export default ArtisanEarningsScreen;
