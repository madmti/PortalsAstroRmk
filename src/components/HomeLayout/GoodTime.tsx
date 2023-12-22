import React from "react";

export default function GoodTime(){
    const hour = new Date(Date.now()).getHours();
    const [ msg, src ] = 0 <= hour && hour <= 12
        ?[ 'Good morning', '/sun.svg' ]: 12 < hour && hour <= 20
            ?[ 'Good afternoon', '/sunset.svg' ]: 20 < hour && hour <= 24
                ?[ 'Good evening', '/moon.svg' ]: 'Hi!';
    return(
        <h3 style={{display:'flex', alignItems:'center', gap:'10px', letterSpacing:'0.1rem'}}>
            <img src={src} width={30} height={30} alt="" />
            {msg}
        </h3>
    )
};