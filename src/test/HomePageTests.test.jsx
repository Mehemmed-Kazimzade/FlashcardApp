import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from "../pages/HomePage";

test('renders the homepage heading', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  
  expect(screen.getByText(/SwiftCards/i)).toBeInTheDocument();
});
