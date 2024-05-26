import { Badge, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./Layout";

const NoteDetail = () => {
  const note = useNote();
  return (
    <>
      <Row>
        <Col>
          <h1>{note.title}</h1>

          {note.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
      </Row>
    </>
  );
};

export default NoteDetail;
