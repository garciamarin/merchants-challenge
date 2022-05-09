import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Output from './Output';

describe('html layout',() => { 
  
  it('renders output when prop is a "querry" type note', () => {
    render(<Output note={'a querry ?'} type={'querry'} />);

    const outputNote = screen.getByTestId(/translatedNote/i);

    expect(outputNote).toBeInTheDocument();
  });

  it('renders error when prop is a "invalid" type note', () => {
    render(<Output note={'bla bla bla'} type={'invalid'} />);

    const invalidOutput = screen.getByText(/I don't know what you are talking about/)

    expect(invalidOutput).toBeInTheDocument();
  });
});