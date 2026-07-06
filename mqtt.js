  const mqtt = require("mqtt");
  
  // Konfigurasi untuk MQTT
  const broker = "mqtt://broker.emqx.io:1883";
  const options = {
    clientId: "hidroponikserver029102910",
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  };

  const client = mqtt.connect(broker, options);

  module.exports = client;