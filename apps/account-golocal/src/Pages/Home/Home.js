import React, {useState} from 'react';
import { Sidebar } from 'primereact/sidebar';
import { withOidcUser, OidcSecure } from '@axa-fr/react-oidc-context';
import Header from "../../Layouts/Header/Header";
import {Button} from "primereact/button";

export default function Home() {
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
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
