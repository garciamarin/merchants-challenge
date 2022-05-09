import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('html layout',() => { 
  it('renders header, input box, button, output', () => {
    render(<App />);

    const header = screen.getByText(/merchant's intergalactic translator/i);
    const instructionsElement = screen.getByText(/Instructions:/i);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);
    const output = screen.getByTestId(/outputElement/i);

    expect(header).toBeInTheDocument();
    expect(instructionsElement).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(output).toBeInTheDocument();
  });

  it('click button cleans input field', () => { 
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);

    userEvent.type(inputElement,'I just typed something...')
    userEvent.click(button)

    expect(inputElement).toHaveValue('');
   })

  it('button is disabled if input Element is empty', () => { 
    render(<App />);

    const button = screen.getByText(/translate/i);

    expect(button).toBeDisabled();
  })

});
