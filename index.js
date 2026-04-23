const express = require("express");
const app = express();

let nutrisi = 900;
const batas = 1000;

app.get("/", (req, res) => {
  res.send("Monitoring Hidroponik Aktif");
});

app.get("/status", (req, res) => {
  if (nutrisi < batas) {
    res.send("Pompa ON");
  } else {
    res.send("Pompa OFF");
  }
});

app.get("/sensor", (req, res) => {
  res.send(`
    <h1>Monitoring Hidroponik</h1>
    <p>Nutrisi: 900</p>
  `);
});

app.listen(3000);