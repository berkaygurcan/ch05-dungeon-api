// src/dungeon.ts
import {
  EmptyRoom,
  EnemyRoom,
  HealingPotionRoom,
  Room,
  SpikesRoom,
  SwordRoom,
  TreasureRoom,
} from "./room";
import { Utils } from "./utils";
export class Dungeon {
  private rooms: Room[] = [];
  private static createRandomRooms(numberOfRooms: number): Room[] {
    const rooms = [new EmptyRoom(0)];
    const distributedRoomTypes = [
      ...Array(4).fill("empty"),
      ...Array(3).fill("spikes"),
      ...Array(1).fill("heal"),
      ...Array(1).fill("enemy"),
      ...Array(1).fill("sword"),
    ];
    for (let i = 1; i < numberOfRooms; i++) {
      const roomType = Utils.getRandomItem(distributedRoomTypes);
      switch (roomType) {
        case "empty":
          rooms.push(new EmptyRoom(i));
          break;
        case "spikes":
          rooms.push(new SpikesRoom(i));
          break;
        case "heal":
          rooms.push(new HealingPotionRoom(i));
          break;
        case "enemy":
          rooms.push(new EnemyRoom(i));
          break;
        case "sword":
          rooms.push(new SwordRoom(i));
          break;
      }
    }
    const treasureRoomId = Utils.getRandomNumber(1, rooms.length - 1);
    rooms[treasureRoomId] = new TreasureRoom(treasureRoomId);
    return rooms;
  }

  private static connectRooms(rooms: Room[]): Room[] {
    if (rooms.length < 2) return rooms;
    const root = rooms[0];
    const splitAt = rooms.length / 2 + 1;
    const leftSide = rooms.slice(1, splitAt);
    const rightSide = rooms.slice(splitAt);
    if (leftSide.length > 0) root.connect(leftSide[0]);
    if (rightSide.length > 0) root.connect(rightSide[0]);
    return [root]
      .concat(this.connectRooms(leftSide))
      .concat(this.connectRooms(rightSide));
  }

  private constructor(rooms: Room[]) {
    this.rooms = rooms;
  }
  static createRandom(): Dungeon {
    const numberOfRooms = Utils.getRandomNumber(7, 13);
    const rooms = this.createRandomRooms(numberOfRooms);
    const connectedRooms = this.connectRooms(rooms);
    return new Dungeon(connectedRooms);
  }

  static createEasyMode(): Dungeon {
    const firstRoom = new EmptyRoom(0);
    const treasureRoom = new TreasureRoom(1);
    firstRoom.connect(treasureRoom);
    return new Dungeon([firstRoom, treasureRoom]);
  }

  get firstRoom(): Room {
    return this.rooms[0];
  }
  getRoom(id: number): Room | undefined {
    return this.rooms.find((r) => r.id == id);
  }
}
