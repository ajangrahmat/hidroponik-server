const express = require("express");
const initMqtt = require("./mqtt");

const topikPompa = "hidroponik/8212817281/pompa";

function initWeb(db, client) {
  const app = express();

  let nutrisi = 1200;
  const batas = 1000;

  app.use(express.urlencoded({ extended: true }));

  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    db.query("SELECT * FROM data_sensor ORDER BY id DESC LIMIT 15", (err, result) => {
      res.render("index", {
        data: result,
      });
    });
  });

  app.get("/data", (req, res) => {
    res.render("data", {
      status: "OFF",
      nutrisi: nutrisi,
    });
  });

  app.post("/publish", (req, res) => {
    const status = req.body.status;
    const aktuator = req.body.aktuator;

    client.publish(topikPompa, status);
    const query = "UPDATE list_aktuator SET status = ? WHERE nama = ? ";
    const values = [status, aktuator];

    db.query(query, values, (err, result) => {
      console.log(result);
      res.redirect('/');
    });

  });

  app.listen(3000);
}

module.exports = initWeb;
