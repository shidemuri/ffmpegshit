//não funciona
//parabéns mihoyo
//conseguiram






const robot = require('@nut-tree/nut-js').keyboard
robot.config.autoDelayMs = 0
const uwu = JSON.parse(require('fs').readFileSync('input.shitballspiano'))
delete uwu['_']

const wait = piss => new Promise(r=>setTimeout(r,piss))

const notes = 'zxcvbnmasdfghjqwertyu'.split('')

const IGNORE = [1]
for(const v of IGNORE) delete uwu['track'+v]
for(const track in uwu){
    (new Promise(async res=>{
        for(const i in uwu[track][0]) { // v[0]
            if(i < uwu[track][0].length) await wait((uwu[track][0][i][0]-(i-1>0?uwu[track][0][i-1][0]:0))*1000)
            for(const note of uwu[track][0][i][1]) {
                if(note > -1 && note < 21) robot.type(notes[note])
            }
        }
    }))
}