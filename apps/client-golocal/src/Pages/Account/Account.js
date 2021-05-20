import React from 'react';
import Header from "../../Layout/Header/Header";
import MyAccount from "../../components/client/MyAccount/MyAccount";
import { useReactOidc } from '@axa-fr/react-oidc-context';

export default function Account() {
    const { oidcUser } = useReactOidc();
    if (!oidcUser){
        window.location.href='./'
    }else{
        return(
            <div>
                <Header/>
                <div>
                    <MyAccount/>
                </div>
            </div>
        );
    }
}
