import PracticeForgottenCards from "../components/PracticeForgottenCards";
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
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Result() {
    const {score, decksIndex, flashcards} = useQuiz();
    const total = flashcards.length;

    const {remembered, forgotten} = useScoreStats(flashcards);

    useEffect(() => {
        setBestScore(decksIndex, score);
    }, []);

    return <>
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {total === score && <SuccessMessage />}

            <Box className="resultBox">

                <ResultCard>
                    
                    <Typography sx={{ color:getScoreColor(score, total) }} variant="h6" fontWeight="bold" gutterBottom >
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