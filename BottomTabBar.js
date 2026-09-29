import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { shadows } from '../../theme/typography';

export const BottomTabBar = ({ activeTab, onSelectTab, onOpenVoiceAssistant }) => {
  const { role } = useAuth();
  const { t } = useLanguage();

  const artisanTabs = [
    { key: 'home', label: 'Ecosystem', icon: '🏠' },
    { key: 'products', label: t('myProducts', 'Catalog'), icon: '🧵' },
    { key: 'voice', isVoiceCenter: true, label: 'Voice AI', icon: '🎙️' },
    { key: 'archive', label: 'Archive', icon: '📜' },
    { key: 'insights', label: t('insights', 'Business'), icon: '📊' },
  ];

  const buyerTabs = [
    { key: 'home', label: 'Marketplace', icon: '🏛️' },
    { key: 'explore', label: t('explore', 'Explore GI'), icon: '🔍' },
    { key: 'impact', label: 'Impact', icon: '🌿' },
    { key: 'orders', label: t('orders', 'Orders'), icon: '📦' },
    { key: 'cart', label: 'Cart', icon: '🛒' },
  ];

  const adminTabs = [
    { key: 'dashboard', label: 'Overview', icon: '📈' },
    { key: 'verifications', label: 'Artisans', icon: '🛡️' },
    { key: 'products', label: 'Products', icon: '🏷️' },
    { key: 'schemes', label: 'Schemes', icon: '📜' },
    { key: 'settings', label: 'Config', icon: '⚙️' },
  ];

  const tabs = role === 'admin' ? adminTabs : role === 'buyer' ? buyerTabs : artisanTabs;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        if (tab.isVoiceCenter) {
          return (
            <TouchableOpacity
              key="voice-center"
              activeOpacity={0.85}
              onPress={onOpenVoiceAssistant}
              style={styles.voiceButtonContainer}
            >
              <View style={styles.voiceButtonCircle}>
                <Text style={styles.voiceButtonIcon}>{tab.icon}</Text>
              </View>
              <Text style={styles.voiceButtonLabel}>{tab.label}</Text>
            </TouchableOpacity>
          );
        }

        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onSelectTab(tab.key)}
            style={styles.tabItem}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 6,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    ...shadows.card,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.65,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  voiceButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    zIndex: 10,
    width: 68,
  },
  voiceButtonCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.surface,
    ...shadows.card,
  },
  voiceButtonIcon: {
    fontSize: 24,
  },
  voiceButtonLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
});

export default BottomTabBar;
