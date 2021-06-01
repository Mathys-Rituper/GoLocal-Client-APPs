import React from 'react';
import Header from "../../Layout/Header/Header";
import "./BecomeVendor.css";
import { Button } from 'primereact/button';

export default function BecomeVendor(){

    return(
        <div>
            <Header/>

            <h1>Devenir vendeur</h1>

            <h2 style={{textAlign: "center"}}>C'est quoi un vendeur ?</h2>

            <p style={{textAlign: "center"}}>
                Sur Go Local, un vendeur peut vendre ses produits et ses services aux personnes locales<br/>
                Un vendeur est une personne qui souhaite être aider à promouvoir sa boutique durant cette période difficile<br/>
                Le rayon d'action de notre site est de 50 km maximum autour de votre position<br/>
                Go Local joue uniquement un rôle d'intermédiaire entre le vendeur et les particuliers

            </p>

            <h2 style={{textAlign: "center"}}>Comment devient-on vendeur ?</h2>

            <p style={{textAlign: "center"}}>
                A partir du moment où vous créez un compte sur Go Local, vous pouvez devenir vendeur <br/>
                Il vous suffit uniquement d'accéder aux panel artisan afin de commencer à créer vos boutiques <br/>
                Go Local en tant qu'intermédiaire ne dispose pas de système de paiement, obligeant les vendeurs à déclarer leur revenus produits lors des ventes <br/>
            </p>
            <div className="button">
                <Button label="Accès au panel artisan" onClick={()=> {window.open("https://localhost:3002/", "_blank")}} className="p-button-raised p-button-rounded p-button-lg" />
            </div>
        </div>
    );
}
