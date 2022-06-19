import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardList from "./routes/BoardList";
import Write from "./routes/Write";
import Board from "./routes/Board";
import UpdateBoard from "./routes/UpdateBoard";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardList />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/:board_id" element={<Board />}></Route>
        <Route path="/:board_id/update" element={<UpdateBoard />}></Route>
      </Routes>
    </Router>
  );
}

export default Routers;
