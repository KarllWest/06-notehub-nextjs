import axios from 'axios';
import { Note, NoteInput } from '@/types/note';

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

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await api.get('/notes');
  return data;
};

export const createNote = async (note: NoteInput): Promise<Note> => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};