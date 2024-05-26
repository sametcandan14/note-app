import { Button, Col, Row, Form, Card, Stack, Badge } from "react-bootstrap";
import { Tag } from "./types";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";

type NoteType = {
  tags: Tag[];
  title: string;
  id: string;
};
type MainProps = {
  availableTags: Tag[];
  notes: NoteType[];
};

const MainPage = ({ availableTags, notes }: MainProps) => {
  const [title, setTitle] = useState<string>("");

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  //etiketler başlık veya notlar değişince filtrele
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        // notun başlığı arama metnini içeriyorsa başlığı döndür

        (title === "" ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  return (
    <>
      <Row>
        <Col>
          <h1>Notlar</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to={"/new"}>
            <Button>Oluştur</Button>
          </Link>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                // sahip olacağı etiketler
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                // daha önceden eklenen etiketleri listeleme

                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* liste */}

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3  mt-4">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainPage;

function NoteCard({ id, title, tags }: NoteType) {
  return (
    <Card
      className="h-100 text-reset text-decoration-none"
      as={Link}
      to={`/${id}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-between h-100 "
        >
          <span className="fs-5">{title} </span>

          {tags.length > 0 && (
            <Stack
              direction="horizontal"
              className="justify-content-center flex-wrap "
            >
              {tags.map((tag) => (
                <Badge className="text-truncate"> {tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
