"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dungeon = void 0;
// src/dungeon.ts
const room_1 = require("./room");
const utils_1 = require("./utils");
class Dungeon {
    static createRandomRooms(numberOfRooms) {
        const rooms = [new room_1.EmptyRoom(0)];
        const distributedRoomTypes = [
            ...Array(4).fill("empty"),
            ...Array(3).fill("spikes"),
            ...Array(1).fill("heal"),
            ...Array(1).fill("enemy"),
            ...Array(1).fill("sword"),
        ];
        for (let i = 1; i < numberOfRooms; i++) {
            const roomType = utils_1.Utils.getRandomItem(distributedRoomTypes);
            switch (roomType) {
                case "empty":
                    rooms.push(new room_1.EmptyRoom(i));
                    break;
                case "spikes":
                    rooms.push(new room_1.SpikesRoom(i));
                    break;
                case "heal":
                    rooms.push(new room_1.HealingPotionRoom(i));
                    break;
                case "enemy":
                    rooms.push(new room_1.EnemyRoom(i));
                    break;
                case "sword":
                    rooms.push(new room_1.SwordRoom(i));
                    break;
            }
        }
        const treasureRoomId = utils_1.Utils.getRandomNumber(1, rooms.length - 1);
        rooms[treasureRoomId] = new room_1.TreasureRoom(treasureRoomId);
        return rooms;
    }
    static connectRooms(rooms) {
        if (rooms.length < 2)
            return rooms;
        const root = rooms[0];
        const splitAt = rooms.length / 2 + 1;
        const leftSide = rooms.slice(1, splitAt);
        const rightSide = rooms.slice(splitAt);
        if (leftSide.length > 0)
            root.connect(leftSide[0]);
        if (rightSide.length > 0)
            root.connect(rightSide[0]);
        return [root]
            .concat(this.connectRooms(leftSide))
            .concat(this.connectRooms(rightSide));
    }
    constructor(rooms) {
        this.rooms = [];
        this.rooms = rooms;
    }
    static createRandom() {
        const numberOfRooms = utils_1.Utils.getRandomNumber(7, 13);
        const rooms = this.createRandomRooms(numberOfRooms);
        const connectedRooms = this.connectRooms(rooms);
        return new Dungeon(connectedRooms);
    }
    static createEasyMode() {
        const firstRoom = new room_1.EmptyRoom(0);
        const treasureRoom = new room_1.TreasureRoom(1);
        firstRoom.connect(treasureRoom);
        return new Dungeon([firstRoom, treasureRoom]);
    }
    get firstRoom() {
        return this.rooms[0];
    }
    getRoom(id) {
        return this.rooms.find((r) => r.id == id);
    }
}
exports.Dungeon = Dungeon;
