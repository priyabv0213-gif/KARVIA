import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius } from '../../theme/typography';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

export const LanguageModal = ({ visible, onClose }) => {
  const { currentLocale, changeLanguage, languages, t } = useLanguage();

  const handleSelect = async (code) => {
    await changeLanguage(code);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <View>
              <Text style={[typography.h3, styles.title]}>{t('selectLanguage', 'Select Your Language')}</Text>
              <Text style={styles.subtitle}>13 Official Indian Languages Supported</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.langList}>
            {languages.map((lang) => {
              const isSelected = currentLocale === lang.code;

              return (
                <TouchableOpacity
                  key={lang.code}
                  activeOpacity={0.75}
                  onPress={() => handleSelect(lang.code)}
                  style={[styles.langCard, isSelected && styles.langCardSelected]}
                >
                  <View style={styles.langMeta}>
                    <Text style={[styles.nativeName, isSelected && styles.nativeNameSelected]}>
                      {lang.nativeName}
                    </Text>
                    <Text style={styles.englishName}>
                      {lang.name} • {lang.region}
                    </Text>
                  </View>
                  {isSelected ? (
                    <View style={styles.radioSelected}>
                      <View style={styles.radioInner} />
                    </View>
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Button
            title="Done"
            onPress={onClose}
            style={{ marginTop: 12 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 20,
    maxHeight: '85%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  langList: {
    paddingVertical: 12,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  langMeta: {
    flex: 1,
  },
  nativeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  nativeNameSelected: {
    color: colors.primary,
  },
  englishName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
});

export default LanguageModal;
