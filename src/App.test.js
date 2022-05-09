import { render, screen } from '@testing-library/react';
import App from './App';

describe('html layout',() => { 
  it('renders header, input box, button, output', () => {
    render(<App />);

    const header = screen.getByText(/merchant's intergalactic translator/i);
    const instructionsElement = screen.getByText(/Instructions: /i);
    const input = screen.getByPlaceholderText(/add your notes here.../i);
    const button = screen.getByText(/translate/i);
    const output = screen.getByTestId(/outputElement/i);

    expect(header).toBeInTheDocument();
    expect(instructionsElement).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(output).toBeInTheDocument();
  });
});
