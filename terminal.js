const file = (require('fs').readFileSync('videodatae.txt')+``).split('\n')
let i = -1
setInterval(function(){
    console.clear()
    i++
    if(!file[i]) clearInterval(this)
    console.log(file[i].split('|').join('\n'))
},1/20*1000)