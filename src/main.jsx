import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FlashcardApp from './pages/FlashcardApp';
import Result from './pages/Result';
import FlashcardList from './pages/FlashcardList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDeckForm from './pages/CreateDeckForm';
import { QuizProvider } from './hooks/QuizContext';
import MiniDrawer from './components/MiniDrawer';
import Decks from './pages/Decks';
import EditDeck from './pages/EditDeck';
import "./css/App.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MiniDrawer />}>
                    <Route index element={<FlashcardApp />} />
                    <Route path='/practice' element={<FlashcardList />} />
                    <Route path='/result' element={<Result />} />
                    <Route path="/decks/" element={<Decks />}></Route>
                    <Route path='/createDeck/' element={<CreateDeckForm />} />
                    <Route path='/editDeck/:deckId' element={<EditDeck />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </QuizProvider>
  </StrictMode>,
)
