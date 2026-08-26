export type CamperForm = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';
export type CamperTransmission = 'automatic' | 'manual';
export type CamperEngine = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export type CamperAmenity =
  | 'ac'
  | 'bathroom'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

// --- GALLERY & REVIEWS ---
export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

// --- CAMPER ENTITIES ---
// Базовий елемент у списку (GET /campers)
export interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenity[]; // Залишаємо строго масив під наш JSON
  coverImage: string;
  totalReviews: number;
}

// Повна інформація про кемпер (GET /campers/{camperId})
export interface CamperDetail extends CamperListItem {
  description: string;
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
}

// --- API RESPONSES ---
export interface CampersFetchResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

export interface CamperFiltersResponse {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
}

// --- REQUEST PARAMS & FORMS ---
export interface CamperFilterParams {
  location?: string;
  form?: CamperForm;
  engine?: CamperEngine;
  transmission?: CamperTransmission;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  page?: number;
  limit?: number;
}

export interface BookingData {
  name: string;
  email: string;
  bookingDate?: string;
  comment?: string;
}

export interface BookingResponse {
  id: string;
  camperId: string;
  name: string;
  email: string;
  bookingDate?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}