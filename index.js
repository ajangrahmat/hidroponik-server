const db = require('./database');
const client = require("./mqtt");
const initMqtt = require("./initMqtt");
const initWeb = require("./initWeb");

initMqtt(db, client);
initWeb(db, client);