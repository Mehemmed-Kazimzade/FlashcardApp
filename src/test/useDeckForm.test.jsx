import { render, screen, fireEvent } from "@testing-library/react";
import CreateDeckForm from "../pages/CreateDeckForm"; // adjust path if needed
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

describe("DeckForm component", () => {
  const setup = (initialDeck = { name: "" }, initialCards = [], onSave = vi.fn()) => {
    render(
      <MemoryRouter>
        <CreateDeckForm
          initialDeck={initialDeck}
          initialCards={initialCards}
          onSave={onSave}
        />
      </MemoryRouter>
    );

    return { onSave };
  };

  test("renders the deck form with no initial cards", () => {
    setup();
    expect(screen.getByRole("button", {name: "Save Deck"})).toBeInTheDocument();
    expect(screen.queryByText("Create New Deck")).toBeInTheDocument();
    expect(screen.queryByText("Add New Card")).toBeInTheDocument();

  });

  test("adds a new input field when 'Add Card' is clicked", () => {
    setup();

    const addNewCardButton = screen.queryByText("Add New Card");
    
    const questionInput = screen.getByPlaceholderText("e.g., What is a closure?");
    const answerInput = screen.getByPlaceholderText("e.g., A function with preserved lexical scope");
    
    fireEvent.change(questionInput, { target: { value: "What is React?" } });
    fireEvent.change(answerInput, { target: { value: "A JS library" } });

    fireEvent.click(addNewCardButton);

    expect(questionInput.value).toBe("What is React?");
    expect(answerInput.value).toBe("A JS library");
  });

  test("prevents saving if deck name is empty", () => {
    setup()
    fireEvent.click(screen.getByRole("button", { name: /Save Deck/i }));

    expect(screen.queryByText(/Deck name is not valid/i)).toBeInTheDocument();

  });
});
