import { useContext,React } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function About() {
    const a = useContext(NoteContext);
  return (
    <div>
      <h1>This page is about {a.name} and he is in {a.class} class</h1>
    </div>
  );
}
