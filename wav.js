const fs = require('fs');
const wav = require('wav');
const file = fs.createReadStream('input.wav');
const reader = new wav.Reader();

const speaker = require('speaker')

// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function (format) {
    reader.pipe(fs.createWriteStream('z.txt'))
});

// pipe the WAVE file to the Reader instance
//file.pipe(reader);

fs.createReadStream('z.txt').pipe(new speaker({bitDepth:16,sampleRate:44100}))