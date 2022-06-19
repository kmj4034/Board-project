import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchList } from "../api";
import { useState, useCallback } from "react";

const BtnLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  :hover {
    color: #fff;
  }
`;

const Container = styled.div`
  /* width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; */
`;

function BoardList() {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery("fetchList", fetchList);
  const [checkedData, setCheckedData] = useState([]);
  function onCheckedData(checked, list) {
    if (checked) {
      setCheckedData([...checkedData, list]);
    } else {
      setCheckedData(checkedData.filter((el) => el !== list));
    }
  }
  const boardIdList = [];

  const deleteFunc = async (id) => {
    await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  };
  const onClick = () => {
    checkedData.forEach((list) => {
      deleteFunc(list.BOARD_ID);
    });
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((v) => (
              <tr key={v.BOARD_ID}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      onCheckedData(e.target.checked, v);
                    }}
                    checked={checkedData.includes(v) ? true : false}
                  ></input>
                </td>
                <td>{v.BOARD_ID}</td>
                <td>
                  <Link
                    to={`/${v.BOARD_ID}`}
                    state={{
                      content: v.BOARD_CONTENT,
                      title: v.BOARD_TITLE,
                      regitser_id: v.REGISTER_ID,
                      board_id: v.BOARD_ID,
                    }}
                  >
                    {v.BOARD_TITLE}
                  </Link>{" "}
                </td>
                <td> {v.REGISTER_ID} </td>
                <td> {v.REGISTER_DATE} </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <BtnLink to={"/write"}>
        <Button variant="info">글쓰기</Button>
      </BtnLink>
      <BtnLink
        to={`/${checkedData[0]?.BOARD_ID}/update`}
        state={{
          content: checkedData[0]?.BOARD_CONTENT,
          title: checkedData[0]?.BOARD_TITLE,
          regitser_id: checkedData[0]?.REGISTER_ID,
          board_id: checkedData[0]?.BOARD_ID,
        }}
      >
        <Button
          onClick={() => {
            if (checkedData.length !== 1) {
              alert("한 번에 하나의 게시물만 수정 가능합니다");
            }
          }}
          variant="secondary"
        >
          수정하기
        </Button>
      </BtnLink>
      <Button onClick={onClick} variant="danger">
        삭제하기
      </Button>
    </Container>
  );
}

export default BoardList;
