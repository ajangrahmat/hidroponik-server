const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//variabel
let nutrisi = 500;
const batas = 1000;

//fungsi
function nyalakanPompa(nutrisi) {
    console.log("Nutrisi Rendah: " + nutrisi + "ppm");
    console.log("Pompa Menyala");
}
function matikanPompa(nutrisi) {
    console.log("Pompa Mati");
    console.log("Nutrisi Aman: " + nutrisi + "ppm");
}



rl.question('Masukan nilai nutrisi: ', (answer) => {

    for (let i = 0; i < answer; i++) {
        nutrisi = nutrisi + 100;
        //logika
        if (nutrisi < batas) {
            nyalakanPompa(nutrisi);
        } else {
            matikanPompa(nutrisi);
        }
    }

    rl.close();
});



