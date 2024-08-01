const webhook = "https://discord.com/api/webhooks/1264899099472298139/hF2us0z7Bs73F0VIZ10CwBilDCo73RBIM-qbriSLCMjyMvOINOiscNu7mUZAyHTIv6eb"

const fs = require("fs");
const axios = require("axios").default;
const video = (fs.readFileSync("videodatae.txt")+``).split('\n').map(e=>e.replace(/\|/g,"\n"))

let i = -1
setInterval(()=>{
    i = i == video.length ? -1 : i+1
    console.log(axios.post(webhook,{content:`@everyone yo check this shit out \`\`\`${video[i]}\`\`\``}));
    console.log(video[i])
},2000)