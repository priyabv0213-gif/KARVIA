// 3D & Immersive AR Service for KARVIA
// Provides GLB/glTF asset pipelines, Three.js mesh configurations, garment draping presets, and device capability checks.

export const THREE_D_MODELS_REGISTRY = {
  kanchipuram_saree: {
    id: 'kanchipuram_saree',
    name: 'Kanchipuram Silk Saree (Korvai Weave)',
    category: 'garment',
    tryOnSupported: true,
    arSpaceSupported: false,
    modelType: 'gltf_glb',
    scale: [1.0, 1.0, 1.0],
    garmentType: 'saree',
    drapeFeatures: {
      palluLength: '2.2m',
      pleatCount: 7,
      borderHeight: '18cm',
      fabricTexture: 'silk_shimmer',
      dominantColor: '#B23B0F',
      accentColor: '#D4AF37',
    },
    wireframeGeometry: 'cloth_simulation_mesh',
  },
  bandhani_dupatta: {
    id: 'bandhani_dupatta',
    name: 'Kutch Bandhani Silk Dupatta',
    category: 'garment',
    tryOnSupported: true,
    arSpaceSupported: false,
    modelType: 'gltf_glb',
    scale: [1.0, 1.0, 1.0],
    garmentType: 'dupatta',
    drapeFeatures: {
      palluLength: '2.5m',
      pleatCount: 0,
      borderHeight: '8cm',
      fabricTexture: 'crinkle_georgette',
      dominantColor: '#C0392B',
      accentColor: '#F59E0B',
    },
    wireframeGeometry: 'shoulder_drape_mesh',
  },
  blue_pottery_vase: {
    id: 'blue_pottery_vase',
    name: 'Jaipur Blue Pottery Persian Vase',
    category: 'object',
    tryOnSupported: false,
    arSpaceSupported: true,
    modelType: 'gltf_glb',
    scale: [0.35, 0.35, 0.35],
    realWorldDimensions: { heightCm: 35.5, diameterCm: 15.2, weightKg: 1.45 },
    materialShader: 'high_gloss_ceramic',
    surfaceAnchorType: 'horizontal_plane', // floor or tabletop
  },
  dhokra_nandi: {
    id: 'dhokra_nandi',
    name: 'Dhokra Lost-Wax Bell Metal Nandi',
    category: 'object',
    tryOnSupported: false,
    arSpaceSupported: true,
    modelType: 'gltf_glb',
    scale: [0.22, 0.22, 0.22],
    realWorldDimensions: { heightCm: 22.8, lengthCm: 17.5, weightKg: 1.8 },
    materialShader: 'metallic_antique_brass',
    surfaceAnchorType: 'horizontal_plane',
  },
  madhubani_frame: {
    id: 'madhubani_frame',
    name: 'Madhubani Handpainted Framed Art',
    category: 'wall_art',
    tryOnSupported: false,
    arSpaceSupported: true,
    modelType: 'gltf_glb',
    scale: [0.6, 0.45, 0.05],
    realWorldDimensions: { heightCm: 60, widthCm: 45, depthCm: 3 },
    materialShader: 'matte_canvas_wood_frame',
    surfaceAnchorType: 'vertical_plane', // wall placement
  }
};

// Device Capability Check
export const checkDeviceARCompatibility = async () => {
  // Simulate hardware sensor & ARCore/ARKit availability detection
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Real world logic: Check OS version, camera presence, gyroscope, GL context
  const hasWebGL = true;
  const hasCamera = true;
  // ARCore is available on supported Android devices; graceful fallback provided
  const hasARCore = true;

  return {
    isARSupported: hasARCore && hasCamera,
    is3DViewerSupported: hasWebGL,
    recommendedMode: hasARCore ? 'AR_CAMERA' : '3D_VIEWER',
    details: {
      webGL: hasWebGL,
      camera: hasCamera,
      surfacePlaneDetection: hasARCore,
      poseTracking: hasCamera,
    },
    message: hasARCore
      ? 'Device is fully compatible with KARVIA AR and 3D rendering.'
      : 'AR surface tracking is not supported on this device. Interactive 3D Product Viewer is active.',
  };
};

export default {
  THREE_D_MODELS_REGISTRY,
  checkDeviceARCompatibility,
};
