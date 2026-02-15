import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['notes', 1, ''], 
      queryFn: () => getNotes(1, ''), 
    });
  } catch (error) {
    console.error('Failed to prefetch notes:', error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}