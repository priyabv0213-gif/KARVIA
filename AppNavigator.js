import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { colors } from './theme/colors';
import { useAuth } from './context/AuthContext';
import { useProducts } from './context/ProductsContext';

// Common Components
import Header from './components/common/Header';
import BottomTabBar from './components/common/BottomTabBar';
import LanguageModal from './components/common/LanguageModal';
import RoleModal from './components/common/RoleModal';
import WhatsAppCommunicationModal from './components/common/WhatsAppCommunicationModal';

// Screens
import SplashScreen from './screens/SplashScreen';
import ArtisanOnboardingScreen from './screens/artisan/ArtisanOnboardingScreen';

// Artisan Screens
import ArtisanHomeScreen from './screens/artisan/ArtisanHomeScreen';
import ArtisanProductsScreen from './screens/artisan/ArtisanProductsScreen';
import ArtisanOrdersScreen from './screens/artisan/ArtisanOrdersScreen';
import ArtisanEarningsScreen from './screens/artisan/ArtisanEarningsScreen';
import GovernmentSchemesScreen from './screens/artisan/GovernmentSchemesScreen';
import RawMaterialIntelligenceScreen from './screens/artisan/RawMaterialIntelligenceScreen';

// Buyer Screens
import BuyerHomeScreen from './screens/buyer/BuyerHomeScreen';
import SearchScreen from './screens/buyer/SearchScreen';
import ProductDetailScreen from './screens/buyer/ProductDetailScreen';
import CartScreen from './screens/buyer/CartScreen';
import CheckoutScreen from './screens/buyer/CheckoutScreen';
import OrderTrackingScreen from './screens/buyer/OrderTrackingScreen';

// Admin Screens
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';

// Feature Modals
import VoiceAssistantModal from './components/artisan/VoiceAssistantModal';
import AddProductWizard from './components/artisan/AddProductWizard';
import CraftImageEnhancementModal from './components/artisan/CraftImageEnhancementModal';
import CraftEvidenceModal from './components/artisan/CraftEvidenceModal';
import GuruShishyaArchiveModal from './components/artisan/GuruShishyaArchiveModal';
import FairPricingModal from './components/artisan/FairPricingModal';
import TrendFusionModal from './components/artisan/TrendFusionModal';
import BuyerImpactMirrorModal from './components/buyer/BuyerImpactMirrorModal';
import ThreeDViewer from './components/ar3d/ThreeDViewer';
import VirtualTryOnModal from './components/ar3d/VirtualTryOnModal';
import VisualizeSpaceModal from './components/ar3d/VisualizeSpaceModal';

