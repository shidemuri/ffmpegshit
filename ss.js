const ss = require('screenshot-desktop')
const sharp = require('sharp')
const png = require('pngjs').PNG

const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 8080
});
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

function closest(r,g,b){ //quirky anime boy#5506
    const color_diffs = []
    for(const emoji of emojis){
        const c = emoji[1]
        const color_diff = Math.sqrt((r-c[0])**2+(g-c[1])**2+(b-c[2])**2)
        color_diffs.push(color_diff,emoji[0])
    }
    return color_diffs[(color_diffs.indexOf(Math.min(...color_diffs.filter(i=>typeof i=='number')))+1)]
}

const WIDTH = 68//85
const HEIGHT = 38//45



let sockets = [];
server.on('connection', function(socket) {
    console.log(socket.url,socket.protocol)
    sockets.push(socket);

    socket.on('message',m=>{
        if(m == 'next'){
            ss({format:'png'}).then(img=>{
                sharp(img).resize({width:WIDTH ,height:HEIGHT, fit:sharp.fit.contain}).pipe(new png()).on('parsed',data=>{
                    const frame = [...data].filter((_,i)=>(i+1)%4)
                    console.log(frame.length/3)
                    let i = 0;
                    let thing = ''
                    while(i<frame.length){
                        if(i > 0 && (i/3)%WIDTH==0) thing += '|'
                        thing += closest(frame[i],frame[i+1],frame[i+2])
                        i = i + 3
                    }
                    console.log(thing.replace('|','\n').length)
                    socket.send(thing)
                })    
            })
        }
    })

    socket.on('close', function() {
        console.log(socket.protocol + ' exit')
        sockets = sockets.filter(s => s !== socket);
    });
});
