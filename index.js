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

  let cycle = ["red", "orange", "yellow", "green", "blue", "purple"];
  
  let frames = [
    [
      ["red", "orange", "yellow", "green"],
      ["orange", "yellow", "green", "blue"],
      ["yellow", "green", "blue", "purple"]
    ] 
  ]

  let frames_linear = linearize(frames)

  let cycle_obj = create_cycle_obj(cycle)

  for (let i = 1; i < cycle.length; i++) {
    frames_linear.push([])
    for (let pixel = 0; pixel < frames_linear[i-1].length; pixel++) {
      frames_linear[i].push(cycle_obj[frames_linear[i-1][pixel]])
    }
  }

  let frames_rgb = []

  for (let frame_index = 0; frame_index < frames_linear.length; frame_index++) {
    frames_rgb.push([])
    for (let pixel_index = 0; pixel_index < frames[0].length; pixel_index++) {

      let hex = (colors[frames_linear[frame_index][pixel_index]] ? colors[frames_linear[frame_index][pixel_index]] : frames_linear[frame_index][pixel_index]).substring(1)

      let pixel = {
        red: parseInt("0x"+hex.substring(0,2))/parseInt("0xFF"),
        green: parseInt("0x"+hex.substring(2,4))/parseInt("0xFF"),
        blue: parseInt("0x"+hex.substring(4,6))/parseInt("0xFF"),
        brightness: frames_linear[frame_index][pixel_index].length > 7 ? parseInt("0x"+hex.substring(6,8))/parseInt("0xFF")*100 : 100,
      }

      frames_rgb[frame_index].push(pixel)
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

function linearize(frames) {

  let frames_linear = []

  for (let i = 0; i < frames.length; i++) {
    frames_linear.push([])
    for (let r = 0; r < frames[0].length; r++) {
      for (let c = 0; c < frames[0][0].length; c++) {

        let pixel = frames[i][r][c]

        if (r % 2 == 0) {
          frames_linear[frames_linear.length-1].push(pixel)
        } 
        else {
          frames_linear[frames_linear.length-1].splice(r*frames[0][0].length, 0, pixel)
        }
      }
    }
  }

  return frames_linear
}

function create_cycle_obj(cycle) {
  let cycle_obj = {}

  cycle_obj[cycle[0]] = cycle[cycle.length-1]

  for (let i = 1; i < cycle.length; i++) {
    cycle_obj[cycle[i]] = cycle[i-1]
  }

  return cycle_obj
}