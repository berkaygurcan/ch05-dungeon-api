export class Player {
  currentRoomId = 0;
  hp = 100;
  damage = 20;
  treasureFound = false;
  get alive(): boolean {
    return this.hp > 0;
  }
}
