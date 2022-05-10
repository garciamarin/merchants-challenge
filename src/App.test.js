import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import {GALACTIC_TO_ARABIC_DICTIONARY} from './App'


describe('html layout',() => { 
  it('renders header, input box, button, output', () => {
    render(<App />);

    const header = screen.getByText(/merchant's intergalactic translator/i);
    const instructionsElement = screen.getByText(/Instructions:/i);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);
    
    expect(header).toBeInTheDocument();
    expect(instructionsElement).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
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


const mockOutput = jest.fn();
jest.mock("./Output", () => (props) => {
  mockOutput(props);
  return <mock-Output/>;
});

it('Output component recibes correct props', () => { 
  render(<App/>);
  
  const input = screen.getByPlaceholderText(/type notes here.../i);
  const button = screen.getByText(/translate/i);

  userEvent.type(input,'I just typed something...')
  userEvent.click(button)
  
  expect(mockOutput).toHaveBeenCalledWith(
    expect.objectContaining(
      {note:'I just typed something...', 
      type:"invalid"
  }))
 }
)

describe('outputHandler function',() => { 
  
it('stores number equivalence with type: "number" note',() => { 
  
  render(<App />);

  const button = screen.getByText(/translate/i);
  const input = screen.getByPlaceholderText(/type notes here.../i);

  userEvent.type(input,'glob is I \n how much is glob ? ')
  userEvent.click(button)

  expect(GALACTIC_TO_ARABIC_DICTIONARY).toEqual({glob: "I"})
})

it.skip('stores exchange rate with type: "exchange" note',() => { 
  render(<App />);
  
  const input = screen.getByPlaceholderText(/type notes here.../i);
  const button = screen.getByText(/translate/i);
  const output = screen.getByTestId(/outputElement/i)

  userEvent.type(input,'glob is I')
  userEvent.click(button)
  expect(output).toHaveTextContent('exchange')
})


  it.skip('displays "query" with type: "query" note',() => { 
    render(<App />);
 
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);
    //const output = screen.getAllByTestId(/outputElement/i)
  
    userEvent.type(input,'how much is pish tegj glob glob ? ')
    userEvent.click(button)
    expect(mockOutput).toHaveBeenCalledWith(
      expect.objectContaining(
        {note:'how much is pish tegj glob glob ?', 
        type:"query"
    }))
  })
})
  
    



