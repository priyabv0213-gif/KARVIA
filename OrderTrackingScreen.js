import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useCart } from '../../context/CartContext';
import OrderTimeline from '../../components/buyer/OrderTimeline';
import Badge from '../../components/common/Badge';

export const OrderTrackingScreen = () => {
  const { orders } = useCart();
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <View style={styles.container}>
      {/* Top Orders Horizontal Switcher */}
      <View style={styles.ordersTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {orders.map((order) => {
            const isSelected = order.id === selectedOrderId;

            return (
              <TouchableOpacity
                key={order.id}
                onPress={() => setSelectedOrderId(order.id)}
                style={[styles.orderTabChip, isSelected && styles.orderTabChipActive]}
              >
                <Text style={[styles.orderTabId, isSelected && styles.orderTabIdActive]}>
                  #{order.id}
                </Text>
                <Badge
                  label={order.status}
                  variant={order.status === 'DELIVERED' ? 'success' : 'warning'}
                  size="sm"
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Selected Order Detailed Tracking View */}
      {selectedOrder ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Order Summary Box */}
          <View style={styles.orderCard}>
            <View style={styles.orderTopRow}>
              <View>
                <Text style={styles.orderTitle}>Order #{selectedOrder.id}</Text>
                <Text style={styles.orderSub}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Badge
                label={selectedOrder.status}
                variant={selectedOrder.status === 'DELIVERED' ? 'success' : 'info'}
              />
            </View>

            {/* Items */}
            {selectedOrder.items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImg} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.itemMeta}>By {item.artisanName}</Text>
                  <Text style={styles.itemPrice}>Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')}</Text>
                </View>
              </View>
            ))}

            {/* Tracking ID & Carrier */}
            <View style={styles.trackingInfoBox}>
              <Text style={styles.trackingLabel}>Logistics Carrier:</Text>
              <Text style={styles.trackingVal}>India Post SpeedPost Handloom Express</Text>
              <Text style={styles.trackingLabel}>Airway Bill / Tracking ID:</Text>
              <Text style={styles.trackingNumber}>{selectedOrder.trackingNumber || 'IN-POST-KANCHI-99820'}</Text>
            </View>
          </View>

          {/* Visual Order Timeline Component */}
          <OrderTimeline
            timeline={selectedOrder.timeline}
            currentStatus={selectedOrder.status}
          />

          {/* Artisan Direct Escrow Status */}
          <View style={styles.escrowStatusCard}>
            <Text style={styles.escrowIcon}>🛡️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.escrowTitle}>Artisan Escrow Protection Active</Text>
              <Text style={styles.escrowSub}>
                Funds will be released directly to {selectedOrder.items[0]?.artisanName || 'the artisan'} once delivery is certified.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 48 }}>📦</Text>
          <Text style={styles.emptyTitle}>No orders placed yet.</Text>
          <Text style={styles.emptySub}>Your purchase orders will appear here for live milestone tracking.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ordersTabs: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderTabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    gap: 6,
  },
  orderTabChipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  orderTabId: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  orderTabIdActive: {
    color: colors.primary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  orderSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceSubtle,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  itemMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  trackingInfoBox: {
    backgroundColor: colors.surfaceSubtle,
    padding: 12,
    borderRadius: borderRadius.md,
    marginTop: 10,
  },
  trackingLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  trackingVal: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 6,
  },
  trackingNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  escrowStatusCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.emerald,
    marginTop: 12,
    alignItems: 'center',
  },
  escrowIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  escrowTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#064E3B',
  },
  escrowSub: {
    fontSize: 11,
    color: '#065F46',
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default OrderTrackingScreen;
