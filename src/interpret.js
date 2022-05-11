const NUMBER_EQUIVALENCE_REGEX = /^[a-zA-Z]+( is )([iI]|[vV]|[xX]|[lL]|[cC]|[dD]|[mM])$/i
const EXCHANGE_REGEX = / is \d+ credits$/i
const QUERY_REGEX = /^(how many credits is)+( [a-zA-Z]*)*\s*\?$|^(how much is ).*\?$/i
const NUMBER_INCORRECT_REGEX = /^[a-zA-Z]+( is ).*/i

const determineTypeOfNote = (note) => { 
    if(NUMBER_EQUIVALENCE_REGEX.test(note)) return "number"
    if(NUMBER_INCORRECT_REGEX.test(note)) return "invalid number"
    if(EXCHANGE_REGEX.test(note)) return "exchange"
    if(QUERY_REGEX.test(note)) return "query"
    return "invalid"
 }

const interpret = (notes) => { 
  const splitedNotes = notes.split(/\r?\n/)
          .filter( note => note)
          .map(note => note.replace(/ +/g, " ").trim())
          // .map( note => note.trim() )
  
  const noteTypeArray = splitedNotes.map( note => {
    return {note: note, type: determineTypeOfNote(note)}
    })

  return noteTypeArray
 }

 export {interpret}