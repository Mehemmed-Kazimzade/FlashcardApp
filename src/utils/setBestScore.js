// // @ts-check

// /**
//  * @param {Array[string]} decksIndex
//  * @param {Number} score - score of the user
//  */

export default function setBestScore(decksIndex, score) {
    if (decksIndex.length != 1) return;
    
    const deckIndex = decksIndex[0];
    const deck = JSON.parse(localStorage.getItem(deckIndex) || "{}");
    
    if (deck?.bestScore != null) deck.bestScore = Math.max(deck.bestScore, score);
    else deck.bestScore = score;

    localStorage.setItem(deckIndex, JSON.stringify(deck));
}