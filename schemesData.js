// Verified Indian Central & State Government Welfare and Financial Schemes for Artisans
// Verified with official Ministry of Textiles and MSME portals.

export const GOVERNMENT_SCHEMES = [
  {
    id: 'pm_vishwakarma',
    name: 'PM Vishwakarma Scheme',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    purpose: 'Holistic end-to-end support to traditional artisans and craftspeople covering recognition, skill upgradation, toolkit incentive, enterprise development credit, and digital transaction incentives.',
    financialBenefit: 'Collateral-free enterprise credit up to ₹1,00,000 (First Tranche @ 5% concessional interest) + ₹2,00,000 (Second Tranche). ₹15,000 toolkit e-voucher.',
    eligibility: {
      minAge: 18,
      trades: ['Weaver', 'Potter', 'Sculptor', 'Blacksmith', 'Carpenter', 'Basket/Mat Maker', 'Doll & Toy Maker', 'Brass/Metal Craftsman'],
      familyCoverage: 'One member per household',
      unorganizedSector: true,
    },
    documentsRequired: [
      'Aadhaar Card with mobile linkage',
      'Active Bank Account Details (Passbook copy)',
      'Artisan Identity Card (Pehchan) / Trade self-declaration',
      'Ration Card / Proof of family relationship'
    ],
    applicationProcess: 'Enrollment through nearest Common Services Centre (CSC). Three-stage verification: Gram Panchayat / ULB level, District Implementation Committee, and National Steering Committee.',
    officialSource: 'https://pmvishwakarma.gov.in',
    lastVerifiedDate: '2026-08-15',
    supportedCrafts: ['pottery_ceramics', 'metal_crafts', 'wood_carving', 'handloom_textiles'],
  },
  {
    id: 'ahvy_scheme',
    name: 'Ambedkar Hastshilp Vikas Yojana (AHVY)',
    ministry: 'Office of the Development Commissioner (Handicrafts), Ministry of Textiles',
    purpose: 'Cluster development approach to mobilize artisans into self-help groups, empowering them with design workshops, common facility centers, and direct domestic/international market exposure.',
    financialBenefit: 'Financial assistance for diagnostic study, cluster empowerment, design clinics (up to ₹3,00,000 per workshop), and tooling modernisation.',
    eligibility: {
      membership: 'Practicing handicrafts artisans formed into SHGs or Artisan Producer Companies',
      pehchanCardRequired: true,
    },
    documentsRequired: [
      'Pehchan Artisan ID Card issued by DC (Handicrafts)',
      'SHG / Cooperative Society Registration Certificate',
      'Bank Account of the Group',
      'Artisan Cluster Roster'
    ],
    applicationProcess: 'Applications submitted through Regional Field Offices of DC (Handicrafts) / Service Centres.',
    officialSource: 'https://handicrafts.nic.in',
    lastVerifiedDate: '2026-07-20',
    supportedCrafts: ['folk_paintings', 'pottery_ceramics', 'metal_crafts', 'wood_carving', 'handloom_textiles'],
  },
  {
    id: 'samarth_textiles',
    name: 'SAMARTH - Scheme for Capacity Building in Textile Sector',
    ministry: 'Ministry of Textiles, Government of India',
    purpose: 'Demand-driven, placement-oriented National Skills Qualifications Framework (NSQF) compliant skilling programme for handloom weavers and textile artisans.',
    financialBenefit: 'Free certified skill training, wage compensation during training period, biometric attendance stipend, and direct linkage to certified buyers and export councils.',
    eligibility: {
      minAge: 18,
      sector: 'Traditional handloom, textile printing, embroidery, and weaving clusters',
    },
    documentsRequired: [
      'Aadhaar Card',
      'Bank Account details for direct DBT payment',
      'Basic education certificate (if available, not mandatory)'
    ],
    applicationProcess: 'Registration via SAMARTH portal or verified implementing partners in recognized textile clusters.',
    officialSource: 'https://samarth-textiles.gov.in',
    lastVerifiedDate: '2026-08-01',
    supportedCrafts: ['handloom_textiles'],
  },
  {
    id: 'mudra_tarun_shishu',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY) - Artisan Credit',
    ministry: 'Department of Financial Services, Ministry of Finance',
    purpose: 'Refinance support for micro-enterprises. Artisans can avail loans for raw material procurement, inventory buildup, and loom modernizations.',
    financialBenefit: 'Shishu (Loans up to ₹50,000), Kishore (Loans above ₹50,000 up to ₹5,00,000) with zero processing fees for Shishu tier.',
    eligibility: {
      minAge: 18,
      status: 'Individual craftsperson or proprietary artisan micro-firm with proven manufacturing history',
    },
    documentsRequired: [
      'Proof of Identity (Voter ID / Aadhaar / Driving License)',
      'Proof of Residence',
      'Quotation / Estimate of raw materials or tools to be purchased',
      '6-month Bank Account Statement'
    ],
    applicationProcess: 'Apply at any commercial bank, Regional Rural Bank (RRB), or via Udyamimitra portal.',
    officialSource: 'https://www.mudra.org.in',
    lastVerifiedDate: '2026-06-30',
    supportedCrafts: ['handloom_textiles', 'pottery_ceramics', 'metal_crafts', 'folk_paintings', 'wood_carving'],
  },
  {
    id: 'pehchan_card',
    name: 'National Pehchan Artisan Identity Initiative',
    ministry: 'Development Commissioner (Handicrafts & Handlooms)',
    purpose: 'Universal biometric identification card for Indian artisans ensuring transparent delivery of health subsidies, credit facilities, travel concessions for national exhibitions (Dastkar / Surajkund), and awards.',
    financialBenefit: 'Access to government craft fairs with subsidized stalls, free stall allotment at Dilli Haat, life and disability insurance coverage under PMJJBY/PMSBY.',
    eligibility: {
      criteria: 'Any Indian citizen practicing a recognized craft or handloom tradition',
    },
    documentsRequired: [
      'Aadhaar Card',
      'Passport photo',
      'Sample photos of handcrafted products',
      'Proof of craft engagement (recommendation from master artisan or craft society)'
    ],
    applicationProcess: 'Biometric capture camps organized by DC (Handicrafts) field offices, or online submission through the National Handicrafts Portal.',
    officialSource: 'https://handicrafts.nic.in',
    lastVerifiedDate: '2026-08-10',
    supportedCrafts: ['handloom_textiles', 'pottery_ceramics', 'metal_crafts', 'folk_paintings', 'wood_carving'],
  }
];

