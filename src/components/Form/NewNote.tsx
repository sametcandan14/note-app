import { NoteData } from "../../types";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};

const NewNote = ({ onSubmit }: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">Yeni Not Ekle</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
};

export default NewNote;
