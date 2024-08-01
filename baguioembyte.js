const fs = require("fs")
let file = (fs.readFileSync("videodatae.txt")+``).match(/\d{8}/g)
for(const a in file){
    const parsed = parseInt(file[a],2)
    
    file[a] = parsed//(parsed <= 16 ? "0" : "") + parsed.toString(16)
}
fs.writeFileSync("videodata_b.bin",new Uint8Array(file))