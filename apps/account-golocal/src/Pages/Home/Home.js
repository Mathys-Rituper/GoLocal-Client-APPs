import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import Account from "../../components/Account/Account";


export default function Home() {

    if (window.location.href === "https://localhost:3000/"){
        window.location.href="https://localhost:3000/account"
    }

    return(
        <div style={{textAlign:"center", marginTop:"20%", fontFamily:"Lato,sans-serif", fontSize:"200%"}}>
            Chargement ...
        </div>
    );
}
