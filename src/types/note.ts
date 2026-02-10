export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  date: string;
}

export type NoteInput = Omit<Note, 'id' | 'date'>;