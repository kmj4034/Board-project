import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeT = (e) => {
    setTitle(e.target.value);
  };
  const onChangeC = (e) => {
    setContent(e.target.value);
  };
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    }).then(navigate("/"));
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={onChangeT}
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" onChange={onChangeC} value={content} />
        </Form.Group>
        <Button onClick={onSubmit} variant="info">
          작성완료
        </Button>
        <Button variant="secondary">취소</Button>
      </Form>
    </div>
  );
}

export default Write;
