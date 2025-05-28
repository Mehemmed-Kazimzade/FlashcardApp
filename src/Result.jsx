import PracticeForgottenCards from "./PracticeForgottenCards";
import { useQuiz } from "./QuizContext"
import Typography from '@mui/material/Typography';
import ResultComponent from "./ResultScreen";
import { PieChart } from '@mui/x-charts/PieChart';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function Result() {
    const {score, flashcards} = useQuiz();
    const total = flashcards.length;

    const getScoreColor = () => {
        const ratio = score / total;
        if (ratio === 1) return "success.main";
        if (ratio >= 0.6) return "warning.main";
        return "error.main";
    };

    const remembered = flashcards.filter(f => f.isRemembered).length;
    const forgotten = flashcards.length - remembered;

    return <>
        <ResultComponent>
            <Typography sx={{ color:getScoreColor(), fontSize: "1.5rem" }} variant="h5" fontWeight="bold" gutterBottom >
                    <TrackChangesIcon sx={{ mr: 1, color: 'primary.main' }} /> Your Score: {score} / {total}
            </Typography>
            
            {total === score && <Typography fontSize="1.5rem"> <b>Congratulations, you scored 100% 🎉🎉</b> </Typography>}
            
            <Typography><b>Remembered</b>: {remembered} </Typography>

            <Typography><b>Forgotten</b>: {forgotten} </Typography>

            {<PracticeForgottenCards forgotten={forgotten} />}
        </ResultComponent>

        <PieChart
        width={200}
        height={200}
        series={[
            {
            data: [
                { id: 0, value: remembered, label: "Remembered Cards", color: "#007E33" },
                { id: 1, value: forgotten, label: "Forgotten Cards", color: "#FF8800" },
            ]
            }
        ]}
        />
    </>
}