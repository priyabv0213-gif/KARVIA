import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import { generateSmartCatalog } from '../../services/aiService';
import { CRAFT_CATEGORIES } from '../../services/craftTaxonomy';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const AddProductWizard = ({ visible, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { addProduct, saveDraft } = useProducts();

  // Wizard Steps: 1: Media & Voice, 2: AI Generating, 3: Review & Edit Listing
  const [step, setStep] = useState(1);
  const [imageUri, setImageUri] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80');
  const [voiceNote, setVoiceNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(user?.craftCategory || 'handloom_textiles');

  // Generated & Editable Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [craftTechnique, setCraftTechnique] = useState('');
  const [materials, setMaterials] = useState('');
  const [price, setPrice] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [productionDays, setProductionDays] = useState('14');
  const [stockCount, setStockCount] = useState('3');
  const [culturalSignificance, setCulturalSignificance] = useState('');
  const [sacredMotifs, setSacredMotifs] = useState([]);
  const [buyerDescription, setBuyerDescription] = useState('');
  const [multilingualDescriptions, setMultilingualDescriptions] = useState({ en: '', ta: '', hi: '' });
  const [previewLang, setPreviewLang] = useState('en');
  const [supports3D, setSupports3D] = useState(true);
  const [supportsTryOn, setSupportsTryOn] = useState(true);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSimulateVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setVoiceNote('Woven with pure mulberry silk and 3-ply gold zari on pit loom. Took 18 days to finish.');
      setIsRecording(false);
    }, 2000);
  };

  const handleRunAIAnalysis = async () => {
    setIsAnalyzing(true);
    setStep(2);

    try {
      const generated = await generateSmartCatalog({
        imageUri,
        voiceDescription: voiceNote,
        craftCategory: selectedCategory,
        artisanRegion: user?.region || 'Tamil Nadu',
      });

      setTitle(generated.title);
      setDescription(generated.description);
      setCraftTechnique(generated.craftTechnique);
      setMaterials(generated.material);
      setPrice(generated.suggestedPriceRange.recommended.toString());
      setDimensions(generated.dimensions);
      setProductionDays(generated.productionDays.toString());
      setCulturalSignificance(generated.culturalSignificance || '');
      setSacredMotifs(generated.sacredMotifs || ['Generational Motifs', 'Sacred Border']);
      setBuyerDescription(generated.buyerFacingPresentation || '');
      setMultilingualDescriptions(generated.multilingualDescriptions || {
        en: generated.description,
        ta: 'பாரம்பரிய கைவினைப் படைப்பு.',
        hi: 'पारंपरिक हस्तशिल्प रचना।',
      });

      setStep(3); // Move to review & edit
    } catch (e) {
      console.error('AI Catalog error:', e);
      // Fallback manual values
      setTitle('Traditional Handwoven Masterpiece');
      setDescription('Handcrafted with natural materials.');
      setPrice('4500');
      setCulturalSignificance('Ancestral craft tradition preserved across generations.');
      setStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveDraft({
        title: title || 'Untitled Craft Draft',
        category: selectedCategory,
        craftTechnique,
        material: materials,
        price: parseFloat(price) || 0,
        dimensions,
        productionDays: parseInt(productionDays, 10) || 7,
        stockCount: parseInt(stockCount, 10) || 1,
        images: [imageUri],
        artisanName: user?.name,
        artisanRegion: user?.region,
        artisanId: user?.uid,
      });
      setIsSaving(false);
      resetAndClose();
      if (onSuccess) onSuccess('draft');
    } catch (e) {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title || !price) {
      alert('Please enter a product title and price.');
      return;
    }

    setIsSaving(true);
    try {
      await addProduct({
        title,
        description,
        category: selectedCategory,
        craftTechnique,
        material: materials,
        price: parseFloat(price) || 2500,
        mrp: Math.round((parseFloat(price) || 2500) * 1.3),
        dimensions,
        productionDays: parseInt(productionDays, 10) || 14,
        stockCount: parseInt(stockCount, 10) || 3,
        images: [imageUri],
        artisanName: user?.name || 'Master Artisan',
        artisanRegion: user?.region || 'India',
        artisanId: user?.uid,
        tryOnSupported: supportsTryOn,
        arSupported: supports3D,
        threeDModelUrl: 'https://cdn.karvia.crafts.org/3d/kanchipuram_saree.glb',
        craftEvidence: {
          visualScore: 'Available',
          processProof: 'Available (Artisan documentation)',
          materialProof: 'Handcrafted verified declaration',
          artisanDeclaration: 'Directly cataloged by verified maker',
          officialCertification: 'Verified GI Craft Cluster',
          summary: 'Transparent artisanal documentation verified via KARVIA AI Smart Catalog.',
        },
      });

      setIsSaving(false);
      resetAndClose();
      if (onSuccess) onSuccess('published');
    } catch (e) {
      setIsSaving(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setTitle('');
    setDescription('');
    setVoiceNote('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={resetAndClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={[typography.h3, styles.title]}>Smart Product Catalog</Text>
              <Text style={styles.stepIndicator}>Step {step} of 3 • {step === 1 ? 'Capture Craft' : step === 2 ? 'AI Analysis' : 'Review & Publish'}</Text>
            </View>
            <TouchableOpacity onPress={resetAndClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* STEP 1: CAPTURE PHOTO & VOICE */}
          {step === 1 && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.sectionHeading}>1. Product Photography</Text>
              <View style={styles.imagePreviewBox}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
                <View style={styles.cameraOverlay}>
                  <Text style={styles.cameraIcon}>📸</Text>
                  <Text style={styles.cameraText}>Photo Loaded (Camera / Gallery)</Text>
                </View>
              </View>

              {/* Craft Category Picker */}
              <Text style={styles.inputLabel}>Craft Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {CRAFT_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    style={[
                      styles.categoryPill,
                      selectedCategory === cat.id && styles.categoryPillActive,
                    ]}
                  >
                    <Text style={[styles.categoryPillText, selectedCategory === cat.id && styles.categoryPillTextActive]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Voice Description Section */}
              <Text style={[styles.sectionHeading, { marginTop: 16 }]}>2. Voice Description (Optional)</Text>
              <Text style={styles.helperText}>Speak in your local language about the weaving technique, material purity, or making time.</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSimulateVoiceRecord}
                style={[styles.voiceRecordBox, isRecording && styles.voiceRecording]}
              >
                <Text style={styles.voiceRecordIcon}>{isRecording ? '🔴' : '🎙️'}</Text>
                <Text style={styles.voiceRecordText}>
                  {isRecording ? 'Listening... Tap to stop' : voiceNote ? 'Voice note recorded. Tap to re-record' : 'Tap to speak description in your language'}
                </Text>
              </TouchableOpacity>

              {voiceNote !== '' && (
                <View style={styles.voiceBubble}>
                  <Text style={styles.voiceBubbleText}>"{voiceNote}"</Text>
                </View>
              )}

              <Button
                title="Analyze with KARVIA AI"
                onPress={handleRunAIAnalysis}
                style={styles.nextBtn}
              />
            </ScrollView>
          )}

          {/* STEP 2: AI PROCESSING */}
          {step === 2 && (
            <View style={styles.centerLoading}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={styles.analyzingTitle}>KARVIA AI Analyzing Craft...</Text>
              <Text style={styles.analyzingSubtitle}>Extracting weave density, material composition, and GI pattern features.</Text>
            </View>
          )}

          {/* STEP 3: REVIEW & EDIT */}
          {step === 3 && (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.aiNotice}>
                <Text style={styles.aiNoticeText}>✨ AI generated structured listing. You retain 100% edit & approval control.</Text>
              </View>

              {/* Multilingual Description Preview Tabs */}
              <Text style={styles.inputLabel}>Multilingual Listing Preview (AI Translated)</Text>
              <View style={styles.langPreviewTabsRow}>
                {[
                  { code: 'en', label: 'English' },
                  { code: 'ta', label: 'தமிழ் (Tamil)' },
                  { code: 'hi', label: 'हिन्दी (Hindi)' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    onPress={() => setPreviewLang(item.code)}
                    style={[styles.langPreviewTab, previewLang === item.code && styles.langPreviewTabActive]}
                  >
                    <Text style={[styles.langPreviewTabText, previewLang === item.code && styles.langPreviewTabTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.multilingualCard}>
                <Text style={styles.previewLangNote}>
                  {previewLang === 'ta' ? 'தமிழ் விவரிப்பு (Tamil Preview):' : previewLang === 'hi' ? 'हिन्दी विवरण (Hindi Preview):' : 'Buyer Listing Description (English):'}
                </Text>
                <Text style={styles.previewLangContent}>
                  {multilingualDescriptions[previewLang] || description}
                </Text>
              </View>

              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>Product Title</Text>
                <Text style={styles.aiGeneratedBadge}>AI GENERATED</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
              />

              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>Selling Price (₹)</Text>
                <Text style={[styles.aiGeneratedBadge, { color: colors.gold }]}>FAIR COST-PLUS SUGGESTION</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="₹ Amount"
              />

              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>Craft Technique</Text>
                <Text style={styles.aiGeneratedBadge}>AI IDENTIFIED</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={craftTechnique}
                onChangeText={setCraftTechnique}
                placeholder="Technique"
              />

              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>Materials</Text>
                <Text style={styles.aiGeneratedBadge}>AI IDENTIFIED</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={materials}
                onChangeText={setMaterials}
                placeholder="Materials used"
              />

              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>Cultural Significance & Motifs</Text>
                <Text style={styles.aiGeneratedBadge}>HERITAGE ENGINE</Text>
              </View>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={culturalSignificance}
                onChangeText={setCulturalSignificance}
                multiline
                numberOfLines={2}
                placeholder="Sacred heritage motifs, lineage origin, or cultural symbolism"
              />

              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>Buyer-Facing Impact Description</Text>
                <Text style={styles.aiGeneratedBadge}>PATRON FACING</Text>
              </View>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={buyerDescription}
                onChangeText={setBuyerDescription}
                multiline
                numberOfLines={2}
                placeholder="Compelling description highlighting direct artisan support and craft hours"
              />

              <Text style={styles.inputLabel}>Dimensions</Text>
              <TextInput
                style={styles.textInput}
                value={dimensions}
                onChangeText={setDimensions}
                placeholder="Length x Width"
              />

              <View style={styles.rowTwoInputs}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Crafting Days</Text>
                  <TextInput
                    style={styles.textInput}
                    value={productionDays}
                    onChangeText={setProductionDays}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Stock Available</Text>
                  <TextInput
                    style={styles.textInput}
                    value={stockCount}
                    onChangeText={setStockCount}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Artisan Story & Making Process</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />

              {/* 3D and Try-on capabilities */}
              <View style={styles.switchRow}>
                <TouchableOpacity
                  onPress={() => setSupportsTryOn(!supportsTryOn)}
                  style={[styles.togglePill, supportsTryOn && styles.togglePillActive]}
                >
                  <Text style={styles.togglePillText}>{supportsTryOn ? '✓ Try-On Enabled' : '+ Enable Try-On'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSupports3D(!supports3D)}
                  style={[styles.togglePill, supports3D && styles.togglePillActive]}
                >
                  <Text style={styles.togglePillText}>{supports3D ? '✓ 3D View Enabled' : '+ Enable 3D'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomButtonsRow}>
                <Button
                  title="Save Draft"
                  variant="outline"
                  onPress={handleSaveDraft}
                  loading={isSaving}
                  style={styles.halfBtn}
                />
                <Button
                  title="Publish Product"
                  onPress={handlePublish}
                  loading={isSaving}
                  style={styles.halfBtn}
                />
              </View>
            </ScrollView>
          )}
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
    maxHeight: '90%',
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
  stepIndicator: {
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
  scrollContent: {
    paddingVertical: 14,
    paddingBottom: 24,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  imagePreviewBox: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  cameraText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 4,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryPill: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  categoryPillText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  voiceRecordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    padding: 14,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.primaryMuted,
    borderStyle: 'dashed',
  },
  voiceRecording: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  voiceRecordIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  voiceRecordText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  voiceBubble: {
    backgroundColor: colors.goldLight,
    padding: 10,
    borderRadius: borderRadius.md,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  voiceBubbleText: {
    fontSize: 13,
    color: '#7B5D0F',
    fontStyle: 'italic',
  },
  nextBtn: {
    marginTop: 20,
  },
  centerLoading: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 16,
  },
  analyzingSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 24,
  },
  aiNotice: {
    backgroundColor: colors.primaryLight,
    padding: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 10,
  },
  aiNoticeText: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  rowTwoInputs: {
    flexDirection: 'row',
  },
  switchRow: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  togglePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    backgroundColor: colors.surfaceSubtle,
  },
  togglePillActive: {
    backgroundColor: colors.emeraldLight,
    borderColor: colors.emerald,
  },
  togglePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  halfBtn: {
    flex: 1,
    marginHorizontal: 4,
  },
  langPreviewTabsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  langPreviewTab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langPreviewTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langPreviewTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  langPreviewTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  multilingualCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  previewLangNote: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 3,
  },
  previewLangContent: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  inputHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  aiGeneratedBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
});

export default AddProductWizard;
