import {Box, Button, Grid, IconButton, Paper, TextField, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { v4 as getId } from 'uuid';
import submitToLocalStorage from '../utils/submitToLocalStorage';
import { useNavigate } from 'react-router';
import useDeckForm from '../hooks/useDeckForm';
import { motion } from 'framer-motion';

export default function CreateDeckForm() {
    const navigate = useNavigate();

    const {deckData, formData, error, setError,updateDeckData, updateInputField, deleteInputField, addInputField, handleSave} = useDeckForm(
        {deckName: "", deckDescription: ""}, [{ id: getId(), question: "", answer: "" }],(deck, cards) => submitToLocalStorage(deck, cards) 
    );

    const handleForm = (e) => {
        const res = handleSave(e, () => navigate("/decks/", {state: {status:"SUCCESS" ,message: "Deck created successfully!"}}));
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <form onSubmit={(e) => handleForm(e)}>
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

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom color='error'>
                            {error}
                        </Typography>
                    </Box>

                    {/* Save / Cancel Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="text" onClick={() => (navigate("/decks/"))}>Cancel</Button>
                    <Button role='button' variant="contained" aria-label="Save Deck" type='submit' 
                    color={error === "" ? "primary" : "error"}>Save Deck</Button>
                    </Box>
                </Paper>
                </Box>
            </form>
        </motion.div>
    );
}
