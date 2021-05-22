import React from 'react';
import Header from "../../Layout/Header/Header";
import MyAccount from "../../components/client/MyAccount/MyAccount";
import Shop from "../../components/client/Shop/Shop";

export default function Home() {

    return(
        <div>
            <Header/>
            <div>
                {/*Push Architecture de base de l'application web -> Artaud Alexandre*/}
                <Shop />
            </div>
        </div>
    );
}
