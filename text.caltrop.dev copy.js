//https://text.caltrop.dev

//120x90
//3x4 chunks


const {WebSocket} = require('ws')

const fs = require('fs')
const data = (fs.readFileSync('videodatae.txt')+``).split('\n').map(v=>v.split('|'))

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

let remote = ''

function jsmoment(cb){
    let value = 'patch';
    this.set = v =>{
        value = v
        cb(this)
    }
    this.get = () => value
}

;(async ()=>{
    let gateway = await fetch('https://text.caltrop.dev/gateway')
    gateway = await gateway.json()
    console.log(gateway)
    const ws = new WebSocket(gateway.url)
    ws.on('error',console.error)
    const send = msg => {
        ws.send(JSON.stringify(msg))
        console.log('local: ' + JSON.stringify(msg))
    }

    const cursor = {x:-10000,y:0}

    const draw = (col,ln,code) => {
        const id = Math.floor(col / Chunk.rowSize) + ',' + Math.floor(ln / Chunk.colSize)

        let localCol = col % Chunk.rowSize
        let localLn = ln % Chunk.colSize
        if(localCol < 0) localCol += Chunk.rowSize;
        if(localLn < 0) localLn += Chunk.colSize;
        send({
            update: [{
                id,
                'col': localCol,
                'ln': localLn,
                code
            }]
        })
    }

    const drawFullString = str => {
        for(const o of str) {
            cursor.x++
            draw(cursor.x,cursor.y,charToCode(o))
        }
    }

    let frame = 26;
    let ln = 0;
    let col = 0;

    const step = (wrapper) => { // what single-threading does to a mf
        if(wrapper.get().includes('patch')) {
            draw(cursor.x+Number(col),cursor.y+Number(ln),charToCode(data[frame][ln][col]))
            console.log(col,ln)
            if(col++>120-2){
                col = 0
                if(ln++>90-2) {
                    ln = 0;
                    //frame++
                }
            }
        }
    }
    const wrapper = new jsmoment(step)

    ws.on('open',()=>{
        setInterval(()=>{
            send({"ping":Date.now()})
        },gateway.heartbeat)
        send({pos:{ln:-10000,col:0}})
        send({
            "added": [
                '-200,0',
                '-199,0',
                '-198,0',
                '-200,1',
                '-199,1',
                '-198,1',
                '-200,2',
                '-199,2',
                '-198,2',
                '-200,3',
                '-199,3',
                '-198,3'
            ],
            "removed":[]
        })
        /*for(let frame in data) {
            frame = 26
            for(const ln in data[frame]) {
                for(const col in data[frame][ln]){
                    console.log(cursor.x,cursor.y,col,ln)
                    draw(cursor.x+Number(col),cursor.y+Number(ln),charToCode(data[frame][ln][col]))
                }
            }
            if(frame == 26) break; //teste
        }*/
        step(wrapper)
    })
    ws.on('message',msg=>{
        console.log('remote: '+msg)
        remote = msg
        wrapper.set(remote)
    })
})()
