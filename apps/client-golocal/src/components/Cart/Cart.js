import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import ShopCart from "./ShopCart";

export default function Cart(orders) {

    if (!orders) orders = [];

    function RenderCart() {
        return (
            <div>
                <ShopCart order={orders[0]}/>
            </div>
        )
    }

    return RenderCart();
}