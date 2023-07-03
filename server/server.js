const express = require("express");

//npm i dotenv
require("dotenv").config();
//npm i cors (gives permision for front end to access backend)
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    // this is needed in express server to give permission (http://127.0.0.1:5500)
    origin: "http://127.0.0.1:5500",
  })
);

app.use(express.urlencoded({ extended: true }));
// express by default dose not use json, this allow it
app.use(express.json());

const db = require("./config/connection");

app.get("/", (req, res) => {
  const sql = "SELECT * FROM input";

  db.query(sql, (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(data);
    }
  });
});

app.post("/post", (req, res) => {
  const sql = "INSERT INTO input (toDos) VALUE (?)";
  const values = [req.body.toDos];

  db.query(sql, values, (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(data);
    }
  });
});

app.put("/update", (req, res) => {
  const sql = "UPDATE input SET toDos = ? WHERE id = ?";

  const values = [
    //must be in same order as sql (so toDos first and then id)
    req.body.toDos,
    req.body.id,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      throw err;
    } else {
      return res.json(data);
    }
  });
});

app.delete("/delete", (req, res) => {
  const values = [req.body.id];

  const sql = `DELETE FROM input WHERE id = ?`; // Always use backticks when not hard coding

  db.query(sql, values, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
      return res.json("deleted the todo successfully");
    }
  });
});

app.use(express.static("public"));

app.listen(PORT, () =>{
    console.log(`listning to port ${PORT}`);
});