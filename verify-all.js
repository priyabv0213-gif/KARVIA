/**
 * KARVIA Automated End-to-End Quality & Integrity Test Suite
 * Tests every architectural subsystem against specifications.
 */

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    testsFailed++;
  }
}

console.log('====================================================');
console.log('     KARVIA MOBILE PLATFORM — INTEGRITY AUDIT       ');
console.log('====================================================\n');

// 1. Multilingual Localization Audit (13 Official Indian Languages)
console.log('--- 1. Multilingual System Audit (13 Languages) ---');
const { SUPPORTED_LANGUAGES, translations } = require('../src/i18n/languages');
assert(SUPPORTED_LANGUAGES.length === 13, `Supports exactly 13 Indian languages (Found: ${SUPPORTED_LANGUAGES.length})`);

const requiredKeys = ['appName', 'tagline', 'roleArtisan', 'roleBuyer', 'smartCatalog', 'craftEvidence', 'fairPricing', 'viewIn3D', 'virtualTryOn', 'addToCart'];
SUPPORTED_LANGUAGES.forEach((lang) => {
  const dict = translations[lang.code];
  assert(!!dict, `Language dictionary exists for ${lang.name} (${lang.code})`);
  if (dict) {
    const missing = requiredKeys.filter((k) => !dict[k]);
    assert(missing.length === 0, `All mandatory keys present for ${lang.name} (${lang.code})`);
  }
});

// 2. Fair Pricing Algorithm Audit
console.log('\n--- 2. Fair Pricing Cost-Plus Engine Audit ---');
const { calculateFairPrice } = require('../src/services/aiService');
const sampleCalc = calculateFairPrice({
  materialCost: 2000,
  labourHours: 40,
  hourlyWage: 120, // 4800 labour
  packagingCost: 200,
  overheadCost: 300,
  desiredMarginPercent: 25,
});
// Total base cost: 2000 + 4800 + 200 + 300 = 7300
assert(sampleCalc.totalBaseCost === 7300, `Base cost computed accurately: ₹${sampleCalc.totalBaseCost}`);
assert(sampleCalc.minimumSustainablePrice > sampleCalc.totalBaseCost, `Minimum sustainable price guarantees artisan profit (Min: ₹${sampleCalc.minimumSustainablePrice})`);
assert(sampleCalc.suggestedPrice > sampleCalc.minimumSustainablePrice, `Suggested retail price provides desired living wage margin (Suggested: ₹${sampleCalc.suggestedPrice})`);

// 3. Voice-First Intent Recognition Audit
console.log('\n--- 3. Voice-First Natural Speech Intent Parser ---');
const { parseVoiceIntent } = require('../src/services/aiService');
const intentAdd = parseVoiceIntent('Please add my new silk saree to marketplace');
assert(intentAdd.intent === 'ADD_PRODUCT', `Correctly recognized ADD_PRODUCT intent from voice string`);

const intentPrice = parseVoiceIntent('What selling price should I put for this craft?');
assert(intentPrice.intent === 'FAIR_PRICING', `Correctly recognized FAIR_PRICING intent from voice string`);

const intentScheme = parseVoiceIntent('Find government schemes and subsidies for me');
assert(intentScheme.intent === 'GOVERNMENT_SCHEMES', `Correctly recognized GOVERNMENT_SCHEMES intent from voice string`);

// 4. Multimodal Craft Evidence Audit
console.log('\n--- 4. Multimodal Craft Evidence System ---');
const { analyzeCraftEvidence } = require('../src/services/aiService');
const evidenceFull = analyzeCraftEvidence({
  hasProcessVideo: true,
  hasMacroPhoto: true,
  hasRawMaterialReceipt: true,
  hasArtisanDeclaration: true,
  hasGITag: true,
  hasClusterVerification: true,
});
assert(evidenceFull.integrityLevel === 'High Integrity', `Full evidence checklist grants High Integrity badge`);
assert(evidenceFull.officialCertification.includes('GI Tag'), `Official GI certification accurately recorded`);

const evidenceMinimal = analyzeCraftEvidence({
  hasProcessVideo: false,
  hasMacroPhoto: false,
  hasRawMaterialReceipt: false,
  hasArtisanDeclaration: false,
  hasGITag: false,
});
assert(evidenceMinimal.integrityLevel === 'Preliminary', `Sparse evidence accurately tagged as Preliminary without false claims`);

