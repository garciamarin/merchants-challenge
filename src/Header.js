import { useState } from 'react'
import './Header.css'

export default function Header() {
const [visible, setVisible] = useState(false)

  return (
    <header>
        <h1>Merchant's Intergalactic Translator</h1>
        <span>
            Hello, fellow cosmonaut! 
            This intergalactic translator processes your galactic notes.
        </span>

        <div data-testid='instructions' className="instructions">
            
            <div className="instructions-header">
                <button onClick={() => { setVisible(!visible) }} className='btn-instructions display-inline'> 
                    {
                        !visible ? 
                        <span className='display-inline'>- Show me instructions -</span> :
                        <span className='display-inline'>Hide 'em</span>  
                    }
                </button>
            </div>
            
            <div className={visible ? 'instructions-container visible' : 'hidden'}>
                <span data-testid='visible'> 
                    This translator stores equivalences 
                    between galactic and arabic digits, 
                    computes and stores resource exchange-rates, 
                    and answers queries using the dictionaries. 
                    It is my solution to the&nbsp;                  
                    <a target="_blank" href="https://github.com/garciamarin/merchants-challenge#the-challenge"> 
                        Merchant's Guide to the Galaxy 
                    </a> 
                    &nbsp;challenge.
                </span>
                {/* Only queries and invalid requests have an output.  */}
                <p>
                    Type your notes into the text area, click translate 
                    and mind the following...
                </p>
                <ul>
                    <li> 
                        You can type single notes or 
                        several notes at once, by separating different notes with line breaks. 
                    </li>
                    <li>
                        The information provided will be logged into the 
                        dictionaries for future reference.                         
                    </li>
                    <li>
                    The interpretation of notes with multiple lines is
                    independet of the order in which you type the lines.
                    </li>
                </ul>
                <ul>
                    <li>
                        The 3 kinds of notes that the translator recognizes are (mind the format!):
                    </li>
                        <ul>
                            <li><strong>Digit-equivalence notes</strong>: "<em>galactic_digit</em> is <em>roman_digit</em>"</li>
                            <li><strong>Exchange rate note</strong>: "<em>galactic_number</em> <em>RESOURCE</em> is <em>arabic_numbe</em>r credits"</li>
                            <li><strong>queries</strong>:  "how much is <em>galactic_number</em> ?" or,<br/> "how many credits is <em>galactic_number</em> <em>RESOURCE</em>?".</li>
                        </ul>
                        Where, <em>arabic_number</em> is an Arabic number,  
                        <em> galactic_digit</em> is a word representing a galactic numeral,  
                        <em> RESOURCE</em> is the material you want to trade and  
                        <em> roman_digit</em> is one and only one of the following: 
                        I ,V, X, L, C, D, M.
                    <li>
                        Input is <em>case insensitive</em> and 
                        multiple-space typos are tolerated.
                    </li>
                </ul>
                <ul>
                    <li> 
                        If you type several digit-equivalence or exchange rate notes which overlap the value 
                        of some digit or resource, it will be assumed you want to update 
                        this value, so only the last note will be stored. For example, the input: 
                        <ul style={{"listStyleType":"none"}}>
                            <li>glob is I</li>
                            <li> glob is V</li>
                        </ul>    
                        logs exclusively the value of "V" for "glob" in the dictionary. 
                    </li>
                </ul>
            </div>
            
            {/* These are some examples of valid input formats:
                > glob is I
                > glob     is  i
                > glob is I
                pish is X
                how much is pish glob glob?
                > How much is pish glob glob?
                glob is I
                pish is X
                > glob glob Silver is 34 Credits
                How many credits is glob prok Silver    ? */}
        </div>
    </header>
  )
}
