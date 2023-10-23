const ffmpeg = require('fluent-ffmpeg')
const ff = ffmpeg('input.mp4')
ff.frames(1)