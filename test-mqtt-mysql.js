const mqtt = require("mqtt");
const mysql = require("mysql2");

// konfigurasi untuk MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hidroponik",
});

// Konfigurasi untuk MQTT
const broker = "mqtt://broker.emqx.io:1883";
const topikSensor = "hidroponik/8212817281/sensor";
const topikPompa = "hidroponik/8212817281/pompa";
const options = {
  clientId: "hidroponikserver029102910",
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(broker, options);

//ketika client terhubung ke MQTT
client.on("connect", () => {
  console.log("Berhasil terhubung ke broker: " + broker);

  client.subscribe(topikSensor, (error) => {
    if (!error) {
      console.log("Berhasil subscribe ke topik: " + topikSensor);
      client.publish(topikPompa, "Server Sudah Online");
    }
  });
});

//ketika client menerima pesan
client.on("message", (topic, message) => {
  console.log("Pesan diterima dari topik: " + topic);
  console.log("Isi Pesan: " + message);

  const isi_pesan = message.toString();
  const data = JSON.parse(isi_pesan);

  const nutrisi = data.nutrisi;
  const suhu = data.suhu;
  const kelembaban = data.kelembaban;

  if (topic === topikSensor) {

    const query = "INSERT INTO data_sensor (nutrisi, suhu, kelembaban) VALUES (?,?,?)";
    const values = [nutrisi, suhu, kelembaban];
    db.query(query, values, (err, result) => {
      console.log(result);
    });

  }

});

//Ketika error koneksi
client.on("error", (error) => {
  console.error("Koneksi bermasalah, pesan error: " + error);
});
