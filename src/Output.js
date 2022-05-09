
export default function Output({note,type}) {
    if(!type) return; 

    return (<>
            { type === 'querry' ? <div data-testid='translatedNote'>{note}  {type} </div> : <div>I don't know what you are talking about</div> }
        </>
    )
}