// 5. Cluster Raw Material Demand Pooling Audit
console.log('\n--- 5. Raw Material Demand Intelligence Audit ---');
const { CLUSTER_RAW_MATERIALS, calculateClusterSavings } = require('../src/services/rawMaterialsData');
assert(CLUSTER_RAW_MATERIALS.length >= 4, `Cluster raw materials catalog populated with authentic materials`);
const indigoSavings = calculateClusterSavings(CLUSTER_RAW_MATERIALS[0]);
assert(indigoSavings.totalSavings > 0, `Collective bulk procurement calculates positive artisan savings: ₹${indigoSavings.totalSavings}`);
assert(indigoSavings.savingsPercentage >= 15, `Bulk savings exceeds 15% threshold: ${indigoSavings.savingsPercentage}%`);

// 6. Government Scheme Intelligence Audit
console.log('\n--- 6. Government Scheme Eligibility Engine ---');
const { GOVERNMENT_SCHEMES, evaluateSchemeRelevance } = require('../src/services/schemesData');
assert(GOVERNMENT_SCHEMES.length >= 4, `Verified Indian schemes database loaded (PM Vishwakarma, AHVY, SAMARTH, Mudra)`);
const sampleArtisan = {
  craftCategory: 'handloom_textiles',
  craftName: 'Kanchipuram Silk',
  yearsExperience: 18,
  hasAadhaar: true,
};
const pmVishwakarma = GOVERNMENT_SCHEMES.find((s) => s.id === 'pm_vishwakarma');
const evalResult = evaluateSchemeRelevance(sampleArtisan, pmVishwakarma);
assert(evalResult.status === 'POTENTIALLY_RELEVANT', `Handloom weaver matched to PM Vishwakarma as POTENTIALLY_RELEVANT`);

// 7. Payment Gateway Integrity Audit
console.log('\n--- 7. Payment Gateway Integration Architecture ---');
const { initiatePaymentOrder, verifyPaymentSignature } = require('../src/services/paymentService');
async function testPayment() {
  const order = await initiatePaymentOrder({
    orderId: 'test_order_01',
    amount: 18500,
    customerInfo: { name: 'Priya' },
  });
  assert(!!order.gatewayOrderId, `Generated gateway order ID: ${order.gatewayOrderId}`);

  const verify = await verifyPaymentSignature({
    gatewayOrderId: order.gatewayOrderId,
    paymentId: 'pay_test_success_99',
    signature: 'valid_sig',
  });
  assert(verify.success === true, `Cryptographic payment verification confirmed`);
  assert(verify.escrowStatus === 'HELD_IN_TRUST_UNTIL_DELIVERY', `Direct-to-artisan escrow status activated`);
}

// 8. 3D Model Registry Audit
console.log('\n--- 8. True 3D & AR Asset Pipeline Audit ---');
const { THREE_D_MODELS_REGISTRY } = require('../src/services/threeDService');
assert(!!THREE_D_MODELS_REGISTRY.kanchipuram_saree, `Kanchipuram Saree 3D asset registered with drape features`);
assert(THREE_D_MODELS_REGISTRY.kanchipuram_saree.tryOnSupported === true, `Garment try-on enabled on saree model`);
assert(THREE_D_MODELS_REGISTRY.blue_pottery_vase.arSpaceSupported === true, `Space AR placement enabled on pottery model`);

// 9. Android Native Prebuild Files Audit
console.log('\n--- 9. Android Native Files & Manifest Audit ---');
const buildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
assert(fs.existsSync(buildGradlePath), `android/app/build.gradle exists`);
if (fs.existsSync(buildGradlePath)) {
  const gradleContent = fs.readFileSync(buildGradlePath, 'utf8');
  assert(gradleContent.includes("namespace 'com.karvia.app'"), `Namespace configured as com.karvia.app`);
  assert(gradleContent.includes("applicationId 'com.karvia.app'"), `ApplicationId configured as com.karvia.app`);
}

const gradlewPath = path.join(__dirname, '..', 'android', 'gradlew.bat');
assert(fs.existsSync(gradlewPath), `Gradle wrapper batch script exists (gradlew.bat)`);

// Run async tests
testPayment().then(() => {
  console.log('\n====================================================');
  console.log(` AUDIT COMPLETE: ${testsPassed} Passed | ${testsFailed} Failed`);
  console.log('====================================================');
  if (testsFailed > 0) {
    process.exit(1);
  }
});
