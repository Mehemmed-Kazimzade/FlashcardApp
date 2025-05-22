import data from "./data";

export default function EnrichData(category) {
    let arr = [];

    if (category === "All"){
        arr = data.map((card, idx) => ({...card, place: idx + 1}))
    }

    else{
        arr = data.filter((card) => card.category === category).map((card, idx) => ({...card, place: idx + 1}));
    }

    return arr;
}