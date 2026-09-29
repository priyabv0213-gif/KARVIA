import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useCart } from '../../context/CartContext';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const ArtisanOrdersScreen = () => {
  const { orders, updateOrderStatus } = useCart();
  const [filterState, setFilterState] = useState('all'); // 'all' | 'pending' | 'shipped' | 'delivered'

  const filteredOrders = orders.filter((o) => {
    if (filterState === 'pending') return o.status === 'PLACED' || o.status === 'CONFIRMED' || o.status === 'PROCESSING';
    if (filterState === 'shipped') return o.status === 'SHIPPED';
    if (filterState === 'delivered') return o.status === 'DELIVERED';
    return true;
  });

  const handleAdvanceStatus = (order) => {
    if (order.status === 'PLACED') {
      updateOrderStatus(order.id, 'CONFIRMED');
    } else if (order.status === 'CONFIRMED') {
      updateOrderStatus(order.id, 'PROCESSING');
    } else if (order.status === 'PROCESSING') {
      updateOrderStatus(order.id, 'SHIPPED');
    } else if (order.status === 'SHIPPED') {
      updateOrderStatus(order.id, 'DELIVERED');
    }
  };

  const getNextActionTitle = (status) => {
    switch (status) {
      case 'PLACED':
        return '✓ Accept Order';
      case 'CONFIRMED':
        return 'Start Handcrafting';
      case 'PROCESSING':
        return '📦 Dispatch via India Post';
      case 'SHIPPED':
        return 'Mark Delivered';
      case 'DELIVERED':
      default:
        return 'Order Completed';
    }
  };

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {['all', 'pending', 'shipped', 'delivered'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilterState(f)}
            style={[styles.filterChip, filterState === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, filterState === f && styles.filterChipTextActive]}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ordersList}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 44 }}>📦</Text>
            <Text style={styles.emptyTitle}>No orders in this view</Text>
            <Text style={styles.emptySub}>Incoming customer orders will appear here in real-time.</Text>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              {/* Top Meta Line */}
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderIdText}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</Text>
                </View>
                <Badge
                  label={order.status}
                  variant={order.status === 'DELIVERED' ? 'success' : order.status === 'SHIPPED' ? 'info' : 'warning'}
                />
              </View>

              {/* Items List */}
              {order.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.itemQtyPrice}>
                      Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Buyer & Shipping Info */}
              <View style={styles.buyerInfoBox}>
                <Text style={styles.buyerLabel}>Delivery Destination:</Text>
                <Text style={styles.buyerName}>{order.buyerName} ({order.buyerPhone})</Text>
                <Text style={styles.buyerAddress}>{order.shippingAddress}</Text>
              </View>

              {/* Footer Total & Action */}
              <View style={styles.orderFooter}>
                <View>
                  <Text style={styles.totalLabel}>Total Payout (Escrow):</Text>
                  <Text style={styles.totalVal}>₹{order.totalAmount.toLocaleString('en-IN')}</Text>
                </View>

                {order.status !== 'DELIVERED' ? (
                  <Button
                    title={getNextActionTitle(order.status)}
                    onPress={() => handleAdvanceStatus(order)}
                    size="sm"
                    style={styles.actionBtn}
                  />
                ) : (
                  <View style={styles.completedPill}>
                    <Text style={styles.completedText}>✓ Payout Released</Text>
                  </View>
                )}
              </View>
            </View>
          ))
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    marginBottom: 10,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  orderDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceSubtle,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  itemQtyPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  buyerInfoBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 10,
    marginVertical: 8,
  },
  buyerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  buyerName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  buyerAddress: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  totalLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  actionBtn: {
    minWidth: 140,
  },
  completedPill: {
    backgroundColor: colors.emeraldLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  completedText: {
    color: colors.emerald,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
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
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default ArtisanOrdersScreen;
