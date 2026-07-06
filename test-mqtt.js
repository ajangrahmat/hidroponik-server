const mqtt = require("mqtt");

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
});

//Ketika error koneksi
client.on("error", (error) => {
    console.error('Koneksi bermasalah, pesan error: ' + error);
});