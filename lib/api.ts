import axios from 'axios';
import { Note, NoteInput, GetNotesResponse } from '@/types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = typeof window === 'undefined' 
  ? 'https://notehub-api.onrender.com' 
  : '/api/proxy';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getNotes = async (
  page: number = 1,
  search: string = ''
): Promise<GetNotesResponse> => {
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