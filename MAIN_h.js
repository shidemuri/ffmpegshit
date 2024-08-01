const PIXELINCREMENT = 1



const ffmpeg = require('fluent-ffmpeg')
const PNG = require('pngjs').PNG;
const fs = require('fs')
const path = require('path')
const emojis = [    
    ['😃', [255, 204, 77]],
    ['😡', [190,77,95]], //  *
    ['🙊', [178,108,50]],//  *
    //['✅', [119, 178, 85]],
    //['❤', [187, 26, 52]],
    ['🔁', [138,165,236]], //*
    ['❇', [120, 177, 89]], // verde    
    //['📒', [253, 203, 88]],
    ['☸', [155,114,183]], // * treco roxo
    ['⬛', [0, 0, 0]],    // *
    /*['🌕', [204, 214, 221]],
    ['🐷', [244, 171, 186]],
    ['📀', [255, 217, 131]],*/
    ['📙', [211,187,121]], // *
    //['🍪', [217, 158, 130]],
    ['📔', [253,236,212]], // *
    /*['🍐', [166, 211, 136]],
    ['🐙', [146, 102, 204]],
    ['👕', [59, 136, 195]],
    ['👛', [234, 89, 110]],
    ['💭', [189, 221, 244]],
    ['🍓', [204, 62, 83]],
    ['💰', [253, 216, 136]],*/
    ['🌳', [79,133,104]], //  *
    ['🎀', [221, 46, 68]],
    ['🐘', [108,107,98]],//   *
    ['💼', [81,49,44]], //    *
    ['🌚', [86,77,69]], //    *
    ['⬜', [255, 255, 255]]]//*
    /*[    
    ['🎁', [255, 204, 77]],
    ['💟', [218, 47, 71]],
    ['🙊', [191, 105, 82]],
    ['✅', [119, 178, 85]],
    ['🛑', [187, 26, 52]],
    ['🔁', [93, 173, 236]],
    ['❇', [120, 177, 89]],
    ['📒', [253, 203, 88]],
    ['☸', [170, 142, 214]],
    ['◼', [0, 0, 0]],
    ['👑', [204, 214, 221]],
    ['🐽', [244, 171, 186]],
    ['📀', [255, 217, 131]],
    ['🚼', [244, 144, 12]],
    ['📦', [217, 158, 130]],
    ['📔', [255, 136, 108]],
    ['❎', [166, 211, 136]],
    ['🌆', [146, 102, 204]],
    ['👔', [59, 136, 195]],
    ['📕', [234, 89, 110]],
    ['📃', [189, 221, 244]],
    ['📮', [204, 62, 83]],
    ['💰', [253, 216, 136]],
    ['📗', [92, 145, 59]],
    ['🍟', [221, 46, 68]],
    ['🔳', [153, 170, 181]],
    ['💼', [154, 78, 28]],
    ['🌚', [102, 117, 127]],
    ['⬜', [255, 255, 255]]]*/

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
ff.size('68x38')
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