import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/Form/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { RawNote, Tag } from "./types";
import { useLocalStorage } from "./useLocaleStorage";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  function onCreateNote(data: []) {
    console.log(data);
  }
  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<h1>Anasayfa</h1>} />
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} />} />
          <Route path="/:id">
            <Route index element={<h1>Detay</h1>} />
            <Route path="edit" element={<h1>Düzenleme</h1>} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
