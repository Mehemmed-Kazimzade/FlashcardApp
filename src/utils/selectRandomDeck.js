import getRandomInt from "./getRandomInt";

export default function selectRandomDeck() {
    const decksIndex = JSON.parse(localStorage.getItem("decksIndex") || "[]");

    const randomIndex = getRandomInt(0, decksIndex.length - 1);
    
    return JSON.parse(localStorage.getItem(decksIndex[randomIndex]), "{}");
}
