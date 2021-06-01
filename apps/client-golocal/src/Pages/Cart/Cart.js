import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import Cart from "../../components/Cart/Cart";

export default function CartPage() {

    return(
        <div>
            <Header/>
            <div>
                <Cart/>
            </div>
        </div>
    );
}
