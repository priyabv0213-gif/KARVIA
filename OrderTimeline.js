import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius } from '../../theme/typography';

export const OrderTimeline = ({ timeline = [], currentStatus = 'PLACED' }) => {
  const steps = [
    { key: 'PLACED', label: 'Order Placed', icon: '📝' },
    { key: 'CONFIRMED', label: 'Artisan Confirmed', icon: '🧑‍🎨' },
    { key: 'PROCESSING', label: 'Handcrafting & QC', icon: '✨' },
    { key: 'SHIPPED', label: 'Dispatched', icon: '🚚' },
    { key: 'DELIVERED', label: 'Delivered', icon: '🏡' },
  ];

  const getStepIndex = (st) => {
    return steps.findIndex((s) => s.key === st);
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Fulfillment Timeline</Text>

      {steps.map((step, idx) => {
        const isDone = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        const matchingDetail = timeline.find((t) => t.status === step.key);

        return (
          <View key={step.key} style={styles.stepRow}>
            {/* Timeline Line & Dot Indicator */}
            <View style={styles.indicatorCol}>
              <View
                style={[
                  styles.dot,
                  isDone && styles.dotDone,
                  isCurrent && styles.dotCurrent,
                ]}
              >
                <Text style={styles.stepIcon}>{step.icon}</Text>
              </View>
              {idx < steps.length - 1 && (
                <View style={[styles.line, isDone && idx < currentIndex && styles.lineDone]} />
              )}
            </View>

            {/* Step Content */}
            <View style={styles.contentCol}>
              <View style={styles.headerLine}>
                <Text style={[styles.stepLabel, isDone && styles.stepLabelDone]}>
                  {matchingDetail?.title || step.label}
                </Text>
                {matchingDetail?.date && (
                  <Text style={styles.stepDate}>{matchingDetail.date}</Text>
                )}
              </View>
              <Text style={styles.stepDesc}>
                {isCurrent
                  ? 'Currently in progress with master artisan and logistics partners.'
                  : isDone
                  ? 'Successfully completed step.'
                  : 'Pending previous milestone fulfillment.'}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 36,
    marginRight: 10,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: {
    backgroundColor: colors.emeraldLight,
    borderColor: colors.emerald,
  },
  dotCurrent: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  stepIcon: {
    fontSize: 14,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  lineDone: {
    backgroundColor: colors.emerald,
  },
  contentCol: {
    flex: 1,
    paddingTop: 4,
  },
  headerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stepLabelDone: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  stepDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  stepDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
});

export default OrderTimeline;
