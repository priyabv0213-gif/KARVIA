import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import { HERITAGE_ARCHIVES } from '../../services/heritageArchiveData';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const GuruShishyaArchiveModal = ({ visible, onClose }) => {
  const [selectedArchiveIndex, setSelectedArchiveIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecordingWisdom, setIsRecordingWisdom] = useState(false);
  const [recordedMessage, setRecordedMessage] = useState(null);

  const archive = HERITAGE_ARCHIVES[selectedArchiveIndex] || HERITAGE_ARCHIVES[0];

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleRecordWisdom = () => {
    setIsRecordingWisdom(true);
    setTimeout(() => {
      setIsRecordingWisdom(false);
      setRecordedMessage('Voice wisdom session recorded: "Advice on handling monsoon humidity during Korvai warp tensioning" (1 min 24 sec). Stored in Living Archive.');
    }, 2400);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.badgeRow}>
                <Text style={styles.headerBadge}>HERITAGE PRESERVATION</Text>
                <Badge label={archive.giTag} variant="gold" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Guru–Shishya Living Archive</Text>
              <Text style={styles.subtitle}>Preserving Tacit Craft Wisdom & Generational Lineages</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Heritage Craft Selector */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.craftTabsScroll}>
              {HERITAGE_ARCHIVES.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedArchiveIndex(index);
                    setIsPlayingAudio(false);
                  }}
                  style={[styles.craftTab, selectedArchiveIndex === index && styles.craftTabActive]}
                >
                  <Text style={[styles.craftTabText, selectedArchiveIndex === index && styles.craftTabTextActive]}>
                    {item.craftName.split(' ')[0]} {item.craftName.split(' ')[1] || ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Core Heritage Mission Banner */}
            <View style={styles.missionCard}>
              <Text style={styles.missionIcon}>📜</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.missionTitle}>Living Knowledge, Not Just Products</Text>
                <Text style={styles.missionDesc}>
                  Traditional Indian crafts embody complex mathematics, metallurgy, and botanical knowledge. KARVIA documents tacit master-apprentice techniques before they are lost to mechanized mass duplication.
                </Text>
              </View>
            </View>

            {/* Master Artisan Card */}
            <View style={styles.lineageCard}>
              <View style={styles.cardTopRow}>
                <Text style={styles.avatarIcon}>{archive.masterArtisan.avatarEmoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.personTitle}>GURU (MASTER ARTISAN)</Text>
                  <Text style={styles.personName}>{archive.masterArtisan.name}</Text>
                  <Text style={styles.personExperience}>{archive.masterArtisan.experience} • {archive.region}</Text>
                </View>
              </View>
              <Text style={styles.personHonors}>🎖️ {archive.masterArtisan.honors}</Text>
              <Text style={styles.personLineage}>🌱 {archive.masterArtisan.lineage}</Text>
              <View style={styles.quoteBox}>
                <Text style={styles.quoteMark}>“</Text>
                <Text style={styles.quoteText}>{archive.masterArtisan.quote}</Text>
              </View>
            </View>

            {/* Apprentice / Shishya Card */}
            <View style={[styles.lineageCard, styles.apprenticeCard]}>
              <View style={styles.cardTopRow}>
                <Text style={styles.avatarIcon}>🧑🏽</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.personTitle, { color: colors.primary }]}>SHISHYA (APPRENTICE)</Text>
                  <Text style={styles.personName}>{archive.apprentice.name}</Text>
                  <Text style={styles.personExperience}>{archive.apprentice.relationship} • {archive.apprentice.yearsLearning}</Text>
                </View>
              </View>
              <Text style={styles.personLineage}>🎯 Specialization: {archive.apprentice.specialization}</Text>
              <View style={[styles.quoteBox, { backgroundColor: colors.surface }]}>
                <Text style={styles.quoteMark}>“</Text>
                <Text style={styles.quoteText}>{archive.apprentice.quote}</Text>
              </View>
            </View>

            {/* Oral History Audio Section */}
            <Text style={styles.sectionHeader}>Oral History & Craft Ancestry</Text>
            <View style={styles.oralHistoryCard}>
              <View style={styles.audioTopRow}>
                <View style={styles.audioInfo}>
                  <Text style={styles.audioTitle}>{archive.oralHistory.title}</Text>
                  <Text style={styles.audioMeta}>
                    Duration: {archive.oralHistory.duration} • Recorded: {archive.oralHistory.recordedDate}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleToggleAudio}
                  style={[styles.audioPlayBtn, isPlayingAudio && styles.audioPlayingBtn]}
                >
                  <Text style={styles.audioPlayIcon}>{isPlayingAudio ? '⏸️' : '▶️'}</Text>
                </TouchableOpacity>
              </View>

              {isPlayingAudio && (
                <View style={styles.waveBarRow}>
                  <View style={[styles.waveLine, { height: 16 }]} />
                  <View style={[styles.waveLine, { height: 28 }]} />
                  <View style={[styles.waveLine, { height: 20 }]} />
                  <View style={[styles.waveLine, { height: 34 }]} />
                  <View style={[styles.waveLine, { height: 14 }]} />
                  <View style={[styles.waveLine, { height: 24 }]} />
                  <Text style={styles.audioListeningNote}>Playing master oral testimony...</Text>
                </View>
              )}

              <Text style={styles.transcriptLabel}>SPOKEN TRANSCRIPT:</Text>
              <Text style={styles.transcriptText}>"{archive.oralHistory.audioTranscript}"</Text>
              <View style={styles.langPillsRow}>
                {archive.oralHistory.languages.map((l, idx) => (
                  <View key={idx} style={styles.langChip}>
                    <Text style={styles.langChipText}>{l}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Tacit Knowledge & Non-Mechanizable Techniques */}
            <Text style={styles.sectionHeader}>Tacit Craft Techniques Preserved</Text>
            {archive.tacitTechniques.map((tech) => (
              <View key={tech.step} style={styles.techniqueCard}>
                <View style={styles.techHeader}>
                  <View style={styles.techStepPill}>
                    <Text style={styles.techStepText}>STEP {tech.step}</Text>
                  </View>
                  <Badge label={tech.preservationStatus} variant="outline" size="sm" />
                </View>
                <Text style={styles.techTitle}>{tech.title}</Text>
                <Text style={styles.techDesc}>{tech.description}</Text>
                <View style={styles.proTipBox}>
                  <Text style={styles.proTipLabel}>💡 Master's Tacit Secret:</Text>
                  <Text style={styles.proTipText}>{tech.keyTip}</Text>
                </View>
              </View>
            ))}

            {/* Record New Craft Wisdom Action */}
            <View style={styles.recordWisdomCard}>
              <Text style={styles.recordWisdomTitle}>Record New Craft Wisdom</Text>
              <Text style={styles.recordWisdomSub}>
                Are you a practicing master or apprentice? Record your voice advice, loom tips, or ancestral songs for the permanent Living Archive.
              </Text>
              <Button
                title={isRecordingWisdom ? 'Recording Craft Audio...' : '🎙️ Record Craft Wisdom Note'}
                onPress={handleRecordWisdom}
                disabled={isRecordingWisdom}
                variant="primary"
                size="md"
                style={{ marginTop: 10 }}
              />
              {recordedMessage && (
                <View style={styles.recordedNotice}>
                  <Text style={styles.recordedNoticeText}>✓ {recordedMessage}</Text>
                </View>
              )}
            </View>

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
  craftTabsScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  craftTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSubtle,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  craftTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  craftTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  craftTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  missionCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  missionIcon: {
    fontSize: 26,
    marginRight: 10,
  },
  missionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  missionDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lineageCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  apprenticeCard: {
    backgroundColor: colors.surfaceSubtle,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  personTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 0.8,
  },
  personName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  personExperience: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  personHonors: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 4,
  },
  personLineage: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quoteBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.sm,
    padding: 10,
    marginTop: 8,
    position: 'relative',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  quoteMark: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    position: 'absolute',
    top: 2,
    left: 4,
  },
  quoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    lineHeight: 16,
    color: colors.textPrimary,
    paddingLeft: 12,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 14,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  oralHistoryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.subtle,
  },
  audioTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioInfo: {
    flex: 1,
    paddingRight: 8,
  },
  audioTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  audioMeta: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  audioPlayBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioPlayingBtn: {
    backgroundColor: colors.primary,
  },
  audioPlayIcon: {
    fontSize: 18,
  },
  waveBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
    backgroundColor: colors.surfaceSubtle,
    padding: 8,
    borderRadius: borderRadius.sm,
  },
  waveLine: {
    width: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  audioListeningNote: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 10,
  },
  transcriptLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  transcriptText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  langPillsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  langChip: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  langChipText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  techniqueCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  techHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  techStepPill: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  techStepText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
  },
  techTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  techDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  proTipBox: {
    backgroundColor: colors.goldLight,
    padding: 8,
    borderRadius: borderRadius.sm,
    marginTop: 8,
  },
  proTipLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.goldDark,
  },
  proTipText: {
    fontSize: 11,
    color: colors.textPrimary,
    marginTop: 2,
  },
  recordWisdomCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 6,
  },
  recordWisdomTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  recordWisdomSub: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  recordedNotice: {
    backgroundColor: colors.emeraldLight,
    padding: 8,
    borderRadius: borderRadius.sm,
    marginTop: 8,
  },
  recordedNoticeText: {
    fontSize: 11,
    color: colors.emerald,
    fontWeight: '600',
  },
});

export default GuruShishyaArchiveModal;
