import { CamperDetail, CamperFilterParams, CampersFetchResponse } from "@/types/types";

const BASE_URL = 'https://campers-api.goit.study';

export async function fetchCampers(
  params: CamperFilterParams = {}
): Promise<CampersFetchResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetch(`${BASE_URL}/campers?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch campers');
  }

  return response.json();
}

export async function fetchCamperById(id: string): Promise<CamperDetail> {
  const response = await fetch(`${BASE_URL}/campers/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch camper details');
  }

  return response.json();
}