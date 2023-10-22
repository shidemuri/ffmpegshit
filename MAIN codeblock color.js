const PIXELINCREMENT = 1



const ffmpeg = require('fluent-ffmpeg')
const PNG = require('pngjs').PNG;
const fs = require('fs')
const path = require('path')
const emojis = [
    [0,0,0],
    [170,0,0],
    [0,170,0],
    [255,170,0],
    [0,0,170],
    [170,0,170],
    [0,170,170],
    [170,170,170],
    [85,85,85],
    [255,85,85],
    [85,255,85],
    [255,255,85],
    [85,85,255],
    [255,85,255],
    [85,255,255],
    [255,255,255]
]

function closest(r,g,b){
    const color_diffs = []
    for(const emoji in emojis){
        const c = emojis[emoji]
        const color_diff = Math.sqrt((r-c[0])**2+(g-c[1])**2+(b-c[2])**2)
        color_diffs.push(color_diff,emoji)
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
const ff = new ffmpeg(path.resolve(__dirname,`./input.mp4`))
ff.noAudio()
ff.size('12x6')//ff.size('90x45')//
ff.fps(1)
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
                for (let y = 0; y < this.height; y=y+2) {
                    for (let x = 0; x < this.width; x++) {
                        let idx = (this.width * y + x) << 2; // (black - white / 0 - 255)(directly taken from the docs lmao)
                        let idx2 = (this.width * (y+1) + x) << 2;
                        let top = closest(this.data[idx],this.data[idx+1],this.data[idx+2])
                        let bottom = closest(this.data[idx2],this.data[idx2+1],this.data[idx2+2])
                        bottom = isNaN(bottom) ? 0 : bottom
                        thing += String.fromCharCode((Number(top) << 4) + Number(bottom) + 32)
                    }
                    thing += '|'
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