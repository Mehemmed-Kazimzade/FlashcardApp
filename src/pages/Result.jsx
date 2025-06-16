import PracticeForgottenCards from "../components/PracticeForgottenCards";
import setLastPracticedAt from "../utils/setLastPracticedAt";
import { useQuiz } from "../hooks/QuizContext"
import Typography from '@mui/material/Typography';
import ResultCard from "../components/ResultCard";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Box } from "@mui/material";
import SuccessMessage from "../components/SuccessMessage";
import getScoreColor from "../utils/getScoreColor";
import useScoreStats from "../hooks/useScoreStats";
import ScorePieChart from "../components/ScorePieChart";
import setBestScore from "../utils/setBestScore";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import setStats from "../utils/setStats";

export default function Result() {
    const {score, decksIndex, flashcards, dispatch, unimported, practicingForgottenCards} = useQuiz();
    const total = flashcards.length;

    const {remembered, forgotten} = useScoreStats(flashcards);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if(!unimported){
            if (!practicingForgottenCards){
                const deckName = JSON.parse(localStorage.getItem("practicedDeck"))

                if (deckName !== "All Decks") {
                    setStats(deckName, score, total);
                }
            }

            setLastPracticedAt(decksIndex);
            setBestScore(decksIndex, score);
        }
        dispatch({type: "END_QUIZ"});
    }, []);

    return <>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {total === score && <SuccessMessage />}

            <Box className="resultBox" display={"flex"}>

                <ResultCard>
                    
                    <Typography sx={{ color:getScoreColor(score, total) }} variant="h6" fontWeight="bold" gutterBottom fontSize={{ xs: 18 }}>
                        <TrackChangesIcon sx={{ mr: 1, color: 'primary.main' }} /> Your Score: {score} / {total}
                    </Typography>

                    <Typography><b>Remembered</b>: {remembered} </Typography>

                    <Typography><b>Forgotten</b>: {forgotten} </Typography>

                    {<PracticeForgottenCards forgotten={forgotten} />}

                </ResultCard>

                <ScorePieChart rCards={remembered} fCards={forgotten} />
            </Box>
        </motion.div>
    </>
}