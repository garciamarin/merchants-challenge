import { render, screen } from '@testing-library/react';
import Output from './Output';

const NUMBER_QUERY = "how much is pish tegj glob glob ?"
const NUMBER_QUERY_INVALID_DIGIT = "how much is pish xxxx glob glob ?"
const NUMBER_QUERY_INVALID_ROMAN_FORMAT = "how much is pish glob tegj glob ?"

const EXCHANGE_QUERY = "how many Credits is glob prok Silver ?"
const EXCHANGE_QUERY_INVALID_METAL = "how many Credits is glob prok Mercury ?"
const EXCHANGE_QUERY_INVALID_NUMBER = "how many Credits is xxxx prok Silver ?"
const EXCHANGE_QUERY_INVALID_METAL_AND_NUMBER = "how many Credits is xxxx prok Mercury ?"


describe('html layout',() => { 
  
  it('renders output when prop is a "query" type note', () => {
    render(<Output note={NUMBER_QUERY} type={'query'} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}}/>);
    const outputNote = screen.getByTestId(/translatedNote/i);
    expect(outputNote).toBeInTheDocument();
  });

  it('renders error when prop is a "invalid" type note', () => {
    render(<Output note={'bla bla bla'} type={'invalid'} />);
    const invalidOutput = screen.getByText(/I don't know what you are talking about/)
    expect(invalidOutput).toBeInTheDocument();
  });

  it('renders nothing in output when prop is undefined', () => {
    render(<Output note={'bla bla bla'} type={undefined} />);
    const invalidOutput = screen.getByTestId(/translatedNote/i)
    expect(invalidOutput).toBeInTheDocument();
  });
});


describe('translates queries properly',() => { 
  
  it('translates galactic numbers into arabic numbers correctly',() => { 
    render(<Output note={NUMBER_QUERY} type={'query'} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}}/>)
    const output = screen.getByText(/pish tegj glob glob is 42/i)
    expect(output).toBeInTheDocument();
  })

  it('computes exchange of resources into Credits correctly',() => { 
    render(<Output  note={EXCHANGE_QUERY} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}} />);
    const output = screen.getByText(/glob prok Silver is 68 Credits/i)
    expect(output).toBeInTheDocument();
  })

 })

 describe('handles errors in queries properly',() => { 

  it('handles number query errors correctly: unknown digit',() => { 
    render(<Output note={NUMBER_QUERY_INVALID_DIGIT} type={'query'} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}} />);
    const output = screen.getByText(/xxxx is not in dictionary/i)
    expect(output).toBeInTheDocument();
  })

  it('handles number query errors correctly: wrong roman number format',() => { 
    render(<Output note={NUMBER_QUERY_INVALID_ROMAN_FORMAT} type={'query'} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}}/>);
    const output = screen.getByText(/which is not a valid Roman number/i)
    expect(output).toBeInTheDocument();
  })

  it('handles exchange query errors correctly: unknown metal',() => { 
    render(<Output  note={EXCHANGE_QUERY_INVALID_METAL} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}}/>);
    const output = screen.getByText(/mercury exchange rate is not known/i)
    expect(output).toBeInTheDocument();
  })

  it('handles exchange query errors correctly: unknown number',() => { 
    render(<Output  note={EXCHANGE_QUERY_INVALID_NUMBER} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}} />);
    const output = screen.getByText(/xxxx is not in dictionary/i)
    expect(output).toBeInTheDocument();
  })

  it('handles exchange query errors correctly: unknown metal & number',() => { 
    render(<Output  note={EXCHANGE_QUERY_INVALID_METAL_AND_NUMBER} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}} GALACTIC_ROMAN_DICTIONARY = {{pish : "X", tegj:"L", glob:"I",prok: "V"}} />);
    const output = screen.getByText(/xxxx is not in dictionary. mercury exchange rate is not known/i)
    expect(output).toBeInTheDocument();
  })
  })