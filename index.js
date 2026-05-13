const express = require("express");
const app = express();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hidroponik"
});

let nutrisi = 1200;
const batas = 1000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  db.query("SELECT * FROM data_sensor", (err, result) => {
    res.render("index", {
      data: result
    });
  });
});


app.get("/data", (req, res) => {
  res.render("data", {
    status: "OFF",
    nutrisi: nutrisi
  });
});

app.listen(3000);