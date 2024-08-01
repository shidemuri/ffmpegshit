let displayArray = Array()



function redraw(){
    let result = ""
    for(let y = 0; y < 32; y=y+2){
        for(let x = 0; x < 32; x++) {
            result += `\x1b[38;5;${displayArray[y*32+x]}m\x1b[48;5;${displayArray[(y+1)*32+x]}m▀`
        }
        result += "\x1b[0m\n"
    }
    return result
}

let bleh = 0

const fucker = require("fs")
const file = new Uint8Array(fucker.readFileSync("videodata_b.bin"))
async function a(){
    bleh = Date.now()
    for(let i = 0; i < file.byteLength; i++) {
        if(displayArray.length == 32*32) {
            console.clear()
            process.stdout.write(redraw())
            await new Promise(r=>setTimeout(r,(1/20)*1000)-((bleh-Date.now())*1000))
            displayArray = []
            bleh = Date.now()
        }
        let byte = (file[i]>>>0).toString(2)
        let n = ""
        for(let a = 0; a < 8-byte.length; a++) n+="0"
        byte = n+byte
        for(const o of byte.split('')) displayArray.push(o == 0 ? 232 : 255)
    }
    console.log(file.byteLength/(32*32*8))
}
a()