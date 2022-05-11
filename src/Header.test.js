import { render, screen } from '@testing-library/react';

import Header from './Header';


it('renders header, input box, button, output', () => {
    render(<Header />);

    const header = screen.getByText(/merchant's intergalactic translator/i);
    const instructionsElement = screen.getByText(/Instructions:/i);
    
    expect(header).toBeInTheDocument();
    expect(instructionsElement).toBeInTheDocument();
})