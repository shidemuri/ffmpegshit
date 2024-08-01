//baseado em aporto/rabiscoscopio








//fps do video => duração A
//fps do video no audio aqui => duração A mais devagar (faz o LLLLLLLLLLLLLLLLLLLL)
let duration = 0.035391//0.036221 
let sampleRate = 44100




//duration = duration*2



const fs = require('fs');
const wave = require('wavefile').WaveFile

let porra = fs.readFileSync('./SVGAAAA.txt')+``;
porra = porra.split('\n').map(e=>e.match(/.{4}/g).map(idk=>idk.split('').map(char=>char.charCodeAt(0)-32)))

let axisx = []
let axisy = []

function deixarLegal(points){ //[...[x1,y1,x2,y2]] => [...[x1,y2],[x2,y2],[x22,y22]]
    const limpo = [];
    for(const a of points){
        limpo.push([a[0],a[1]],[a[2],a[3]])
    }
    return limpo
}

function breakaxis(){
    axisx = []
    axisy = []
    const psize = points.length
    
    let totalx = 0; //soma de todos os X da imagem
    for(let i = 0; i < psize; i++){
        let delta = 0;
        const i2 = i+1 < psize ? i+1 : 0
        if(points[i][0] > points[i2][0]) {
            delta = points[i][0] - points[i2][0]
        } else {
            delta = points[i2][0] - points[i][0]
        }
        totalx += delta
    }
    let times = [0] //todos os X convertidos em tempo real
    for(let i = 0; i < psize; i++){ //pq tem que ter a porra do totalx ja calculado xddd
        let delta = 0;
        const i2 = i+1 < psize ? i+1 : 0
        if(points[i][0] > points[i2][0]) {
            delta = points[i][0] - points[i2][0]
        } else {
            delta = points[i2][0] - points[i][0] 
        }
        const time = (delta/totalx) * duration + times[i]
        times.push(time)
    }
    const nofpoints = sampleRate * duration
    let idx = 0 
    let timeStep = 1/sampleRate
    let time=0, grad=0
    let x1 = points[idx][0], x2 = points[idx+1][0], y1 = points[idx][1], y2 = points[idx+1][1]
    let lim_inf = times[idx]
    let lim_sup = times[idx+1]
    let x,y
    const k = times.length
    
    for(let i = 0; i < nofpoints; i++) { 
        grad = Math.abs(lim_sup-lim_inf) < 0.00001 ? 0 : (time - lim_inf) / (lim_sup - lim_inf) //tanto de interpolação
        
        let delta = y2-y1
        y = Math.abs(delta) > 0.00001 && points[Math.max(0,idx-1)][1] == y1 ? y1 + grad * delta : y2
        
        delta = x2-x1
        x = Math.abs(delta) > 0.00001 && points[Math.max(0,idx-1)][0] == x1 ? x1 + grad * delta : x2
        
        axisx.push(x)
        axisy.push(y)
        
        time = time + timeStep
        
        if(time > lim_sup){
            idx++
            if(idx >= psize){
                if(i < nofpoints-10) console.log('Ops! Deu pau na interpolacao!')
                break;
            }
            if(idx+1==points.length) break;
            x1 = points[idx][0]
            x2 = points[idx+1][0]
            y1 = points[idx][1]
            y2 = points[idx+1][1]
        
            lim_inf = times[idx]
            lim_sup = times[idx+1]
        }
    }
}

function normalize(){
    /*
    let minx=10000000,miny=10000000
    let maxx=-10000000,maxy=-10000000
    
    for(let i = 0; i < points.length; i++){
        minx = points[i][0] < minx ? points[i][0] : minx
        miny = points[i][1] < minx ? points[i][1] : miny
        maxx = points[i][0] > minx ? points[i][0] : maxx
        maxy = points[i][1] > minx ? points[i][1] : maxy
    }*/
    let minx = 120, miny = 90
    let maxx = -120,maxy =-90

    const w=maxx-minx, h=maxy-miny

    for(let i=0; i < points.length; i++){
        const x = (points[i][0] - minx) * 80 / w - 50 + 10
        const y = (points[i][1] - miny) * 80 / h - 50 + 10
        points[i][0] = x-(maxx/2)
        points[i][1] = y-(maxy)
    }
}

let framesx = [], framesy = []

for(const frame in porra){
    axisx = []
    axisy = []
    points = deixarLegal(porra[frame])
    normalize()
    breakaxis()
    console.log(`${frame}/${porra.length-1}`, framesx.length, framesy.length, axisx.length, axisy.length)
    framesx.push(axisx)
    framesy.push(axisy)
    /*if(framesx.length > 100){
        fs.appendFileSync('l.pcm',Buffer.from(framesx.flat().map(vx=>vx/100*32767)))
        framesx = []
    }
    if(framesy.length > 100){
        fs.appendFileSync('r.pcm',Buffer.from(framesy.flat().map(vy=>-(vy/100*32767))))
        framesy = []
    }*/
}
/*fs.appendFileSync('l.pcm',Buffer.from(framesx.flat().map(vx=>vx/100*32767)))
framesx = []
fs.appendFileSync('r.pcm',Buffer.from(framesy.flat().map(vy=>-(vy/100*32767))))
framesy = []*/

console.log('created raw pcm, rendering as wav')

let wav = new wave();
wav.fromScratch(2,sampleRate,'16',[
    framesx.flat().map(vx=>(-(vx/100*32767))),
    framesy.flat().map(vy=>(vy/100*32767))
])
console.log('writting file')
fs.writeFileSync('waveout.wav',wav.toBuffer())
console.log('file written')