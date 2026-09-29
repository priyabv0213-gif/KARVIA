import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';

export const CartScreen = ({ onProceedCheckout, onContinueShopping }) => {
  const { items, updateQuantity, removeFromCart, subtotal, shippingFee, total } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ fontSize: 52 }}>🛍️</Text>
        <Text style={styles.emptyTitle}>Your cart is empty.</Text>
        <Text style={styles.emptySub}>Discover authentic handcrafted treasures directly from master Indian artisans.</Text>
        <Button
          title="Browse Authentic Crafts"
          onPress={onContinueShopping}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
        <Text style={styles.headerTitle}>Shopping Bag ({items.length} items)</Text>

        {/* Cart Items */}
        {items.map((item) => (
          <View key={item.productId} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.itemArtisan}>By {item.artisanName}</Text>
              <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>

              {/* Quantity Controls & Remove */}
              <View style={styles.qtyRow}>
                <View style={styles.stepperBox}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.productId, -1)}
                    style={styles.stepperBtn}
                  >
                    <Text style={styles.stepperBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyVal}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.productId, 1)}
                    style={styles.stepperBtn}
                  >
                    <Text style={styles.stepperBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeFromCart(item.productId)}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Free Shipping Banner */}
        <View style={styles.shippingNotice}>
          <Text style={styles.shippingIcon}>📦</Text>
          <Text style={styles.shippingNoticeText}>
            {subtotal >= 2000
              ? '🎉 You have unlocked Free Express Insured Shipping!'
              : `Add ₹${(2000 - subtotal).toLocaleString('en-IN')} more to unlock Free Shipping.`}
          </Text>
        </View>

        {/* Order Price Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>PRICE DETAILS</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryVal}>₹{subtotal.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Insured Shipping</Text>
            <Text style={styles.summaryVal}>
              {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Middlemen Fee</Text>
            <Text style={[styles.summaryVal, { color: colors.emerald, fontWeight: '700' }]}>₹0 (Zero Fee)</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalVal}>₹{total.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Checkout Button */}
      <View style={styles.bottomCheckoutBar}>
        <View>
          <Text style={styles.barTotalLabel}>Total to Pay:</Text>
          <Text style={styles.barTotalVal}>₹{total.toLocaleString('en-IN')}</Text>
        </View>
        <Button
          title="Proceed to Checkout →"
          onPress={onProceedCheckout}
          style={styles.checkoutBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollList: {
    padding: 16,
    paddingBottom: 90,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSubtle,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  itemArtisan: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  stepperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepperBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  qtyVal: {
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    fontSize: 12,
    color: colors.error,
    fontWeight: '600',
  },
  shippingNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: 10,
    marginVertical: 10,
  },
  shippingIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  shippingNoticeText: {
    fontSize: 11,
    color: colors.primaryDark,
    fontWeight: '600',
    flex: 1,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 6,
    ...shadows.subtle,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    marginBottom: 10,
    letterSpacing: 0.6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  summaryVal: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  bottomCheckoutBar: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.card,
  },
  barTotalLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  barTotalVal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  checkoutBtn: {
    minWidth: 190,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 14,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default CartScreen;
