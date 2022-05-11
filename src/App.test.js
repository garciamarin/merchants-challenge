import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { GALACTIC_ROMAN_DICTIONARY , RESOURCE_EXCHANGE_RATES } from './App'

const NUMBER_NOTE = "glob is I"
const EXCHANGE_RATE_NOTE = "glob glob Silver is 34 Credits"
const EXCHANGE_QUERY = "how many Credits is glob glob Silver ?"
const EXCHANGE_RATE_NOTE_INCORRECT_NUMBER = "xxxx glob Silver is 34 Credits"

describe('html layout',() => { 
  it('renders header, input box, button, output', () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);
    
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
})

describe('outputHandler function',() => { 
  
  it('stores number equivalence with type: "number" note',() => {   
    render(<App />);
    const button = screen.getByText(/translate/i);
    const input = screen.getByPlaceholderText(/type notes here.../i);

    userEvent.type(input,`${NUMBER_NOTE} \n how much is glob ?`)
    userEvent.click(button)

    expect(GALACTIC_ROMAN_DICTIONARY).toEqual({glob: "I"})
  })

  it('stores metal rate for exchange-rate type notes ', () => {     
    render(<App />);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);

    userEvent.type(input, `${NUMBER_NOTE} \n ${EXCHANGE_RATE_NOTE}`)
    userEvent.click(button)
    expect(RESOURCE_EXCHANGE_RATES).toEqual({Silver: 17})  
  })

  it('passes prop of resource exchange rate', () => {    
    render(<App />);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);

    userEvent.type(input, `${NUMBER_NOTE} \n ${EXCHANGE_RATE_NOTE}`)
    userEvent.click(button)
      
    expect(mockOutput).toHaveBeenCalledWith(
      expect.objectContaining({RESOURCE_EXCHANGE_RATES : {Silver: 17}}
    ))
  })

  it('alerts when number is not in dictionary for exchange-rate notes with that error', () => { 
    
    render(<App />);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);

    userEvent.type(input, EXCHANGE_RATE_NOTE_INCORRECT_NUMBER )
    userEvent.click(button)
    const errorHandling = screen.getByTestId(/error handling: exchange/)
    
    expect(errorHandling).toBeInTheDocument();
  })

  it('displays "query" with type: "query" note',() => { 
    render(<App />);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const button = screen.getByText(/translate/i);
  
    userEvent.type(input, EXCHANGE_QUERY )
    userEvent.click(button)

    expect(mockOutput).toHaveBeenCalledWith(
      expect.objectContaining(
        {note:EXCHANGE_QUERY, 
        type:"query"
    }))
  })
})
  
describe('input precise error handling',() => { 

  it('determines note type if there is repeated spaces between words',() => {     
    render(<App />);
    const button = screen.getByText(/translate/i);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const repetedSpacingInput = `glob   is   V \n how much is glob ?`
    
    userEvent.type(input, repetedSpacingInput)
    userEvent.click(button)

    expect(GALACTIC_ROMAN_DICTIONARY).toEqual({glob: "V"})
  })

  it('alerts if right hand side of number equivalence note is not a roman Digit ',() => {     
    render(<App />);
    const button = screen.getByText(/translate/i);
    const input = screen.getByPlaceholderText(/type notes here.../i);
    const wrongInput = `glob is xxx`
    
    userEvent.type(input, wrongInput)
    userEvent.click(button)
    const errorHandling = screen.getByTestId(/error handling: not roman digit/)

    expect(errorHandling).toBeInTheDocument();
  })
})


