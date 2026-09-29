# KARVIA — AI-Powered Artisan Commerce, Heritage & Immersive 3D Mobile Platform

> *Problem Addressed: Smart India Hackathon (SIH26197) — *AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans.

> *Project Status*: Prototype under development — approximately 40% of the prototype has been developed.

KARVIA is an evolving mobile application prototype engineered for Android and iOS that aims to digitize the economic journey of Indian weavers, potters, and traditional craft communities while preserving their cultural heritage.

The current implementation represents an early-stage prototype, with core application structures, interfaces, workflows, and feature modules developed as part of the ongoing KARVIA project.

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

    ARTISAN
       ↓
    CREATE PROFILE & SELECT LANGUAGE (13 Indian Languages)
       ↓
    SMART CATALOGING (Photo + Voice Description)
       ↓
    AI CRAFT ANALYSIS (Technique, Materials, Weave Density, Production Days)
       ↓
    MULTIMODAL CRAFT EVIDENCE PROFILE (GI Tag + Loom Video + Macro Photo)
       ↓
    LIVING-WAGE FAIR PRICING
       ↓
    CRAFT-CONSTRAINED TREND FUSION
       ↓
    PUBLISH TO BUYER MARKETPLACE
       ↓
    BUYER DISCOVERY & IMMERSIVE 3D / AR TRY-ON
       ↓
    DIRECT-TO-ARTISAN CHECKOUT & PAYMENT
       ↓
    ORDER DISPATCH
       ↓
    DELIVERY VERIFICATION & ARTISAN PAYOUT

---

## 2. Technology Stack

- *Mobile Framework*: React Native with Expo Native Prebuild
- *Programming Language*: Modern JavaScript / Node.js
- *3D Rendering & WebGL*: Three.js + expo-gl hardware-accelerated 3D engine supporting GLB, glTF, and PBR textures
- *AR Subsystem*: Surface anchor projection for craft pottery/decor and body-aware garment visualization
- *Sensors & Hardware*: Camera, Microphone, and Geolocation
- *Offline Persistence*: @react-native-async-storage/async-storage with synchronization support
- *State Management*: React Context API
- *Backend & Auth*: Firebase Auth, Cloud Firestore, Firebase Storage
- *Design System*: Heritage-Modern Design System

---

## 3. Architecture

    KARVIA MOBILE APPLICATION

    ┌──────────────────────────────────────────────────────────────────────────────┐
    │                            PRESENTATION LAYER                                │
    │                                                                              │
    │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌─────────┐ │
    │  │ Splash & Language│ │ Artisan Dashboard│ │ Buyer Marketplace│ │3D / AR  │ │
    │  │ 13 Indian Langs  │ │ Voice & Add Craft│ │ Search, Cart, Pay│ │Try-On   │ │
    │  └──────────────────┘ └──────────────────┘ └──────────────────┘ └─────────┘ │
    ├──────────────────────────────────────────────────────────────────────────────┤
    │                         STATE & BUSINESS LAYER                               │
    │                                                                              │
    │  ┌────────────────────┐ ┌────────────────────┐ ┌──────────────────────────┐ │
    │  │ Auth & Role Context │ │ Cart & Order State │ │ Offline Storage & Sync   │ │
    │  │ Artisan/Buyer/Admin │ │ Status & Timeline  │ │ AsyncStorage             │ │
    │  └────────────────────┘ └────────────────────┘ └──────────────────────────┘ │
    ├──────────────────────────────────────────────────────────────────────────────┤
    │                       AI & INTELLIGENCE SERVICES                             │
    │                                                                              │
    │  ┌────────────────────┐ ┌────────────────────┐ ┌──────────────────────────┐ │
    │  │ Smart Cataloging   │ │ Fair Pricing       │ │ Craft Evidence Analyzer  │ │
    │  │ Image + Voice      │ │ Cost & Margin      │ │ Heritage Documentation   │ │
    │  ├────────────────────┤ ├────────────────────┤ ├──────────────────────────┤ │
    │  │ Trend Fusion       │ │ Raw Material       │ │ Government Scheme         │ │
    │  │ Heritage-Preserving│ │ Intelligence       │ │ Intelligence              │ │
    │  └────────────────────┘ └────────────────────┘ └──────────────────────────┘ │
    ├──────────────────────────────────────────────────────────────────────────────┤
    │                              BACKEND LAYER                                   │
    │                                                                              │
    │          Firebase Auth • Cloud Firestore • Firebase Storage                  │
    └──────────────────────────────────────────────────────────────────────────────┘