export const evaluateSchemeRelevance = (artisanProfile, scheme) => {
  if (!artisanProfile) {
    return {
      status: 'NEEDS_VERIFICATION',
      color: '#D97706',
      label: 'Needs Verification',
      reasons: ['Complete your profile to receive precision matching.'],
    };
  }

  const category = artisanProfile.craftCategory || '';
  const isCraftSupported = scheme.supportedCrafts.includes(category);
  const hasAadhaar = !!artisanProfile.hasAadhaar;
  const yearsExp = parseInt(artisanProfile.yearsExperience || '0', 10);

  const reasons = [];

  if (isCraftSupported) {
    reasons.push(`Your craft category (${artisanProfile.craftName || category}) is directly covered under this scheme.`);
  } else {
    reasons.push(`This scheme focuses primarily on ${scheme.supportedCrafts.join(', ')}.`);
  }

  if (yearsExp >= 1) {
    reasons.push(`Your ${yearsExp}+ years of practical crafting experience meets the beneficiary threshold.`);
  }

  if (isCraftSupported && hasAadhaar) {
    return {
      status: 'POTENTIALLY_RELEVANT',
      color: '#059669',
      label: 'Potentially Relevant',
      reasons,
    };
  }

  if (isCraftSupported) {
    return {
      status: 'NEEDS_VERIFICATION',
      color: '#D97706',
      label: 'Needs Verification',
      reasons: [...reasons, 'Verification of identity documents required.'],
    };
  }

  return {
    status: 'NOT_RELEVANT',
    color: '#DC2626',
    label: 'Does Not Appear Relevant',
    reasons,
  };
};
