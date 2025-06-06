import Restart from "./Restart";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import {Chip} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQuiz } from "../hooks/QuizContext";

export default function ResultCard({children}) {
    const {timeLeft, duration} = useQuiz();

    const completedIn = duration * 60 - timeLeft;

    return <>
    <motion.div 
        initial={{ opacity: 0 }}  // Starts invisible
        animate={{ opacity: 1 }}  // Fades in
        transition={{ duration: 1 }}  // Takes 1 second
    >

        {timeLeft !== -1 && <Chip
            icon={<AccessTimeIcon />}
            label={`Completed in: ${Math.floor(completedIn / 60).toString().padStart(2, 0)}:${(completedIn % 60).toString().padStart(2, 0)}`}
            color="primary"
            variant="outlined"
            sx={{ fontSize: "1rem", fontWeight: 500, mb: 2 }}
        />}

        <Paper className="paperContainer" elevation={3}>
            {children}
        </Paper>

        <Restart />
    </motion.div>
    </>
}