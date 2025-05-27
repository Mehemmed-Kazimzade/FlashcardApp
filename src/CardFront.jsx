import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FlashcardActions from './FlashcardActions';

export default function CardFront({place, question, actionsprops}) {
    return <>
        <div className="flip-face flip-front">
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2 }}>
                Question {place}:
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {question}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </CardContent>
            <CardActions>
              <FlashcardActions props={actionsprops} />
            </CardActions>
          </Card>
        </div>
    </>
}