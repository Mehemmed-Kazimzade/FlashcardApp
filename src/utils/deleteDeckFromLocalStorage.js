export default function deleteDeckFromLocalStorage(id) {
    const doesDeckExist = JSON.parse(localStorage.getItem(id)) !== null;

    console.log(id);
    console.log(JSON.parse(localStorage.getItem(id)));
    if (doesDeckExist) {
        localStorage.removeItem(id);
        const decksIndex = JSON.parse(localStorage.getItem("decksIndex"));
        localStorage.setItem("decksIndex", JSON.stringify(decksIndex.filter(deckId => deckId !== id)));
    }
}