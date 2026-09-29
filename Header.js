import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { getSyncStatus } from '../../services/offlineStorage';

export const Header = ({ onOpenLanguageModal, onOpenCart, onOpenRoleModal }) => {
  const { role, switchRole } = useAuth();
  const { currentLocale, t, languages } = useLanguage();
  const { totalCount } = useCart();
  const syncStatus = getSyncStatus();

  const currentLangObj = languages.find((l) => l.code === currentLocale) || languages[0];

  const getRoleLabel = () => {
    switch (role) {
      case 'buyer':
        return t('roleBuyer', 'Buyer');
      case 'admin':
        return t('roleAdmin', 'Admin');
      case 'artisan':
      default:
        return t('roleArtisan', 'Artisan');
    }
  };

  const getSyncBadge = () => {
    if (syncStatus === 'offline') {
      return { bg: colors.errorLight, text: colors.error, label: 'Offline' };
    }
    if (syncStatus === 'syncing') {
      return { bg: colors.warningLight, text: colors.warning, label: 'Syncing...' };
    }
    return { bg: colors.successLight, text: colors.success, label: 'Synced' };
  };

  const syncInfo = getSyncBadge();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Left: Brand Wordmark */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>KARVIA</Text>
          <View style={styles.dot} />
          {/* Sync status micro-badge */}
          <View style={[styles.syncPill, { backgroundColor: syncInfo.bg }]}>
            <View style={[styles.syncDot, { backgroundColor: syncInfo.text }]} />
            <Text style={[styles.syncText, { color: syncInfo.text }]}>{syncInfo.label}</Text>
          </View>
        </View>

        {/* Right: Controls & Role Switcher */}
        <View style={styles.actionsContainer}>
          {/* Language Switcher Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onOpenLanguageModal}
            style={styles.actionButton}
          >
            <Text style={styles.langEmoji}>🌐</Text>
            <Text style={styles.actionText}>{currentLangObj.nativeName.split(' ')[0]}</Text>
          </TouchableOpacity>

          {/* Role Toggle Pill */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onOpenRoleModal) {
                onOpenRoleModal();
              } else {
                // Quick cycle roles
                const next = role === 'artisan' ? 'buyer' : role === 'buyer' ? 'admin' : 'artisan';
                switchRole(next);
              }
            }}
            style={[
              styles.roleBadge,
              role === 'artisan' && styles.roleArtisan,
              role === 'buyer' && styles.roleBuyer,
              role === 'admin' && styles.roleAdmin,
            ]}
          >
            <Text style={styles.roleText}>{getRoleLabel()}</Text>
          </TouchableOpacity>

          {/* Cart Icon for Buyers */}
          {role === 'buyer' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onOpenCart}
              style={styles.cartButton}
            >
              <Text style={styles.cartIcon}>🛒</Text>
              {totalCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.subtle,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gold,
    marginHorizontal: 8,
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  langEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  roleArtisan: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  roleBuyer: {
    backgroundColor: colors.indigoLight,
    borderColor: colors.indigo,
  },
  roleAdmin: {
    backgroundColor: colors.goldLight,
    borderColor: colors.gold,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cartButton: {
    position: 'relative',
    marginLeft: 8,
    padding: 6,
  },
  cartIcon: {
    fontSize: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default Header;
