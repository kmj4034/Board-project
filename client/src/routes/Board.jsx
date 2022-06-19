import { useLocation, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const LinkBtn = styled(Link)``;

function Board() {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  return (
    <div>
      <h2>제목 : {state.title}</h2>
      <h3>작성자 : {state.regitser_id}</h3>
      <span>내용 : {state.content}</span>
      <br />
      <br />
      <LinkBtn
        to={"update"}
        state={{
          board_id: state.board_id,
          content: state.content,
          regitser_id: state.regitser_id,
          title: state.title,
        }}
      >
        <Button variant="secondary">수정하기</Button>
      </LinkBtn>
    </div>
  );
}

export default Board;
