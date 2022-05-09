import { useRef, useState } from "react";
import { interpret } from "./interpret";
import Output from "./Output";




function App() {

  const inputElement = useRef()
  const [notes, setNotes] = useState('')
  const [interpretedNotes,setInterpretedNotes] = useState([{note:"",type:""}])
  const [dictionary, setDictionary] = useState({})

  const clickHandler = () => { 
    inputElement.current.value = ''
    setNotes('')
    setInterpretedNotes( interpret(notes) )
    }

  const logDigit = (note) => { 
    const splitedNote = note.split(' is ')
    console.log(splitedNote)
   }

   const logExchange = (first) => { return <div>hola</div> }
  
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
          if(note.type === 'number'){logDigit(note.note)}
          else if(note.type === 'exchange'){<div>exchange</div> }
          else{return  <Output key={index} note = {note.note} type= {note.type}/> }
        }
        )}
        
      
      </main>
    </>
  );
}

export default App;
