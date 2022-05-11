import { GALACTIC_ROMAN_DICTIONARY } from './App';
import { galactcToArabic } from './galactictoArabic';

const digitTranslations = {pish : "X", tegj:"L", glob:"I",prok: "V"}
Object.keys(digitTranslations).map((key)=> GALACTIC_ROMAN_DICTIONARY[key] = digitTranslations[key])

it('translates galactic numbers into arabic numbers correctly',() => { 
    expect(galactcToArabic(['glob'])).toEqual(1)
    expect(galactcToArabic(['glob', 'glob'])).toEqual(2)
    expect(galactcToArabic(['pish', 'tegj', 'glob'])).toEqual(41)
    expect(galactcToArabic(['xxxx'])).toEqual(['xxxx is not in dictionary. '])
    expect(galactcToArabic(['glob','tegj'])).toEqual(`glob tegj translates to IL which is not a valid Roman number` )
})