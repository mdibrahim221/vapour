export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  colors: Array<{
    name: string;
    hex: string;
  }>;
  features: string[];
  battery: string;
  capacity: string;
  resistance: string;
  puffCount: string;
}

export interface Flavor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  nicotineStrengths: string[];
  mixRatio: string;
  image: string;
  accentColor: string;
  bgGlow: string;
}

export interface VapeConfig {
  color: string;
  throatHit: 'Smooth' | 'Balanced' | 'Intense';
  podCapacity: '2.0ml' | '4.5ml' | '6.0ml';
  engraving: string;
}
