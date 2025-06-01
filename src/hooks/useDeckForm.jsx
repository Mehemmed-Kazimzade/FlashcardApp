import { useState } from "react";
import { v4 as getId } from "uuid";

export default function useDeckForm(initialDeck, initialCards, onSave) {
    const [deckData, setDeckData] = useState(initialDeck);
    const [formData, setFormData] = useState(initialCards);
    const [error, setError] = useState("");

    const updateDeckData = (inputName, value) => {
        setDeckData(prev => ({ ...prev, [inputName]: value }));
    };

    const addInputField = () => {
        const newField = { id: getId(), question: "", answer: "" };
        setFormData(prev => [...prev, newField]);

        setTimeout(() => {
            const lastCard = document.querySelector(`[data-card-id="${newField.id}"]`);
            lastCard?.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    };

    const updateInputField = (id, inputName, inputValue) => {
        setFormData(prev =>
            prev.map(input => (input.id === id ? { ...input, [inputName]: inputValue } : input))
        );
    };

    const deleteInputField = (id) => {
        setFormData(prev => prev.filter(input => input.id !== id));
    };

    const isValid = () => {
        if (deckData.deckName.trim() === "") {
            setError("Deck name is not valid");
            return false;
        }

        for (const field of formData) {
            if (!field.question.trim() || !field.answer.trim()) {
                setError("Question or Answer Box cannot be empty.");
                return false;
            }
        }

        return true;
    };

    const handleSave = (e, redirectFn) => {
        e.preventDefault();
        if (isValid()) {
            onSave(deckData, formData);
            if (redirectFn) {
                redirectFn();
            }
        }
    };

    return {
        deckData,
        formData,
        error,
        updateDeckData,
        updateInputField,
        deleteInputField,
        addInputField,
        handleSave,
    };
}
