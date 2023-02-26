import { Bandit, Rat, Troll } from "./enemy";
import { Player } from "./player";
import { Utils } from "./utils";

export type Direction = "North" | "East" | "South" | "West";
const directions: Direction[] = ["North", "East", "South", "West"];

export abstract class Room {
  id: number;
  doors: { roomId: number; direction: Direction }[] = [];
  constructor(id: number) {
    this.id = id;
  }
  enter(player: Player): string {
    player.currentRoomId = this.id;
    return `You entered room #
${this.id.toString().padStart(2, "0")}. `;
  }
  protected describeDoors(): string {
    let message = `You see ${this.doors.length}
${this.doors.length > 1 ? "doors" : "door"} located `;
    if (this.doors.length <= 2) {
      message += this.doors.map((d) => d.direction).join(" and ");
    } else {
      let doors = this.doors
        .slice(0, this.doors.length - 1)
        .map((d) => d.direction)
        .join(", ");
      const lastId = this.doors.length - 1;
      message += doors + `, and ${this.doors[lastId].direction}`;
    }
    return message + ". ";
  }

  getRoomId(doorDirection: Direction): number | undefined {
    const door = this.doors.find((d) => d.direction == doorDirection);
    return door?.roomId;
  }
  connect(room: Room): void {
    const dir = this.getRandomDirection();
    this.doors.push({ roomId: room.id, direction: dir });
    room.doors.push({
      roomId: this.id,
      direction: this.getOppositeDirection(dir),
    });
  }
  private getRandomDirection(): Direction {
    const usedDirections = this.doors.map((d) => d.direction);
    const availableDirections = directions.filter(
      (d) => usedDirections.indexOf(d) < 0
    );
    return Utils.getRandomItem(availableDirections);
  }
  private getOppositeDirection(direction: Direction): Direction {
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

export class EmptyRoom extends Room {
  override enter(player: Player): string {
    let message = super.enter(player);
    message += "The room is empty. ";
    message += this.describeDoors();
    return message;
  }
}
export class SpikesRoom extends Room {
  damage: number;
  constructor(id: number) {
    super(id);
    this.damage = Utils.getRandomItem([10, 20, 50, 80]);
  }
  override enter(player: Player): string {
    player.hp -= this.damage;
    let message = super.enter(player);
    message += `Oh no, spikes! You lost ${this.damage} HP! `;
    if (player.alive) message += this.describeDoors();
    return message;
  }
}

export class EnemyRoom extends Room {
  enemy = new (Utils.getRandomItem([Rat, Troll, Bandit]))();

  constructor(id: number) {
    super(id);
  }
  override enter(player: Player): string {
    let message = super.enter(player);
    message += `Oh no, enemyRoom ! You must face the ${this.enemy.description} enemy ! `;
    while (player.hp >= 0 && this.enemy.hp >= 0) {
      this.enemy.hp -= player.damage;
      player.hp -= this.enemy.damage;
    }
    if (player.alive) {
      message += `Well done you defited the enemy ! `;
      message += this.describeDoors();
    } else {
      message += `You Died `;
    }
    return message;
  }
}

export class TreasureRoom extends Room {
  override enter(player: Player): string {
    player.treasureFound = true;
    let message = super.enter(player);
    message += "Congratulations! You found the treasure! ";
    return message;
  }
}

export class SwordRoom extends Room {
  damage: number;
  constructor(id: number) {
    super(id);
    this.damage = Utils.getRandomItem([10, 20, 30, 40]);
  }
  override enter(player: Player): string {
    player.damage += this.damage;
    let message = super.enter(player);
    message += `Oh yes, SwordRoom! You permanently gain ${this.damage} damage power! `;
    message += this.describeDoors();
    return message;
  }
}

export class HealingPotionRoom extends Room {
  heal: number;
  constructor(id: number) {
    super(id);
    this.heal = Utils.getRandomItem([10, 20, 50, 80]);
  }
  override enter(player: Player): string {
    player.hp += this.heal > 100 ? (player.hp = 100) : (player.hp += this.heal);
    let message = super.enter(player);
    message += `Oh yes, healingPotionRoom! You gain ${this.heal} HP! `;
    message += this.describeDoors();
    return message;
  }
}
