import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../theme/colors';
import { typography, borderRadius } from '../theme/typography';
import Button from '../components/common/Button';

export const OnboardingScreen = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: '1',
      title: 'Welcome to KARVIA',
      subtitle: 'Where Indian craftsmanship meets the digital world.',
      icon: '🪷',
      bgImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    },
    {
      id: '2',
      title: 'Empower Your Craft',
      subtitle: 'Create, showcase and sell your products directly to a conscious global market.',
      icon: '🧵',
      bgImage: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&q=80',
    },
    {
      id: '3',
      title: 'Tell Your Craft Story',
      subtitle: 'Use your voice in your native language, photos, and videos to document authentic craft evidence.',
      icon: '🎙️',
      bgImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    },
    {
      id: '4',
      title: 'Experience Craft in 3D',
      subtitle: 'Try sarees and garments virtually, and visualize authentic pottery and sculptures in your own space.',
      icon: '🔄',
      bgImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
    }
  ];

  const currentSlide = slides[currentIndex];
  const isLast = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header with Skip */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>KARVIA</Text>
        {!isLast ? (
          <TouchableOpacity onPress={onFinish} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 40 }} />}
      </View>

      {/* Hero Visual Card */}
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: currentSlide.bgImage }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        <View style={styles.iconCircle}>
          <Text style={styles.slideIcon}>{currentSlide.icon}</Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={[typography.h1, styles.slideTitle]}>{currentSlide.title}</Text>
        <Text style={styles.slideSubtitle}>{currentSlide.subtitle}</Text>

        {/* Progress Dots */}
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <Button
          title={isLast ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          size="lg"
          style={styles.actionBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 2,
  },
  skipBtn: {
    padding: 6,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceSubtle,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 15, 5, 0.35)',
  },
  iconCircle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideIcon: {
    fontSize: 32,
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  slideTitle: {
    color: colors.textPrimary,
    marginBottom: 8,
  },
  slideSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  dotsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginRight: 6,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  actionBtn: {
    width: '100%',
  },
});

export default OnboardingScreen;
