import { cookies } from "next/headers";
import { api } from "./api";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async ({
  search,
  page,
  perPage,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage,
      tag,
    },
    headers: await getCookieHeader(),
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: await getCookieHeader(),
  });

  return response.data;
};

export const checkSession = async () => {
  const response = await api.get("/auth/session", {
    headers: await getCookieHeader(),
  });

  return response;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me", {
    headers: await getCookieHeader(),
  });

  return response.data;
};
