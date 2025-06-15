import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PracticeReadyDecks from "../pages/PracticeReadyDecks";
import { MemoryRouter } from "react-router-dom";
import { QuizProvider } from "../hooks/QuizContext";
import { expect } from "vitest";

// 👇 Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: "deck_1",
          name: "JavaScript Basics",
          cards: [{ id: "c1", question: "Q?", answer: "A" }],
        },
      ]),
  })
);

// 👇 Mock localStorage to simulate already imported deck
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.setItem(
    "importedDecks",
    JSON.stringify([{ id: "deck_1", name: "JavaScript Basics", cards: [] }])
  );
});

test("renders loading text initially", () => {
  render(
    <MemoryRouter>
        <QuizProvider>
            <PracticeReadyDecks />
        </QuizProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Decks are loading/i)).toBeInTheDocument();
});

test("fetches and renders deck after loading", async () => {
  render(
    <MemoryRouter>
        <QuizProvider>
            <PracticeReadyDecks />
        </QuizProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("JavaScript Basics")).toBeInTheDocument();
    expect(screen.getByText("1 cards")).toBeInTheDocument();
  });

  expect(fetch).toHaveBeenCalledTimes(1);
});

test("Import and Start Practice buttons are clickable", async () => {
  render(
    <MemoryRouter>
        <QuizProvider>
            <PracticeReadyDecks />
        </QuizProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /Import/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start Practice/i })).toBeInTheDocument();
  });
});

test("shows toast when trying to import deck", async () => {
  render(
    <MemoryRouter>
        <QuizProvider>
            <PracticeReadyDecks />
        </QuizProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const importBtn = screen.getByRole("button", { name: /Import/i });
    fireEvent.click(importBtn);
  });

  expect(await screen.findByText(/Deck imported successfully/i)).toBeInTheDocument();
});

test("shows roast when trying to import already imported deck", async () => {
  render(
    <MemoryRouter>
        <QuizProvider>
            <PracticeReadyDecks />
        </QuizProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const importBtn = screen.getByRole("button", {name: /Import/i});
    fireEvent.click(importBtn);
  });

  expect(await screen.findByText(/Deck already imported/i)).toBeInTheDocument();
})
