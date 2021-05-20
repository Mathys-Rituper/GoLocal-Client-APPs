import React from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import {Button} from "primereact/button";

export default function Home() {
    const { oidcUser, login } = useReactOidc();
    if (oidcUser){
        console.log(oidcUser)
    }else{
        console.log("No User")
        // login();
    }
    return(
        <div>
            <div style={{display:"flex", flexDirection:"column"}}>
                {/*Push Architecture de base de l'application web -> Artaud Alexandre*/}
                <p>Home Page Account API</p>
                <Button variant="primary" onClick={() => {login()}} style={{width:"20%"}}> Login</Button>
            </div>
        </div>
    );
}
