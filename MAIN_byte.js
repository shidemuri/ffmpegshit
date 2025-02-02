const PIXELINCREMENT = 1



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

const ss = strgen()
console.log('Preparing video...')
const ff = new ffmpeg(path.resolve(__dirname,`./input14.mp4`))
ff.noAudio()
ff.size('32x32')//ff.size('90x45')//
ff.fps(10)
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
                    if(i > 0 && (i/3)%this.width==0) thing += ' '
                    thing += String.fromCharCode(frame[i]+255)
                    i++
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