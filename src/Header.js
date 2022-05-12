import { useState } from 'react'
import './Header.css'

export default function Header() {
const [visible, setVisible] = useState(false)

  return (
    <header>
        <h1>Merchant's Intergalactic Translator</h1>
        <span>Hello, fellow cosmonaut! </span>
        <span>This intergalactic translator will process your galactic notes.
        </span>
        <div data-testid='instructions' className="instructions">
            <div className="instructions-header">
                <button onClick={() => { setVisible(!visible) }} className='btn-instructions display-inline'> 
                    {!visible ? 
                        <span className='display-inline'>- Show me instructions -</span>  
                        : <h3 className='display-inline'>Hide 'em</h3>  
                    }
                </button>
            </div>
            <div   className={visible ? 'instructions-container visible' : 'hidden'}>
                <span data-testid='visible'> This translator stores equivalences between galactic and arabic digits, computes and stores resource exchange-rates, 
            and answers queries using the dictionaries. In that order. 
            Only queries and invalid requests have an output. </span>
                <p>Type your notes into the text area, click translate, and mind the following...</p>
                <ul>
                    <li> 
                        You can either type a single note or 
                        several notes at once by separating different notes with line breaks. 
                    </li>
                    <li>The order of the notes in a multi-note input is irrelevant.</li>
                    <li> 
                        In any case, the provided information will be logged into the 
                        dictionaries for future reference. 
                    </li>
                    <p></p>
                    <li>
                        There are 3 kinds of notes that the translator recognizes. 
                        They are and should have the following formats (mind the format!):
                    </li>
                        <ul>
                            <li><i>Digit-equivalence notes</i>: "galactic_digit is roman_digit"</li>
                            <li><i>Exchange rate note</i>: "galactic_number RESOURCE is arabic_number credits"</li>
                            <li><i>queries</i>:  "how much is galactic_number ?" or "how many credits is galactic_number resource?".</li>
                        </ul>
                        Where, galactic_digit is a word, roman digit is one and only one of the following 
                        letters: I ,V, X, L, C, D, M. arabic_number is an Arabic number and RESOURCE 
                        is the resource you want to trade.
                    <li>Input is <em>case insensitive</em> and multi-spacing typos are tolerated.</li>
                    <p></p>
                    <li> If you type several overlaping digit-equivalences or resource's values 
                        for the same digit or resource, it will be assumed you want to update 
                        this quantity, so the last typed value will be stored. For example: 
                        <ul style={{"listStyleType":"none"}}>
                            <li>glob is I</li>
                            <li> glob is V</li>
                        </ul>    
                    Will log the value of V for glob in the dictionary. 
                    </li>
                </ul>
                <br />
                <span>This my solution to the</span> <a target="_blank" href="https://www.google.com/search?q=merchant%27s+guide+to+the+galaxy&sxsrf=ALiCzsZjW20zTOwvrf0p4qozXg7hCAJfyw%3A1652353743598&ei=z-p8YrSVJPGQxc8P8r2quAw&ved=0ahUKEwj0uLiv6dn3AhVxSPEDHfKeCscQ4dUDCA8&uact=5&oq=merchant%27s+guide+to+the+galaxy&gs_lcp=Cgdnd3Mtd2l6EAMyBwgjELADECcyBwgjELADECcyBwgAELADEEMyCAgAEIAEELADMggIABCABBCwAzIHCAAQsAMQHjIHCAAQsAMQHkoECEEYAUoECEYYAFAAWABg76IGaANwAHgAgAEAiAEAkgEAmAEAyAEHwAEB&sclient=gws-wiz"> Merchant's Guide to the Galaxy</a> <span> challenge.</span>
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
