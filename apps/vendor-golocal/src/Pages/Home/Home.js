import React, {useState} from 'react';


export default function Home() {

    if (window.location.href === "https://localhost:3002/"){
        window.location.href="https://localhost:3002/artisan"
    }

    return(
        <div style={{textAlign:"center", marginTop:"20%", fontFamily:"Lato,sans-serif", fontSize:"200%"}}>
            Chargement ...
        </div>
    );
}
