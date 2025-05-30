import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FlashcardActions from '../components/FlashcardActions';
import Skeleton from '@mui/material/Skeleton';

export default function CardBack({answer, flipped, actionsprops}) {
    return <>
        <div className="flip-face flip-back">
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <div className="flip-content">
                        <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2 }}>
                            Answer:
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {flipped ? answer : <Skeleton animation="wave" />}
                        </Typography>
                    </div>
                    <Divider sx={{ mt: 2 }} />
                </CardContent>

                <CardActions>
                    <FlashcardActions props={actionsprops} />
                </CardActions>
            </Card>
        </div>
    </>
}