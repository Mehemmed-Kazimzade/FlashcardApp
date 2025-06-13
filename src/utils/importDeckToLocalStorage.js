import checkIfDeckWithSameNameExists from "./checkIfDeckWithSameNameExists";
import { v4 as getId } from "uuid";
import submitToLocalStorage from "./submitToLocalStorage";

export default function importDeckToLocalStorage(deck) {
    const doesDeckExist = checkIfDeckWithSameNameExists(deck.name);
    
    if (doesDeckExist) return false;

    const deckProps = {
        deckName: deck.name,
        deckDescription: "",
    }

    submitToLocalStorage(deckProps, deck.cards);

    return true;
}