import { NoteData, Tag } from "../../types";
import { useNote } from "../NoteDetail/Layout";
import NoteForm from "./NoteForm";

type EditProps = {
  onSubmit: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, addTag, availableTags }: EditProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Notu Düzenle</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        availableTags={availableTags}
        addTag={addTag}
      />
    </div>
  );
};

export default EditNote;
