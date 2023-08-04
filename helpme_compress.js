var fs = require('fs'),
PNG = require('pngjs').PNG;
const dir = require('path').join(__dirname,'frames')


var basestr = ``
//const tonescale = ` .:-=+*#%@`.split('')
const tonescale = `0000011111`.split('')
const possibilities = [256,230,220,200,180,160,140,130,120,100].reverse()
fs.writeFileSync('videodata.txt','')
let test = []
;(async()=>{
    const f = await fs.promises.readdir(dir)
    for(let i = 0;i<f.length;i++){
        console.clear()
        console.log('Converting frames into a table, please wait... (might take a while)')
        console.log('Current frame: '+(i+1)+'/'+f.length)
        file = 'frames/'+(i+1)+'.png'
        
        let currentammount = 0
        let currentcolor = tonescale[0]

        await new Promise((res,err)=>{ //fiquei meia hora nessa merda
            let thing = ""
            test = []
            fs.createReadStream(file)
            .pipe(new PNG())
            .on('parsed', function() {
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        let idx = (this.width * y + x) << 2; // (black - white / 0 - 255)(directly taken from the docs lmao)
                        for(const val of possibilities){
                            if(this.data[idx]<val) {
                                /*thing += tonescale[possibilities.indexOf(val)]
                                break;*/
                                if(currentcolor == tonescale[possibilities.indexOf(val)]){ //compressão pq tava coisando video em 480*360 e o node tava morrendo toda hr
                                    currentammount++
                                } else {
                                    thing += `${currentammount}_${currentcolor}|`
                                    currentammount = 1
                                    currentcolor = tonescale[possibilities.indexOf(val)]
                                }
                                break;
                            };
                        }
                    }
                }
                basestr += thing + '\n'
                res()
            })

            .on('error',e=>err(e))
        })
    }
  
//require('child_process').spawn('clip').stdin.end(basestr);
//console.log('Coppied to clipboard!')
fs.writeFileSync('videodata.txt',basestr)
})();