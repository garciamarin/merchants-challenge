import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from './Header';


it('renders header, input box, button, output', () => {
    render(<Header />);

    const header = screen.getByText(/merchant's intergalactic translator/i);
    const instructionsElement = screen.getByTestId(/instructions/i);
    
    expect(header).toBeInTheDocument();
    expect(instructionsElement).toBeInTheDocument();
})

it('shows instructions on click', () => {
    render(<Header />);

    const button = screen.getByText(/show me instructions/i);
    userEvent.click(button)

    const instructions = screen.getByTestId(/visible/);
    
    expect(instructions).toBeInTheDocument();
})