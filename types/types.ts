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


export interface CamperGalleryItem {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export type GalleryImage = string | CamperGalleryItem;


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


export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}


export interface CamperFilterParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: CamperForm | string;
  transmission?: CamperTransmission | string;
  engine?: CamperEngine | string;
}


export interface CampersFetchResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}


export interface CamperFiltersConfigResponse {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
}


export interface BookingRequestBody {
  name: string;
  email: string;
  bookingDate?: string; 
  comment?: string;     
}


export interface BookingResponse {
  message: string;
}