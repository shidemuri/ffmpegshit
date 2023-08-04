var fs = require('fs'),
PNG = require('pngjs').PNG;
const dir = require('path').join(__dirname,'frames')
const emojis = [
    ['😃', [255, 204, 77]],
    ['😡', [218, 47, 71]],
    ['🙊', [191, 105, 82]],
    ['✅', [119, 178, 85]],
    ['❤', [187, 26, 52]],
    ['🟦', [93, 173, 236]],
    ['🟩', [120, 177, 89]],
    ['🟨', [253, 203, 88]],
    ['🟪', [170, 142, 214]],
    ['⬛', [0, 0, 0]],
    ['🌕', [204, 214, 221]],
    ['🐷', [244, 171, 186]],
    ['📀', [255, 217, 131]],
    ['🟧', [244, 144, 12]],
    ['🍪', [217, 158, 130]],
    ['🍑', [255, 136, 108]],
    ['🍐', [166, 211, 136]],
    ['🐙', [146, 102, 204]],
    ['👕', [59, 136, 195]],
    ['👛', [234, 89, 110]],
    ['💭', [189, 221, 244]],
    ['🍓', [204, 62, 83]],
    ['💰', [253, 216, 136]],
    ['🌳', [92, 145, 59]],
    ['🎀', [221, 46, 68]],
    ['🐘', [153, 170, 181]],
    ['💼', [154, 78, 28]],
    ['🌚', [102, 117, 127]],
    ['⬜', [255, 255, 255]]]

function closest(r,g,b){
    const color_diffs = []
    for(const emoji of emojis){
        const c = emoji[1]
        const color_diff = Math.sqrt((r-c[0])**2+(g-c[1])**2+(b-c[2])**2)
        color_diffs.push(color_diff,emoji[0])
    }
    return color_diffs[(color_diffs.indexOf(Math.min(...color_diffs.filter(i=>typeof i=='number')))+1)]
}
var test = []
;(async()=>{
    const f = await fs.promises.readdir(dir)
    for(let i = 0;i<f.length;i++){
        console.clear()
        console.log('Converting frames into emoji table, please wait... (might take a while)')
        console.log('Current frame: '+Number(i+1)+'/'+f.length)
        /*for(const a of emojis){
            console.log(a[0],a[0].length)
        }*/
        file = 'frames/'+(i+1)+'.png'
        await new Promise((res,err)=>{
            let thing = ""
            fs.createReadStream(file)
            .pipe(new PNG())
            .on('parsed', function() {
                const frame = [...this.data].filter((_,i)=>(i+1)%4)
                let i = 0;
                while(i<frame.length){
                    if(i > 0 && i%this.width==0) thing += '|'
                    thing += closest(frame[i],frame[i+1],frame[i+2])
                    i = i + 3
                }
                test.push(thing)
                res()
            })
            .on('error',e=>err(e))
        })
    }
fs.writeFileSync('videodata.txt',test.join('N'))
console.log('done')
})();