// Create a LifxLan object
const Lifx  = require('./node-lifx-lan/lib/lifx-lan');

(async () => {
  async function sleep(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms) })
  }

  let colors = {
    "white": "#FFFFFF",
    "black": "#000000",
    "red": "#FF0000",
    "orange": "#ff7F00",
    "yellow": "#FFF700",
    "green": "#00FF00",
    "blue": "#0000FF",
    "purple": "#FF00FF"
  }
  
  let bw_frames = [
    [
      ["red", "orange", "yellow", "green"],
      ["orange", "yellow", "green", "blue"],
      ["yellow", "green", "blue", "purple"]
    ],  
    [
      ["purple", "red", "orange", "yellow"],
      ["red", "orange", "yellow", "green"],
      ["orange", "yellow", "green", "blue"]
    ],
    [
      ["blue", "purple", "red", "orange"],
      ["purple", "red", "orange", "yellow"],
      ["red", "orange", "yellow", "green"]
    ],  
    [
      ["green", "blue", "purple", "red"],
      ["blue", "purple", "red", "orange"],
      ["purple", "red", "orange", "yellow"]
    ], 
    [
      ["yellow", "green", "blue", "purple"],
      ["green", "blue", "purple", "red"],
      ["blue", "purple", "red", "orange"]
    ],
    [
      ["orange", "yellow", "green", "blue"],
      ["yellow", "green", "blue", "purple"],
      ["green", "blue", "purple", "red"]
    ]
  ]

  let frames = []

  for (let i = 0; i < bw_frames.length; i++) {
    frames.push([])
    for (let r = 0; r < bw_frames[0].length; r++) {
      for (let c = 0; c < bw_frames[0][0].length; c++) {

        let hex = (colors[bw_frames[i][r][c]] ? colors[bw_frames[i][r][c]] : bw_frames[i][r][c]).substring(1)

        let pixel = {
          red: parseInt("0x"+hex.substring(0,2))/parseInt("0xFF"),
          green: parseInt("0x"+hex.substring(2,4))/parseInt("0xFF"),
          blue: parseInt("0x"+hex.substring(4,6))/parseInt("0xFF"),
          brightness: bw_frames[i][r][c].length > 7 ? parseInt("0x"+hex.substring(6,8))/parseInt("0xFF")*100 : 100,
        }

        if (r % 2 == 0) {
          frames[frames.length-1].push(pixel)
        } 
        else {
          frames[frames.length-1].splice(r*bw_frames[0][0].length, 0, pixel)
        }
      }
    }
  }

  const device_list = await Lifx.discover();

  while (true) {
    for (const pixels of frames) {
      for (let i = 0; i < pixels.length; i++) {

        let dev = device_list[0];
        
        const start = new Date();
        await dev.multiZoneSetColorZones({
          start    : i*3,
          end      : (i+1)*3,
          color    : {
            ...pixels[i],
            kelvin: 4000
          },
          duration : 200,
          apply    : 1
        });
      }
      await sleep(1000)
    }
  }

})();