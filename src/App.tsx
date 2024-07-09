import React from 'react';
import NoteList from './components/NoteList';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <NoteList />
    </div>
  );
};

export default App;
