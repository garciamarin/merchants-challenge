import { useRef, useState } from "react";

function App() {
  const inputElement = useRef()
  const [input, setInput] = useState('')

  const clickHandler = (first) => { 
    inputElement.current.value = ''
    alert("Click!");
    }
    console.log(inputElement)
  return (
    <>
      <header>
        <h1>Merchant's Intergalactic Translator</h1>
        <h3>Instructions:</h3> 
        <p>Please write your galactic notes into the box!</p>
      </header>

      <textarea 
        onChange={(e) => {setInput( e.target.value) }}
        ref={inputElement} 
        placeholder="type notes here..." 
        cols="30" rows="10"
      ></textarea>
      <button onClick={clickHandler} disabled={!input}>translate</button>
      <div data-testid='outputElement'></div>
    </>
  );
}

export default App;
