import Restart from "./Restart";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function ResultComponent({children}) {
    return <>
    <motion.div 
        initial={{ opacity: 0 }}  // Starts invisible
        animate={{ opacity: 1 }}  // Fades in
        transition={{ duration: 1 }}  // Takes 1 second
    > 
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', maxWidth: 550, margin: '0 auto', borderRadius: 3 }}>
            {children}
        </Paper>
        <Restart />
    </motion.div>
    </>
}