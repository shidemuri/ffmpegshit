const edgedetection = false //only use when image isnt black and white
const floor = true
const bytecompress = true




const ffmpeg = require('fluent-ffmpeg')

const path = require('path')
const potrace = require('potrace')
const svgo = require('svgo')
const svgparse = require('svg-parser')
const pathdata = require('svg-path-properties')
const fs = require('fs')

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);



function strgen(){
    let str = ''
    const chars = 'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789'
    for(let i = 0;i<10;i++) str += chars[Math.floor(Math.random()*chars.length)]
    return str
}

for(const file of fs.readdirSync(path.join(__dirname,'ohlord'))){
    fs.unlink(path.resolve(__dirname,`./ohlord/${file}`),()=>{})
}
for(const file of fs.readdirSync(path.join(__dirname,'svgout'))){
    fs.unlink(path.resolve(__dirname,`./svgout/${file}`),()=>{})
}

fs.writeFileSync(path.resolve(__dirname,'SVGAAAA.txt'),'')

const ss = strgen()
console.log('Preparing video...')
const ff = new ffmpeg(path.resolve(__dirname,`./input.mp4`))
ff.noAudio()
ff.size('127x127')//ff.size('480x360')
ff.fps(20)
//ff.format('mp4')
ff.addOptions(['-crf 18','-hide_banner'])
ff.save(path.resolve(__dirname,`./ohlord/temp_${ss}_%d.png`))
ff.on('end', async()=>{
    //let old = 0
    console.log('Converting video frames...')
    const f = (await fs.promises.readdir(path.join(__dirname,'ohlord'))).filter(f=>f.endsWith('.png') && f.startsWith(`temp_${ss}`))
    let test = ''
    let test2 = []
    if(edgedetection) {
        /*const img = (await image.load(filez)).grey()
        const c = await canny(img,{lowThreshold:250,highThreshold:270,gaussianBlur:1})
        await c.save(filez)*/

        //i couldnt install opencv js
        await exec('python canny.py')
    }
    for(let i = 0;i<f.length;i++){
        let filez = path.resolve(__dirname,'ohlord/temp_'+ss+'_'+(i+1)+'.png')
        console.clear()
        console.log(`Converting SVG path into points array\n${edgedetection ? 'seems like edge detection mode is on. it may take longer to convert.\n' : ''}current/total\n${i+1}/${f.length}`/*\nframes per second: ${((performance.now()-old)).toFixed(2)}`*/)
        //old = performance.now()
        /*test.push*/await new Promise((res,rej)=>{
            potrace.trace(filez,async (err,svg)=>{
                if(err) rej(err)
                let opt = svgo.optimize(svg).data
                const e = new pathdata.svgPathProperties(svgparse.parse(opt).children[0].children[0]?.properties?.d || {getParts:()=>[{start:{}}],getTotalLength:()=>0});
                test = ''
                //opt = opt + `\n<!--\n${JSON.stringify((()=>{const f = {length:e.getTotalLength(),parts:e.getParts()}; return f})(),null,4)}\n-->`
                for(const o of e.getParts()) {
                    test += Object.values(o.start).map(e=>bytecompress ? String.fromCharCode(Math.floor(e)+32) : (floor ? Math.floor(e) : Math.trunc(e*100)/100)).join(bytecompress ? '' : ',')+(bytecompress ? '' : '@')+Object.values(o.end).map(e=>bytecompress ? String.fromCharCode(Math.floor(e)+32) : (floor ? Math.floor(e) : Math.trunc(e*100)/100)).join(bytecompress ? '' : ',')+(bytecompress ? '' : '|')
                }
                if(!bytecompress) {
                    test = test.split('')
                    test.pop()
                    test = test.join('')
                }
                test2.push(test)
                if(test2.length == 100){
                    //clearing out memory
                    fs.appendFileSync(path.resolve(__dirname,'SVGAAAA.txt'),test2.join('\n')+'\n')
                    test2 = []
                }
                //fs.writeFileSync(path.resolve(__dirname,'svgout/temp_'+ss+'_'+(i+1)+'.svg'),opt)
                res(true)
            })
        })
    }
    fs.appendFileSync(path.resolve(__dirname,'SVGAAAA.txt'),test2.join('\n'))
    //if(err) return console.log('uploader error: ' + err) //{files:[{attachment:path.resolve(__dirname,`./ohlord/temp_${ss}.zip`),name:'generatedvideo.zip'}]}
    for(const file of f){
        fs.unlink(path.resolve(__dirname,`./ohlord/${file}`),()=>{})
    }
});