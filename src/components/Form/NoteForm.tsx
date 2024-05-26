import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../../types";
import { NewNoteProps } from "./NewNote";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

const NoteForm = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
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
                //yeni etiket oluşturulduğunda
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  addTag(newTag);

                  setSelectedTags((prev) => [...prev, newTag]);
                }}
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
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            İptal
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
