"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rat = exports.Troll = exports.Bandit = exports.Enemy = void 0;
class Enemy {
    constructor(damage, description, hp) {
        this.damage = damage;
        this.description = description;
        this.hp = hp;
    }
}
exports.Enemy = Enemy;
class Bandit extends Enemy {
    constructor() {
        super(5, "Gunslingder Bandit", 15);
    }
}
exports.Bandit = Bandit;
class Troll extends Enemy {
    constructor() {
        super(10, "Big Troll", 25);
    }
}
exports.Troll = Troll;
class Rat extends Enemy {
    constructor() {
        super(3, "Cute Rat", 10);
    }
}
exports.Rat = Rat;