---

## 4. Installation & Setup

### Prerequisites

- Node.js LTS
- Git
- Java OpenJDK 17
- Android Studio
- Android SDK

### Quick Start

    # Install dependencies
    npm install

    # Start Expo Development Server
    npm start

The application can be tested using Expo Go or a native Android/iOS development environment.

---

## 5. Environment Variables

Environment-specific configuration is managed separately from the source code.

A sample environment configuration is provided through:

    .env.example

Private credentials, API keys, passwords, and other sensitive configuration should not be committed to the repository.

---

## 6. Firebase & Cloud Architecture

KARVIA uses Firebase as part of its backend architecture.

The system is structured to support:

- users: User profiles and role definitions
- artisans: Artisan profiles, craft information, and cluster details
- products: Craft catalogue and product information
- orders: Purchase and order management
- craftEvidence: Craft documentation and evidence
- governmentSchemes: Government support and scheme information
- rawMaterialDemand: Raw material and cluster intelligence

Firebase integration will continue to be expanded as the prototype develops.

---

## 7. Firestore Security Rules

Firestore security rules are included as part of the project's backend architecture.

The rules are structured around role-based access for:

- Artisans
- Buyers
- Administrators

The security configuration will continue to evolve as the prototype develops.

---

## 8. Multilingual System (13 Indian Languages)

KARVIA includes a multilingual framework designed to improve accessibility for artisans and buyers from different linguistic backgrounds.

The architecture supports *13 Indian languages*:

1. *English* (en)
2. *Tamil* (ta - தமிழ்)
3. *Hindi* (hi - हिन्दी)
4. *Malayalam* (ml - മലയാളം)
5. *Telugu* (te - తెలుగు)
6. *Kannada* (kn - ಕನ್ನಡ)
7. *Punjabi* (pa - ਪੰਜਾਬੀ)
8. *Bengali* (bn - বাংলা)
9. *Marathi* (mr - मराठी)
10. *Gujarati* (gu - ગુજરાતી)
11. *Odia* (or - ଓଡ଼ିଆ)
12. *Assamese* (as - অসমীয়া)
13. *Urdu* (ur - اردو)

The multilingual architecture is intended to reduce language barriers and improve accessibility for artisans.

---

## 9. AI & Intelligence Services

### A. Smart Cataloging

Artisans can provide craft information through images and descriptions, with AI-assisted processing intended to help generate structured product information.

The system is designed to allow artisans to review and edit information before publishing.

### B. Living-Wage Fair Pricing

$$\text{Total Base Cost} = \text{Materials} + (\text{Crafting Hours} \times \text{Fair Hourly Wage}) + \text{Packaging} + \text{Overhead}$$

$$\text{Recommended Retail Price} = \frac{\text{Total Base Cost}}{1 - \text{Desired Margin}}$$

The pricing system is designed to help artisans understand production costs and develop appropriate pricing.

### C. Multimodal Craft Evidence Profile

The platform explores structured craft documentation using:

- Macro craft photography
- Workshop process information
- Artisan voice self-declaration
- Craft and heritage information
- Certification-related information
- GI-related information where applicable

### D. Trend Fusion Studio

The concept explores contemporary product ideas while respecting traditional craft techniques, motifs, materials, and cultural identity.

### E. Government Scheme Intelligence

The platform is designed to help connect artisans with relevant government schemes and support opportunities.

---

