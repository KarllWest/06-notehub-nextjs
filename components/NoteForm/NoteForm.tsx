'use client';

import { useState } from 'react';
import { NoteInput } from '../../types/note';
import css from './NoteForm.module.css'; 

interface NoteFormProps {
  onAdd: (note: NoteInput) => void;
}

export default function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title, content, tag });
    setTitle('');
    setContent('');
    setTag('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          className={css.input}
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          className={css.textarea}
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className={css.field}>
         <label className={css.label}>Tag</label>
         <div className={css.row}>
            <input
              className={css.input}
              type="text"
              placeholder="Enter tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button className={css.button} type="submit">Add Note</button>
         </div>
      </div>
    </form>
  );
}