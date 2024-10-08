const ffmpeg = require('fluent-ffmpeg')
const PNG = require('pngjs').PNG;
const fs = require('fs')
const path = require('path')

function strgen(){
    let str = ''
    const chars = 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789'
    for(let i = 0;i<10;i++) str += chars[Math.floor(Math.random()*chars.length)]
    return str
}

/*const blocks = {
    "▀":[1,0],
    "▄":[0,1],
    "█":[1,1],
    " ":[0,0]
}*/

const blocks = require('./braille.json')
/*delete blocks["⠀"]
blocks["░"] =[[0,0],[0,0],[0,0]]*/

/*const tonescale = `0000011111`.split('')
const possibilities = [256,230,220,200,180,160,140,130,120,100].reverse()*/

let basestr = ''
function eq(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

function getGrayscale(data,idx){
    return Number(!((data[idx]+data[idx+1]+data[idx+2])/3<170))
}

const ss = strgen()
console.log('Preparing video...')
const ff = new ffmpeg(path.resolve(__dirname,`./input.mp4`))
ff.noAudio()
ff.size('92x42')
ff.fps(0.5)
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
                for (let y = 0; y < this.height; y=y+3) {
                    for (let x = 0; x < this.width; x=x+2) {
                        let idx = (this.width * y + x) << 2; // (black - white / 0 - 255)(directly taken from the docs lmao)
                        let idx2 = (this.width * (y+1) + x) << 2;
                        const bleeh = [
                            getGrayscale(this.data,(this.width * y + x) << 2),getGrayscale(this.data,this.width * y + (x+1) << 2),
                            getGrayscale(this.data,(this.width * (y+1) + x) << 2),getGrayscale(this.data,this.width * (y+1) + (x+1) << 2),
                            getGrayscale(this.data,(this.width * (y+2) + x) << 2),getGrayscale(this.data,this.width * (y+2) + (x+1) << 2),
                        ]
                        for(const [k,v] of Object.entries(blocks)){
                            if(eq([...v[0],...v[1],...v[2]],bleeh)) {
                                thing += k
                                break;
                            }
                        }
                    }
                    thing += '|'
                }
                basestr += thing + '\n'
                res()
            })
            .on('error',e=>err(e))
        })
    }
    fs.writeFileSync(path.resolve(__dirname,`./videodatae.txt`),basestr)
    //if(err) return console.log('uploader error: ' + err) //{files:[{attachment:path.resolve(__dirname,`./ohlord/temp_${ss}.zip`),name:'generatedvideo.zip'}]}
    console.log('extract the text file to the exploit\'s workspace folder before executing the script')
    fs.unlink(path.resolve(__dirname,`./ohlord/temp_${ss}.zip`),()=>{})
    for(const file of f){
        fs.unlink(path.resolve(__dirname,`./ohlord/${file}`),()=>{})
    }
});
