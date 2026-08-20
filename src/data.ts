import { Product, Flavor } from './types';

// Import our custom generated assets
import heroVapeDevice from './assets/images/hero_vape_device_1781715641672.jpg';
import vapeFlavorsCollection from './assets/images/vape_flavors_collection_1781715659005.jpg';
import vapeSleekPenAction from './assets/images/vape_sleek_pen_action_1781715673428.jpg';
import vapeTechnologyExploded from './assets/images/vape_technology_exploded_1781715686051.jpg';

export {
  heroVapeDevice,
  vapeFlavorsCollection,
  vapeSleekPenAction,
  vapeTechnologyExploded
};

export const PRODUCTS: Product[] = [
  {
    id: 'aero-pro-max',
    name: 'Aero Pro Max',
    subtitle: 'The Zenith of Pocket Vapour',
    price: 34.99,
    rating: 4.9,
    image: heroVapeDevice,
    description: 'Designed in collaboration with minimalist industrial architects, the Aero Pro Max is a gorgeous luxury pen vaporizer featuring intelligent micro-heating grids, dual pneumatic draw mechanisms, and an elegant sky-blue anodized magnesium chassis.',
    colors: [
      { name: 'Sky Blue', hex: '#38bdf8' },
      { name: 'Pearl White', hex: '#f8fafc' },
      { name: 'Slate Gray', hex: '#64748b' }
    ],
    features: [
      'Smart temperature flow controller',
      'Instant-draw aerodynamic sensors',
      'Quad-leak magnetic sealant ring',
      'Aerospace grade magnesium alloy'
    ],
    battery: '850 mAh USB-C Fast-Charge',
    capacity: '4.5 ml Leak-Proof Pod',
    resistance: '1.2 ohm Dual Mesh Coils',
    puffCount: 'Approx. 5,000 Pure Puffs'
  },
  {
    id: 'aero-pod-mini',
    name: 'Aero Pod Mini',
    subtitle: 'Ultimate Mobility & Flow',
    price: 24.99,
    rating: 4.8,
    image: vapeFlavorsCollection,
    description: 'Featuring a compact geometric profile designed to fit perfectly in your palm, the Aero Pod Mini wraps our advanced organic-cotton micro heating element inside a stunning pastel glass-like composite.',
    colors: [
      { name: 'Ice Mint', hex: '#a7f3d0' },
      { name: 'Lilac Dusk', hex: '#ddd6fe' },
      { name: 'Soft Azure', hex: '#bae6fd' }
    ],
    features: [
      'Pocket friendly ultra-slim profile',
      'Dual-stage airflow toggles',
      'Direct magnetic swap cartridge',
      'Velvet touch protective coating'
    ],
    battery: '500 mAh battery',
    capacity: '2.0 ml swap pod',
    resistance: '1.4 ohm Organic Cotton',
    puffCount: 'Approx. 2,500 Clean Puffs'
  }
];

export const FLAVORS: Flavor[] = [
  {
    id: 'glacial-frost',
    name: 'Glacial Frost',
    tagline: 'Arctic Air & Sweet Mint',
    description: 'An crystalline, sub-zero menthol baseline layered with high-altitude wild pine needles and garden spearmint, delivering a bone-chilling yet wonderfully smooth throat feel.',
    nicotineStrengths: ['0%', '2%', '5%'],
    mixRatio: '50/50 VG/PG Blend',
    image: vapeFlavorsCollection, // Secondary reference or filter
    accentColor: '#0ea5e9',
    bgGlow: 'rgba(14, 165, 233, 0.12)'
  },
  {
    id: 'azure-blueberries',
    name: 'Azure Berry Haze',
    tagline: 'Wild Berries & Velvet Vanilla',
    description: 'Hand-sorted mountain blueberries and sub-tropical boysenberries, rounded off with a smooth, luxurious organic wild vanilla cream on the finish.',
    nicotineStrengths: ['2%', '5%'],
    mixRatio: '60/40 VG/PG Cloud Optimized',
    image: heroVapeDevice,
    accentColor: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.12)'
  },
  {
    id: 'white-jasmine-tea',
    name: 'Jasmine White Tea',
    tagline: 'Polished Botanicals & Honey',
    description: 'A sophisticated, highly subtle herbal fusion featuring delicate white tea leaves and freshly picked jasmine pearls, balanced with a tiny splash of wild clover honey.',
    nicotineStrengths: ['0%', '2%'],
    mixRatio: '50/50 VG/PG Organic Extraction',
    image: vapeSleekPenAction,
    accentColor: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.12)'
  }
];
