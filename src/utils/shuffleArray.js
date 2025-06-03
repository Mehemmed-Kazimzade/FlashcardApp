// @ts-check
/**
 * @param {Array} arr array to be shuffled.
 * @returns {Object|null} returns shuffled version of array.
 */

export default function shuffleArray(arr) {
    // Fisher-Yates shuffle: iterate backwards and swap with a random earlier element.
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index in range [0, i].
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements.
    }

    return arr;
}