const fs = require('fs')
const f = (fs.readFileSync('SVGAAAA.txt')+``).split('\n').map(e=>{e=e.split('|');e.pop();return e.join('|')})
fs.writeFileSync('owo.txt',JSON.stringify(f))

Bun