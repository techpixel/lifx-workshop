// Create a LifxLan object
const Lifx  = require('./node-lifx-lan/lib/lifx-lan');

function setLights(pixels, index) {
  Lifx.discover().then((device_list) => {
    if (!device_list) {
      console.log("undefined")
    }
    let dev = device_list[0];
    console.log(device_list)
    if (!dev) {
      console.log("undefined")
    }
    console.log(pixels[index])
    console.log(index*3, (index+1)*3)
    return dev.multiZoneSetColorZones({
      start    : index*3,
      end      : (index+1)*3,
      color    : pixels[index],
      duration : 5000,
      apply    : 1
    });
  }).then((res) => {
    if (pixels.length > index+1) {
      setLights(pixels, index+1)
    }
  }).catch((error) => {
    console.error(error);
  });
}

let pixels = [
  {
    red: 1,
    green: 1,
    blue: 1,
    brightness: 100,
    kelvin: 4000
  },
  {
    red: 0,
    green: 1,
    blue: 1,
    brightness: 100,
    kelvin: 4000
  },
  {
    red: 1,
    green: 0,
    blue: 1,
    brightness: 100,
    kelvin: 4000
  },
  {
    red: 1,
    green: 1,
    blue: 0,
    brightness: 100,
    kelvin: 4000
  }
]

setLights(pixels, 0)
