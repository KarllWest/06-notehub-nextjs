'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotes } from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearch],
    queryFn: () => getNotes(currentPage, debouncedSearch),
    placeholderData: keepPreviousData, 
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (isError) return <p className={css.error}>Error loading notes.</p>;

  return (
    <main className={css.container}>
      <div className={css.topBar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        
        <button 
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Create Note
        </button>
      </div>

      {isLoading ? (
        <p className={css.loading}>Loading, please wait...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          
          {data && data.totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Create New Note"
        >
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}