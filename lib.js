"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Aurora Borealis - Animating epic lights, the boReal way
*/
var lifx_lan_1 = require("./node-lifx-lan/lib/lifx-lan");
var Borealis = /** @class */ (function () {
    function Borealis() {
        this.deviceList = [];
    }
    Borealis.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, lifx_lan_1.default.discover()];
                    case 1:
                        _a.deviceList = _b.sent();
                        this.device = this.deviceList[0];
                        console.log(this.deviceList);
                        return [2 /*return*/];
                }
            });
        });
    };
    Borealis.prototype.on = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.device.turnOn()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Borealis.prototype.off = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.device.turnOff()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Color all bulbs
     * @param color color
     * @param duration Color transition time in milliseconds. The default value is 0.
     */
    Borealis.prototype.colorAll = function (color_1) {
        return __awaiter(this, arguments, void 0, function (color, duration) {
            if (duration === void 0) { duration = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.device.setColor({
                            color: color,
                            duration: duration
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Color and individual bulb
     * @param options An options object, including the location, color, duration, and applciation effect
     */
    Borealis.prototype.colorBulb = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var location = _b.location, color = _b.color, duration = _b.duration, apply = _b.apply;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.device.multiZoneSetColorZones({
                            start: location * 3,
                            end: location * 3 + 3,
                            color: color,
                            duration: duration !== null && duration !== void 0 ? duration : 0,
                            apply: apply !== null && apply !== void 0 ? apply : 1
                        })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * creates a move effect
     * @param speed Time in milliseconds for a complete animation cycle to occur
     * @param duration Time in milliseconds for a complete animation cycle to occur
     * @param direction Towards or Away
     */
    Borealis.prototype.moveEffect = function (speed_1) {
        return __awaiter(this, arguments, void 0, function (speed, duration, direction) {
            if (duration === void 0) { duration = 0; }
            if (direction === void 0) { direction = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.device.multiZoneSetEffect({
                            type: 1,
                            speed: speed,
                            duration: duration,
                            direction: direction
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Borealis.prototype.effectOff = function () {
        return __awaiter(this, arguments, void 0, function (speed, duration) {
            if (speed === void 0) { speed = 0; }
            if (duration === void 0) { duration = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.device.multiZoneSetEffect({
                            type: 0,
                            speed: speed,
                            duration: duration
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Borealis.TOWARDS = 0;
    Borealis.AWAY = 1;
    return Borealis;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var borealis;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    borealis = new Borealis();
                    return [4 /*yield*/, borealis.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, borealis.colorAll({
                            red: 1,
                            green: 1,
                            blue: 1,
                            brightness: 100,
                            kelvin: 5000
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, borealis.colorBulb({
                            location: 1,
                            color: {
                                red: 1,
                                green: 0,
                                blue: 0,
                                brightness: 100,
                                kelvin: 2500
                            },
                            duration: 0
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
