"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor() {
        this.currentRoomId = 0;
        this.hp = 100;
        this.damage = 20;
        this.treasureFound = false;
    }
    get alive() {
        return this.hp > 0;
    }
}
exports.Player = Player;
