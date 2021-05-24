import React from 'react';
import Header from "../../Layout/Header/Header";
import Shops from "../../components/client/Shops/Shops";
import {getUserInfo} from "../../golocal-oidc/functions";

export default function Home() {
    // console.log(getUserInfo())
    return(
        <div>
            <Header/>
            <div>
                <Shops />
            </div>
        </div>
    );
}
