'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, deleteNote } from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

const ITEMS_PER_PAGE = 5; 

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data: notes = [] } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false); 
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentNotes = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className={css.container}>
      <div className={css.topBar}>
        <SearchBox value={search} onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
        }} />
        
        <button 
            className={css.createButton} 
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          + Create Note
        </button>
      </div>

      <NoteList 
        notes={currentNotes} 
        onDelete={(id) => deleteMutation.mutate(id)} 
      />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Note"
      >
        <NoteForm onAdd={(note) => createMutation.mutate(note)} />
      </Modal>
    </main>
  );
}