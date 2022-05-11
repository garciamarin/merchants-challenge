import { useRef, useState } from "react";
import { interpret } from "./interpret";
import Output from "./Output";

import { romanToArabic } from "./romanToArabic";

const GALACTIC_ROMAN_DICTIONARY = {}
//{glob : 'I', prok : 'V', pish : 'X', tegj : 'L'}
const RESOURCE_EXCHANGE_RATES = {}
function App() {

  const inputElement = useRef()
  const [notes, setNotes] = useState('')
  const [interpretedNotes,setInterpretedNotes] = useState([{note:"",type:""}])  

  const clickHandler = () => { 
    inputElement.current.value = ''
    setNotes('')
    setInterpretedNotes( interpret(notes) )
    }

  const addToDictionary = (note,index) => { 
    const splitedNote = note.split(' is ') 
    GALACTIC_ROMAN_DICTIONARY[splitedNote[0]] = splitedNote[1];
  }

  const galactcToArabic = (galacticDigits) => { 
    let arabicNumber = NaN

    const romanDigits = galacticDigits.map((digit) =>  
      GALACTIC_ROMAN_DICTIONARY[digit] ? 
      GALACTIC_ROMAN_DICTIONARY[digit] : 
      `invalid`
      )
    const romanNumber = romanDigits.join('')
    
    const galacticNumber = galacticDigits.join(' ')
    const unknownGalacticDigits = galacticDigits
            .filter((digit) => !GALACTIC_ROMAN_DICTIONARY[digit])
            .map((unknownNumber) => `${unknownNumber} is not in dictionary. `)

    if(romanDigits.includes('invalid')) arabicNumber = unknownGalacticDigits
    else if(!romanToArabic(romanNumber)) arabicNumber = `${galacticNumber} translates to ${romanNumber} which is not a valid Roman number`
    else arabicNumber = romanToArabic(romanNumber)
    return arabicNumber
 }


const addValueOfResource = (note,index) => { 
    
const credits = note.split(/ is /i)[1].split(' ')[0].trim()
const quantityAndResource = note.split(/ is \d+ credits$/i)[0].split(' ')
const resource = quantityAndResource.slice(-1).join()
const galacticDigits = quantityAndResource.slice(0,-1)

const  arabicNumber = galactcToArabic(galacticDigits) 
const resorceExchangeRate = (typeof arabicNumber === 'number') ? 
  credits / arabicNumber 
  : galactcToArabic(galacticDigits) 

if(typeof arabicNumber === 'number'){ 
  RESOURCE_EXCHANGE_RATES[resource] = credits / arabicNumber
}
else return <div key={index} data-testid='error handling: exchange'>{arabicNumber}</div>
}

  return (
    <>
      <header>
        <h1>Merchant's Intergalactic Translator</h1>
        <h3>Instructions:</h3> 
        <p>Please write your galactic notes into the box!</p>
      </header>

      <main>

        <textarea 
          onChange={(e) => {setNotes( e.target.value) }}
          ref={inputElement} 
          placeholder="type notes here..." 
          cols="30" rows="10"
        ></textarea>
        
        <button onClick={clickHandler} disabled={!notes}>translate</button>
        
        {interpretedNotes.map((note, index) => {
          if(note.type === 'number'){return addToDictionary(note.note,index)}
          else if(note.type === 'exchange'){return addValueOfResource(note.note,index) }
          else{return  <Output key={index} 
            note = {note.note} 
            type= {note.type} 
            RESOURCE_EXCHANGE_RATES={RESOURCE_EXCHANGE_RATES}
            GALACTIC_ROMAN_DICTIONARY={GALACTIC_ROMAN_DICTIONARY}
            /> 
          }
        }
        )}
        
      </main>
    </>
  );
}
export {GALACTIC_ROMAN_DICTIONARY, RESOURCE_EXCHANGE_RATES}
export default App;
