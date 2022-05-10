const ROMAN_FROMAT_REGEX = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/i
const ROMAN_ARABIC_DICTIONARY = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000,i:1,v:5,x:10,l:50,c:100,d:500,m:1000}

const isValidRoman = (romanNumber) => { 

    return ROMAN_FROMAT_REGEX.test(romanNumber) ? true : false

} 

const romanToArabic = (romanNumberCandidate) => { 

    if(!isValidRoman(romanNumberCandidate)) return NaN

    const arrayOfArabicDigits = romanNumberCandidate
        .split('')
        .map( digit => ROMAN_ARABIC_DICTIONARY[digit] )
            
    const arabicNumber = arrayOfArabicDigits
        .map( (digit, index) => digit < arrayOfArabicDigits[index + 1 ]  ? - digit : digit )
        .reduce((previousValue, currentValue) => previousValue + currentValue )
        
    return arabicNumber
    
}

 export {romanToArabic, isValidRoman}