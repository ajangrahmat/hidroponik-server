const topikSensor = "hidroponik/8212817281/sensor";

function initMqtt(db, client) {
  //ketika client terhubung ke MQTT
  client.on("connect", () => {
    console.log("Berhasil terhubung ke broker!");

    client.subscribe(topikSensor, (error) => {
      if (!error) {
        console.log("Berhasil subscribe ke topik: " + topikSensor);
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
      const query =
        "INSERT INTO data_sensor (nutrisi, suhu, kelembaban) VALUES (?,?,?)";
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
}

module.exports = initMqtt;
