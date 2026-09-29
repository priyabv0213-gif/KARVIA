import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const VirtualTryOnModal = ({ visible, onClose, product }) => {
  const [mode, setMode] = useState('camera'); // 'camera' | 'photo'
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessingDrape, setIsProcessingDrape] = useState(false);
  const [drapedView, setDrapedView] = useState(true);
  const [selectedPleats, setSelectedPleats] = useState(7);
  const [selectedPalluStyle, setSelectedPalluStyle] = useState('shoulder'); // 'shoulder' | 'pleated' | 'gujarati'

  const isSaree = product?.craftType?.toLowerCase().includes('saree') || product?.title?.toLowerCase().includes('saree');

  const handleToggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setIsProcessingDrape(true);
    setTimeout(() => {
      setIsProcessingDrape(false);
    }, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.badgeRow}>
                <Badge label="3D Garment Drape Engine" variant="gold" size="sm" />
                <Badge label={mode === 'camera' ? 'Live AR Camera' : 'Full-Body Photo'} variant="info" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Virtual Garment Try-On</Text>
              <Text style={styles.productTitle} numberOfLines={1}>{product?.title}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Mode Switcher Tabs */}
          <View style={styles.modeTabBar}>
            <TouchableOpacity
              onPress={() => handleSwitchMode('camera')}
              style={[styles.modeTab, mode === 'camera' && styles.modeTabActive]}
            >
              <Text style={[styles.modeTabText, mode === 'camera' && styles.modeTabTextActive]}>
                📹 Mode 1: Live Camera AR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSwitchMode('photo')}
              style={[styles.modeTab, mode === 'photo' && styles.modeTabActive]}
            >
              <Text style={[styles.modeTabText, mode === 'photo' && styles.modeTabTextActive]}>
                🖼️ Mode 2: Photo Upload
              </Text>
            </TouchableOpacity>
          </View>

          {/* Main Visualizer Area */}
          <View style={styles.visualizerContainer}>
            {isProcessingDrape ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator color={colors.primary} size="large" />
                <Text style={styles.loadingText}>Simulating 3D Fabric Drape Physics...</Text>
                <Text style={styles.loadingSub}>Fitting Pallu weight and border warp to human form</Text>
              </View>
            ) : (
              <View style={styles.drapeViewport}>
                {/* Simulated Pose / Live Model Canvas */}
                <Image
                  source={{
                    uri: mode === 'camera'
                      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
                      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
                  }}
                  style={styles.modelBaseImage}
                  resizeMode="cover"
                />

                {/* 3D Garment Drape Mesh Layer */}
                {drapedView && (
                  <View style={styles.garmentDrapeOverlay}>
                    <Image
                      source={{ uri: product?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }}
                      style={styles.garmentTexture}
                      resizeMode="contain"
                    />
                    {/* Zari Border Highlight Shimmer */}
                    <View style={styles.zariShimmerBorder} />
                  </View>
                )}

                {/* Live AR Overlay Badges */}
                <View style={styles.arOverlayPill}>
                  <Text style={styles.arOverlayText}>
                    {mode === 'camera' ? '🟢 Live Pose Detected (Shoulder / Waist)' : '🔵 Photo Calibration: Confirmed'}
                  </Text>
                </View>

                {/* Toggle Draping Overlay */}
                <TouchableOpacity
                  onPress={() => setDrapedView(!drapedView)}
                  style={styles.toggleDrapeBtn}
                >
                  <Text style={styles.toggleDrapeText}>{drapedView ? 'Hide Garment' : 'Show Garment'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Saree & Garment Draping Controls */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.controlsScroll}>
            {isSaree && (
              <View style={styles.sareeControlsBox}>
                <Text style={styles.controlsHeading}>Traditional Saree Drape Settings</Text>

                {/* Pallu Drape Style */}
                <Text style={styles.controlLabel}>Pallu Draping Style:</Text>
                <View style={styles.choiceRow}>
                  <TouchableOpacity
                    onPress={() => setSelectedPalluStyle('shoulder')}
                    style={[styles.choicePill, selectedPalluStyle === 'shoulder' && styles.choicePillActive]}
                  >
                    <Text style={[styles.choiceText, selectedPalluStyle === 'shoulder' && styles.choiceTextActive]}>
                      Open Shoulder Pallu
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSelectedPalluStyle('pleated')}
                    style={[styles.choicePill, selectedPalluStyle === 'pleated' && styles.choicePillActive]}
                  >
                    <Text style={[styles.choiceText, selectedPalluStyle === 'pleated' && styles.choiceTextActive]}>
                      Pleated Pin Drape
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSelectedPalluStyle('gujarati')}
                    style={[styles.choicePill, selectedPalluStyle === 'gujarati' && styles.choicePillActive]}
                  >
                    <Text style={[styles.choiceText, selectedPalluStyle === 'gujarati' && styles.choiceTextActive]}>
                      Seedha Pallu
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Pleats Count */}
                <View style={styles.pleatsRow}>
                  <Text style={styles.controlLabel}>Waist Pleats Count: {selectedPleats}</Text>
                  <View style={styles.counterRow}>
                    <TouchableOpacity
                      onPress={() => setSelectedPleats(Math.max(5, selectedPleats - 1))}
                      style={styles.counterBtn}
                    >
                      <Text style={styles.counterBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterVal}>{selectedPleats}</Text>
                    <TouchableOpacity
                      onPress={() => setSelectedPleats(Math.min(9, selectedPleats + 1))}
                      style={styles.counterBtn}
                    >
                      <Text style={styles.counterBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Fabric Specifications */}
                <View style={styles.specsRow}>
                  <Text style={styles.specItem}>• Texture: Pure Mulberry Silk Luster</Text>
                  <Text style={styles.specItem}>• Border: 3-Ply Gold Zari Korvai</Text>
                  <Text style={styles.specItem}>• Pallu: 2.2m Floral Motifs</Text>
                </View>
              </View>
            )}

            <Button
              title="Close Virtual Try-On"
              onPress={onClose}
              style={{ marginTop: 12 }}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: 16,
    maxHeight: '92%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 4,
    gap: 6,
  },
  title: {
    color: colors.textPrimary,
  },
  productTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    maxWidth: 280,
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
  modeTabBar: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 3,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  modeTabActive: {
    backgroundColor: colors.surface,
    ...shadows.subtle,
  },
  modeTabText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modeTabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  visualizerContainer: {
    height: 290,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 12,
  },
  loadingSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  drapeViewport: {
    flex: 1,
    position: 'relative',
  },
  modelBaseImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  garmentDrapeOverlay: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    right: '10%',
    bottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  garmentTexture: {
    width: '100%',
    height: '100%',
    opacity: 0.92,
  },
  zariShimmerBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.4)',
    borderTopWidth: 1,
    borderTopColor: colors.gold,
  },
  arOverlayPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  arOverlayText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  toggleDrapeBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#475569',
  },
  toggleDrapeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  controlsScroll: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
  sareeControlsBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  controlsHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  choiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  choicePill: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 6,
    marginBottom: 6,
  },
  choicePillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  choiceText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  choiceTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  pleatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  counterBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  counterVal: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 10,
    color: colors.textPrimary,
  },
  specsRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  specItem: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});

export default VirtualTryOnModal;
