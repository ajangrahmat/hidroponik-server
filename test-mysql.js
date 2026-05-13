const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hidroponik"
});

db.query("SELECT * FROM data_sensor", (err, result) => {
  console.log(result);
});
