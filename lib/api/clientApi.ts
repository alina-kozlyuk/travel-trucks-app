import { api } from "./api";

import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  username: string;
}

interface CheckSessionResponse {
  success: boolean;
}

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
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
};

export const createNote = async (
  newNote: CreateNoteParams
): Promise<Note> => {
  const response = await api.post<Note>("/notes", newNote);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const register = async (
  credentials: AuthCredentials
): Promise<User> => {
  const response = await api.post<User>(
    "/auth/register",
    credentials
  );

  return response.data;
};

export const login = async (
  credentials: AuthCredentials
): Promise<User> => {
  const response = await api.post<User>(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await api.get<CheckSessionResponse>('/auth/session');
    return res.data.success;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User | null> => {
  const response = await api.get<User>("/users/me");

  return response.data;
};

export const updateMe = async (
  data: UpdateUserData
): Promise<User> => {
  const response = await api.patch<User>(
    "/users/me",
    data
  );

  return response.data;
};