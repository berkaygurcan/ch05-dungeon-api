export abstract class Enemy {
  damage: number;
  description: string;
  hp: number;

  constructor(damage: number, description: string, hp: number) {
    this.damage = damage;
    this.description = description;
    this.hp = hp;
  }
}

export class Bandit extends Enemy {
  constructor() {
    super(5, "Gunslingder Bandit", 15);
  }
}

export class Troll extends Enemy {
  constructor() {
    super(10, "Big Troll", 25);
  }
}

export class Rat extends Enemy {
  constructor() {
    super(3, "Cute Rat", 10);
  }
}
