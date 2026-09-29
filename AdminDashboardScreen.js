import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const AdminDashboardScreen = () => {
  const { products } = useProducts();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState('artisans'); // 'artisans' | 'moderation' | 'schemes' | '3dassets'

  // Pending verification queue
  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 'art_ramesh_02',
      name: 'Rameshwar Kumhar',
      craft: 'Jaipur Blue Pottery',
      region: 'Kot Jewar, Jaipur, Rajasthan',
      pehchanId: 'PEH-RJ-2024-5501',
      status: 'PENDING_APPROVAL',
      submittedAt: '2026-08-30',
    },
    {
      id: 'art_fatima_05',
      name: 'Fatima Khatun',
      craft: 'Bandhani Tie & Dye',
      region: 'Bhuj, Kutch, Gujarat',
      pehchanId: 'PEH-GJ-2024-1194',
      status: 'PENDING_APPROVAL',
      submittedAt: '2026-08-31',
    }
  ]);

  const handleApprove = (id) => {
    setVerificationQueue((prev) => prev.filter((item) => item.id !== id));
    alert('Artisan approved and granted Verified Maker badge on KARVIA marketplace.');
  };

  const handleReject = (id) => {
    setVerificationQueue((prev) => prev.filter((item) => item.id !== id));
    alert('Registration flagged for supplementary documentation.');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Admin Title Card */}
      <View style={styles.adminHero}>
        <View style={styles.badgeRow}>
          <Text style={styles.adminBadge}>ADMIN CONTROL CENTER</Text>
          <Badge label="Full Authority" variant="gold" size="sm" />
        </View>
        <Text style={[typography.h3, styles.heroTitle]}>Platform Integrity & Oversight</Text>
        <Text style={styles.heroSub}>
          Moderate handcrafted product listings, audit GI craft evidence, verify artisan Pehchan credentials, and manage schemes.
        </Text>
      </View>

      {/* System Metrics */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>128</Text>
          <Text style={styles.statLabel}>Verified Artisans</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{products.length}</Text>
          <Text style={styles.statLabel}>Active Crafts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{orders.length}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
      </View>

      {/* Admin Tab Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          onPress={() => setActiveTab('artisans')}
          style={[styles.tabBtn, activeTab === 'artisans' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabText, activeTab === 'artisans' && styles.tabTextActive]}>
            Artisan Approvals ({verificationQueue.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('moderation')}
          style={[styles.tabBtn, activeTab === 'moderation' && styles.tabBtnActive]}
        >
          <Text style={[styles.tabText, activeTab === 'moderation' && styles.tabTextActive]}>
            Product Moderation
          </Text>
        </TouchableOpacity>
      </View>

      {/* Queue View */}
      {activeTab === 'artisans' ? (
        <View>
          <Text style={styles.sectionHeader}>Pending Artisan Onboarding Queue</Text>
          {verificationQueue.length === 0 ? (
            <View style={styles.allClearCard}>
              <Text style={{ fontSize: 32 }}>✓</Text>
              <Text style={styles.allClearTitle}>All artisan registrations verified.</Text>
            </View>
          ) : (
            verificationQueue.map((item) => (
              <View key={item.id} style={styles.queueCard}>
                <View style={styles.queueHeader}>
                  <Text style={styles.artisanName}>{item.name}</Text>
                  <Badge label="Pehchan Check" variant="warning" size="sm" />
                </View>

                <Text style={styles.craftDetail}>{item.craft} • {item.region}</Text>
                <Text style={styles.pehchanText}>Pehchan ID: {item.pehchanId}</Text>

                <View style={styles.btnRow}>
                  <Button
                    title="✓ Approve Artisan"
                    size="sm"
                    onPress={() => handleApprove(item.id)}
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <Button
                    title="Request More Proof"
                    variant="outline"
                    size="sm"
                    onPress={() => handleReject(item.id)}
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            ))
          )}
        </View>
      ) : (
        /* Moderation View */
        <View>
          <Text style={styles.sectionHeader}>Live Products Content Moderation</Text>
          {products.map((p) => (
            <View key={p.id} style={styles.moderationCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modTitle} numberOfLines={1}>{p.title}</Text>
                <Text style={styles.modMeta}>{p.artisanName} • ₹{p.price.toLocaleString('en-IN')}</Text>
              </View>
              <Badge label={p.inStock ? 'Approved' : 'Unpublished'} variant="success" size="sm" />
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  adminHero: {
    backgroundColor: '#1E293B',
    borderRadius: borderRadius.xl,
    padding: 18,
    marginBottom: 14,
    ...shadows.card,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  adminBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroSub: {
    fontSize: 12,
    lineHeight: 18,
    color: '#94A3B8',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 3,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  tabBtnActive: {
    backgroundColor: colors.surface,
    ...shadows.subtle,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  queueCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artisanName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  craftDetail: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pehchanText: {
    fontSize: 11,
    color: colors.primaryDark,
    fontWeight: '600',
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  moderationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: borderRadius.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  modMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  allClearCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 30,
    alignItems: 'center',
  },
  allClearTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 8,
  },
});

export default AdminDashboardScreen;
