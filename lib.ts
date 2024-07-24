/*
Aurora Borealis - Animating epic lights, the boReal way
*/
import Lifx from './node-lifx-lan/lib/lifx-lan';

console.log('=----=')
console.log(Lifx);

type Color = {
    red: number,
    green: number,
    blue: number,
    brightness: number, // 0-100 
    kelvin: number, // 2500-9500
};

class Borealis {
    deviceList: any[];
    device: any | undefined;

    static TOWARDS = 0;
    static AWAY = 1;

    constructor() {
        this.deviceList = [];
    }

    public async init() {
        this.deviceList = await Lifx.discover();
        this.device = this.deviceList[0];

        console.log(this.deviceList)
    }

    public async on() {
        await this.device.turnOn();
    }
 
    public async off() {
        await this.device.turnOff();
    }
    
    /**
     * Color all bulbs
     * @param color color
     * @param duration Color transition time in milliseconds. The default value is 0.
     */
    public async colorAll(color: Color, duration: number = 0) {
        await this.device.setColor({
            color,
            duration
        });
    }

    /**
     * Color and individual bulb
     * @param options An options object, including the location, color, duration, and applciation effect
     */
    public async colorBulb({
        location,
        color,
        duration,
        apply
    }: {
        location: number,
        color: Color,
        duration: number | undefined,
        apply?: 0 | 1 | 2
    }) {
        await this.device.multiZoneSetColorZones({
            start: location*3,
            end: location*3+3,
            color,
            duration: duration ?? 0,
            apply: apply ?? 1
        })
    }
    
    /**
     * creates a move effect
     * @param speed Time in milliseconds for a complete animation cycle to occur
     * @param duration Time in milliseconds for a complete animation cycle to occur
     * @param direction Towards or Away
     */
    public async moveEffect(
        speed: number,
        duration: number = 0,
        direction: typeof Borealis.TOWARDS | typeof Borealis.AWAY = 0
    ) {
        await this.device.multiZoneSetEffect({
            type: 1,
            speed,
            duration,
            direction
        })
    }

    public async effectOff(speed: number = 0, duration: number = 0) {
        await this.device.multiZoneSetEffect({
            type: 0,
            speed,
            duration
        })
    }
}

async function main() {
    const borealis = new Borealis();
    await borealis.init();

    await borealis.colorAll({
        red: 1,
        green: 1,
        blue: 1,
        brightness: 100,
        kelvin: 5000
    });

    await borealis.colorBulb({
        location: 1,
        color: {
            red: 1,
            green: 0,
            blue: 0,
            brightness: 100,
            kelvin: 2500
        },
        duration: 0
    });
}

main()