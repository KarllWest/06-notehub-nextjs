import { Note, NoteInput } from '@/types/note';

export interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}

let FAKE_NOTES: Note[] = [
  { 
    id: '1', 
    title: 'Welcome Note', 
    content: 'This note is running locally because the API is having issues.', 
    tag: 'Work', 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: '2', 
    title: 'Project Ideas', 
    content: '1. Build UI\n2. Fix API\n3. Deploy', 
    tag: 'Personal', 
    createdAt: new Date(Date.now() - 86400000).toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: '3', 
    title: 'Shopping List', 
    content: 'Milk, Bread, Coffee', 
    tag: 'Shopping', 
    createdAt: new Date(Date.now() - 172800000).toISOString(), 
    updatedAt: new Date().toISOString() 
  }
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getNotes = async (page: number = 1, search: string = ''): Promise<GetNotesResponse> => {
  console.log(`📡 MOCK API: getNotes (page: ${page}, search: "${search}")`);
  await delay(500);

  const filtered = FAKE_NOTES.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const pageSize = 10;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const paginatedNotes = filtered.slice(start, start + pageSize);

  return { notes: paginatedNotes, totalPages };
};

export const createNote = async (note: NoteInput): Promise<Note> => {
  console.log('📡 MOCK API: createNote', note);
  await delay(500);

  const newNote: Note = {
    id: Math.random().toString(36).substring(7), 
    ...note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  FAKE_NOTES.unshift(newNote);
  return newNote;
};

export const deleteNote = async (id: string): Promise<Note> => {
  console.log(`📡 MOCK API: deleteNote (${id})`);
  await delay(500);

  const index = FAKE_NOTES.findIndex(n => n.id === id);
  if (index === -1) throw new Error('Note not found');

  const [deletedNote] = FAKE_NOTES.splice(index, 1);
  return deletedNote;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  console.log(`📡 MOCK API: fetchNoteById (${id})`);
  await delay(500);

  const note = FAKE_NOTES.find(n => n.id === id);
  if (!note) throw new Error('Note not found');
  
  return note;
};