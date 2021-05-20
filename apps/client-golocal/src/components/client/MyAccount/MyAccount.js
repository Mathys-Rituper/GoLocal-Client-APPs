import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Rating } from 'primereact/rating';
import React from 'react';
import MyAccountMenuItem from "./MyAccountMenuItem";
export default function MyAccount() {

    function renderMyAccount() {
            return(

                <div className="myaccount-container">
                    <MyAccountMenuItem className="wrapitem" typeMenuItem={"security"}/>
                    <MyAccountMenuItem className="wrapitem" typeMenuItem={"orders"}/>
                    <MyAccountMenuItem className="wrapitem" typeMenuItem={"basket"}/>
                    <MyAccountMenuItem className="wrapitem" typeMenuItem={"messages"}/>
                    <MyAccountMenuItem className="wrapitem" typeMenuItem={"seller"}/>
                    <MyAccountMenuItem className="wrapitem" typeMenuItem={"faq"}/>




                </div>
            )
    }

    return(renderMyAccount());
}
