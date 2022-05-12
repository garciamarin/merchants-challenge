
export default function Dictionary({GALACTIC_ROMAN_DICTIONARY,RESOURCE_EXCHANGE_RATES}) {

    const  mapObject = (object) => { return Object.keys(object)
        .map((key, index) => <div key={index}>{key} is {object[key]} </div>)
     }
        
    const clickHandler = () => { window.location.reload(true);}

    return (
    <>
       
        <div data-testid='dictionary' className='dictionary'>
            <p className='dictionary-header'>Dictionary</p>
            { mapObject(GALACTIC_ROMAN_DICTIONARY)}
            {mapObject(RESOURCE_EXCHANGE_RATES)}
        </div>    
        <button onClick={clickHandler}> Clear dictionary</button>
    </>
    )
}
