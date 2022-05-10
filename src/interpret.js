const NUMBER_EQUIVALENCE_REGEX_CONDITION = /^[a-zA-Z]+( is )([iI]|[vV]|[xX]|[lL]|[cC]|[dD]|[mM])$/i
const EXCHANGE_REGEX_CONDITION = / is \d+ credits$/i
const QUERRY_REGEX_CONDITION = /^(how many credits is)+( [a-zA-Z]*)*\s*\?$|^(how much is ).*\?$/i

const determineTypeOfSentence = (sentence) => { 

    if(NUMBER_EQUIVALENCE_REGEX_CONDITION.test(sentence)) return "number"
    else if(EXCHANGE_REGEX_CONDITION.test(sentence)) return "exchange"
    else if(QUERRY_REGEX_CONDITION.test(sentence)) return "querry"
    return "invalid"

 }

const interpret = (input) => { 
    const splitedInput = input.split(/\r?\n/)
        .filter( line => line)
        .map( line => line.trim() )
    
    const inputTypeArray = splitedInput.map( line => {
      return {note: line, type: determineTypeOfSentence(line)}
    })
    return inputTypeArray
 }

 export {interpret}