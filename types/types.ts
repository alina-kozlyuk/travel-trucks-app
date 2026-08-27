// ==========================================
// 1. ENUMS & CONST TYPES (значення з Swagger)
// ==========================================

export type CamperForm =
  | 'alcove'
  | 'panel_van'
  | 'integrated'
  | 'semi_integrated';

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

// ==========================================
// 2. CAMPER MODELS (моделі даних)
// ==========================================

/**
 * Елемент галереї детальної сторінки
 */
export interface CamperGalleryItem {
  id: string;
  camperId: string;
  thumb?: string;
  original?: string;
  order: number;
}

export type GalleryImage = string | CamperGalleryItem;
/**
 * Картка кемпера у списку (GET /campers)
 */
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
  amenities: CamperAmenity[];
  coverImage: string;
  totalReviews: number;
}

/**
 * Детальна інформація про кемпер (GET /campers/{camperId})
 */
export interface CamperDetail {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenity[] | string;
  gallery: CamperGalleryItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Відгук про кемпер (GET /campers/{camperId}/reviews)
 */
export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// ==========================================
// 3. API REQUESTS & RESPONSES (запити та відповіді)
// ==========================================

/**
 * Параметри фільтрації та пагінації для GET /campers
 */
export interface CamperFilterParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: CamperForm | string;
  transmission?: CamperTransmission | string;
  engine?: CamperEngine | string;
}

/**
 * Відповідь від GET /campers
 */
export interface CampersFetchResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

/**
 * Відповідь від GET /campers/filters
 */
export interface CamperFiltersConfigResponse {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
}

/**
 * Тіло запиту на бронювання (POST /campers/{camperId}/booking-requests)
 */
export interface BookingRequestBody {
  name: string;
  email: string;
  bookingDate?: string; // Додатково для календаря згідно з Figma
  comment?: string;
}

/**
 * Відповідь бекенду після відправки бронювання
 */
export interface BookingResponse {
  message: string;
}