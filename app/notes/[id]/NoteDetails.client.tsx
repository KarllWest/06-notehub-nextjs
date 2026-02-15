'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div>
      <div>
        <div>
          <h2>{note.title}</h2>
        </div>
        <p>Tag: {note.tag}</p>
        <p>{note.content}</p>
        <p>Date: {note.date}</p>
      </div>
    </div>
  );
}