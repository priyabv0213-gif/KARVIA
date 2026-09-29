import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { useLanguage } from '../../context/LanguageContext';
import { parseVoiceIntent } from '../../services/aiService';
import Button from '../common/Button';

export const VoiceAssistantModal = ({ visible, onClose, onNavigate }) => {
  const { t, currentLocale } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [assistantResponse, setAssistantResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePrompts = [
    { text: 'Add my new saree', lang: 'English' },
    { text: 'புதிய கைத்தறி புடவையைச் சேர்', lang: 'தமிழ்' },
    { text: 'मेरी नई साड़ी जोड़ें', lang: 'हिन्दी' },
    { text: 'What price should I sell this for?', lang: 'English' },
    { text: 'Enhance craft photo lighting', lang: 'English' },
    { text: 'Open Guru-Shishya craft archive', lang: 'English' },
    { text: 'Find government schemes for me', lang: 'English' },
    { text: 'Show active customer orders', lang: 'English' },
  ];

  const handleSimulateVoiceInput = (text) => {
    setIsListening(true);
    setSpokenText(text);
    setIsProcessing(true);

    setTimeout(() => {
      setIsListening(false);
      const parsed = parseVoiceIntent(text);
      setAssistantResponse(parsed);
      setIsProcessing(false);
    }, 1000);
  };

  const handleStartListening = () => {
    setIsListening(true);
    setSpokenText('Listening to your craft voice...');
    setAssistantResponse(null);

    // After 2.5s simulate artisan speaking
    setTimeout(() => {
      const sample = currentLocale === 'ta'
        ? 'புதிய கைத்தறி புடவையைச் சேர்'
        : currentLocale === 'hi'
        ? 'मेरी नई साड़ी जोड़ें'
        : 'Add my new handloom saree with temple border';
      setSpokenText(sample);
      setIsListening(false);
      setIsProcessing(true);

      setTimeout(() => {
        const parsed = parseVoiceIntent(sample);
        setAssistantResponse(parsed);
        setIsProcessing(false);
      }, 900);
    }, 2200);
  };

  const handleConfirmAction = () => {
    if (assistantResponse?.actionPayload?.targetScreen) {
      const screen = assistantResponse.actionPayload.targetScreen;
      onClose();
      onNavigate(screen);
    }
  };

  const resetState = () => {
    setSpokenText('');
    setAssistantResponse(null);
    setIsListening(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={resetState}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleRow}>
              <Text style={styles.headerIcon}>🎙️</Text>
              <View>
                <Text style={[typography.h3, styles.title]}>{t('voiceAssistant', 'KARVIA Voice AI')}</Text>
                <Text style={styles.subtitle}>Accessible Voice Assistant in 13 Indian Languages</Text>
              </View>
            </View>
            <TouchableOpacity onPress={resetState} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Central Microphone Animation Area */}
          <View style={styles.micSection}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleStartListening}
              style={[
                styles.largeMicButton,
                isListening && styles.micListening,
                shadows.modal,
              ]}
            >
              <Text style={styles.micEmoji}>{isListening ? '🔊' : '🎙️'}</Text>
              {isListening && <View style={styles.pulseRing} />}
            </TouchableOpacity>

            <Text style={styles.micInstruction}>
              {isListening
                ? 'Speak now in Tamil, Hindi, English, etc...'
                : isProcessing
                ? 'Recognizing your craft speech...'
                : 'Tap microphone to speak'}
            </Text>

            {spokenText !== '' && (
              <View style={styles.speechBubble}>
                <Text style={styles.speechLabel}>You said:</Text>
                <Text style={styles.speechContent}>"{spokenText}"</Text>
              </View>
            )}
          </View>

          {/* AI Response Card */}
          {isProcessing ? (
            <View style={styles.loadingCard}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={styles.loadingText}>Understanding craft requirements...</Text>
            </View>
          ) : assistantResponse ? (
            <View style={styles.responseCard}>
              <View style={styles.aiBadgeRow}>
                <Text style={styles.aiBadge}>KARVIA ASSISTANT</Text>
              </View>
              <Text style={styles.responseText}>{assistantResponse.message}</Text>

              <View style={styles.actionButtonsRow}>
                <Button
                  title="Proceed"
                  onPress={handleConfirmAction}
                  style={styles.confirmBtn}
                />
                <Button
                  title="Try Again"
                  variant="outline"
                  onPress={() => {
                    setAssistantResponse(null);
                    setSpokenText('');
                  }}
                  style={styles.cancelBtn}
                />
              </View>
            </View>
          ) : (
            /* Quick suggestions */
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Or tap a common question:</Text>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollSuggestions}>
                {samplePrompts.map((prompt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.7}
                    onPress={() => handleSimulateVoiceInput(prompt.text || prompt)}
                    style={styles.promptPill}
                  >
                    <Text style={styles.promptText}>"{prompt.text || prompt}"</Text>
                    {prompt.lang && <Text style={styles.promptLangTag}>{prompt.lang}</Text>}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
    maxHeight: '85%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
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
  micSection: {
    alignItems: 'center',
    marginVertical: 14,
  },
  largeMicButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  micListening: {
    backgroundColor: '#DC2626',
  },
  micEmoji: {
    fontSize: 42,
  },
  pulseRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  micInstruction: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  speechBubble: {
    marginTop: 12,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  speechLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  speechContent: {
    fontSize: 15,
    color: colors.textPrimary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  loadingCard: {
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
  },
  responseCard: {
    backgroundColor: colors.goldLight,
    borderRadius: borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gold,
    marginTop: 10,
  },
  aiBadgeRow: {
    marginBottom: 6,
  },
  aiBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8A6D15',
    letterSpacing: 0.8,
  },
  responseText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 14,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmBtn: {
    flex: 1,
    marginRight: 8,
  },
  cancelBtn: {
    flex: 1,
  },
  suggestionsContainer: {
    marginTop: 10,
    maxHeight: 180,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  scrollSuggestions: {
    maxHeight: 140,
  },
  promptPill: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promptText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  promptLangTag: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
});

export default VoiceAssistantModal;
