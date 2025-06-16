import { render, screen, fireEvent } from "@testing-library/react";
import Decks from "../pages/Decks";
import { MemoryRouter } from "react-router-dom";
import { QuizProvider } from "../hooks/QuizContext";
import * as storageUtils from "../utils/getDecksFromLocalStorage";

const mockDecks = [
  { id: "1", deckName: "JavaScript Basics", cards: [{}] },
  { id: "2", deckName: "Networking", cards: [{}, {}, {}] },
];

vi.mock("../utils/getDecksFromLocalStorage", () => ({
  default: vi.fn(),
}));

test("renders decks from localStorage", () => {
  storageUtils.default.mockReturnValue(mockDecks);

  render(
    <MemoryRouter>
        <QuizProvider>
            <Decks />
        </QuizProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Your Decks/i)).toBeInTheDocument();
  expect(screen.getByText(/JavaScript Basics/i)).toBeInTheDocument();
  expect(screen.getByText(/Networking/i)).toBeInTheDocument();
});


test("filters decks by search value", () => {
  storageUtils.default.mockReturnValue(mockDecks);

  render(
    <MemoryRouter>
        <QuizProvider>
            <Decks />
        </QuizProvider>
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText(/search decks/i);
  expect(screen.getByText("JavaScript Basics")).toBeInTheDocument();

  // Type in search field
  fireEvent.change(searchInput, { target: { value: "net" } });

  // Now only "Networking" should appear
  expect(screen.getByText("Networking")).toBeInTheDocument();
  expect(screen.queryByText("JavaScript Basics")).not.toBeInTheDocument();
});

test("shows toast if location.state has message and status", () => {
  storageUtils.default.mockReturnValue(mockDecks);

  render(
    <MemoryRouter initialEntries={[{ pathname: "/", state: { message: "Saved!", status: "success" } }]}>
        <QuizProvider>
            <Decks />
        </QuizProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Saved!/i)).toBeInTheDocument();
});
