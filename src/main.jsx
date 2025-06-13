import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import FlashcardApp from './pages/FlashcardApp';
import Result from './pages/Result';
import FlashcardList from './pages/FlashcardList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDeckForm from './pages/CreateDeckForm';
import { QuizProvider } from './hooks/QuizContext';
import MiniDrawer from './components/MiniDrawer';
import Decks from './pages/Decks';
import getTheme from './hooks/useTheme';
import { ThemeProvider } from '@emotion/react';
import EditDeck from './pages/EditDeck';
import "./css/App.css";
import PracticeReadyDecks from './pages/PracticeReadyDecks';


const Main = () => {
    const [mode, setMode]  = useState('light');

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored) setMode(stored);
        document.documentElement.classList.toggle("dark", mode === "dark");
    }, []);

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("theme", newMode);
        document.documentElement.classList.toggle("dark", newMode === "dark");
    };


  return <>
    <StrictMode>
        <ThemeProvider theme={theme}>
        <QuizProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MiniDrawer toggleMode={toggleMode} mode={mode} />}>
                            <Route index element={<FlashcardApp />} />
                            <Route path='/practice/' element={<FlashcardList />} />
                            <Route path='/result/' element={<Result />} />
                            <Route path='/readyDecks/' element={<PracticeReadyDecks />} />
                            <Route path="/decks/" element={<Decks />}></Route>
                            <Route path='/createDeck/' element={<CreateDeckForm />} />
                            <Route path='/editDeck/:deckId/' element={<EditDeck />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
        </QuizProvider>
        </ThemeProvider>
    </StrictMode>
  </>
}


createRoot(document.getElementById('root')).render(<Main />)

// E F X
