import { render, screen } from '@testing-library/react';
import App from './App';

test('renders copyright', () => {
  render(<App />);
  const linkElement = screen.getByText(/Developed and designed by Christine Trac for On Deck/i);
  expect(linkElement).toBeInTheDocument();
});
