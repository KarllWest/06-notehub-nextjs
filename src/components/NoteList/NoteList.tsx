import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteList.module.css'; 

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.header}>
             <h3 className={css.title}>{note.title}</h3>
             <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <small className={css.date}>{note.date}</small>
            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button className={css.button} onClick={() => onDelete(note.id)}>
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}