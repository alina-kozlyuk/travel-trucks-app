// lib/api/serverApi.ts

import { CamperFilterParams, CampersFetchResponse } from "@/types/types";

const BASE_URL = 'https://campers-api.goit.study/campers';

export async function fetchCampers(
  params: CamperFilterParams = {}
): Promise<CampersFetchResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch campers');
  }

  return response.json();
}

export async function fetchCamperById(id: string) {
  const response = await fetch(`https://campers-api.goit.study/campers/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch camper details');
  }

  return response.json();
}