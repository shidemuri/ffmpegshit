var text = "vugnaes sreo "
const repeattext = 15
const maxheight = 20
const speed = 15   //lower = faster

const positions = []

for(const c in text.repeat(repeattext+1)) positions[c] = 1
let i = 1
let i2 = 0
let newtext = []
setInterval(()=>{
    i2 = -1
    for(const k of Object.keys(positions)) {
        positions[k] = Math.floor(Math.sin((i+i2++)/speed)*maxheight)+maxheight
    }
    i++
    for(let i3 = 0; i3 < maxheight*2; i3++) {
        let layer = ""
        for(const height in positions) {
            layer += positions[height] == i3 ? text.repeat(repeattext+1)[height] : ' '
        }
        newtext.push(layer)
    }
    console.clear()
    console.log(newtext.join('\n'))
    newtext = []
},(1/20)*1000)