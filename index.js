// Create a LifxLan object
const Lifx  = require('./node-lifx-lan/lib/lifx-lan');

Lifx.discover().then((device_list) => {
  let dev = device_list[0];
  return dev.multiZoneSetColorZones({
    start    : 64,
    end      : 127,
    color    : {
      red: 100,
      green: 200,
      blue: 200,
      brightness: 100,
      kelvin: 3000
    },
    duration : 0,
    apply    : 1
  });
}).then((res) => {
  console.log('Done!');
}).catch((error) => {
  console.error(error);
});