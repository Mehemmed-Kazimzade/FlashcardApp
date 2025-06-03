// @ts-check

/**
 * Returns a random number in a specified interval
 * @param {Number} min - lower bound
 * @param {Number} max - higher bound
 */

export default function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +  1)) + min;
}