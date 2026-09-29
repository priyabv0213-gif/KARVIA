import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image, Switch, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { enhanceCraftImage } from '../../services/aiService';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const CraftImageEnhancementModal = ({ visible, onClose, onApplyEnhancedImage, initialImageUri }) => {
  const [currentImage, setCurrentImage] = useState(
    initialImageUri || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
  );

  const sampleCraftImages = [
    { label: 'Silk Korvai Weave', uri: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
    { label: 'Blue Pottery Vase', uri: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80' },
    { label: 'Lost-Wax Dhokra', uri: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80' },
    { label: 'Madhubani Canvas', uri: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80' },
  ];

  // Pipeline configuration toggles
  const [balanceLighting, setBalanceLighting] = useState(true);
  const [sharpenTexture, setSharpenTexture] = useState(true);
  const [studioBackdrop, setStudioBackdrop] = useState(true);
  const [lockNaturalDyeHue, setLockNaturalDyeHue] = useState(true);

  // Enhancement State
  const [isProcessing, setIsProcessing] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState(null);
  const [previewMode, setPreviewMode] = useState('enhanced'); // 'original' | 'enhanced'

  const handleRunEnhancement = async () => {
    setIsProcessing(true);
    try {
      const result = await enhanceCraftImage({
        imageUri: currentImage,
        balanceLighting,
        sharpenTexture,
        studioBackdrop,
        lockNaturalDyeHue,
      });
      setEnhancedResult(result);
      setPreviewMode('enhanced');
    } catch (e) {
      console.warn('Enhancement error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = () => {
    if (onApplyEnhancedImage) {
      onApplyEnhancedImage(enhancedResult ? enhancedResult.enhancedImageUri : currentImage);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.badgeRow}>
                <Text style={styles.headerBadge}>AI CRAFT VISION</Text>
                <Badge label="Color & Motif Preserved" variant="gold" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Craft Image Enhancement</Text>
              <Text style={styles.subtitle}>Improve Presentation Without Diluting Cultural Identity</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Cultural Integrity Guarantee Card */}
            <View style={styles.integrityCard}>
              <Text style={styles.integrityIcon}>🛡️</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.integrityTitle}>Sacred Motif & Natural Dye Guarantee</Text>
                <Text style={styles.integrityDesc}>
                  KARVIA AI enhances lighting and clarity while locking natural dye hues (Indigo, Madder, Ochre). It never invents synthetic alterations or fake digital textures.
                </Text>
              </View>
            </View>

            {/* Visual Preview Box with Before / After Toggle */}
            <View style={styles.previewBox}>
              <Image
                source={{ uri: currentImage }}
                style={[
                  styles.previewImage,
                  previewMode === 'enhanced' && enhancedResult && styles.enhancedVisualEffect,
                ]}
                resizeMode="cover"
              />

              {/* Mode Indicator Overlay Pill */}
              <View style={styles.previewModePill}>
                <Text style={styles.previewModeText}>
                  {previewMode === 'enhanced' && enhancedResult ? '✨ AI Enhanced Presentation' : '📷 Original Craft Photo'}
                </Text>
              </View>

              {/* Before / After Toggle Switcher */}
              {enhancedResult && (
                <View style={styles.toggleBar}>
                  <TouchableOpacity
                    onPress={() => setPreviewMode('original')}
                    style={[styles.toggleBtn, previewMode === 'original' && styles.toggleBtnActive]}
                  >
                    <Text style={[styles.toggleBtnText, previewMode === 'original' && styles.toggleBtnTextActive]}>
                      Before
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPreviewMode('enhanced')}
                    style={[styles.toggleBtn, previewMode === 'enhanced' && styles.toggleBtnActive]}
                  >
                    <Text style={[styles.toggleBtnText, previewMode === 'enhanced' && styles.toggleBtnTextActive]}>
                      After (AI Enhanced)
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Select Sample Craft Photo */}
            <Text style={styles.sectionTitle}>Select Craft Image to Enhance</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.samplesScroll}>
              {sampleCraftImages.map((s, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setCurrentImage(s.uri);
                    setEnhancedResult(null);
                  }}
                  style={[styles.sampleThumbCard, currentImage === s.uri && styles.sampleThumbCardActive]}
                >
                  <Image source={{ uri: s.uri }} style={styles.sampleThumbImg} />
                  <Text style={styles.sampleThumbLabel} numberOfLines={1}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Enhancement Parameter Controls */}
            <Text style={styles.sectionTitle}>AI Enhancement Pipeline Settings</Text>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Studio Lighting Balance</Text>
                <Text style={styles.settingSub}>Cleans harsh village shadows while preserving natural loom tones.</Text>
              </View>
              <Switch
                value={balanceLighting}
                onValueChange={setBalanceLighting}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Texture & Zari Sharpening</Text>
                <Text style={styles.settingSub}>Sharpens hand-spun warp nodes and metallic gold/silver thread reflection.</Text>
              </View>
              <Switch
                value={sharpenTexture}
                onValueChange={setSharpenTexture}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Neutral Artisanal Backdrop</Text>
                <Text style={styles.settingSub}>Subtly frames subject against textured neutral organic cotton.</Text>
              </View>
              <Switch
                value={studioBackdrop}
                onValueChange={setStudioBackdrop}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Lock Natural Dye Spectrum</Text>
                <Text style={styles.settingSub}>Prevents digital oversaturation of sacred organic pigments.</Text>
              </View>
              <Switch
                value={lockNaturalDyeHue}
                onValueChange={setLockNaturalDyeHue}
                trackColor={{ false: colors.border, true: colors.emerald }}
              />
            </View>

            {/* Run AI Button */}
            <Button
              title={isProcessing ? 'Calibrating Craft Presentation...' : enhancedResult ? 'Re-run AI Enhancement' : 'Run AI Craft Enhancement'}
              onPress={handleRunEnhancement}
              disabled={isProcessing}
              variant="primary"
              size="lg"
              style={{ marginTop: 14 }}
            />

            {/* Pipeline Results Summary */}
            {enhancedResult && (
              <View style={styles.resultBox}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle}>PROCESSING PIPELINE SUMMARY</Text>
                  <Badge label={enhancedResult.qualityScore} variant="success" size="sm" />
                </View>
                {enhancedResult.processingPipeline.map((p, i) => (
                  <View key={i} style={styles.pipelineStep}>
                    <Text style={styles.stepName}>✓ {p.name} ({p.status})</Text>
                    <Text style={styles.stepNote}>{p.note}</Text>
                  </View>
                ))}
                <Text style={styles.resultDisclaimer}>{enhancedResult.disclaimer}</Text>

                <Button
                  title="Use Enhanced Photo in Product Listing"
                  onPress={handleApply}
                  variant="gold"
                  size="md"
                  style={{ marginTop: 12 }}
                />
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
    maxHeight: '92%',
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
    color: colors.primary,
    backgroundColor: colors.primaryLight,
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
  integrityCard: {
    flexDirection: 'row',
    backgroundColor: colors.emeraldLight,
    borderRadius: borderRadius.md,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.2)',
  },
  integrityIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  integrityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.emerald,
  },
  integrityDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  previewBox: {
    width: '100%',
    height: 240,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  enhancedVisualEffect: {
    borderWidth: 2,
    borderColor: colors.gold,
  },
  previewModePill: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  previewModeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  toggleBar: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: borderRadius.full,
    padding: 3,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
  },
  toggleBtnText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  samplesScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sampleThumbCard: {
    width: 100,
    marginRight: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  sampleThumbCardActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  sampleThumbImg: {
    width: '100%',
    height: 60,
  },
  sampleThumbLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    padding: 4,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  settingInfo: {
    flex: 1,
    paddingRight: 12,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  resultBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.8,
  },
  pipelineStep: {
    marginBottom: 6,
  },
  stepName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.emerald,
  },
  stepNote: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 14,
  },
  resultDisclaimer: {
    fontSize: 10,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: 8,
  },
});

export default CraftImageEnhancementModal;
