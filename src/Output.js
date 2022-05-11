import { galactcToArabic } from "./galactictoArabic";

export default function Output({ note , type , RESOURCE_EXCHANGE_RATES}) {

    const render = (output) => <div data-testid='translatedNote'> {output} </div> 

    if(type !== 'query') return render(`I don't know what you are talking about`)

    const NumberQueryRegex = /^(how much is ).*\?$/i    
    const queryType = (query) => NumberQueryRegex.test(query)

    const convertNumber = (note) => { 
        
        const galacticNumber =
            note.slice(0,-1)
            .trim()
            .split(/ is /i)
            .slice(1)[0]
        const galacticDigits = galacticNumber.split(' ')
        const arabicNumber = galactcToArabic(galacticDigits)
        const isNumber = typeof arabicNumber === 'number'
        const output =  isNumber ? `${galacticNumber} is ${arabicNumber}` : arabicNumber
       
        return render(output)
    }

    const computeExchange = (note) => { 

        const resourceAndQuantity_Array = 
                note.slice(0,-1)
                .split(' is ')[1]
                .trim()
                .split(' ')  
        const resourceAndQuantity = resourceAndQuantity_Array.join(' ') 
        const lengthArray = resourceAndQuantity_Array.length
        const resource = resourceAndQuantity_Array[ lengthArray - 1 ]
        const galacticDigits = resourceAndQuantity_Array.slice( 0 , lengthArray - 1 )

        const resourceRate = RESOURCE_EXCHANGE_RATES[resource] 
        const arabicNumber = galactcToArabic(galacticDigits)
        const isNumber = typeof arabicNumber === 'number'
       
        let output = ""

        if( !isNumber ){output = arabicNumber}
        if( !resourceRate ){output += `${resource} exchange rate is not known.`}
        else if( isNumber ){output = `${resourceAndQuantity} is ${arabicNumber * resourceRate} Credits`}
   
        return  render(output)
    }

return (
    <>
        { queryType(note) ? convertNumber(note) : computeExchange(note) }
    </>
)
}

