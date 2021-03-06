import { useRef, useState } from "react";

import "./App.css";

import Output from "./Output";
import Header from "./Header";
import { interpret } from "./interpret";
import { galactcToArabic } from "./galactictoArabic";
import Dictionary from "./Dictionary";

const GALACTIC_ROMAN_DICTIONARY = {}
const RESOURCE_EXCHANGE_RATES = {}

export default function App() {

  const inputElement = useRef()
  const [notes, setNotes] = useState('')
  const [digitNotes, setDigitNotes] = useState([])
  const [exchangeNotes, setExchangeNotes] = useState([])
  const [queriesAndOthers, setQueriesAndOthers] = useState([])

  const errorWarning = (error, note) => 
          <div key={note} data-testid={`error handling: ${error.kind}`}>
            {note}: {error.message}
          </div>

  const clickHandler = () => { 
    const interpretedNotes = interpret(notes)
    const filterNotes = (type1, type2) => interpretedNotes
            .filter( note => note.type === type1 || note.type === type2 ) 

    setDigitNotes ( filterNotes('number','invalid number') )
    setExchangeNotes ( filterNotes('exchange'))
    setQueriesAndOthers( filterNotes('query','invalid'))

    setNotes('')
    inputElement.current.value = ''
  }

  const addToDictionary = (note,type) => { 
    const error = { 
                    kind : 'not roman digit',
                    message: `Wrong format. Only and only one Roman digit: I, V, X, L, C, D, M`
                  }
    const galacticDigit = note.split(' is ')[0]
    const romanDigit = note.split(' is ')[1]

    if(type === 'invalid number') return errorWarning( error, note )
    GALACTIC_ROMAN_DICTIONARY[galacticDigit] = romanDigit;
  }

const addValueOfResource = (note) => { 

  const credits = note.split(/ is /i)[1].split(' ')[0].trim()
  const quantityAndResource = note.split(/ is \d+ credits*$/i)[0].split(' ')
  const resource = quantityAndResource.slice(-1).join()
  const galacticDigits = quantityAndResource.slice(0,-1)
  const arabicNumber = galactcToArabic(galacticDigits) 
  const error = { kind : 'exchange',message: arabicNumber}
  
  if(typeof arabicNumber !== 'number') return errorWarning( error, note )
  RESOURCE_EXCHANGE_RATES[resource] = credits / arabicNumber 
}

  return (
    <div className="body">
      <Header/>
  
      <main>  

        <div className="input">
          <textarea ref={inputElement} 
            placeholder="type notes here..." 
            cols="50" 
            rows="10" 
            onChange={(e) => {setNotes( e.target.value) }} 
            className = 'flex-column'
            >
          </textarea>
        
          <div className="flex-column output">
            {digitNotes.map( (note) => addToDictionary(note.note,note.type) )}
            
            {exchangeNotes.map( (note) => addValueOfResource(note.note) )}
            
            {queriesAndOthers.map( (note,index) =>  
                <Output key={index} 
                  note = {note.note} 
                  type= {note.type} 
                  RESOURCE_EXCHANGE_RATES={RESOURCE_EXCHANGE_RATES}
                /> 
            )}
          </div>

        </div>
      <button className = 'flex-column' onClick={clickHandler} disabled={!notes}>Translate</button>
      
      { 
        Object?.keys(GALACTIC_ROMAN_DICTIONARY).length !== 0 && <Dictionary 
          GALACTIC_ROMAN_DICTIONARY={GALACTIC_ROMAN_DICTIONARY} 
          RESOURCE_EXCHANGE_RATES = {RESOURCE_EXCHANGE_RATES}
          />
      }

      </main>
    </div>
  );
}
export {GALACTIC_ROMAN_DICTIONARY, RESOURCE_EXCHANGE_RATES}