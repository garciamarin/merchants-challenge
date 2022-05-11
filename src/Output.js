import { romanToArabic } from "./romanToArabic";

//const GALACTIC_ROMAN_DICTIONARY = {pish : "X", tegj:"L", glob:"I",prok: "V"}
// const RESOURCE_EXCHANGE_RATES = {Silver: 17 , Gold: '8000000'}

export default function Output({ note , type , RESOURCE_EXCHANGE_RATES, GALACTIC_ROMAN_DICTIONARY}) {

    if(!type) return <div data-testid='translatedNote'></div>; 
    if(type !== 'query') return <div>I don't know what you are talking about</div>;

    const QUERY_A_NUMBER_REGEX_CONDITION = /^(how much is ).*\?$/i
    
    const typeOfquery = (query) => { 
        return QUERY_A_NUMBER_REGEX_CONDITION.test(query) ? "number query" : "exchange rate query"
    }

    const translateNumber = (note) => { 
        let output = ''

        const galacticNumber = note.slice(0,-1)
            .trim()
            .split(/ is /i)
            .slice(1)[0]
        const galacticDigits = galacticNumber.split(' ')

        const romanDigits = galacticDigits.map((digit) =>  
                GALACTIC_ROMAN_DICTIONARY[digit] ? 
                GALACTIC_ROMAN_DICTIONARY[digit] : 
                `invalid`
            )
        const romanNumber = romanDigits.join('')
        
        const unknownGalacticDigits = galacticDigits
            .filter((digit) => !GALACTIC_ROMAN_DICTIONARY[digit])
            .map((unknownNumber) => `${unknownNumber} is not in dictionary. `)

        if(romanDigits.includes('invalid')) output = unknownGalacticDigits
        else if(!romanToArabic(romanNumber)) output = `${galacticNumber} translates to ${romanNumber} which is not a valid Roman number`
        else output = `${galacticNumber} is ${romanToArabic(romanNumber)}`

        return <div data-testid='translatedNote'>{output}</div>
     }

const computeExchange = (note) => { 
    let output = ''
    let arabicNumber = NaN
    const resourceAmount_Array = note.slice(0,-1)
        .split(' is ')[1].trim().split(' ')  
    const resourceAmount = resourceAmount_Array.join(' ') 

    const lengthArray = resourceAmount_Array.length
    const metal = resourceAmount_Array[ lengthArray - 1 ]
    const galacticDigits = resourceAmount_Array.slice( 0 , lengthArray - 1 )

    const romanDigits = galacticDigits.map((digit) =>  
    GALACTIC_ROMAN_DICTIONARY[digit] ? 
    GALACTIC_ROMAN_DICTIONARY[digit] : 
    `invalid`
    )
    const romanNumber = romanDigits.join('')

    const unknownGalacticDigits = galacticDigits
    .filter((digit) => !GALACTIC_ROMAN_DICTIONARY[digit])
    .map((unknownNumber) => `${unknownNumber} is not in dictionary. `)

    if(romanDigits.includes('invalid')) output = unknownGalacticDigits
    else if(!romanToArabic(romanNumber)) output = `${galacticDigits} translates to ${romanNumber} which is not a valid Roman number`
    else {arabicNumber = romanToArabic(romanNumber)}

    const metalRate = RESOURCE_EXCHANGE_RATES[metal] 
    if(metalRate && arabicNumber) { output = `${resourceAmount} is ${arabicNumber * metalRate} Credits`  }
    else if (!metalRate){output += `${metal} exchange rate is not known.`}

    return  <div data-testid='translatedNote'>{output}</div>
    }

    return (
        <>{ 
            typeOfquery(note) === 'number query' ? 
                translateNumber(note) :
                computeExchange(note)
        }
        </>
    )
}

