async function sobel(dest){
    // adapted from https://github.com/Elements-/sobel-operator
    await new Promise((res,rej)=>{
        const png = new pnge({filterType:-1})
    var xderivatives = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
      ];
      
      var yderivatives = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
      ];
      
      function getIndex(x,y){return (png.width * y + x) << 2}
      
      function getBump(x, y) {
        var xbump = 0;
        var ybump = 0;
        for(var xOffset = -1; xOffset <= 1; xOffset++) {
          for(var yOffset = -1; yOffset <= 1; yOffset++) {
            var idx = getIndex(x + xOffset, y + yOffset);
            var colorWeights = 0;
            for(var color = 0; color <=2; color++) {
              if(png.data[idx+color]) {
                colorWeights += png.data[idx+color]
              } else {
                return 0;
              }
            }
            var greyscale = Math.floor(colorWeights / 3);
            xbump += greyscale * xderivatives[yOffset+1][xOffset+1];
            ybump += greyscale * yderivatives[yOffset+1][xOffset+1];
          }
        }
        var bump = Math.floor(Math.sqrt(Math.pow(xbump, 2) + Math.pow(ybump, 2)) / 3);
        return bump;
      }
      fs.createReadStream(dest).pipe(png).on('parsed',()=>{
          var newData = new Buffer(png.width*png.height*4);
          const test = []
          for(var y = 0; y < png.height; y ++) {
            for(var x = 0; x < png.width; x ++) {
              var index = getIndex(x,y);
              var bump = getBump(x, y);
              for(var color = 0; color <= 2; color++) {
                newData[index+color] = bump < 127 ? 0 : 255;
                test.push(bump)
              }
              newData[index+3] = 255;
            }
          }
          png.data = newData
          png.pack().pipe(fs.createWriteStream(dest)).on('finish',res);
      })
    })   
}