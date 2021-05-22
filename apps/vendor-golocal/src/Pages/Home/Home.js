import React, {useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import {withOidcUser, OidcSecure, useReactOidc} from '@axa-fr/react-oidc-context';
import Header from "../../Layouts/Header/Header";
import {Button} from "primereact/button";
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import jwt from 'jsonwebtoken';
import { compose, lifecycle } from 'recompose';
import { withAuthentication } from '@axa-fr/react-oidc-context-fetch';

export default function Home() {
    const {oidcUser} = useReactOidc();
    let access_token, decodedToken;
    if  (oidcUser){
        access_token = oidcUser.access_token;
        decodedToken = jwt.decode(access_token);
        console.log({token : access_token, decodedToken: decodedToken})
    }
    const enhance = compose(
        withAuthentication,
        lifecycle({
            componentWillMount() {
                // This "fetch" manage more than the orginal fetch
                this.props
                    .fetch('/api/shops/1')
                    .then(function(response) {
                        console.log(response)
                    })
                    .then(function(body) {
                        console.log(body)
                    });
            }
        })
    );
    enhance();

    return(
        <OidcSecure>
        <div>
            <Header/>
            <div style={{display:"flex", flexDirection:"column"}}>
                {/*Push Architecture de base de l'application web -> Artaud Alexandre*/}

                <p >Home Page Account API</p>
            </div>
        </div>
        </OidcSecure>
    );
}
