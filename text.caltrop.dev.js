//https://text.caltrop.dev

const SETTINGS = {
    x: -14770,
    y: 85
}
const fs = require('fs')
const data = (fs.readFileSync('videodatae.txt')+``).split('\n').map(v=>v.split('|'))

SETTINGS.width = data[0][0].length
SETTINGS.height = data[0].length

const {WebSocket} = require('ws')


const fetch = require('node-fetch')

const Letter = {
    defaultBackground: 0,
    defaultForeground: 15,
}

const Chunk = {
    rowSize:50,
    colSize:25
}

const charToCode = (char, fg = Letter.defaultForeground, bg = Letter.defaultBackground) => {
    return char.charCodeAt(0) | (fg << 16) | (bg << 20)
}


;(async ()=>{
    let gateway = await fetch('https://text.caltrop.dev/gateway')
    gateway = await gateway.json()
    console.log(gateway)

    let stack = []

    let drawstack = []

    let ws = null
    let ping = null
    let connected = false
    let puppet = 1

    const send = function(msg){
        if(!connected) stack.push(msg); 
        else ws.send(JSON.stringify(msg));
        console.log('local: ' + drawstack.length + JSON.stringify(msg))
    }


    const draw = (col,ln,code) => {
        const id = Math.floor(col / Chunk.rowSize) + ',' + Math.floor(ln / Chunk.colSize)

        let localCol = col % Chunk.rowSize
        let localLn = ln % Chunk.colSize
        if(localCol < 0) localCol += Chunk.rowSize;
        if(localLn < 0) localLn += Chunk.colSize;

        drawstack.push({
            id,
            'col': localCol,
            'ln': localLn,
            code
        })
    }

    const toclaim = []
    const x = Math.floor(SETTINGS.x / Chunk.rowSize)
    const y = Math.floor(SETTINGS.y / Chunk.colSize)


    const chunk_width = Math.ceil(SETTINGS.width/50)
    const chunk_height = Math.ceil(SETTINGS.height/25)
    for(const i of Array(chunk_width).keys())
        for(const j of Array(chunk_height).keys())
            toclaim.push(`${x+i},${y+j}`);


    let started = performance.now()

    console.clear()

    const createsocket = ()=>{
        
        ws = new WebSocket(gateway.url)
        
        const tryreconnect = () => {
            clearInterval(ping)
            createsocket()
        }
        ws.on('error',()=>{
            console.log('remote error')
            tryreconnect()
        })
        ws.on('close',() =>{
            console.log('remote disconnect')
            tryreconnect()
        })



        ws.on('open',()=>{
            connected = true
            ping = setInterval(()=>{
                send({"ping":Date.now()})
            },gateway.heartbeat)
            send({
                "added": toclaim,
                "removed":[]
            })
            let f = null;
            while(f = stack.shift() && connected) send(f)
        })
        ws.on('message',(msg,bin)=>{
            console.log('remote: '+msg)
            if(msg.includes('patch') || msg == 'r') {
                ws.close()
                connected = false
                console.log(`inftext bot\ncurrent ws puppet: ${puppet++}\ndraw stack size: ${drawstack.length}\nspeed: ${(85/((performance.now()-started)/1000)).toFixed(2)} chars/s\ntime between payloads: ${(performance.now()-started).toFixed(2)}ms\n\n\x1b[?25l`)
                started = performance.now()
            }else if(bin){
                if(drawstack.length > 0 && connected) {
                    const data = drawstack.splice(0,85)
                    for(const _ of Array(2).keys()) send({
                        update: data
                    }) //i spent 1 hour trying to figure out why would the server not just do anything after a specific amount of time sending this shit
                       //turns out it just wasnt receiving messages sometimes
                }
            }
        })
    }
    for(const frame in data) {
        for(const ln in data[frame]) {
            for(const col in data[frame][ln]){
                const code = (data[frame][ln].charCodeAt(col)-32)
                const fg = code >> 4
                const bg = code & 15
                draw(SETTINGS.x+Number(col),SETTINGS.y+Number(ln),charToCode('▀',fg,bg))
            }
        }
    }
    createsocket()
})()