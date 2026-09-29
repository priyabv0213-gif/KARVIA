// Authentic Indian Craft Categories, Geographic Indications (GI), and Clusters
export const CRAFT_CATEGORIES = [
  {
    id: 'handloom_textiles',
    name: 'Handloom & Textiles',
    icon: 'tshirt-crew',
    description: 'Traditional Indian weaving, sarees, shawls, and fabrics.',
    subcategories: [
      { id: 'kanchipuram', name: 'Kanchipuram Silk', state: 'Tamil Nadu', giTagged: true, materials: ['Mulberry Silk', 'Pure Gold Zari'], tryOnSupported: true },
      { id: 'banarasi', name: 'Banarasi Brocade', state: 'Uttar Pradesh', giTagged: true, materials: ['Katan Silk', 'Silver & Gold Zari'], tryOnSupported: true },
      { id: 'chanderi', name: 'Chanderi Weaving', state: 'Madhya Pradesh', giTagged: true, materials: ['Cotton Silk', 'Zari'], tryOnSupported: true },
      { id: 'bandhani', name: 'Bandhani Tie & Dye', state: 'Gujarat & Rajasthan', giTagged: true, materials: ['Fine Cotton', 'Natural Dyes'], tryOnSupported: true },
      { id: 'pashmina', name: 'Kashmir Pashmina', state: 'Jammu & Kashmir', giTagged: true, materials: ['Changthangi Cashmere'], tryOnSupported: true },
      { id: 'kasavu', name: 'Kerala Kasavu', state: 'Kerala', giTagged: true, materials: ['Cotton', 'Golden Border'], tryOnSupported: true },
      { id: 'sambalpuri', name: 'Sambalpuri Ikat', state: 'Odisha', giTagged: true, materials: ['Pure Tussar Silk'], tryOnSupported: true },
    ]
  },
  {
    id: 'pottery_ceramics',
    name: 'Pottery & Ceramics',
    icon: 'cup',
    description: 'Wheel-thrown earthenware, glazed pottery, terracotta, and clay art.',
    subcategories: [
      { id: 'jaipur_blue', name: 'Jaipur Blue Pottery', state: 'Rajasthan', giTagged: true, materials: ['Quartz Stone Powder', 'Glass Powder', 'Multani Mitti'], arSpaceSupported: true },
      { id: 'terracotta_bankura', name: 'Bankura Terracotta', state: 'West Bengal', giTagged: true, materials: ['Alluvial Clay', 'Natural Wood Ash'], arSpaceSupported: true },
      { id: 'khurja', name: 'Khurja Ceramic Works', state: 'Uttar Pradesh', giTagged: true, materials: ['Ball Clay', 'China Clay'], arSpaceSupported: true },
      { id: 'manamadurai', name: 'Manamadurai Clay Pots', state: 'Tamil Nadu', giTagged: true, materials: ['Vaigai River Bed Clay'], arSpaceSupported: true },
    ]
  },
  {
    id: 'metal_crafts',
    name: 'Metal & Bell Metal Crafts',
    icon: 'bell',
    description: 'Lost-wax casting, Dhokra art, Bidriware, and brass lamps.',
    subcategories: [
      { id: 'dhokra', name: 'Dhokra Brass Casting', state: 'Chhattisgarh & Odisha', giTagged: true, materials: ['Brass Scrap', 'Beeswax', 'Clay Core'], arSpaceSupported: true },
      { id: 'bidriware', name: 'Bidriware Silver Inlay', state: 'Karnataka', giTagged: true, materials: ['Zinc-Copper Alloy', 'Pure Silver Inlay', 'Soil of Bidar Fort'], arSpaceSupported: true },
      { id: 'nachiyarkoil', name: 'Nachiyarkoil Brass Lamps', state: 'Tamil Nadu', giTagged: true, materials: ['High Tensile Brass'], arSpaceSupported: true },
      { id: 'moradabad', name: 'Moradabad Brass Art', state: 'Uttar Pradesh', giTagged: true, materials: ['Engraved Brass'], arSpaceSupported: true },
    ]
  },
  {
    id: 'folk_paintings',
    name: 'Folk & Traditional Art',
    icon: 'palette',
    description: 'Indigenous Indian paintings, scrolls, and sacred art traditions.',
    subcategories: [
      { id: 'madhubani', name: 'Madhubani Painting', state: 'Bihar', giTagged: true, materials: ['Handmade Paper', 'Natural Vegetable Pigments'], arSpaceSupported: true },
      { id: 'warli', name: 'Warli Folk Art', state: 'Maharashtra', giTagged: true, materials: ['Rice Flour Paste', 'Mud Base Canvas'], arSpaceSupported: true },
      { id: 'tanjore', name: 'Tanjore Gold Leaf Art', state: 'Tamil Nadu', giTagged: true, materials: ['Teak Wood Base', '22K Gold Foil', 'Semi-precious Stones'], arSpaceSupported: true },
      { id: 'pattachitra', name: 'Odisha Pattachitra', state: 'Odisha', giTagged: true, materials: ['Treated Cloth Scroll', 'Natural Mineral Colors'], arSpaceSupported: true },
      { id: 'kalamkari', name: 'Srikalahasti Kalamkari', state: 'Andhra Pradesh', giTagged: true, materials: ['Cotton Fabric', 'Tamarind Pen', 'Myrobalan & Milk'], arSpaceSupported: true },
    ]
  },
  {
    id: 'wood_carving',
    name: 'Woodcraft & Wooden Toys',
    icon: 'tree',
    description: 'Hand-carved woodwork, lacquered craft toys, and sandalwood artifacts.',
    subcategories: [
      { id: 'channapatna', name: 'Channapatna Wooden Toys', state: 'Karnataka', giTagged: true, materials: ['Wrightia Tinctoria Ivory Wood', 'Non-toxic Vegetable Dyes'], arSpaceSupported: true },
      { id: 'saharapur', name: 'Saharanpur Wood Carving', state: 'Uttar Pradesh', giTagged: true, materials: ['Sheesham Wood'], arSpaceSupported: true },
      { id: 'kondapalli', name: 'Kondapalli Toys', state: 'Andhra Pradesh', giTagged: true, materials: ['Tella Poniki Softwood'], arSpaceSupported: true },
    ]
  }
];

export const CRAFT_TECHNIQUES = [
  'Handloom Weaving',
  'Pithora Ritual Art',
  'Lost-wax Casting (Cire Perdue)',
  'Tie and Dye (Bandhani/Leheriya)',
  'Block Printing (Bagru/Ajrakh)',
  'Wheel-thrown Pottery',
  'Metal Engraving & Inlay',
  'Vegetable Pigment Painting',
  'Lacquered Wood Turning',
  'Needlework & Zardozi Embroidery'
];

export const RAW_MATERIALS = [
  'Mulberry Silk',
  'Pure Gold Zari',
  'Silver Zari',
  'Organic Cotton Yarn',
  'Natural Indigo Cake',
  'Myrobalan Powder',
  'Alizarin Red Dye',
  'Alluvial Terracotta Clay',
  'Brass Scrap (Scrap Brass Ingots)',
  'Quartz Stone Powder',
  'Zinc-Copper Base Alloy',
  'Wrightia Tinctoria Wood'
];
