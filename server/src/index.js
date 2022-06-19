const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const cors = require("cors");
const bodyParser = require("body-parser");

// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:3000/write",
//   "http://localhost:8000",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not Allowed Origin!"));
//     }
//   },
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credential: "true", // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Als020810!",
  database: "bbs",
});

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT * FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const sqlQuery =
    "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,'artistJay');";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
  });
});

app.patch("/update/:id", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const sqlQuery =
    "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ? WHERE BOARD_ID = " +
    req.params.id;
  db.query(sqlQuery, [title, content], (err, result) => {
    console.log(err);
    res.redirect("/");
  });
});

app.get("/edit/:id", (req, res) => {
  const sqlQuery = "SELECT * FROM BOARD WHERE BOARD_ID = ?";
  db.query(sqlQuery, [req.params.id], (err, result) => {
    console.log(err);
    res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID = ${id};`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
