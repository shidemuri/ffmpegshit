const DOCANNY = false //only use when image isnt black and white




const ffmpeg = require('fluent-ffmpeg')

const image = require('image-js').Image
const canny = require('canny-edge-detector')
const path = require('path')
const potrace = require('potrace')
const svgo = require('svgo')
const svgparse = require('svg-parser')
const pathdata = require('svg-path-properties')
const fs = require('fs')

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

const ss = strgen()
console.log('Preparing video...')
const ff = new ffmpeg(path.resolve(__dirname,`./input.mp4`))
ff.noAudio()
ff.size('480x360')//ff.size('90x45')//
ff.fps(20)
//ff.format('mp4')
ff.addOptions(['-crf 18','-hide_banner'])
ff.save(path.resolve(__dirname,`./ohlord/temp_${ss}_%d.png`))
ff.on('end', async()=>{
    console.log('Converting video frames...')
    const f = (await fs.promises.readdir(path.join(__dirname,'ohlord'))).filter(f=>{
        return f.endsWith('.png') && f.startsWith(`temp_${ss}`)
    })
    let test = ''
    let test2 = []
    for(let i = 0;i<f.length;i++){
        let filez = path.resolve(__dirname,'ohlord/temp_'+ss+'_'+(i+1)+'.png')
        if(DOCANNY) await canny((await image.load(filez)).grey()).save(filez)
        console.clear()
        console.log(i+1+'/'+f.length)
        /*test.push*/await new Promise((res,rej)=>{
            potrace.trace(filez,async (err,svg)=>{
                if(err) rej(err)
                let opt = svgo.optimize(svg).data/*.split('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="90"><path fill-rule="evenodd" d=')[0].split('"/></svg>')[0].split(' ')
                
                for(const i in opt.length) {
                    if Number()
                }*/
                const e = new pathdata.svgPathProperties(svgparse.parse(opt).children[0].children[0]?.properties?.d || {getParts:()=>[{start:{}}],getTotalLength:()=>0});
                test = ''
                opt = opt + `\n<!--\n${JSON.stringify((()=>{const f = {length:e.getTotalLength(),parts:e.getParts()}; return f})(),null,4)}\n-->`
                for(const o of e.getParts()) {
                    test += Object.values(o.start).map(e=>Math.trunc(e*100)/100).join(',')+'@'+Object.values(o.end).map(e=>Math.trunc(e*100)/100).join(',')+'|'
                }
                test2.push(test)
                fs.writeFileSync(path.resolve(__dirname,'svgout/temp_'+ss+'_'+(i+1)+'.svg'),opt)
                res(true)
            })
        })
    }
    fs.writeFileSync(path.resolve(__dirname,'SVGAAAA.txt'),test2.join('\n'))
    //if(err) return console.log('uploader error: ' + err) //{files:[{attachment:path.resolve(__dirname,`./ohlord/temp_${ss}.zip`),name:'generatedvideo.zip'}]}
    for(const file of f){
        fs.unlink(path.resolve(__dirname,`./ohlord/${file}`),()=>{})
    }
});