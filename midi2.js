const scales = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
const whole = []
for(let i=1;i<6;i++){
    for(let i2=0;i2<scales.length;i2++){
        whole.push(scales[i2]+i)
    }
}
whole.push('A6')
console.log(whole.length)