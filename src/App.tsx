import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/Form/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NoteData, RawNote, Tag } from "./types";
import { useLocaleStorage } from "./useLocaleStorage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./MainPage";
import Layout from "./components/NoteDetail/Layout";
import NoteDetail from "./components/NoteDetail/NoteDetail";
import EditNote from "./components/Form/EditNote";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  // notların etiketlerindeki id değerleri ile eşleşen ekiketleri al
  // hesaplamayı performans cashle

  const noteWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  //locale yeni not ekler
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  }

  //locale yeni etiket ekler
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  //elemanı siler

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  //elemanı günceller

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) => {
      return prev.map((n) => {
        if (n.id === id) {
          return { ...n, ...data, tagsIds: tags.map((tag) => tag.id) };
        } else {
          return n;
        }
      });
    });
  }

  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={<MainPage notes={noteWithTags} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                addTag={addTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<Layout notes={noteWithTags} />}>
            <Route index element={<NoteDetail onDeleteNote={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  addTag={addTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
