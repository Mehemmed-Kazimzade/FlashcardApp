import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./css/App.css";

import FlashcardApp from './FlashcardApp';
import Result from './Result';
import FlashcardList from './FlashcardList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from './QuizContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<FlashcardApp />} />
                <Route path='/practice' element={<FlashcardList />} />
                <Route path='/result' element={<Result />} />
            </Routes>
        </BrowserRouter>
    </QuizProvider>
  </StrictMode>,
)
