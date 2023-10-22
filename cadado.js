
//"funciona"



const actualwidth = 15
const actualheight = 8


const porro = require('@kmamal/sdl')
const _ = Object.values(porro.video.displays[0].geometry).slice(2)
const width = Math.floor(_[0]/actualwidth)
const height = Math.floor(_[1]/actualheight)

const data = (require('fs').readFileSync('videodatae.txt')+``).split('\n')
const windows = Array(actualwidth*actualheight).fill(null)

let int;
let i = 37//-1
const processing = []
int = setInterval(async ()=>{
    const split = data[i++].match(/.{30}/g)
    for(const fucker in split){ //h
        processing.push(new Promise(r=>{
            for(const n in split[fucker]) { //w
                const idx = fucker*actualwidth+Number(n)
                if(split[fucker][n] == '0' && !windows[idx]) {
                    const clueless = porro.video.createWindow({title:'🈁',alwaysOnTop:true})
                    clueless.setSize(width,height)
                    const pos = [(n)*actualwidth*2,(fucker)*actualheight*4].map(x=>Number(x))
                    console.log(pos,i,split[fucker],split[fucker][n],fucker,windows.length,idx)
                    clueless.setPosition(...pos)
                    windows[idx] = clueless
                    r(true)
                } else if(windows[idx]) {
                    windows[idx].destroy()
                    windows[idx] = null
                    r(true)
                }
            }
        }))
    }
    await Promise.all(processing)
},(1/20)*1000)