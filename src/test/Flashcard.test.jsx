import { render, screen } from "@testing-library/react";
import Flashcard from "../components/Flashcard";
import { MemoryRouter } from "react-router-dom";
import { QuizProvider } from "../hooks/QuizContext/"; // Adjust path as needed

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <QuizProvider>
        {ui}
      </QuizProvider>
    </MemoryRouter>
  );
};

describe("Flashcard component", () => {
  const baseFlashcard = {
    id: "1",
    question: "What is React?",
    answer: "A JS library for building UI",
    place: "deck"
  };

  test("shows front content (question) when not flipped", () => {
    renderWithProviders(<Flashcard flashcardObject={{ ...baseFlashcard, flipped: false }} />);

    expect(screen.getByText(/Question deck:/i)).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.queryByText(/Answer:/i)).not.toBeInTheDocument();
  });

  test("shows back content (answer) when flipped", () => {
    renderWithProviders(<Flashcard flashcardObject={{ ...baseFlashcard, flipped: true }} />);

    expect(screen.getByText(/Answer:/i)).toBeInTheDocument();
    expect(screen.getByText("A JS library for building UI")).toBeInTheDocument();
    expect(screen.queryByText(/Question deck:/i)).not.toBeInTheDocument();
  });
});
