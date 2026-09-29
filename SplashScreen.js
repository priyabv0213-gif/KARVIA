import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { colors } from '../theme/colors';
import { typography, borderRadius, shadows } from '../theme/typography';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const SplashScreen = ({ onSelectRole, onSelectLanguage }) => {
  const { currentLocale, setLanguage, t } = useLanguage();
  const [showAllLanguagesModal, setShowAllLanguagesModal] = useState(false);

  // Top 3 primary quick languages
  const primaryLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  const handleChooseLanguage = (code) => {
    setLanguage(code);
    if (onSelectLanguage) onSelectLanguage(code);
    setShowAllLanguagesModal(false);
  };

  const handleChooseRole = (role) => {
    if (onSelectRole) {
      onSelectRole(role);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Subtle Indian Heritage Motif Frame */}
        <View style={styles.motifHeader}>
          <View style={styles.motifRing}>
            <Text style={styles.motifIcon}>🪷</Text>
          </View>
          <Text style={styles.wordmark}>KARVIA</Text>
          <Text style={styles.tagline}>Craft. Culture. Connected.</Text>
          <View style={styles.dividerDot} />
          <Text style={styles.missionStatement}>
            An AI-powered multilingual digital ecosystem for marginalized Indian artisans—moving from craft → digital business → market access while preserving cultural heritage.
          </Text>
        </View>

        {/* 1. LANGUAGE SELECTION SECTION */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>CHOOSE YOUR LANGUAGE / மொழியைத் தேர்ந்தெடுக்கவும்</Text>
            <Badge label="13 Languages" variant="gold" size="sm" />
          </View>

          <View style={styles.langChipsRow}>
            {primaryLanguages.map((lang) => {
              const isSelected = currentLocale === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  activeOpacity={0.8}
                  onPress={() => handleChooseLanguage(lang.code)}
                  style={[styles.langChip, isSelected && styles.langChipActive]}
                >
                  <Text style={[styles.langNative, isSelected && styles.langNativeActive]}>
                    {lang.nativeName}
                  </Text>
                  <Text style={[styles.langName, isSelected && styles.langNameActive]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* More Indian Languages Trigger */}
          <TouchableOpacity
            onPress={() => setShowAllLanguagesModal(true)}
            style={styles.moreLanguagesBtn}
          >
            <Text style={styles.moreLanguagesText}>
              + Choose from other 10 Indian Languages (മലയാളം, తెలుగు, ಕನ್ನಡ, বাংলা, etc.) ▾
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. DUAL ENTRY GATEWAY */}
        <View style={styles.entrySection}>
          <Text style={styles.entryTitle}>How would you like to enter KARVIA?</Text>

          {/* Artisan Entry Card */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => handleChooseRole('artisan')}
            style={styles.roleCard}
          >
            <View style={styles.roleIconBox}>
              <Text style={styles.roleEmoji}>🧵</Text>
            </View>
            <View style={styles.roleInfo}>
              <View style={styles.roleTitleRow}>
                <Text style={styles.roleTitle}>{t('roleArtisan', 'I am an Artisan / Weaver')}</Text>
                <Badge label="Maker Hub" variant="primary" size="sm" />
              </View>
              <Text style={styles.roleDesc}>
                Catalog crafts with voice AI, calculate fair living wages, preserve generational techniques, and access global markets.
              </Text>
            </View>
            <Text style={styles.roleArrow}>→</Text>
          </TouchableOpacity>

          {/* Buyer Entry Card */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => handleChooseRole('buyer')}
            style={[styles.roleCard, styles.buyerRoleCard]}
          >
            <View style={[styles.roleIconBox, { backgroundColor: colors.goldLight }]}>
              <Text style={styles.roleEmoji}>🏛️</Text>
            </View>
            <View style={styles.roleInfo}>
              <View style={styles.roleTitleRow}>
                <Text style={styles.roleTitle}>{t('roleBuyer', 'I am a Conscious Buyer')}</Text>
                <Badge label="Direct Patronage" variant="gold" size="sm" />
              </View>
              <Text style={styles.roleDesc}>
                Discover GI-tagged crafts direct from master makers with 3D/AR preview, verifiable provenance, and direct escrow checkout.
              </Text>
            </View>
            <Text style={styles.roleArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Cultural Sanctity Footer */}
        <View style={styles.footerNoteBox}>
          <Text style={styles.footerText}>
            Dedicated to traditional Indian weavers, potters, bell-metal sculptors & folk artists. Zero middleman exploitation.
          </Text>
        </View>
      </ScrollView>

      {/* Multilingual Selection Modal for all 13 languages */}
      <Modal
        visible={showAllLanguagesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAllLanguagesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Your Language (13 Indian Languages)</Text>
              <TouchableOpacity onPress={() => setShowAllLanguagesModal(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = currentLocale === lang.code;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => handleChooseLanguage(lang.code)}
                    style={[styles.langListItem, isSelected && styles.langListItemActive]}
                  >
                    <View>
                      <Text style={[styles.langListNative, isSelected && styles.langListNativeActive]}>
                        {lang.nativeName}
                      </Text>
                      <Text style={styles.langListName}>{lang.name}</Text>
                    </View>
                    {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    alignItems: 'center',
  },
  motifHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  motifRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  motifIcon: {
    fontSize: 38,
  },
  wordmark: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 4,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gold,
    marginVertical: 14,
  },
  missionStatement: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
  },
  sectionBox: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    ...shadows.subtle,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  langChipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  langChip: {
    flex: 1,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  langChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  langNative: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  langNativeActive: {
    color: colors.primary,
  },
  langName: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  langNameActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  moreLanguagesBtn: {
    marginTop: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  moreLanguagesText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  entrySection: {
    width: '100%',
    marginBottom: 14,
  },
  entryTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.card,
  },
  buyerRoleCard: {
    borderColor: colors.border,
  },
  roleIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roleEmoji: {
    fontSize: 24,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  roleDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  roleArrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '800',
    marginLeft: 8,
  },
  footerNoteBox: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  footerText: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  langListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  langListItemActive: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    borderRadius: borderRadius.md,
  },
  langListNative: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  langListNativeActive: {
    color: colors.primary,
  },
  langListName: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
});

export default SplashScreen;
