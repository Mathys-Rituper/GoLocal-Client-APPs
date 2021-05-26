import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import Account from "../../components/Account/Account";
import {oidcLogin} from "../../golocal-oidc/functions";


export default function AccountPage() {

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Account/>
        </div>
    );


}
