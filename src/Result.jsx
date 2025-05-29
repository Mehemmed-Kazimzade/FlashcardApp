import PracticeForgottenCards from "./PracticeForgottenCards";
import { useQuiz } from "./QuizContext"
import Typography from '@mui/material/Typography';
import ResultCard from "./ResultCard";
import { PieChart } from '@mui/x-charts/PieChart';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Box } from "@mui/material";
import SuccessMessage from "./SuccessMessage";
import getScoreColor from "./utils/getScoreColor";
import useScoreStats from "./hooks/useScoreStats";
import ScorePieChart from "./components/ScorePieChart";

export default function Result() {
    const {score, flashcards} = useQuiz();
    const total = flashcards.length;

    const {remembered, forgotten} = useScoreStats(flashcards);

    return <>
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
    </>
}