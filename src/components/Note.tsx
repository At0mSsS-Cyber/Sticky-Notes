import React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface NoteProps {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
  onDelete: (id: string) => void;
  onDrag: (id: string, newPosition: { x: number; y: number }) => void; // Callback for position update
}

const Note: React.FC<NoteProps> = ({ id, content, color, position, onDelete, onDrag }) => {
  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    onDrag(id, newPosition); // Callback to update position in parent component
  };

  return (
    <Draggable position={position} onStop={handleDrag}>
      <div
        className={`p-4 m-2 rounded-lg shadow-md ${color} min-h-[100px] min-w-[200px] relative`}
      >
        <button
          onClick={() => onDelete(id)}
          className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          X
        </button>
        <p className="mt-8">{content}</p>
      </div>
    </Draggable>
  );
};

export default Note;
