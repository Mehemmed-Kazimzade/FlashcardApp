import Lottie from 'lottie-react';
import confettiAnimation from '../data/celebrationAnimation.json';
import { Box } from '@mui/material';

export const Animation = () => {

    return <>
        <Box className="animationContainer">
            <Lottie className="animationContainer"
                animationData={confettiAnimation}
                loop={false}/>
        </Box>
    </>
};
