import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { PAYMENT_METHODS, initiatePaymentOrder, verifyPaymentSignature } from '../../services/paymentService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const CheckoutScreen = ({ onOrderSuccess, onBack }) => {
  const { total, subtotal, shippingFee, createOrder } = useCart();
  const { user } = useAuth();

  // Form State
  const [fullName, setFullName] = useState(user?.name || 'Priya Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98401 23456');
  const [address, setAddress] = useState('Flat 4B, Heritage Enclave, Gandhi Road');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('560001');
  const [selectedPayment, setSelectedPayment] = useState('upi');

  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatusText, setPaymentStatusText] = useState('');

  const handlePayAndPlaceOrder = async () => {
    if (!fullName || !phone || !address || !city || !pincode) {
      alert('Please fill in complete shipping details.');
      return;
    }

    setIsProcessing(true);
    setPaymentStatusText('1/3 Initiating secure payment gateway session...');

    try {
      // 1. Initiate order token with gateway
      const paymentOrder = await initiatePaymentOrder({
        orderId: `req_${Date.now()}`,
        amount: total,
        customerInfo: { name: fullName, phone, email: user?.email },
      });

      setPaymentStatusText('2/3 Processing bank authentication & UPI authorization...');

      // 2. Simulate server-side cryptographic signature verification
      const verifyResult = await verifyPaymentSignature({
        gatewayOrderId: paymentOrder.gatewayOrderId,
        paymentId: `pay_kv_${Math.random().toString(36).substr(2, 9)}`,
        signature: 'sig_rsa_sha256_mock_verified',
      });

      if (!verifyResult.success) {
        throw new Error(verifyResult.error || 'Payment gateway failed to verify.');
      }

      setPaymentStatusText('3/3 Securing funds in artisan direct escrow...');

      // 3. Create persistent order in database
      const fullShippingAddress = `${fullName}, ${address}, ${city}, Pincode: ${pincode}, Phone: ${phone}`;
      const confirmedOrder = await createOrder({
        buyerInfo: { uid: user?.uid || 'usr_buyer', name: fullName, phone },
        shippingAddress: fullShippingAddress,
        paymentMethod: PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.name || 'UPI',
      });

      setIsProcessing(false);
      if (onOrderSuccess) {
        onOrderSuccess(confirmedOrder);
      }
    } catch (e) {
      setIsProcessing(false);
      alert(`Payment Failed: ${e.message}. Please retry.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={[typography.h3, styles.title]}>Secure Artisan Checkout</Text>
        <Badge label="256-bit Encrypted" variant="success" size="sm" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Shipping Address Form */}
        <Text style={styles.sectionTitle}>1. Delivery Destination</Text>
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Recipient Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
          />

          <Text style={styles.inputLabel}>Mobile Phone Number (for delivery OTP)</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Phone"
          />

          <Text style={styles.inputLabel}>House/Flat No., Street & Locality</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.inputLabel}>City / Town</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>PIN Code</Text>
              <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Payment Method Selector */}
        <Text style={styles.sectionTitle}>2. Payment Method</Text>
        <View style={styles.paymentMethodsList}>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedPayment === method.id;

            return (
              <TouchableOpacity
                key={method.id}
                activeOpacity={0.8}
                onPress={() => setSelectedPayment(method.id)}
                style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
              >
                <Text style={styles.paymentEmoji}>
                  {method.id === 'upi' ? '⚡' : method.id === 'cards' ? '💳' : method.id === 'netbanking' ? '🏛️' : '💵'}
                </Text>
                <View style={styles.paymentInfo}>
                  <Text style={[styles.paymentName, isSelected && styles.paymentNameSelected]}>
                    {method.name}
                  </Text>
                  <Text style={styles.paymentDesc}>
                    {method.id === 'upi'
                      ? 'Instant verification via UPI App'
                      : method.id === 'cod'
                      ? 'Pay in cash after inspecting GI tag'
                      : 'Secure online bank transfer'}
                  </Text>
                </View>
                {isSelected ? (
                  <View style={styles.radioActive} />
                ) : (
                  <View style={styles.radioInactive} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Escrow Guarantee Box */}
        <View style={styles.escrowCard}>
          <Text style={styles.escrowIcon}>🛡️</Text>
          <Text style={styles.escrowText}>
            Direct-to-Artisan Escrow: Money is held securely by KARVIA and transferred directly to the maker once delivery and GI integrity are verified.
          </Text>
        </View>

        {/* Processing Indicator */}
        {isProcessing && (
          <View style={styles.processingBox}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={styles.processingText}>{paymentStatusText}</Text>
          </View>
        )}

        {/* Final Pay Button */}
        <Button
          title={isProcessing ? 'Verifying Payment...' : `Confirm & Pay ₹${total.toLocaleString('en-IN')}`}
          onPress={handlePayAndPlaceOrder}
          loading={isProcessing}
          size="lg"
          style={styles.payBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 6,
  },
  backBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  title: {
    color: colors.textPrimary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.textPrimary,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  paymentMethodsList: {
    marginTop: 4,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  paymentEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  paymentNameSelected: {
    color: colors.primaryDark,
  },
  paymentDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radioActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.surface,
  },
  radioInactive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  escrowCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.emerald,
    marginVertical: 14,
    alignItems: 'center',
  },
  escrowIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  escrowText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: '#064E3B',
    fontWeight: '600',
  },
  processingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    padding: 12,
    borderRadius: borderRadius.md,
    marginBottom: 10,
  },
  processingText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 10,
  },
  payBtn: {
    marginTop: 8,
  },
});

export default CheckoutScreen;
