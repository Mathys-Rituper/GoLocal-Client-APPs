import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import ConfirmedOrder from "../../components/Cart/ConfirmedOrder";

export default function ConfirmedOrderPage() {

    return(
        <div>
            <Header/>
            <div>
                <ConfirmedOrder/>
            </div>
        </div>
    );
}
