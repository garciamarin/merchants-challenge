import { render, screen } from '@testing-library/react';
import { galactcToArabic } from './galactictoArabic';
import * as importsGalactcToArabic from './galactictoArabic';

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
    render(<Output note={NUMBER_QUERY} type={'query'} />);
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
  jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue({ arabicNumber: 42 });

  it('translates galactic numbers into arabic numbers correctly',() => { 
    render(<Output 
              note={NUMBER_QUERY} 
              type={'query'} 
            />)

    expect(galactcToArabic).
    toHaveBeenCalledWith(expect.objectContaining(["pish", "tegj", "glob", "glob"]))
  })

  it('computes exchange of resources into Credits correctly',() => { 
    jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue(4);
    render(<Output  note={EXCHANGE_QUERY} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}} />);
    const output = screen.getByText(/glob prok Silver is 68 Credits/i)
    expect(output).toBeInTheDocument();
  })

})

 describe('handles errors in queries properly',() => { 

  it('handles number query errors correctly: unknown digit',() => { 
    jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue( 'xxxx is not in dictionary');
    render(<Output note={NUMBER_QUERY_INVALID_DIGIT} type={'query'}/>);
    const output = screen.getByText(/xxxx is not in dictionary/i)
    expect(output).toBeInTheDocument();
  })


  it('handles number query errors correctly: wrong roman number format',() => { 
    jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue( `which is not a valid Roman number`);
    render(<Output note={NUMBER_QUERY_INVALID_ROMAN_FORMAT} type={'query'}/>);
    const output = screen.getByText(/which is not a valid Roman number/i)
    expect(output).toBeInTheDocument();

  })

  it('handles exchange query errors correctly: unknown metal',() => { 
    jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue( 'xxxx is not in dictionary. ');
    render(<Output  note={EXCHANGE_QUERY_INVALID_METAL} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}}/>);
    const output = screen.getByText(/mercury exchange rate is not known/i)
    expect(output).toBeInTheDocument();
  })

  it('handles exchange query errors correctly: unknown number',() => { 
    jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue( 'xxxx is not in dictionary' );
    render(<Output  note={EXCHANGE_QUERY_INVALID_NUMBER} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}} />);
    const output = screen.getByText(/xxxx is not in dictionary/i)
    expect(output).toBeInTheDocument();
  })

  it('handles exchange query errors correctly: unknown metal & number',() => { 
    jest.spyOn(importsGalactcToArabic, 'galactcToArabic').mockReturnValue( 'xxxx is not in dictionary. ');
    render(<Output  note={EXCHANGE_QUERY_INVALID_METAL_AND_NUMBER} type={'query'} RESOURCE_EXCHANGE_RATES={{Silver : 17}}/>);
    const output = screen.getByText(/xxxx is not in dictionary. mercury exchange rate is not known/i)
    expect(output).toBeInTheDocument();
  })
  })