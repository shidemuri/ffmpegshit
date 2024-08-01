const ws = require('ws')

const socket = new ws('wss://text.caltrop.dev:1312/')

socket.onmessage = (event) =>{
    console.log(event.data)
const chars = "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿"

const getChar = (char) => {
    return chars.includes(char) ? 993280 + chars.indexOf(char) : chars[0]
}

socket.on('open', () =>{
    const setPos = (x,y) =>{
        socket.send(JSON.stringify({"pos":{"ln":y,"col":x}}))
    }
    console.log('connected')
    setInterval(() => {
        socket.send(JSON.stringify({"ping": Date.now()}))
    }, 1000);
    
})