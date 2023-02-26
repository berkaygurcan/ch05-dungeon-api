"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dungeon_1 = require("./dungeon");
const player_1 = require("./player");
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Welcome to TSG Dungeon REST API! Use POST api/start to begin");
});
app.listen(port, () => {
    console.log(` [server]: Server running at http://localhost:${port}`);
});
let dungeon = null;
let player = null;
app.post("/api/start", (req, res) => {
    player = new player_1.Player();
    if (req.query.easy)
        dungeon = dungeon_1.Dungeon.createEasyMode();
    else
        dungeon = dungeon_1.Dungeon.createRandom();
    const room = dungeon.firstRoom;
    res.send(room.enter(player));
});
app.get("/api/player", (req, res) => {
    player
        ? res.send(`Player stats => Damage: ${player === null || player === void 0 ? void 0 : player.damage} HP: ${player === null || player === void 0 ? void 0 : player.hp}`)
        : res.send("please start the game for /start api");
});
app.post("/api/go/:direction", (req, res) => {
    if (!dungeon || !player) {
        res.send('The game is not ready. Use "POST api/start".');
        return;
    }
    const currentRoom = dungeon.getRoom(player.currentRoomId);
    const targetRoomId = currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.getRoomId(req.params.direction);
    if (targetRoomId != undefined) {
        const targetRoom = dungeon.getRoom(targetRoomId);
        let message = targetRoom.enter(player);
        if (player.treasureFound) {
            message += "You won!";
            resetGame();
        }
        else if (!(player === null || player === void 0 ? void 0 : player.alive)) {
            message += "Game over!";
            resetGame();
        }
        res.send(message);
        return;
    }
    res.send("No door in that direction!");
});
function resetGame() {
    dungeon = null;
    player = null;
}
