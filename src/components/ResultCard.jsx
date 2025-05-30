import Restart from "./Restart";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function ResultCard({children}) {
    return <>
    <motion.div 
        initial={{ opacity: 0 }}  // Starts invisible
        animate={{ opacity: 1 }}  // Fades in
        transition={{ duration: 1 }}  // Takes 1 second
    >

        <Paper className="paperContainer" elevation={3}>
            {children}
        </Paper>

        <Restart />
    </motion.div>
    </>
}