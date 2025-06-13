import { useEffect, useState } from "react"
import {Grid,Card,CardContent,Typography,Button,CardActions,Container,Stack} from "@mui/material";

export default function PracticeReadyDecks() {
    const [isLoading, setIsLoading] = useState(true);
    const [onlineDecks, setOnlineDecks] = useState([]);

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

    return <>
        {(isLoading || onlineDecks.length === 0) ? 
            <Typography align="center" mt={8} color="gray">
                ⏳ Decks are loading, please wait...
            </Typography> :

        <Container className="container " maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
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
                                <Button variant="outlined" fullWidth sx={{textTransform: "none",fontWeight: 500}}>
                                    Import
                                </Button>
                                <Button variant="contained" fullWidth sx={{ borderRadius: 1, textTransform: "none", fontWeight: 500,}}>
                                    Start Practice
                                </Button>
                            </Stack>

                        </CardActions>
                    </Card>
                </Grid>))}
            </Grid>
        </Container> }
    </>
}