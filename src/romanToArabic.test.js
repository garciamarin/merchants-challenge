import {isValidRoman, romanToArabic} from "./romanToArabic.js"

it('isValidRoman function tests correctly for valid roman number formats', () => { 
    expect(isValidRoman(`i`)).toEqual(true)
    expect(isValidRoman(`I`)).toEqual(true)
    expect(isValidRoman(`MCLII`)).toEqual(true)
    expect(isValidRoman(`MCliI`)).toEqual(true)
    expect(isValidRoman(`CMC`)).toEqual(false)
    expect(isValidRoman(``)).toEqual(false)
})
 
it('romanToArabic function transforms correctly roman into arabic numbers', () => { 
expect(romanToArabic(`i`)).toEqual(1)
expect(romanToArabic(`I`)).toEqual(1)
expect(romanToArabic(`MCLII`)).toEqual(1152)
expect(romanToArabic(`MCliI`)).toEqual(1152)
})