import Typography from '@mui/material/Typography';
import { Animation } from './Animation';

export default function SuccessMessage() {
    return <>
        <Typography variant='h6' className='successMessage' fontSize={{ xs: 15 }}> <b>Congratulations, you scored 100% 🎉🎉</b> </Typography>
        <Animation />
    </>
}