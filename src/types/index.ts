export type ScreenType = 'home' | 'seasonal-menu' | 'work-and-desks' | 'bean-origin' | 'reserve-table' | 'locations';

export interface MenuItem {
  id: string;
  name: string;
  category: 'araku' | 'espresso' | 'breakfast' | 'continental' | 'desserts';
  diet: 'all' | 'vegan' | 'jain' | 'special';
  price: number;
  origin: string;
  subTitle: string;
  description: string;
  badge?: string;
  badgeType?: 'reserve' | 'signature' | 'chef' | 'jain' | 'bake';
  dietTag?: string;
  imageUrl: string;
  notes?: string[];
  brewMethod?: string;
  rating?: number;
}

export interface DeskSeat {
  id: string;
  label: string;
  type: 'mezzanine' | 'ocean_view' | 'booth' | 'communal';
  plugType: 'Type-C 65W + Universal' | 'Universal 3-Pin' | 'Dual AC';
  isOccupied: boolean;
  reservedBy?: string;
  noiseLevel: 'Silent (38 dB)' | 'Lo-fi Ambient (45 dB)' | 'Bustling (55 dB)';
}

export interface ReservationData {
  id: string;
  location: 'siripuram' | 'rkbeach';
  date: string;
  slot: 'morning' | 'deepwork' | 'sunset' | 'night';
  seatingZone: string;
  guestsCount: string;
  name: string;
  phone: string;
  specialNotes?: string;
  deskNumber?: string;
  createdAt: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  milkChoice?: string;
  sweetness?: string;
  temperature?: 'Hot' | 'Iced';
}
