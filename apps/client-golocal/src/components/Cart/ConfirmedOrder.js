import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import ShopCart from "./ShopCart";
import {Button} from "primereact/button";
import './ConfirmedOrder.css'

function redirect(){
    window.location.href='https://localhost:3001/';
}

export default function ConfirmedOrder() {

    return (
        <div id={"confirmed"}>
            <h3>Merci d'avoir passé commande avec GoLocal !</h3>
            <p>Le paiement de votre commande s'effectuera en main propre lors du retrait de votre commande en boutique aux horaires indiqués sur sa page.</p>
            <p>Cependant, si la commande nécessite un versement d'accompte, il est de votre responsabilité de prendre contact avec la boutique via les informations de contact fournies par cette dernière.</p>
            <p>L'équipe de GoLocal et vos commerçants vous remercient pour votre confiance.</p>
            <Button id="button" label="Retour à l'accueil" onClick={() => {redirect()}} className="p-button-raised" style={{width:"25%", marginTop:"1%", marginBottom:"10%"}} />
        </div>



    )
}