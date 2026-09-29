# KARVIA — AI-Powered Artisan Commerce, Heritage & Immersive 3D Mobile Platform

> **Problem Addressed**: Smart India Hackathon (SIH26090) — *AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans.*

KARVIA is a production-ready, installable mobile application engineered for Android and iOS that digitizes the complete economic journey of Indian weavers, potters, and traditional craft communities without diluting their cultural heritage.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [Firebase & Cloud Architecture](#firebase--cloud-architecture)
7. [Firestore Security Rules](#firestore-security-rules)
8. [Multilingual System (13 Indian Languages)](#multilingual-system)
9. [AI & Intelligence Services](#ai--intelligence-services)
10. [True 3D & Immersive AR System](#true-3d--immersive-ar-system)
11. [Commerce, Escrow & Payment Gateway](#commerce-escrow--payment-gateway)
12. [Offline-First Architecture & Sync Queue](#offline-first-architecture--sync-queue)
13. [Testing & Quality Audit](#testing--quality-audit)
14. [Android APK / AAB Build Instructions](#android-apk--aab-build-instructions)
15. [iOS Build Instructions](#ios-build-instructions)
16. [Role-Based Access Control (RBAC)](#role-based-access-control)
17. [Production Deployment Guide](#production-deployment-guide)

---

## 1. Project Overview

KARVIA positions itself as:
$$\text{MARKETPLACE} + \text{AI BUSINESS ASSISTANT} + \text{CRAFT INTELLIGENCE} + \text{HERITAGE TECH} + \text{3D/AR COMMERCE}$$

### The End-to-End Artisan Journey
```
ARTISAN
   ↓
CREATE PROFILE & SELECT LANGUAGE (13 Indian Languages)
   ↓
SMART CATALOGING (Photo + Voice Description)
   ↓
AI CRAFT ANALYSIS (Technique, Materials, Weave density, Production Days)
   ↓
MULTIMODAL CRAFT EVIDENCE PROFILE (GI Tag + Loom Video + Macro Photo)
   ↓
LIVING-WAGE FAIR PRICING (Cost-Plus formula guaranteeing fair labour wages)
   ↓
CRAFT-CONSTRAINED TREND FUSION (Contemporary palettes respecting original motifs)
   ↓
PUBLISH TO BUYER MARKETPLACE
   ↓
BUYER DISCOVERY & IMMERSIVE 3D / AR TRY-ON
   ↓
DIRECT-TO-ARTISAN ESCROW CHECKOUT & PAYMENT
   ↓
ORDER DISPATCH (India Post SpeedPost Tracking)
   ↓
DELIVERY VERIFICATION & ESCROW PAYOUT TO ARTISAN BANK
```

---

## 2. Technology Stack

- **Mobile Framework**: React Native 0.76 with Expo 52 Native Prebuild (`android/` Kotlin & Gradle project)
- **Programming Language**: Modern JavaScript (ES2024) / Node.js LTS
- **3D Rendering & WebGL**: Three.js + `expo-gl` hardware-accelerated 3D engine supporting GLB, glTF, and PBR textures
- **AR Subsystem**: Surface anchor projection for craft pottery/decor; body-aware saree draping engine for garments
- **Sensors & Hardware**: Camera (`expo-camera`), Microphone (`expo-av`), Geolocation (`expo-location`)
- **Offline Persistence**: `@react-native-async-storage/async-storage` with deterministic sync queue
- **State Management**: React Context API (`AuthContext`, `ProductsContext`, `CartContext`, `LanguageContext`)
- **Backend & Auth**: Firebase Auth, Cloud Firestore, Firebase Storage
- **Design System**: Heritage-Modern Design System (Terracotta `#D9531E`, Ivory `#FAF8F5`, Sand Gold `#D4AF37`)

---

## 3. Architecture

```
                                  KARVIA MOBILE APPLICATION
                             (Android Package: com.karvia.app)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                    PRESENTATION LAYER                                    │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────┐ │
│  │   Splash & Lang    │ │ Artisan Dashboard  │ │ Buyer Marketplace  │ │ Immersive 3D/AR│ │
│  │  (13 Indian Langs) │ │ (Voice, Add Craft) │ │(Search, Cart, Pay) │ │ (Try-On, Space)│ │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                     STATE & BUSINESS LAYER                               │
│  ┌───────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────────┐ │
│  │ Auth & Role Context   │  │  Cart & Order State     │  │ Offline Sync & Storage      │ │
│  │ (Artisan/Buyer/Admin) │  │  (Status, Live Timeline)│  │ (AsyncStorage + Sync Queue) │ │
│  └───────────────────────┘  └─────────────────────────┘  └─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                 AI & INTELLIGENCE SERVICES                               │
│  ┌───────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────────┐ │
│  │ Smart Cataloging Engine│  │ Fair Pricing Assistant  │  │ Craft Evidence Analyzer     │ │
│  │ (Vision + Voice Recog)│  │ (Cost + Margin + Market)│  │ (Multi-Factor Integrity)    │ │
│  ├───────────────────────┤  ├─────────────────────────┤  ├─────────────────────────────┤ │
│  │ Trend Fusion Studio   │  │ Raw Material Demand     │  │ Scheme Intelligence         │ │
│  │ (Heritage-Preserving) │  │ (Cluster Aggregation)   │  │ (PM Vishwakarma & AHVY)     │ │
│  └───────────────────────┘  └─────────────────────────┘  └─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                      BACKEND LAYER                                       │
│    Firebase Auth  •  Cloud Firestore  •  Firebase Storage  •  Payment Gateway Adapter    │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Installation & Setup

### Prerequisites
- Node.js LTS (v20+ or v24+)
- Git for Windows / macOS / Linux
- Java OpenJDK 17 (`java -version`)
- Android Studio with Android SDK Platform 34 (for standalone APK compilation)

### Quick Start
```bash
# 1. Clone or navigate to the repository
cd "c:\Users\WELCOME\OneDrive\Desktop\karvia 2"

# 2. Install all dependencies
npm install

# 3. Verify project integrity and execute test suite
npm test

# 4. Start Expo Development Server
npm start
```

---

## 5. Environment Variables

Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase Web/Android API Key |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Google Cloud / Firebase Project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Cloud Storage Bucket |
| `EXPO_PUBLIC_GEMINI_API_KEY` | Gemini API Key for multimodal inference |
| `EXPO_PUBLIC_RAZORPAY_KEY_ID` | Razorpay / UPI Gateway Key ID |
| `EXPO_PUBLIC_DEFAULT_LOCALE` | Default language code (`en`, `ta`, `hi`, etc.) |
| `EXPO_PUBLIC_ENABLE_OFFLINE_SYNC` | Enable offline draft queue (`true`) |

---

## 6. Firebase & Cloud Architecture

KARVIA uses Cloud Firestore with the following scalable schema:
- `users`: User profiles, contact numbers, biometric Pehchan status, and role definitions.
- `artisans`: Verified workshop addresses, craft lineage, years of experience, and cluster affiliation.
- `products`: Craft catalog with pricing, dimensions, production days, GI verification, and 3D asset URLs.
- `orders`: Purchase orders, shipping addresses, live fulfillment timeline, and escrow payout status.
- `craftEvidence`: Multi-factor audit records containing macro photo URLs, pit-loom videos, and declarations.
- `governmentSchemes`: Central & state subsidy data (PM Vishwakarma, AHVY, SAMARTH, Mudra).
- `rawMaterialDemand`: Aggregated cluster purchasing forecasts and collective supplier bids.

---

## 7. Firestore Security Rules

Deploy the following production rules to Firestore (`firestore.rules`):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin';
    }
    function isArtisanOwner(artisanId) {
      return isAuthenticated() && request.auth.uid == artisanId;
    }

    // Products collection: Public read, artisan-authenticated write
    match /products/{productId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isArtisanOwner(resource.data.artisanId) || isAdmin();
    }

    // Orders: Only accessible to the buyer or the fulfilling artisan
    match /orders/{orderId} {
      allow read: if isAuthenticated() && (
        request.auth.uid == resource.data.buyerId ||
        request.auth.uid == resource.data.artisanId ||
        isAdmin()
      );
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        request.auth.uid == resource.data.artisanId || isAdmin()
      );
    }

    // Admin-only collections
    match /adminConfig/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

---

## 8. Multilingual System

KARVIA provides localized resources for **13 official Indian languages**:
1. **English** (`en`)
2. **Tamil** (`ta` - தமிழ்)
3. **Hindi** (`hi` - हिन्दी)
4. **Malayalam** (`ml` - മലയാളം)
5. **Telugu** (`te` - తెలుగు)
6. **Kannada** (`kn` - ಕನ್ನಡ)
7. **Punjabi** (`pa` - ਪੰਜਾਬੀ)
8. **Bengali** (`bn` - বাংলা)
9. **Marathi** (`mr` - मराठी)
10. **Gujarati** (`gu` - ગુજરાતી)
11. **Odia** (`or` - ଓଡ଼ିଆ)
12. **Assamese** (`as` - অসমীয়া)
13. **Urdu** (`ur` - اردو with RTL alignment)

---

## 9. AI & Intelligence Services

### A. Smart Cataloging
Artisans photograph their craft and speak in their local language. The AI extracts weave characteristics, materials, dimensions, and craft classification, producing an editable listing. **Artisans retain full manual edit control before publishing.**

### B. Living-Wage Fair Pricing
$$\text{Total Base Cost} = \text{Materials} + (\text{Crafting Hours} \times \text{Fair Hourly Wage}) + \text{Packaging} + \text{Overhead}$$
$$\text{Recommended Retail Price} = \frac{\text{Total Base Cost}}{1 - \text{Desired Margin}}$$

### C. Multimodal Craft Evidence Profile
Instead of computing fabricated "100% handmade" AI scores, KARVIA audits transparent evidence factors:
- Macro weave photography
- Workshop process video
- Silk Mark / Metallurgical lab certification
- Master artisan voice self-declaration
- Cluster registry confirmation
- Official GI tag (e.g. GI-12 for Kanchipuram)

### D. Trend Fusion Studio
Generates contemporary color palettes (Earthy Minimalism, Neo-Heritage, Pastel Geometry) while strictly preserving traditional craft techniques and cultural sanctity.

### E. Government Scheme Intelligence
Tailors official benefits (PM Vishwakarma ₹15,000 toolkits and collateral-free credit, AHVY cluster grants, SAMARTH skilling) to the artisan's specific craft trade.

---

## 10. True 3D & Immersive AR System

- **3D Viewer**: Interactive 360° orbit rotation, pinch-zoom, and specular lighting reflection simulation.
- **Garment Virtual Try-On**:
  - *Mode 1 (Live AR Camera)*: Real-time pose fitting with cloth drape physics.
  - *Mode 2 (Photo Upload)*: Full-body photo calibration with customizable Saree Pallu styles (Open Shoulder, Pleated Pin, Gujarati Seedha Pallu).
- **Visualize in My Space**: Surface/plane detection for Pottery, Brass sculptures, and lamps with move, rotate, scale, and reposition controls.
- **Hardware Compatibility Check**: Gracefully falls back to the interactive 3D viewer on devices without ARCore.

---

## 11. Commerce, Escrow & Payment Gateway

1. **Persistent Cart**: Quantity steppers, discount codes, and automatic Free Shipping over ₹2,000.
2. **Checkout**: Full recipient address capture and payment method selection (UPI, Credit/Debit Cards, Net Banking, COD).
3. **Cryptographic Verification**: Server-side signature validation before order persistence.
4. **Artisan Escrow**: Payment is held securely and released directly to the artisan's verified bank account upon delivery.
5. **Live Milestone Timeline**:
   $$\text{PLACED} \rightarrow \text{CONFIRMED} \rightarrow \text{PROCESSING} \rightarrow \text{SHIPPED} \rightarrow \text{DELIVERED}$$

---

## 12. Offline-First Architecture & Sync Queue

- Artisans can create draft products, edit listings, and manage stock while offline.
- When connectivity returns, the background sync queue automatically posts pending updates to Cloud Firestore.
- Header displays real-time sync indicators: **Offline**, **Syncing...**, or **Synced**.

---

## 13. Testing & Quality Audit

Run the automated test suite verifying all 9 core subsystems:
```bash
npm test
```

Expected output:
```
====================================================
     KARVIA MOBILE PLATFORM — INTEGRITY AUDIT       
====================================================
...
 AUDIT COMPLETE: 51 Passed | 0 Failed
====================================================
```

---

## 14. Android APK / AAB Build Instructions

The project is prebuilt with complete native Android build files inside `android/`:
- **Package Name**: `com.karvia.app`
- **Application ID**: `com.karvia.app`
- **Permissions**: `CAMERA`, `RECORD_AUDIO`, `INTERNET`, `ACCESS_FINE_LOCATION`, `READ_EXTERNAL_STORAGE`

### Building the Debug APK
```bash
# 1. Open PowerShell and navigate to project root
cd "c:\Users\WELCOME\OneDrive\Desktop\karvia 2"

# 2. Run Gradle assembleDebug via the generated wrapper
cd android
.\gradlew.bat assembleDebug
```
The output APK is generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

### Building the Release AAB for Google Play Store
```bash
cd android
.\gradlew.bat bundleRelease
```
The output Android App Bundle is generated at:
`android/app/build/outputs/bundle/release/app-release.aab`

---

## 15. iOS Build Instructions

```bash
# 1. Run Expo prebuild for iOS (on macOS)
npx expo prebuild --platform ios

# 2. Install CocoaPods
cd ios && pod install

# 3. Build with Xcode or fastlane
xcodebuild -workspace karvia.xcworkspace -scheme karvia -configuration Release
```

---

## 16. Role-Based Access Control

The app supports 3 roles easily switched via the header pill:
- **Artisan**: Voice AI assistant, Smart Cataloging, Living-Wage pricing, Orders fulfillment, Earnings.
- **Buyer**: Marketplace browsing, Multi-facet search, 3D product view, Virtual Try-On, In Space AR, Cart, Checkout, Order tracking.
- **Admin**: Artisan verification queue, Pehchan check, content moderation, system metrics.

---

## 17. Production Deployment Guide

1. **Deploy Firebase Security Rules**:
   ```bash
   npx firebase deploy --only firestore:rules,storage
   ```
2. **Build Standalone Production Binaries with EAS (Expo Application Services)**:
   ```bash
   npx eas-cli build --platform android --profile production
   ```
3. **Submit to Google Play Store**:
   ```bash
   npx eas-cli submit --platform android
   ```

---

*KARVIA — Where Indian Craftsmanship Meets the Digital World.*
