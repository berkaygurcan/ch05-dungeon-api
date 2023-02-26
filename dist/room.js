"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealingPotionRoom = exports.SwordRoom = exports.TreasureRoom = exports.EnemyRoom = exports.SpikesRoom = exports.EmptyRoom = exports.Room = void 0;
const enemy_1 = require("./enemy");
const utils_1 = require("./utils");
const directions = ["North", "East", "South", "West"];
class Room {
    constructor(id) {
        this.doors = [];
        this.id = id;
    }
    enter(player) {
        player.currentRoomId = this.id;
        return `You entered room #
${this.id.toString().padStart(2, "0")}. `;
    }
    describeDoors() {
        let message = `You see ${this.doors.length}
${this.doors.length > 1 ? "doors" : "door"} located `;
        if (this.doors.length <= 2) {
            message += this.doors.map((d) => d.direction).join(" and ");
        }
        else {
            let doors = this.doors
                .slice(0, this.doors.length - 1)
                .map((d) => d.direction)
                .join(", ");
            const lastId = this.doors.length - 1;
            message += doors + `, and ${this.doors[lastId].direction}`;
        }
        return message + ". ";
    }
    getRoomId(doorDirection) {
        const door = this.doors.find((d) => d.direction == doorDirection);
        return door === null || door === void 0 ? void 0 : door.roomId;
    }
    connect(room) {
        const dir = this.getRandomDirection();
        this.doors.push({ roomId: room.id, direction: dir });
        room.doors.push({
            roomId: this.id,
            direction: this.getOppositeDirection(dir),
        });
    }
    getRandomDirection() {
        const usedDirections = this.doors.map((d) => d.direction);
        const availableDirections = directions.filter((d) => usedDirections.indexOf(d) < 0);
        return utils_1.Utils.getRandomItem(availableDirections);
    }
    getOppositeDirection(direction) {
        switch (direction) {
            case "North":
                return "South";
            case "South":
                return "North";
            case "East":
                return "West";
            case "West":
                return "East";
        }
    }
}
exports.Room = Room;
class EmptyRoom extends Room {
    enter(player) {
        let message = super.enter(player);
        message += "The room is empty. ";
        message += this.describeDoors();
        return message;
    }
}
exports.EmptyRoom = EmptyRoom;
class SpikesRoom extends Room {
    constructor(id) {
        super(id);
        this.damage = utils_1.Utils.getRandomItem([10, 20, 50, 80]);
    }
    enter(player) {
        player.hp -= this.damage;
        let message = super.enter(player);
        message += `Oh no, spikes! You lost ${this.damage} HP! `;
        if (player.alive)
            message += this.describeDoors();
        return message;
    }
}
exports.SpikesRoom = SpikesRoom;
class EnemyRoom extends Room {
    constructor(id) {
        super(id);
        this.enemy = new (utils_1.Utils.getRandomItem([enemy_1.Rat, enemy_1.Troll, enemy_1.Bandit]))();
    }
    enter(player) {
        let message = super.enter(player);
        message += `Oh no, enemyRoom ! You must face the ${this.enemy.description} enemy ! `;
        while (player.hp >= 0 && this.enemy.hp >= 0) {
            this.enemy.hp -= player.damage;
            player.hp -= this.enemy.damage;
        }
        if (player.alive) {
            message += `Well done you defited the enemy ! `;
            message += this.describeDoors();
        }
        else {
            message += `You Died `;
        }
        return message;
    }
}
exports.EnemyRoom = EnemyRoom;
class TreasureRoom extends Room {
    enter(player) {
        player.treasureFound = true;
        let message = super.enter(player);
        message += "Congratulations! You found the treasure! ";
        return message;
    }
}
exports.TreasureRoom = TreasureRoom;
class SwordRoom extends Room {
    constructor(id) {
        super(id);
        this.damage = utils_1.Utils.getRandomItem([10, 20, 30, 40]);
    }
    enter(player) {
        player.damage += this.damage;
        let message = super.enter(player);
        message += `Oh yes, SwordRoom! You permanently gain ${this.damage} damage power! `;
        message += this.describeDoors();
        return message;
    }
}
exports.SwordRoom = SwordRoom;
class HealingPotionRoom extends Room {
    constructor(id) {
        super(id);
        this.heal = utils_1.Utils.getRandomItem([10, 20, 50, 80]);
    }
    enter(player) {
        player.hp += this.heal > 100 ? (player.hp = 100) : (player.hp += this.heal);
        let message = super.enter(player);
        message += `Oh yes, healingPotionRoom! You gain ${this.heal} HP! `;
        message += this.describeDoors();
        return message;
    }
}
exports.HealingPotionRoom = HealingPotionRoom;
