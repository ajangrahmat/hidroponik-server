const http = require("http");

let nutrisi = 1200;
const batas = 1000;

const server = http.createServer((req, res) => {
    if (nutrisi < batas) {
        res.write("Status: Nutrisi Rendah (Pompa ON), " + nutrisi + "ppm");
    } else {
        res.write("Status: Nutrisi Aman (Pompa OFF), " + nutrisi + "ppm");
    }
    res.end();
});

server.listen(3000);
console.log("Server Hidroponik Aktif");