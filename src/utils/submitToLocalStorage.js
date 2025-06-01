import { v4 as getId } from 'uuid';
// @ts-check

/**
 * @typedef {Object} DeckProp
 * @property {string} deckName
 * @property {string} deckDescription
 */

/**
 * @typedef {Object} Card
 * @property {int} id
 * @property {string} question
 * @property {string} answer
 */

/**
 * @param {DeckProp} deckProp
 * @param {Card[]} data
 * @returns {void}
 */

export default function submitToLocalStorage(deckProp, data) {
    if (!deckProp.deckName || data.length === 0) return;
    const deckId = getId();
    
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex") || "[]");

    decksIndex.unshift(deckId); 
    localStorage.setItem("decksIndex", JSON.stringify(decksIndex));


    const submittedData = {
        id: deckId,
        ...deckProp,
        cards: data,
        lastPracticed: null,
        lastUpdatedAt: null,
        createdAt: new Date().toISOString(),
    }

    localStorage.setItem(deckId, JSON.stringify(submittedData));
}