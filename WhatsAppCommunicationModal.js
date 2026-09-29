import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import Button from './Button';
import Badge from './Badge';

export const WhatsAppCommunicationModal = ({ visible, onClose, artisanName, artisanPhone, productTitle }) => {
  const defaultArtisan = artisanName || 'Master Artisan Meenakshi';
  const phone = artisanPhone || '+919840123456';
  const craftProduct = productTitle || 'Handcrafted Heritage Creation';

  const quickTemplates = [
    `Namaste ${defaultArtisan}, I am interested in "${craftProduct}". Can this be customized in a different natural dye color?`,
    `Namaste ${defaultArtisan}, I would like to inquire about placing a custom commission for a wedding celebration.`,
    `Namaste, I love the craft story behind "${craftProduct}". How long will delivery take to my city?`,
  ];

  const [message, setMessage] = useState(quickTemplates[0]);
  const [sentNotice, setSentNotice] = useState(false);

  const handleSendWhatsApp = () => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message);
    const url = `whatsapp://send?phone=${cleanPhone}&text=${encoded}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // Web fallback
          Linking.openURL(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`);
        }
        setSentNotice(true);
        setTimeout(() => {
          setSentNotice(false);
          onClose();
        }, 2200);
      })
      .catch(() => {
        setSentNotice(true);
        setTimeout(() => {
          setSentNotice(false);
          onClose();
        }, 2200);
      });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.badgeRow}>
                <Text style={styles.headerBadge}>DIRECT COMMUNICATION</Text>
                <Badge label="Zero Middlemen" variant="success" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Connect with Artisan</Text>
              <Text style={styles.subtitle}>Direct conversation with {defaultArtisan}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Direct Channel Highlight */}
            <View style={styles.infoCard}>
              <Text style={styles.whatsappIcon}>💬</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>Direct Patron-to-Maker Connection</Text>
                <Text style={styles.infoDesc}>
                  Ask about custom sizing, loom progress, or personalized color palettes directly on WhatsApp.
                </Text>
              </View>
            </View>

            {/* Quick Inquiry Templates */}
            <Text style={styles.sectionTitle}>Quick Inquiries</Text>
            {quickTemplates.map((tmpl, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setMessage(tmpl)}
                style={[styles.templateChip, message === tmpl && styles.templateChipActive]}
              >
                <Text style={[styles.templateText, message === tmpl && styles.templateTextActive]}>
                  "{tmpl}"
                </Text>
              </TouchableOpacity>
            ))}

            {/* Custom Message Input */}
            <Text style={styles.sectionTitle}>Your Message to {defaultArtisan}</Text>
            <TextInput
              style={styles.messageInput}
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              placeholder="Write your custom question or commission request..."
              placeholderTextColor={colors.textMuted}
            />

            {/* Send WhatsApp Action Button */}
            <Button
              title="Open WhatsApp Chat 💬"
              onPress={handleSendWhatsApp}
              variant="primary"
              size="lg"
              style={{ marginTop: 14 }}
            />

            {sentNotice && (
              <View style={styles.sentBox}>
                <Text style={styles.sentText}>✓ Opening direct WhatsApp channel with artisan...</Text>
              </View>
            )}

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 20,
    maxHeight: '88%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  headerBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.emerald,
    backgroundColor: colors.emeraldLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
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
    color: colors.textPrimary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 14,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    borderRadius: borderRadius.md,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.2)',
  },
  whatsappIcon: {
    fontSize: 26,
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.emerald,
  },
  infoDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  templateChip: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  templateChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  templateText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  templateTextActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  messageInput: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    fontSize: 13,
    color: colors.textPrimary,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  sentBox: {
    backgroundColor: colors.emeraldLight,
    padding: 10,
    borderRadius: borderRadius.sm,
    marginTop: 10,
    alignItems: 'center',
  },
  sentText: {
    fontSize: 12,
    color: colors.emerald,
    fontWeight: '700',
  },
});

export default WhatsAppCommunicationModal;
