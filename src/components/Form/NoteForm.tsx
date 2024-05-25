import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";

const NoteForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control ref={titleRef} required className="shadow" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect isMulti className="shadow" />
            </Form.Group>
          </Col>
        </Row>
        {/* text içeriği */}

        <Form.Group controlId="markdown">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            as={"textarea"}
            ref={markdownRef}
            rows={15}
            required
            className="shadow"
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit">Kaydet</Button>
          <Button type="button" variant="secondary">
            İptal
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
