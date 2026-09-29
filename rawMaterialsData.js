// Anonymized Cluster Raw Material Demand Intelligence & Collective Bulk Procurement Pooling

export const CLUSTER_RAW_MATERIALS = [
  {
    id: 'mat_indigo',
    name: 'Natural Organic Indigo Cake (Grade A)',
    unit: 'kg',
    clusterName: 'Kallakurichi & Salem Natural Dye Cluster',
    state: 'Tamil Nadu',
    demandForecast14d: 43,
    participatingArtisansCount: 18,
    individualProcurementPricePerUnit: 1850, // ₹ per kg
    collectiveProcurementPricePerUnit: 1420,  // ₹ per kg bulk negotiated
    suppliers: [
      { name: 'Tamil Nadu Khadi & Village Industries Board', location: 'Salem', rating: 4.8 },
      { name: 'Chettinad Organic Dyes Cooperative', location: 'Karaikudi', rating: 4.7 }
    ],
    purityStandard: '94% Natural Indigo Tinctoria Content',
    notes: 'Bulk order scheduled for consolidation on 15th of the month.'
  },
  {
    id: 'mat_mulberry_silk',
    name: 'Mulberry Raw Silk Yarn (20/22 Denier)',
    unit: 'kg',
    clusterName: 'Kanchipuram & Arani Weaving Cluster',
    state: 'Tamil Nadu',
    demandForecast14d: 85,
    participatingArtisansCount: 24,
    individualProcurementPricePerUnit: 4600,
    collectiveProcurementPricePerUnit: 3950,
    suppliers: [
      { name: 'Central Silk Board Raw Material Bank', location: 'Bengaluru', rating: 4.9 },
      { name: 'TANSILK Federation', location: 'Kanchipuram', rating: 4.8 }
    ],
    purityStandard: 'BIS Certified Silk Mark Grade AAA',
    notes: 'Direct linkage with Central Silk Board grainages.'
  },
  {
    id: 'mat_gold_zari',
    name: 'Pure Silver Gilded Gold Zari Thread (Half Fine)',
    unit: 'marc (242 grams)',
    clusterName: 'Surat & Varanasi Zari Consortium',
    state: 'Pan-India',
    demandForecast14d: 32,
    participatingArtisansCount: 15,
    individualProcurementPricePerUnit: 12500,
    collectiveProcurementPricePerUnit: 10800,
    suppliers: [
      { name: 'Surat Zari Manufacturers Association', location: 'Surat', rating: 4.9 },
      { name: 'Varanasi Traditional Brocade Guild', location: 'Varanasi', rating: 4.6 }
    ],
    purityStandard: '55% Silver Core with 0.5% 24K Gold Electroplate',
    notes: 'Assayed with official precious metal stamp.'
  },
  {
    id: 'mat_quartz_powder',
    name: 'Processed Quartz & Glass Frit Powder',
    unit: 'quintal (100 kg)',
    clusterName: 'Jaipur Blue Pottery Cluster',
    state: 'Rajasthan',
    demandForecast14d: 18,
    participatingArtisansCount: 12,
    individualProcurementPricePerUnit: 3400,
    collectiveProcurementPricePerUnit: 2650,
    suppliers: [
      { name: 'Rajasthan Small Industries Corporation (RAJSICO)', location: 'Jaipur', rating: 4.7 }
    ],
    purityStandard: '99% Silica Free of Iron Contaminants',
    notes: 'High-temperature thermal shock resistant.'
  },
  {
    id: 'mat_terracotta_clay',
    name: 'Filtered Riverbed Alluvial Clay & Natural Ash',
    unit: 'ton',
    clusterName: 'Manamadurai & Bankura Cluster',
    state: 'Tamil Nadu & West Bengal',
    demandForecast14d: 14,
    participatingArtisansCount: 21,
    individualProcurementPricePerUnit: 8200,
    collectiveProcurementPricePerUnit: 6400,
    suppliers: [
      { name: 'District Rural Development Agency Depot', location: 'Sivaganga', rating: 4.5 }
    ],
    purityStandard: 'Zero grit washed alluvial sediment',
    notes: 'Bulk transportation shared across 4 cooperative trucks.'
  }
];

export const calculateClusterSavings = (material) => {
  const totalIndividual = material.demandForecast14d * material.individualProcurementPricePerUnit;
  const totalCollective = material.demandForecast14d * material.collectiveProcurementPricePerUnit;
  const totalSavings = totalIndividual - totalCollective;
  const savingsPercentage = Math.round((totalSavings / totalIndividual) * 100);
  const avgSavingPerArtisan = Math.round(totalSavings / (material.participatingArtisansCount || 1));

  return {
    totalIndividual,
    totalCollective,
    totalSavings,
    savingsPercentage,
    avgSavingPerArtisan,
  };
};
