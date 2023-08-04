const fs = require('fs')

const TOSEND = ['videodatae.txt','input.shitballspiano']

for(const e of TOSEND) fs.copyFileSync(`${__dirname}\\${e}`,'C:\\Users\\padero\\AppData\\Local\\Packages\\ROBLOXCORPORATION.ROBLOX_55nm5eh3cm0pr\\AC\\workspace\\'+e)
console.log('done')