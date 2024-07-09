import React, { useState, useEffect } from 'react';
import Note from './Note';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Load notes from localStorage on initial render
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []); // Only run once on initial render

  const saveNotesToLocalStorage = (updatedNotes: Note[]) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [
        ...notes,
        {
          id: uuidv4(),
          content: newNote,
          color: getRandomColor(),
          position: { x: 100, y: 100 }, // Initial position example
        },
      ];
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const getRandomColor = () => {
    const colors = [
      'bg-yellow-200',
      'bg-blue-200',
      'bg-green-200',
      'bg-red-200',
      'bg-purple-200',
      'bg-pink-200',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const updateNotePosition = (id: string, newPosition: { x: number; y: number }) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Sticky Notes</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Add a new note"
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={addNote}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            color={note.color}
            position={note.position}
            onDelete={deleteNote}
            onDrag={updateNotePosition} // Pass function to update position
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
