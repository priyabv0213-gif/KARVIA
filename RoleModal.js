import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

export const RoleModal = ({ visible, onClose }) => {
  const { role, switchRole } = useAuth();

  const roles = [
    {
      id: 'artisan',
      title: 'Artisan (Craft Creator)',
      desc: 'Catalog new crafts with Voice AI, calculate fair pricing, generate craft evidence, and fulfill orders.',
      icon: '🧵',
      color: colors.primary,
      bgColor: colors.primaryLight,
    },
    {
      id: 'buyer',
      title: 'Buyer (Conscious Patron)',
      desc: 'Discover authentic GI crafts, try garments virtually, place crafts in your space, and purchase directly.',
      icon: '🛍️',
      color: colors.indigo,
      bgColor: colors.indigoLight,
    },
    {
      id: 'admin',
      title: 'Admin (Integrity Moderator)',
      desc: 'Verify artisan registrations, audit GI craft evidence, moderate listings, and update government schemes.',
      icon: '🛡️',
      color: '#8A6D15',
      bgColor: colors.goldLight,
    }
  ];

  const handleSelectRole = (roleId) => {
    switchRole(roleId);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={[typography.h3, styles.title]}>Switch User Perspective</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Test all 3 role perspectives in the production mobile application.</Text>

          <View style={styles.roleList}>
            {roles.map((r) => {
              const isSelected = role === r.id;

              return (
                <TouchableOpacity
                  key={r.id}
                  activeOpacity={0.8}
                  onPress={() => handleSelectRole(r.id)}
                  style={[
                    styles.roleCard,
                    isSelected && { borderColor: r.color, backgroundColor: r.bgColor },
                  ]}
                >
                  <Text style={styles.roleIcon}>{r.icon}</Text>
                  <View style={styles.roleInfo}>
                    <Text style={[styles.roleTitle, isSelected && { color: r.color }]}>
                      {r.title}
                    </Text>
                    <Text style={styles.roleDesc}>{r.desc}</Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.checkPill, { backgroundColor: r.color }]}>
                      <Text style={styles.checkText}>Active</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <Button title="Cancel" variant="outline" onPress={onClose} style={{ marginTop: 8 }} />
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
    maxHeight: '80%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
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
  roleList: {
    marginBottom: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: 10,
  },
  roleIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  roleInfo: {
    flex: 1,
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
    marginTop: 2,
  },
  checkPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    marginLeft: 8,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default RoleModal;
