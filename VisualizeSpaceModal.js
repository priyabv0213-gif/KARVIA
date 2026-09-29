import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, PanResponder } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, borderRadius, shadows } from '../../theme/typography';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const VisualizeSpaceModal = ({ visible, onClose, product }) => {
  const [surfaceDetected, setSurfaceDetected] = useState(true);
  const [objectPlaced, setObjectPlaced] = useState(true);
  const [objectScale, setObjectScale] = useState(1);
  const [objectRotation, setObjectRotation] = useState(0);
  const [objectPosition, setObjectPosition] = useState({ x: 0, y: 0 });

  const handlePlaceAgain = () => {
    setObjectPlaced(true);
    setObjectPosition({ x: 0, y: 0 });
    setObjectRotation(0);
    setObjectScale(1);
  };

  const handleRemove = () => {
    setObjectPlaced(false);
  };

  const handleRotate = () => {
    setObjectRotation((prev) => (prev + 45) % 360);
  };

  const handleScale = (delta) => {
    setObjectScale((prev) => Math.max(Math.min(prev + delta, 1.8), 0.5));
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <View style={styles.badgeRow}>
                <Badge label="AR Surface Anchor" variant="gold" size="sm" />
                <Badge label="Craft Decor Placement" variant="info" size="sm" />
              </View>
              <Text style={[typography.h3, styles.title]}>Visualize in My Space</Text>
              <Text style={styles.productTitle} numberOfLines={1}>{product?.title}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* AR Camera Surface Viewport */}
          <View style={styles.arViewport}>
            {/* Live Environment Background */}
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', // Living room / table surface
              }}
              style={styles.environmentBackground}
              resizeMode="cover"
            />

            {/* Horizontal Surface Grid / Anchor Plane */}
            <View style={styles.surfaceGridPlane} pointerEvents="none">
              <View style={styles.reticleRing}>
                <View style={styles.reticleDot} />
              </View>
              <Text style={styles.surfaceDetectedText}>✓ Horizontal Surface Detected (Floor/Table)</Text>
            </View>

            {/* Rendered 3D Craft Object in Environment */}
            {objectPlaced && (
              <View
                style={[
                  styles.arObjectContainer,
                  {
                    transform: [
                      { translateX: objectPosition.x },
                      { translateY: objectPosition.y },
                      { rotate: `${objectRotation}deg` },
                      { scale: objectScale },
                    ],
                  },
                ]}
              >
                {/* 3D Model Cast Shadow on Surface */}
                <View style={styles.groundShadow} />
                
                {/* Actual 3D Object Render */}
                <Image
                  source={{ uri: product?.images?.[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80' }}
                  style={styles.arObjectImage}
                  resizeMode="contain"
                />
              </View>
            )}

            {/* Status Overlay */}
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>
                {objectPlaced
                  ? `Scale: ${(objectScale * 100).toFixed(0)}% • Rotation: ${objectRotation}°`
                  : 'Tap "Place Object" to anchor craft'}
              </Text>
            </View>
          </View>

          {/* Interactive AR Manipulator Controls */}
          <View style={styles.arControlsContainer}>
            <View style={styles.manipulatorRow}>
              <TouchableOpacity onPress={handleRotate} style={styles.controlPill}>
                <Text style={styles.controlIcon}>🔄</Text>
                <Text style={styles.controlLabel}>Rotate 45°</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleScale(0.15)} style={styles.controlPill}>
                <Text style={styles.controlIcon}>🔍</Text>
                <Text style={styles.controlLabel}>Scale Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleScale(-0.15)} style={styles.controlPill}>
                <Text style={styles.controlIcon}>🔎</Text>
                <Text style={styles.controlLabel}>Scale Down</Text>
              </TouchableOpacity>

              {objectPlaced ? (
                <TouchableOpacity onPress={handleRemove} style={[styles.controlPill, styles.removePill]}>
                  <Text style={styles.controlIcon}>🗑️</Text>
                  <Text style={[styles.controlLabel, { color: colors.error }]}>Remove</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handlePlaceAgain} style={[styles.controlPill, styles.placePill]}>
                  <Text style={styles.controlIcon}>📍</Text>
                  <Text style={[styles.controlLabel, { color: colors.emerald }]}>Place</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.dimensionsBanner}>
              <Text style={styles.dimLabel}>True Physical Dimensions:</Text>
              <Text style={styles.dimValue}>{product?.dimensions || '14 x 6 x 6 Inches'}</Text>
            </View>

            <Button
              title="Close Space Visualizer"
              onPress={onClose}
              style={{ marginTop: 10 }}
            />
          </View>
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
  arViewport: {
    height: 330,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  environmentBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  surfaceGridPlane: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  reticleRing: {
    width: 140,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(56, 189, 248, 0.8)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  reticleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
  },
  surfaceDetectedText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  arObjectContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  groundShadow: {
    position: 'absolute',
    bottom: 10,
    width: 130,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  arObjectImage: {
    width: 180,
    height: 180,
  },
  statusPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  statusText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  arControlsContainer: {
    paddingVertical: 4,
  },
  manipulatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  controlPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  removePill: {
    borderColor: colors.errorLight,
    backgroundColor: colors.errorLight,
  },
  placePill: {
    borderColor: colors.emeraldLight,
    backgroundColor: colors.emeraldLight,
  },
  controlIcon: {
    fontSize: 16,
  },
  controlLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },
  dimensionsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceSubtle,
    padding: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dimLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dimValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});

export default VisualizeSpaceModal;
