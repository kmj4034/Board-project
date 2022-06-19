import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchList, fetchOne } from "../api";
import { useQuery } from "react-query";

function UpdateBoard() {
  const location = useLocation();
  const state = location.state;
  // console.log(state.board_id);
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);

  const onChangeT = (e) => {
    setTitle(e.target.value);
  };
  const onChangeC = (e) => {
    setContent(e.target.value);
  };

  // const getData = async () => {
  //   const json = await (
  //     await fetch(`http://localhost:8000/edit/${state.board_id}`)
  //   ).json();
  //   console.log(json);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/update/${state.board_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
        id: state.board_id,
      }),
    })
      .then(alert("수정 완료!"))
      .then(navigate("/"));
  };

  return (
    <div>
      <h2>제목 : {state.title}</h2>
      <h3>작성자 : {state.regitser_id}</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          // placeholder={`내용 : ${state.content}`}
          onChange={onChangeC}
          value={content ?? ""}
        />
        <br />
        <br />
        <Button type="text" variant="secondary">
          수정완료
        </Button>
      </form>
    </div>
  );
}

export default UpdateBoard;