export const AppNavigator = () => {
  const { role, switchRole, user } = useAuth();
  const { products } = useProducts();

  // Root Flow: 'splash' | 'onboarding' | 'app'
  const [rootFlow, setRootFlow] = useState('splash');
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modals Visibility
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [imageEnhanceVisible, setImageEnhanceVisible] = useState(false);
  const [evidenceModalProduct, setEvidenceModalProduct] = useState(null);
  const [livingArchiveVisible, setLivingArchiveVisible] = useState(false);
  const [pricingModalVisible, setPricingModalVisible] = useState(false);
  const [trendFusionVisible, setTrendFusionVisible] = useState(false);
  const [impactMirrorProduct, setImpactMirrorProduct] = useState(null);
  const [whatsAppProduct, setWhatsAppProduct] = useState(null);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  
  // 3D & AR Modals
  const [active3DProduct, setActive3DProduct] = useState(null);
  const [activeTryOnProduct, setActiveTryOnProduct] = useState(null);
  const [activeSpaceProduct, setActiveSpaceProduct] = useState(null);

  // 1. Splash Screen & Language Selection & Entry Choice
  if (rootFlow === 'splash') {
    return (
      <SplashScreen
        onSelectRole={(chosenRole) => {
          switchRole(chosenRole);
          if (chosenRole === 'artisan') {
            setRootFlow('onboarding');
          } else {
            setRootFlow('app');
          }
        }}
      />
    );
  }

  // 2. Artisan Onboarding Flow
  if (rootFlow === 'onboarding') {
    return <ArtisanOnboardingScreen onFinish={() => setRootFlow('app')} />;
  }

  // 3. Product Detail View (Buyer)
  if (selectedProduct && !isCheckoutOpen) {
    return (
      <View style={styles.flexOne}>
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onOpen3D={(prod) => setActive3DProduct(prod)}
          onOpenTryOn={(prod) => setActiveTryOnProduct(prod)}
          onOpenSpace={(prod) => setActiveSpaceProduct(prod)}
          onOpenEvidence={(prod) => setEvidenceModalProduct(prod)}
          onOpenImpactMirror={(prod) => setImpactMirrorProduct(prod)}
          onOpenWhatsApp={(prod) => setWhatsAppProduct(prod)}
          onGoToCart={() => {
            setSelectedProduct(null);
            setActiveTab('cart');
          }}
        />

        {/* 3D & AR Modals from Product Detail */}
        {renderImmersiveModals()}
      </View>
    );
  }

  // 4. Checkout View (Buyer)
  if (isCheckoutOpen) {
    return (
      <CheckoutScreen
        onBack={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setIsCheckoutOpen(false);
          setActiveTab('orders');
        }}
      />
    );
  }

  // Helpers to render 3D & AR modals
  function renderImmersiveModals() {
    return (
      <>
        {/* 3D Object Viewer Modal */}
        <Modal
          visible={!!active3DProduct}
          transparent
          animationType="fade"
          onRequestClose={() => setActive3DProduct(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modal3DContent}>
              <View style={styles.modal3DHeader}>
                <Text style={styles.modal3DTitle}>3D Real-Time Model Viewer</Text>
                <TouchableOpacity onPress={() => setActive3DProduct(null)} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
              <ThreeDViewer product={active3DProduct} height={380} />
            </View>
          </View>
        </Modal>

        {/* Virtual Try-On Modal */}
        <VirtualTryOnModal
          visible={!!activeTryOnProduct}
          onClose={() => setActiveTryOnProduct(null)}
          product={activeTryOnProduct}
        />

        {/* Visualize in My Space AR Modal */}
        <VisualizeSpaceModal
          visible={!!activeSpaceProduct}
          onClose={() => setActiveSpaceProduct(null)}
          product={activeSpaceProduct}
        />

        {/* Craft Evidence Modal */}
        <CraftEvidenceModal
          visible={!!evidenceModalProduct}
          onClose={() => setEvidenceModalProduct(null)}
          product={evidenceModalProduct}
        />

        {/* Buyer Impact Mirror Modal */}
        <BuyerImpactMirrorModal
          visible={!!impactMirrorProduct}
          onClose={() => setImpactMirrorProduct(null)}
          product={impactMirrorProduct}
        />

        {/* WhatsApp & Direct Communication Modal */}
        <WhatsAppCommunicationModal
          visible={!!whatsAppProduct}
          onClose={() => setWhatsAppProduct(null)}
          artisanName={whatsAppProduct?.artisanName || user?.name}
          artisanPhone={whatsAppProduct?.artisanPhone || user?.phone}
          productTitle={whatsAppProduct?.title}
        />
      </>
    );
  }

  // Main Screen Renderer based on role & active tab
  const renderMainContent = () => {
    // ADMIN PERSPECTIVE
    if (role === 'admin') {
      return <AdminDashboardScreen />;
    }

    // BUYER PERSPECTIVE
    if (role === 'buyer') {
      switch (activeTab) {
        case 'explore':
          return (
            <SearchScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpen3D={(p) => setActive3DProduct(p)}
              onOpenTryOn={(p) => setActiveTryOnProduct(p)}
              onOpenSpace={(p) => setActiveSpaceProduct(p)}
              onOpenEvidence={(p) => setEvidenceModalProduct(p)}
            />
          );
        case 'impact':
          return (
            <BuyerHomeScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpen3D={(p) => setActive3DProduct(p)}
              onOpenTryOn={(p) => setActiveTryOnProduct(p)}
              onOpenSpace={(p) => setActiveSpaceProduct(p)}
              onOpenEvidence={(p) => setEvidenceModalProduct(p)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          );
        case 'cart':
          return (
            <CartScreen
              onProceedCheckout={() => setIsCheckoutOpen(true)}
              onContinueShopping={() => setActiveTab('home')}
            />
          );
        case 'orders':
          return <OrderTrackingScreen />;
        case 'profile':
          return <ArtisanEarningsScreen />;
        case 'home':
        default:
          return (
            <BuyerHomeScreen
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpen3D={(p) => setActive3DProduct(p)}
              onOpenTryOn={(p) => setActiveTryOnProduct(p)}
              onOpenSpace={(p) => setActiveSpaceProduct(p)}
              onOpenEvidence={(p) => setEvidenceModalProduct(p)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          );
      }
    }

    // ARTISAN PERSPECTIVE (Default)
    switch (activeTab) {
      case 'products':
        return (
          <ArtisanProductsScreen
            onOpenAddProduct={() => setAddProductVisible(true)}
            onOpen3D={(p) => setActive3DProduct(p)}
            onOpenEvidence={(p) => setEvidenceModalProduct(p)}
          />
        );
      case 'archive':
        return (
          <ArtisanHomeScreen
            onOpenVoiceAssistant={() => setVoiceModalVisible(true)}
            onOpenAddProduct={() => setAddProductVisible(true)}
            onOpenImageEnhance={() => setImageEnhanceVisible(true)}
            onOpenFairPricing={() => setPricingModalVisible(true)}
            onOpenMarketplace={() => switchRole('buyer')}
            onOpenCraftEvidence={(p) => setEvidenceModalProduct(p || products[0])}
            onOpenLivingArchive={() => setLivingArchiveVisible(true)}
            onOpenTrendFusion={() => setTrendFusionVisible(true)}
            onOpenBusinessInsights={() => setActiveTab('insights')}
            onOpenSchemes={() => setActiveTab('schemes')}
            onOpenWhatsApp={() => setWhatsAppProduct(products[0] || {})}
            onOpenVirtualTryOn={(p) => setActiveTryOnProduct(p || products[0])}
            onOpenRawMaterials={() => setActiveTab('raw_materials')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        );
      case 'orders':
        return <ArtisanOrdersScreen />;
      case 'insights':
        return <ArtisanEarningsScreen />;
      case 'schemes':
        return <GovernmentSchemesScreen />;
      case 'raw_materials':
        return <RawMaterialIntelligenceScreen />;
      case 'home':
      default:
        return (
          <ArtisanHomeScreen
            onOpenVoiceAssistant={() => setVoiceModalVisible(true)}
            onOpenAddProduct={() => setAddProductVisible(true)}
            onOpenImageEnhance={() => setImageEnhanceVisible(true)}
            onOpenFairPricing={() => setPricingModalVisible(true)}
            onOpenMarketplace={() => switchRole('buyer')}
            onOpenCraftEvidence={(p) => setEvidenceModalProduct(p || products[0])}
            onOpenLivingArchive={() => setLivingArchiveVisible(true)}
            onOpenTrendFusion={() => setTrendFusionVisible(true)}
            onOpenBusinessInsights={() => setActiveTab('insights')}
            onOpenSchemes={() => setActiveTab('schemes')}
            onOpenWhatsApp={() => setWhatsAppProduct(products[0] || {})}
            onOpenVirtualTryOn={(p) => setActiveTryOnProduct(p || products[0])}
            onOpenRawMaterials={() => setActiveTab('raw_materials')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* App Universal Header */}
      <Header
        onOpenLanguageModal={() => setLanguageModalVisible(true)}
        onOpenCart={() => {
          setSelectedProduct(null);
          setActiveTab('cart');
        }}
        onOpenRoleModal={() => setRoleModalVisible(true)}
      />

      {/* Main View Area */}
      <View style={styles.flexOne}>{renderMainContent()}</View>

      {/* Bottom Accessible Tab Navigation Bar */}
      <BottomTabBar
        activeTab={activeTab === 'archive' ? 'archive' : activeTab}
        onSelectTab={(tab) => {
          setSelectedProduct(null);
          setIsCheckoutOpen(false);
          if (tab === 'archive') {
            setLivingArchiveVisible(true);
          } else if (tab === 'impact') {
            setImpactMirrorProduct(products[0] || null);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenVoiceAssistant={() => setVoiceModalVisible(true)}
      />

      {/* Modals & Dialogs */}
      <VoiceAssistantModal
        visible={voiceModalVisible}
        onClose={() => setVoiceModalVisible(false)}
        onNavigate={(screen) => {
          if (screen === 'AddProduct') setAddProductVisible(true);
          if (screen === 'FairPricing') setPricingModalVisible(true);
          if (screen === 'ImageEnhance') setImageEnhanceVisible(true);
          if (screen === 'Archive') setLivingArchiveVisible(true);
          if (screen === 'Schemes') setActiveTab('schemes');
          if (screen === 'Orders') setActiveTab('orders');
          if (screen === 'RawMaterial') setActiveTab('raw_materials');
        }}
      />

      <AddProductWizard
        visible={addProductVisible}
        onClose={() => setAddProductVisible(false)}
        onSuccess={() => setActiveTab('products')}
      />

      <CraftImageEnhancementModal
        visible={imageEnhanceVisible}
        onClose={() => setImageEnhanceVisible(false)}
      />

      <GuruShishyaArchiveModal
        visible={livingArchiveVisible}
        onClose={() => setLivingArchiveVisible(false)}
      />

      <FairPricingModal
        visible={pricingModalVisible}
        onClose={() => setPricingModalVisible(false)}
      />

      <TrendFusionModal
        visible={trendFusionVisible}
        onClose={() => setTrendFusionVisible(false)}
      />

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />

      <RoleModal
        visible={roleModalVisible}
        onClose={() => setRoleModalVisible(false)}
      />

      {renderImmersiveModals()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexOne: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 16,
  },
  modal3DContent: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 14,
  },
  modal3DHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modal3DTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AppNavigator;
