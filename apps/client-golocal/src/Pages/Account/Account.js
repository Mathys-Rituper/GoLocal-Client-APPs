import React from 'react';
import Header from "../../Layout/Header/Header";
import MyAccount from "../../components/client/MyAccount/MyAccount";

export default function Account() {

    return(
        <div>
            <Header/>
            <div>
                <MyAccount/>
            </div>
        </div>
    );
}
