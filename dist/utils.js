"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
function getRandomNumber(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}
function getRandomItem(array) {
    const randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
}
exports.Utils = {
    getRandomItem,
    getRandomNumber,
};
