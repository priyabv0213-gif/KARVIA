import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius } from '../../theme/typography';

export const Badge = ({
  label,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'info' | 'gold' | 'outline'
  size = 'md', // 'sm' | 'md'
  icon = null,
}) => {
  const getBadgeStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.successLight, text: colors.success, border: colors.success };
      case 'warning':
        return { bg: colors.warningLight, text: colors.warning, border: colors.warning };
      case 'info':
        return { bg: colors.infoLight, text: colors.info, border: colors.info };
      case 'gold':
        return { bg: colors.goldLight, text: '#8A6D15', border: colors.gold };
      case 'outline':
        return { bg: 'transparent', text: colors.textSecondary, border: colors.border };
      case 'primary':
      default:
        return { bg: colors.primaryLight, text: colors.primary, border: colors.primary };
    }
  };

  const styleConfig = getBadgeStyles();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: styleConfig.bg, borderColor: styleConfig.border },
        isSmall && styles.containerSmall,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        style={[
          styles.label,
          typography.badge,
          { color: styleConfig.text },
          isSmall && styles.labelSmall,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  containerSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  iconContainer: {
    marginRight: 4,
  },
  label: {
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 10,
  },
});

export default Badge;
