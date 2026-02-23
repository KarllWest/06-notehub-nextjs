import axios, { AxiosInstance } from 'axios';
import { Note, NoteInput } from '@/types/note';

export interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNotes = async (page: number = 1, search: string = ''): Promise<GetNotesResponse> => {
  const { data } = await api.get<GetNotesResponse>('/notes', {
    params: { page, search },
  });
  return data;
};

export const createNote = async (note: NoteInput): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};