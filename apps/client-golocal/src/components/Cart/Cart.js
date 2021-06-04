import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import ShopCart from "./ShopCart";
import {getCart} from "../../golocal-oidc/functions";
import {Button} from "primereact/button";
function renderOrders(orders) {
    const components= []
    orders.forEach(order => {
        components.push(<ShopCart order={order}/>)
    })
    // for (const order of orders) {
    //     components.push(<ShopCart order={order}></ShopCart>)
    // }
    return components
}

export default function Cart() {

    const [cartRequest, setCartRequest] = useState({
        loading: false,
        cart: null,
    });

    useEffect(() => {
        // Note that this replaces the entire object and deletes user key!
        setCartRequest({ loading: true });
        getCart()
            .then(data => {
                setCartRequest({
                    loading: false,
                    cart: data,
                });
            });
    }, []);

    const { loading, cart } = cartRequest;
    let ordersArray = [];

    if (cart){
        cart.data.forEach(shop => {
            ordersArray.push({
                shopName: shop.shop.name,
                cartId: shop.shop.id,
                cartPackages: shop.cartPackages
            })
        })
    }


    return (
        <div>
        {cart && cart.data.length !== 0 ? (
            // renderOrders(orders)
            renderOrders(ordersArray)
        ) : (
            <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"10%"}}>
                <div>Vous n'avez pas de panier !</div>
                <Button style={{marginTop:"3%"}} label="Retour" className="p-button-raised" onClick={() => window.location.href="https://localhost:3001/"}/>
            </div>
        )}
        </div>
    );
}
