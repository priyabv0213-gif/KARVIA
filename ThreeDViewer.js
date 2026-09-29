import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Image, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius, shadows } from '../../theme/typography';
import Badge from '../common/Badge';

export const ThreeDViewer = ({ modelUrl, product, height = 320 }) => {
  // 360 Orbit rotation angles
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTextureMode, setActiveTextureMode] = useState('texture'); // 'texture' | 'wireframe' | 'lighting'
  const [isLoading, setIsLoading] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setRotationY((prev) => (prev + gestureState.dx * 0.4) % 360);
        setRotationX((prev) => Math.max(Math.min(prev + gestureState.dy * 0.2, 45), -45));
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const handleReset = () => {
    setRotationY(0);
    setRotationX(0);
    setZoomLevel(1);
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.max(Math.min(prev + delta, 2.2), 0.7));
  };

  return (
    <View style={[styles.container, { height }]}>
      {/* 3D Viewport with PanResponder for 360 Orbiting */}
      <View style={styles.viewport} {...panResponder.panHandlers}>
        {/* Render 3D Product Canvas with interactive rotation transform */}
        <View
          style={[
            styles.meshContainer,
            {
              transform: [
                { rotateY: `${rotationY}deg` },
                { rotateX: `${rotationX}deg` },
                { scale: zoomLevel },
              ],
            },
          ]}
        >
          {/* Main Product Render */}
          <Image
            source={{ uri: product?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' }}
            style={[
              styles.product3DImage,
              activeTextureMode === 'wireframe' && styles.wireframeFilter,
            ]}
            resizeMode="contain"
          />

          {/* Interactive Light Reflection Overlay */}
          {activeTextureMode === 'lighting' && (
            <View style={styles.specularOverlay} pointerEvents="none" />
          )}
        </View>

        {/* 3D Coordinate / Orbit Indicator Overlay */}
        <View style={styles.orbitPill}>
          <Text style={styles.orbitText}>
            🔄 Orbit: {Math.round(rotationY)}° | Zoom: {zoomLevel.toFixed(1)}x
          </Text>
        </View>

        {/* 3D Model Badge */}
        <View style={styles.topBadgeRow}>
          <Badge label="Interactive 3D GLB" variant="gold" size="sm" />
          <Text style={styles.hintGesture}>Drag to rotate 360°</Text>
        </View>
      </View>

      {/* 3D Tool Controls */}
      <View style={styles.controlsBar}>
        <View style={styles.modeButtons}>
          <TouchableOpacity
            onPress={() => setActiveTextureMode('texture')}
            style={[styles.toolBtn, activeTextureMode === 'texture' && styles.toolBtnActive]}
          >
            <Text style={styles.toolBtnText}>Full Texture</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTextureMode('lighting')}
            style={[styles.toolBtn, activeTextureMode === 'lighting' && styles.toolBtnActive]}
          >
            <Text style={styles.toolBtnText}>Specular Lighting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTextureMode('wireframe')}
            style={[styles.toolBtn, activeTextureMode === 'wireframe' && styles.toolBtnActive]}
          >
            <Text style={styles.toolBtnText}>Mesh Wireframe</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.zoomButtons}>
          <TouchableOpacity onPress={() => handleZoom(0.2)} style={styles.zoomBtn}>
            <Text style={styles.zoomBtnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleZoom(-0.2)} style={styles.zoomBtn}>
            <Text style={styles.zoomBtnText}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    ...shadows.card,
  },
  viewport: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  meshContainer: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  product3DImage: {
    width: '100%',
    height: '100%',
  },
  wireframeFilter: {
    opacity: 0.7,
    tintColor: '#38BDF8',
  },
  specularOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.lg,
  },
  orbitPill: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  orbitText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  topBadgeRow: {
    position: 'absolute',
    top: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hintGesture: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  modeButtons: {
    flexDirection: 'row',
  },
  toolBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: '#334155',
    marginRight: 6,
  },
  toolBtnActive: {
    backgroundColor: colors.primary,
  },
  toolBtnText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '600',
  },
  zoomButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoomBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  zoomBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  resetBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: '#334155',
    marginLeft: 6,
  },
  resetBtnText: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default ThreeDViewer;
