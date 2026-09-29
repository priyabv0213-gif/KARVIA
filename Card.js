import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius, shadows } from '../../theme/typography';

export const Card = ({
  children,
  onPress,
  style,
  elevated = true,
  outlined = false,
  bordered = true,
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        elevated && shadows.card,
        bordered && styles.bordered,
        outlined && styles.outlined,
        style,
      ]}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginVertical: 6,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlined: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;
