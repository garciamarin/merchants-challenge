import { useRef, useState } from "react";

import Output from "./Output";
import Header from "./Header";
import { interpret } from "./interpret";
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
            .map((digit) => `${digit} is not in dictionary. `)

    // if(romanDigits.includes('invalid')) arabicNumber = unknownGalacticDigits
    // else if(!romanToArabic(romanNumber)) arabicNumber = `${galacticNumber} translates to ${romanNumber} which is not a valid Roman number`
    // else arabicNumber = romanToArabic(romanNumber)

    arabicNumber = 
      romanDigits.includes('invalid') ? unknownGalacticDigits :
      romanToArabic(romanNumber) ? romanToArabic(romanNumber) :
      `${galacticNumber} translates to ${romanNumber} which is not a valid Roman number` 
        
    return arabicNumber
 }

const addValueOfResource = (note,index) => { 
    
const credits = note.split(/ is /i)[1].split(' ')[0].trim()
const quantityAndResource = note.split(/ is \d+ credits$/i)[0].split(' ')
const resource = quantityAndResource.slice(-1).join()
const galacticDigits = quantityAndResource.slice(0,-1)

const  arabicNumber = galactcToArabic(galacticDigits) 
const output = <div key={index} data-testid='error handling: exchange'>{arabicNumber}</div>

if(typeof arabicNumber !== 'number') return output

RESOURCE_EXCHANGE_RATES[resource] = credits / arabicNumber 
}

  return (
    <>
      <Header/>
  
      <main>

        <textarea 
          onChange={(e) => {setNotes( e.target.value) }}
          ref={inputElement} 
          placeholder="type notes here..." 
          cols="30" rows="10"
        ></textarea>
        
        <button onClick={clickHandler} disabled={!notes}>translate</button>
        
        {/* {digitNotes.map()}
        {exchangeNotes.map()}
        {queryNotes.map()} */}

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
