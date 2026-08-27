import axios from 'axios';
import {
  CamperDetail,
  CamperFilterParams,
  CamperReview,
  CampersFetchResponse,
  BookingRequestBody,
  BookingResponse,
} from '@/types/types';

const BASE_URL = 'https://campers-api.goit.study';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 1. Отримання каталогу кемперів (з фільтрацією та пагінацією)
export async function fetchCampers(
  params: CamperFilterParams
): Promise<CampersFetchResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.perPage) searchParams.append('perPage', params.perPage.toString());
  if (params.location?.trim()) searchParams.append('location', params.location.trim());
  if (params.form) searchParams.append('form', params.form);
  if (params.transmission) searchParams.append('transmission', params.transmission);
  if (params.engine) searchParams.append('engine', params.engine);

  const { data } = await apiClient.get<CampersFetchResponse>(
    `/campers?${searchParams.toString()}`
  );
  return data;
}

// 2. Отримання деталей окремого кемпера
export async function fetchCamperById(id: string): Promise<CamperDetail> {
  const { data } = await apiClient.get<CamperDetail>(`/campers/${id}`);
  return data;
}

// 3. Отримання відгуків для кемпера
export async function fetchCamperReviews(id: string): Promise<CamperReview[]> {
  const { data } = await apiClient.get<CamperReview[]>(`/campers/${id}/reviews`);
  return data;
}

// 4. Відправка бронювання кемпера
export async function sendBookingRequest(
  camperId: string,
  bookingData: BookingRequestBody
): Promise<BookingResponse> {
  const { data } = await apiClient.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    bookingData
  );
  return data;
}