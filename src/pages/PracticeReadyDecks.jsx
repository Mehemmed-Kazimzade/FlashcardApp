import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Snackbar, Alert } from "@mui/material";
import {Grid,Card,CardContent,Typography,Button,CardActions,Container,Stack} from "@mui/material";
import importDeckToLocalStorage from "../utils/importDeckToLocalStorage";
import ReusableSnackbar from "../components/ReusableSnackbar";
import checkIfDeckWithSameNameExists from "../utils/checkIfDeckWithSameNameExists";
import { startPracticeSession } from "../utils/startPracticeSession";
import { useQuiz } from "../hooks/QuizContext";
import { useNavigate } from "react-router";
import getDeckFromName from "../utils/getDeckFromName";
import convertOnlineDeck from "../utils/convertOnlineDeck";

export default function PracticeReadyDecks() {
    const {dispatch} = useQuiz();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [onlineDecks, setOnlineDecks] = useState([]);
    const [toast, setToast] = useState({ open: false, severity: "info", message: "" });

    useEffect(() => {
        const fetchOnlineDeck = async () => {
            const link = "https://raw.githubusercontent.com/Mehemmed77/flashcards-deck/main/decks.json";
            fetch(link)
            .then(res => res.json())
            .then(data => setOnlineDecks(data))
            .catch(e => console.error("Failed to load decks:", e));

            setIsLoading(false);
        }

        fetchOnlineDeck();
    }, []);

    const handlePractice = (deck) => {
        const doesDeckExist = checkIfDeckWithSameNameExists(deck.name);

        let practicedDeck = null;

        if(doesDeckExist) practicedDeck = getDeckFromName(deck.name);

        else{
            dispatch({type: "SET_UNIMPORTED", payload: {deck}});
            practicedDeck = convertOnlineDeck(deck);
        }

        startPracticeSession(practicedDeck, dispatch, navigate);
    };

    const handleImport = (deck) => {
        const res = importDeckToLocalStorage(deck);
    
        if (res === false){
            setToast({ open: true, severity: "error", message: "Deck already imported" });
        }

        else{
            setToast({ open: true, severity: "success", message: "Deck imported successfully" });
        }
    }

    return <>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {(isLoading || onlineDecks.length === 0) ? 
                <Typography align="center" mt={8} variant="h4">
                    ⏳ Decks are loading, please wait...
                </Typography> :

            <Container className="container " maxWidth="lg" sx={{ mt: 4, mb: 6 }}>

                <ReusableSnackbar toast={toast} setToast={setToast} />


                <Typography variant="h4" align="center" sx={{ fontWeight: "bold" , mb:4}}>
                    🧠 Practice Ready Decks
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {onlineDecks.map(deck => (
                    <Grid size={{ xs: 12, sm: 6, md: 5 }} key={deck.id}>

                        <Card className="readyCard" elevation={6} sx={{borderRadius: 3, transition: "0.3s ease"}}>

                            <CardContent>

                                <Typography variant="h6" gutterBottom>
                                    {deck.name}
                                </Typography>

                                <Typography variant="body2" color="gray">
                                    {deck.cards.length} cards
                                </Typography>

                            </CardContent>

                            <CardActions sx={{ px: 2, pb: 2 }}>

                                <Stack direction="row" spacing={1} width="100%">
                                    <Button variant="outlined" onClick={() => handleImport(deck)} fullWidth sx={{textTransform: "none",fontWeight: 500}}>
                                        Import
                                    </Button>
                                    <Button variant="contained" onClick={() => handlePractice(deck)} 
                                    fullWidth sx={{ borderRadius: 1, textTransform: "none", fontWeight: 500,}}>
                                        Start Practice
                                    </Button>
                                </Stack>

                            </CardActions>
                        </Card>
                    </Grid>))}
                </Grid>
            </Container> }
        </motion.div>
    </>
}