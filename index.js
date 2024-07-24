// Create a LifxLan object
const Lifx  = require('./node-lifx-lan/lib/lifx-lan');

function loc(loc) {
  return {
    start    : loc*3,
    end      : ((loc+1)*3)-1,
  }
}

(async () => {
    const dev = (await Lifx.discover())[0];

    await dev.turnOn();

    await dev.setColor({
        color: {
            red: 0,
            green: 0,
            blue: 0,
            brightness: 0
        },
        duration: 0
    });

    dev.multiZoneSetColorZones({
        ...loc(5),
        color    : {
        hue        : 0.35,
        saturation : 1.0,
        brightness : 1.0,
        kelvin     : 3500
        },
        duration : 0,
        apply    : 1
    })
})()
    .then(() => console.log('Done!'))
    .catch(console.error)