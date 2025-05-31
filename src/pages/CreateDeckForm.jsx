import {Box, Button, Grid, IconButton, Paper, TextField, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { v4 as getId } from 'uuid';

export default function CreateDeckForm() {
    const [deckData, setDeckData] = useState({
        deckName: "",
        deckDescription: ""
    });

    const [formData, setFormData] = useState([{
            id: getId(),
            question: "",
            answer: "",
        }]);

    const updateDeckData = (inputName, value) => {
        setDeckData(prev => ({...prev, [inputName]: value}));
    }

    const addInputField = () => {
        const newField = {id: getId(), question: "", answer: ""};
        setFormData(prev => ([...prev, newField]));

        setTimeout(() => {
        const lastCard = document.querySelector(`[data-card-id="${newField.id}"]`);
        lastCard?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    
    const updateInputField = (id, inputName, inputValue) => {
        setFormData(prev => prev.map(input => (
            (input.id === id) ? {...input, [inputName]: inputValue} : input
        )));
    }

    const deleteInputField = (id) => {
        setFormData(prev => prev.filter(input => input.id !== id));
    }

    const isValid = () => {
        let valid = true;
        if (deckData.deckName.trim() === "") valid = false;
        if (formData.length === 1) valid = false;

        formData.forEach((inputField) => {
            if (inputField.question.trim() === "" && inputField.answer.trim() === "") valid = false;
        })

        return valid;
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (isValid()) {

        }
    }

    return (
        <form onSubmit={(e) => handleSave(e)}>
            <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Create New Deck
                </Typography>

                <TextField value={deckData.deckName} onChange={(e) => updateDeckData("deckName", e.target.value)}
                    fullWidth label="Deck Name" placeholder="e.g., JavaScript Basics" variant="outlined" sx={{ mb: 3 }} />

                <TextField value={deckData.deckDescription} fullWidth onChange={(e) => updateDeckData("deckDescription", e.target.value)}
                    label="Description (optional)" multiline rows={2} placeholder="Brief description of this deck" sx={{ mb: 4 }}/>

                <Typography variant="h6" gutterBottom>
                    Cards
                </Typography>

                {/* Example Card Entry – repeat this block dynamically */}
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    {formData.map(input => (
                        <React.Fragment key={input.id}>
                            <Grid size={{xs: 5}}>
                                <TextField fullWidth label="Question" placeholder="e.g., What is a closure?" data-card-id={input.id}
                                value={input.question}
                                onChange={(e) => updateInputField(input.id, "question", e.target.value)} />
                            </Grid>
                            <Grid size={{xs: 5}}>
                                <TextField fullWidth label="Answer" placeholder="e.g., A function with preserved lexical scope" data-card-id={input.id}
                                    value={input.answer}
                                    onChange={(e) => updateInputField(input.id, "answer", e.target.value)}/>
                            </Grid>
                            <Grid size={{xs: 2}}>
                                {formData.length > 1 && <IconButton aria-label="delete card" onClick={() => deleteInputField(input.id)}>
                                    <DeleteIcon />
                                </IconButton>}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>

                <Button startIcon={<AddIcon />} variant="outlined" sx={{ mb: 4 }} onClick={() => addInputField()}>
                    Add New Card
                </Button>

                {/* Save / Cancel Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="text">Cancel</Button>
                <Button variant="contained">Save Deck</Button>
                </Box>
            </Paper>
            </Box>
        </form>
    );
}
