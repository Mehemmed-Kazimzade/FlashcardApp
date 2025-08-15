import { motion } from 'framer-motion';
import '../css/flipStyles.css';
import CardBack from '../flipAnimationComponents/CardBack';
import CardFront from '../flipAnimationComponents/CardFront';


export default function Flashcard({ flashcardObject }) {
  const actionsprops = {
    id: flashcardObject.id,
    isFlipped: flashcardObject.flipped,
    place: flashcardObject.place
  };

  return (
    <div className="flip-wrapper">
      <motion.div className="flip-inner" animate={{ rotateY: flashcardObject.flipped ? 180 : 0 }} transition={{ duration: 0.4 }} >
        <CardFront place={flashcardObject.place} question={flashcardObject.question} actionsprops={actionsprops} />

        <CardBack answer={flashcardObject.answer} flipped={flashcardObject.flipped} actionsprops={actionsprops} />
      </motion.div>
    </div>
  );
}
