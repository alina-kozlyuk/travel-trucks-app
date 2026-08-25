'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import css from './NoteDetails.module.css';
import { fetchNoteById } from '@/lib/api/clientApi';

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id; 

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    
    
    enabled: !!id,               
    retry: false,                
    refetchOnWindowFocus: false, 
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return (
      <div className={css.container}>
        <p>Something went wrong or note not found.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}