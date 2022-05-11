import { GALACTIC_ROMAN_DICTIONARY } from "./App"
import { romanToArabic } from "./romanToArabic"

const galactcToArabic = (galacticDigits) => { 

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


    const arabicNumber = 
      romanDigits.includes('invalid') ? unknownGalacticDigits :
      romanToArabic(romanNumber) ? romanToArabic(romanNumber) :
      `${galacticNumber} translates to ${romanNumber} which is not a valid Roman number` 
        
    return arabicNumber
 }

 export {galactcToArabic}