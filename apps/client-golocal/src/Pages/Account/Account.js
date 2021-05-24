import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import MyAccount from "../../components/client/MyAccount/MyAccount";
import { useReactOidc } from '@axa-fr/react-oidc-context';
import {Redirect} from "react-router-dom";
import {Button} from "primereact/button";
import {goLocalGetUserInfo} from "../../golocal-oidc/functions";


function redirect(){
    window.location.replace("./")
}
export default function Account() {
    const [oidcUser, setOidcUser] = useState(null);
    if (oidcUser === null ){
        goLocalGetUserInfo().then(data => setOidcUser(data));
    }
    return(
        <div>
            {!oidcUser ? (
                <div style={{alignItems:"center", fontSize:"2rem", marginTop:"20%", display:"flex", flexDirection:"column"}}>
                    <b>Vous n'êtes pas authentifié</b>
                    <Button variant="primary" label="RETOUR" onClick={() => {redirect()}} style={{width:"4.5%",marginTop:"2%"}}/>
                </div>
            ) : (
                <div>
                    <Header/>
                    <div>
                        <MyAccount/>
                    </div>
                </div>
            )}

        </div>
    );

}
