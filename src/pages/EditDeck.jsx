import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import getDeckWithId from '../utils/getDeckWithId';
import useDeckForm from '../hooks/useDeckForm';
import updateLocalStorage from '../utils/updateLocalStorage';
import { motion } from 'framer-motion';
import LongMenu from '../components/LongMenu';
import {Divider} from '@mui/material';
import { useCallback, useState } from 'react';
import ReusableDialog from '../components/ReusableDialog';

export default function EditDeck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const deck = getDeckWithId(deckId);

    const navigeToDeckList = useCallback(() => navigate("/decks/", 
        {state: {status: "WARNING", message: "Deck Edit cancelled"}}), []);

    const dialogProps = {
        title: "Are you sure you want to cancel?",
        btn1Content: "No",
        btn2Content: "Yes",
        callbackFunc: navigeToDeckList,
        content: "This action cannot be undone.",
    }
    

    const handleCancel = () => {
        setOpenModal(true); 
    }

    const {
        deckData,
        formData,
        error,
        updateDeckData,
        updateInputField,
        deleteInputField,
        addInputField,
        handleSave,
    } = useDeckForm({deckName: deck.deckName, deckDescription: deck.deckDescription}, deck.cards, 
        (deckProps, cards) => updateLocalStorage(deckId, deckProps, cards));

    return <>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <form 
                onSubmit={(e) =>
                    handleSave(e, () => navigate(
                        "/decks/", {state: {status:"SUCCESS", message: "Deck updated successfully"
                        }}))}>

                {/* REUSABLE DIALOG FOR SAVE CANCELLATION ---------------- */}
                <ReusableDialog dialogProps={dialogProps}  openModal={openModal} setOpenModal={setOpenModal} />
                {/* REUSABLE DIALOG FOR SAVE CANCELLATION ---------------- */}


                <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', position:"relative" }}>
                    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, ml: 4 }}>

                        <Box display={"flex"} mb={2}>
                            <Button startIcon={<ArrowBackIcon />} onClick={navigeToDeckList}
                            variant="outlined" sx={{ maxWidth: { sm: 'fit-content' }, }}>
                                Back to Decks
                            </Button>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, 
                            justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 3, gap: 2 }}>
                            <Typography variant="h5" fontWeight="bold">Edit Deck</Typography>

                            {/* THREE DOTTED MENU  ---------------------------------- */}
                            <LongMenu id={deckId} deck={deck} />
                            {/* THREE DOTTED MENU ----------------------------------  */}

                        </Box>

                        <TextField fullWidth value={deckData.deckName}
                            onChange={(e) => updateDeckData("deckName", e.target.value)} 
                            placeholder="e.g., React Fundamentals" 
                            variant="outlined" sx={{ mb: 3 }}/>

                        <TextField fullWidth value={deckData.deckDescription}
                            onChange={(e) => updateDeckData("deckDescription", e.target.value)} 
                            multiline rows={2} 
                            placeholder="Update the deck's description" sx={{ mb: 4 }}/>

                        <Typography variant="h6" gutterBottom>Cards</Typography>

                        {formData.map((card) => (

                            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }} key={card.id}>
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <TextField fullWidth value={card.question} data-card-id={card.id}
                                    onChange={(e) => updateInputField(card.id, "question", e.target.value)} 
                                    placeholder="e.g., What is JSX?"/>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <TextField fullWidth value={card.answer} 
                                    onChange={(e) => updateInputField(card.id, "answer", e.target.value)} 
                                    placeholder="e.g., A syntax extension for JavaScript"/>
                                </Grid>

                            <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
                                    {formData.length > 1 &&
                                    <IconButton aria-label="delete card" sx={{ mx:"auto" }} onClick={() => deleteInputField(card.id)}>
                                        <DeleteIcon color='error' />
                                    </IconButton>}
                                </Grid>
                        </Grid>
                        ))}

                        <Button startIcon={<AddIcon />} onClick={addInputField} variant="outlined" sx={{ mb: 4 }}>
                            Add New Card
                        </Button>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom color='error'>
                                {error}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }} className="editDeckButtonContainer">
                            <Button variant="outlined" 
                            sx={{ maxWidth: "200px" }} 
                            onClick={handleCancel} color="error">
                                Cancel
                            </Button>
                            <Button variant="contained" startIcon={<SaveIcon />} sx={{ maxWidth: "200px" }} type="submit">
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </form>
        </motion.div>
    </>;
}
