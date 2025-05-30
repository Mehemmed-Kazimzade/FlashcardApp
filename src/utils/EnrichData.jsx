import data from "../data/data";

export default function EnrichData(category) {
    let arr = [];

    if (category === "All"){
        arr = data.map((card, idx) => ({...card, place: idx + 1, isRemembered: false}))
    }

    else{
        arr = data.filter((card) => card.category === category).map((card, idx) => ({...card, place: idx + 1, isRemembered: false}));
    }

    return arr;
}