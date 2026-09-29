import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { CRAFT_CATEGORIES } from '../../services/craftTaxonomy';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const ArtisanOnboardingScreen = ({ onFinish }) => {
  const { onboardArtisan } = useAuth();
  const { t } = useLanguage();

  // Artisan Profile State
  const [name, setName] = useState('');
  const [craftCategory, setCraftCategory] = useState('handloom_textiles');
  const [craftName, setCraftName] = useState('Kanchipuram Silk Korvai Weaving');
  const [region, setRegion] = useState('Tamil Nadu');
  const [craftCluster, setCraftCluster] = useState('Pillayar Palayam Weaver Co-op');
  const [yearsExperience, setYearsExperience] = useState('22');
  const [story, setStory] = useState('');
  const [languages, setLanguages] = useState(['Tamil', 'English']);
  const [skills, setSkills] = useState(['Handloom Korvai Weaving', 'Natural Madder Dyeing']);

  // Voice Onboarding State
  const [isRecordingStory, setIsRecordingStory] = useState(false);
  const [voiceNoteRecorded, setVoiceNoteRecorded] = useState(false);

  const craftTraditions = [
    { name: 'Kanchipuram Silk Korvai', category: 'handloom_textiles', region: 'Tamil Nadu', cluster: 'Pillayar Palayam Weaver Co-op' },
    { name: 'Bastar Lost-Wax Dhokra', category: 'metal_crafts', region: 'Chhattisgarh', cluster: 'Bastar Tribal Craft Society' },
    { name: 'Jaipur Blue Pottery', category: 'pottery_ceramics', region: 'Rajasthan', cluster: 'Kot Jewar Pottery Guild' },
    { name: 'Madhubani Folk Painting', category: 'folk_paintings', region: 'Bihar', cluster: 'Jitwarpur Mahila Kalakars' },
    { name: 'Bankura Terracotta', category: 'pottery_ceramics', region: 'West Bengal', cluster: 'Panchmura Terracotta Guild' },
  ];

  const handleSelectTradition = (tradition) => {
    setCraftName(tradition.name);
    setCraftCategory(tradition.category);
    setRegion(tradition.region);
    setCraftCluster(tradition.cluster);
  };

  const handleSimulateVoiceBio = () => {
    setIsRecordingStory(true);
    setTimeout(() => {
      setIsRecordingStory(false);
      setVoiceNoteRecorded(true);
      setStory('I learned this craft from my parents as a 4th-generation weaver. We weave pure silk sarees on wooden pit looms with gold zari temple borders.');
      if (!name) setName('Meenakshi Sundaram');
    }, 2200);
  };

  const handleSubmit = async () => {
    const finalName = name.trim() || 'Master Artisan';
    await onboardArtisan({
      name: finalName,
      craftCategory,
      craftName,
      region,
      craftCluster,
      yearsExperience: parseInt(yearsExperience, 10) || 15,
      story: story.trim() || 'Traditional master craftsperson dedicated to preserving non-mechanized heritage.',
      skills,
      languages,
      voiceNoteUri: voiceNoteRecorded ? 'https://cdn.karvia.crafts.org/voice/artisan_bio.mp3' : null,
    });

    if (onFinish) {
      onFinish();
    }
  };

  const handleQuickDemoSetup = async () => {
    await onboardArtisan({
      name: 'Meenakshi Sundaram',
      craftCategory: 'handloom_textiles',
      craftName: 'Kanchipuram Pure Silk Korvai',
      region: 'Tamil Nadu',
      craftCluster: 'Pillayar Palayam Weaver Co-op',
      yearsExperience: 22,
      story: 'Preserving the 4th-generation tradition of temple border handloom weaving on wooden pit looms.',
      skills: ['Three-shuttle Korvai', 'Pure Zari Calibration', 'Natural Madder Dyeing'],
      languages: ['Tamil', 'English', 'Hindi'],
    });

    if (onFinish) {
      onFinish();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Onboarding Header */}
        <View style={styles.headerBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.stepBadge}>STEP 1 OF 1</Text>
            <Badge label="Low-Literacy Friendly" variant="gold" size="sm" />
          </View>
          <Text style={[typography.h2, styles.title]}>Create Your Artisan Profile</Text>
          <Text style={styles.subtitle}>
            Tell KARVIA about your craft lineage. We use this to generate your authentic digital business and verified craft evidence.
          </Text>
        </View>

        {/* VOICE-FIRST ONBOARDING CARD */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleSimulateVoiceBio}
          style={styles.voiceBioCard}
        >
          <View style={styles.micCircle}>
            <Text style={styles.micEmoji}>{isRecordingStory ? '🔊' : '🎙️'}</Text>
          </View>
          <View style={styles.voiceBioInfo}>
            <Text style={styles.voiceBioTitle}>
              {isRecordingStory ? 'Listening in your language...' : 'Speak Your Craft Story'}
            </Text>
            <Text style={styles.voiceBioSub}>
              {voiceNoteRecorded
                ? '✓ Story transcribed from your voice recording!'
                : 'Tap to speak your name, craft, and village lineage.'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 1. Artisan Name Input */}
        <Text style={styles.fieldLabel}>Your Name / உங்கள் பெயர்</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Meenakshi Sundaram / रमेश कुमार"
          placeholderTextColor={colors.textMuted}
        />

        {/* 2. Select Craft Tradition */}
        <Text style={styles.fieldLabel}>Select Your Craft Tradition / கைவினை மரபு</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {craftTraditions.map((trad, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleSelectTradition(trad)}
              style={[styles.traditionChip, craftName === trad.name && styles.traditionChipActive]}
            >
              <Text style={[styles.traditionText, craftName === trad.name && styles.traditionTextActive]}>
                {trad.name}
              </Text>
              <Text style={styles.traditionSub}>{trad.region}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 3. Craft Cluster & Cooperative */}
        <Text style={styles.fieldLabel}>Craft Cluster / Weaver Cooperative Society</Text>
        <TextInput
          style={styles.textInput}
          value={craftCluster}
          onChangeText={setCraftCluster}
          placeholder="e.g. Pillayar Palayam Handloom Weavers Co-op Society"
          placeholderTextColor={colors.textMuted}
        />

        {/* 4. Region / State */}
        <View style={styles.rowTwoInputs}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.fieldLabel}>Region / State</Text>
            <TextInput
              style={styles.textInput}
              value={region}
              onChangeText={setRegion}
              placeholder="e.g. Tamil Nadu"
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.fieldLabel}>Years of Experience</Text>
            <TextInput
              style={styles.textInput}
              value={yearsExperience}
              onChangeText={setYearsExperience}
              keyboardType="numeric"
              placeholder="e.g. 22"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        {/* 5. Craft Story / Lineage */}
        <Text style={styles.fieldLabel}>Your Craft Story & Generational Lineage</Text>
        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          value={story}
          onChangeText={setStory}
          multiline
          numberOfLines={3}
          placeholder="Tell buyers about your family lineage, techniques, and the prayer or dedication behind your craft..."
          placeholderTextColor={colors.textMuted}
        />

        {/* Submit & Quick Setup Buttons */}
        <Button
          title="Save Profile & Open Artisan Dashboard →"
          onPress={handleSubmit}
          variant="primary"
          size="lg"
          style={{ marginTop: 20 }}
        />

        <TouchableOpacity
          onPress={handleQuickDemoSetup}
          style={styles.skipToDemoBtn}
        >
          <Text style={styles.skipToDemoText}>Use Verified Master Weaver Demo Profile →</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerBox: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  stepBadge: {
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
    lineHeight: 18,
    color: colors.textSecondary,
    marginTop: 4,
  },
  voiceBioCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    ...shadows.card,
  },
  micCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  micEmoji: {
    fontSize: 22,
  },
  voiceBioInfo: {
    flex: 1,
  },
  voiceBioTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  voiceBioSub: {
    fontSize: 11,
    color: '#FBECE5',
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
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
  chipsScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  traditionChip: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  traditionChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  traditionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  traditionTextActive: {
    color: colors.primary,
  },
  traditionSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rowTwoInputs: {
    flexDirection: 'row',
  },
  skipToDemoBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 6,
  },
  skipToDemoText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default ArtisanOnboardingScreen;