## 10. True 3D & Immersive AR System

The prototype includes exploration of:

- *3D Viewer*: Interactive product visualization and rotation
- *Garment Virtual Try-On*: Body-aware garment visualization and photo-based visualization
- *Visualize in My Space*: Product visualization in physical spaces
- *3D Product Experience*: Interactive presentation of craft products

These features form part of the ongoing prototype development.

---

## 11. Commerce, Escrow & Payment Gateway

The application architecture explores:

1. *Persistent Cart*: Product quantities and cart management
2. *Checkout*: Address and payment method selection
3. *Payment Workflow*: Digital payment integration concepts
4. *Artisan Payout*: Direct artisan payment concepts
5. *Order Management*: Order status and tracking
6. *Milestone Timeline*:

       PLACED → CONFIRMED → PROCESSING → SHIPPED → DELIVERED

Payment and escrow functionality will be further integrated and validated during subsequent development stages.

---

## 12. Offline-First Architecture & Sync Queue

KARVIA explores offline-first functionality to support artisans operating in areas with limited or unstable connectivity.

The architecture includes:

- Local data storage
- Offline draft creation
- Synchronization concepts
- Connectivity status indicators
- Data synchronization workflows

This approach is intended to improve usability in low-connectivity environments.

---

## 13. Testing & Quality Audit

The prototype is being tested across different application modules and user flows.

Testing includes:

- UI testing
- Navigation testing
- Feature validation
- Role-based flows
- Data handling
- Prototype integration testing
- Android testing

Further testing and validation will be performed as development progresses.

---

## 14. Android APK / AAB Build Instructions

The project contains native Android build files inside android/.

### Building the Debug APK

    cd android
    .\gradlew.bat assembleDebug

The generated APK is available at:

    android/app/build/outputs/apk/debug/app-debug.apk

### Building the Release AAB

    cd android
    .\gradlew.bat bundleRelease

The generated Android App Bundle is available at:

    android/app/build/outputs/bundle/release/app-release.aab

---

## 15. iOS Build Instructions

The project is structured to support iOS development through Expo and native build tools.

### Start Expo

    npx expo start

### Generate iOS Native Project

    npx expo prebuild --platform ios

Further iOS build configuration will be completed during subsequent development stages.

---

## 16. Role-Based Access Control (RBAC)

The application architecture supports three primary roles:

### Artisan

- Voice AI assistant
- Smart Cataloging
- Fair pricing assistance
- Product management
- Order fulfillment
- Earnings

### Buyer

- Marketplace browsing
- Multi-facet product search
- 3D product viewing
- Virtual Try-On
- In-Space visualization
- Cart
- Checkout
- Order tracking

### Admin

- Artisan verification
- Content moderation
- Platform monitoring
- Administrative controls

---

## 17. Production Deployment Guide

The current KARVIA repository represents a *prototype under development* and is not presented as a final production deployment.

Future deployment stages will include:

1. Backend finalization
2. Security hardening
3. API integration
4. Payment integration
5. Performance optimization
6. User testing
7. Production configuration
8. Deployment and monitoring

---

## Current Development Status

KARVIA is currently under active development for *Smart India Hackathon 2026 — SIH26197*.

Approximately *40% of the prototype has been developed*, covering the core application structure, interfaces, navigation, role-based flows, and several feature modules.

The remaining development will focus on completing and integrating the planned modules, improving backend functionality, validating the user experience, and further aligning the platform with the requirements of *SIH26197*.

---

## Future Development

Planned development areas include:

- Advanced AI integration
- Complete backend implementation
- Enhanced multilingual support
- Advanced craft documentation
- Market and buyer integration
- Secure payment workflows
- Improved 2D / 3D experiences
- Offline capabilities
- User testing
- Platform scalability

---

## Disclaimer

KARVIA is a prototype developed for *Smart India Hackathon 2026 — SIH26197*.

The repository represents the current stage of development and experimentation. Features and integrations may be further modified, expanded, or refined during the development process.
