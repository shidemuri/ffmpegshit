const PIXELINCREMENT = 1



const ffmpeg = require('fluent-ffmpeg')
const PNG = require('pngjs').PNG;
const fs = require('fs')
const path = require('path')
const n = 
`0 6f6b65 rd
1 565046 rl
2 533429 outline
3 feeed4 skin
4 f4eee2 blue
5 d2c9c2 rll
6 d5be7a lion
7 c2a55b liond
8 785937 lionh
9 8f6e4c lionh2
a 7eac58 green 
b b24448 red
c f8f2ea goat
d d1cbc0 goat2
e b97130 tabl/bedt
f 8d4121 wall stripe front / bed side 
g e0984a floor
h ebb57d wall side
i ca9757 wall front 
j f1e2d5 wall top side
k e1c9bc wall top front 
l d29e79 wall stripe side
m dfcfa1 nyoro1
n f1e6c3 nyoro2
o f1b7ad pignose
p ebc1b2 pig2
q daa39e pig3
r 000000 black`.split('\n')

const emojis = []

for(const a of n){
    const the = a.split(' ')
    const shit = the[1].match(/.{2}/g).map(e=>parseInt(e,16))
    emojis.push([the[0],shit])
}


function closest(r,g,b){
    const color_diffs = []
    for(const emoji of emojis){
        const c = emoji[1]
        const color_diff = Math.sqrt((r-c[0])**2+(g-c[1])**2+(b-c[2])**2)
        color_diffs.push(color_diff,emoji[0])
    }
    return color_diffs[(color_diffs.indexOf(Math.min(...color_diffs.filter(i=>typeof i=='number')))+1)]
}
function strgen(){
    let str = ''
    const chars = 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789'
    for(let i = 0;i<10;i++) str += chars[Math.floor(Math.random()*chars.length)]
    return str
}

const ss = strgen()
console.log('Preparing video...')
const ff = new ffmpeg(path.resolve(__dirname,`./h3.mp4`))
ff.noAudio()
ff.size('224x96')
ff.fps(20)
//ff.format('mp4')
ff.addOptions(['-crf 18','-hide_banner'])
ff.save(path.resolve(__dirname,`./ohlord/temp_${ss}_%d.png`))
ff.on('end', async()=>{
    console.log('Converting video frames...')
    const f = (await fs.promises.readdir(path.join(__dirname,'ohlord'))).filter(f=>{
        return f.endsWith('.png') && f.startsWith(`temp_${ss}`)
    })
    const test = []
    for(let i = 0;i<f.length;i++){
        let filez = path.resolve(__dirname,'ohlord/temp_'+ss+'_'+(i+1)+'.png')
        await new Promise((res,err)=>{
            let thing = ""
            fs.createReadStream(filez)
            .pipe(new PNG())
            .on('parsed', function() {
                const frame = [...this.data].filter((_,i)=>(i+1)%4)
                let i = 0;
                while(i<frame.length){
                    if(i > 0 && (i/3)%this.width==0) thing += '|'
                    thing += closest(frame[i],frame[i+1],frame[i+2])
                    i = i + (3 * PIXELINCREMENT)
                }
                test.push(thing)
                res()
            })
            .on('error',e=>err(e))
        })
    }
    fs.writeFileSync(path.resolve(__dirname,`./videodatae.txt`),test.join('\n'))
    //if(err) return console.log('uploader error: ' + err) //{files:[{attachment:path.resolve(__dirname,`./ohlord/temp_${ss}.zip`),name:'generatedvideo.zip'}]}
    console.log('extract the text file to the exploit\'s workspace folder before executing the script')
    fs.unlink(path.resolve(__dirname,`./ohlord/temp_${ss}.zip`),()=>{})
    for(const file of f){
        fs.unlink(path.resolve(__dirname,`./ohlord/${file}`),()=>{})
    }
});