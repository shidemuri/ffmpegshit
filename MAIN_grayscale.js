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

const tonescale = `口口口爹爹爹爹爹爹爹`.split('')
const possibilities = [256,230,220,200,180,160,140,130,120,100].reverse()

let basestr = ''


const ss = strgen()
console.log('Preparing video...')
const ff = new ffmpeg(path.resolve(__dirname,`./input.mp4`))
ff.noAudio()
ff.size('12x5')
ff.fps(20)
//ff.format('mp4')
ff.addOptions(['-crf 18','-hide_banner'])
ff.save(path.resolve(__dirname,`./ohlord/temp_${ss}_%d.png`))
ff.on('end', async()=>{
    console.log('Converting video frames...')
    const f = (await fs.promises.readdir(path.join(__dirname,'ohlord'))).filter(f=>{
        return f.endsWith('.png') && f.startsWith(`temp_${ss}`)
    })
    for(let i = 0;i<f.length;i++){
        let filez = path.resolve(__dirname,'ohlord/temp_'+ss+'_'+(i+1)+'.png')
        await new Promise((res,err)=>{
            let thing = ""
            fs.createReadStream(filez)
            .pipe(new PNG())
            .on('parsed', function() {
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        let idx = (this.width * y + x) << 2; // (black - white / 0 - 255)(directly taken from the docs lmao)
                        for(const idx2 in possibilities) {
                            if(this.data[idx] < possibilities[idx2]) {
                                thing += tonescale[idx2]
                                break
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