import { useCallback, useRef, useState } from "react";
import { v4 as getId } from "uuid";
import checkIfDeckWithSameNameExists from "../utils/checkIfDeckWithSameNameExists";

export default function useDeckForm(initialDeck, initialCards, onSave) {
    const [deckData, setDeckData] = useState(initialDeck);
    const [formData, setFormData] = useState(initialCards);
    const [error, setError] = useState("");

    // this variable is to save the deck's latest name in case user tries to change it.
    // it is essential to have it considering the fact that we have to check names to avoid same deck creation.
    const saveName = useRef(deckData.deckName);

    const updateDeckData = useCallback((inputName, value) => {
        setDeckData(prev => ({ ...prev, [inputName]: value }));
    }, [setDeckData]);

    const addInputField = useCallback(() => {
        const newField = { id: getId(), question: "", answer: "" };
        setFormData(prev => [...prev, newField]);

        setTimeout(() => {
            const lastCard = document.querySelector(`[data-card-id="${newField.id}"]`);
            lastCard?.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, [setFormData]);

    const updateInputField = useCallback((id, inputName, inputValue) => {
        setFormData(prev =>
            prev.map(input => (input.id === id ? { ...input, [inputName]: inputValue } : input))
        );
    }, [setFormData]);

    const deleteInputField = useCallback((id) => {
        setFormData(prev => prev.filter(input => input.id !== id));
    }, [setFormData]);

    const isValid = () => {
        if (checkIfDeckWithSameNameExists(deckData.deckName, saveName.current)) {
            setError("Deck with same name already exists.");
            return false;
        }

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
        setError,
    };
}
