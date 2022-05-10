import { useState } from "react";
import { romanToArabic } from "./romanToArabic";


export default function Output({note,type}) {

    if(!type) return; 
    if(type !== 'querry') return <div>I don't know what you are talking about</div>;

    return (
        <div data-testid='translatedNote'>{note} and {type}</div>
    )
}
