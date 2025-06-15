import { render, screen, fireEvent } from "@testing-library/react";
import CreateDeckForm from "../pages/CreateDeckForm"; // adjust path if needed
import { MemoryRouter } from "react-router-dom";

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

    // ✏️ Expect something is on the screen (e.g. "Add Card" button or deck name input)
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
    fireEvent.click(screen.getByRole("button", { name: /Save Deck/i }));

    expect(screen.queryByText(/Deck name is not valid/i)).toBeInTheDocument();

    // ✏️ Simulate clicking the Save button
    // ✏️ Expect onSave not to be called
  });

  test("calls onSave with valid deck and cards", () => {
    const { onSave } = setup();

    const deckNameInput = screen.getByPlaceholderText("Deck Name");
    fireEvent.change(deckNameInput, { target: {value: "sample deck"} });

    const submitButton = screen.getByRole("button", { name: /Save Deck/i });
    fireEvent.click(submitButton);

    expect(onSave).toHaveBeenCalled();

    // ✏️ Type a deck name
    // ✏️ Click Add Card and fill out one question/answer
    // ✏️ Click Save
    // ✏️ Expect onSave to be called with the correct data
  });
});
