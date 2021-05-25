import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Rating } from 'primereact/rating';
import React from 'react';
import './MyAccount.css';
import Box from '../../../assets/pictos/box.png';
import Cart from '../../../assets/pictos/cart.png';
import Faq from '../../../assets/pictos/faq.png';
import Letter from '../../../assets/pictos/letter.png';
import Shield from '../../../assets/pictos/shield.png';
import Shop from '../../../assets/pictos/shop.png';

export default function MyAccountMenuItem({ typeMenuItem }) {

    function getName() {
        switch(typeMenuItem) {
            case "security" :
                return {title:"Connexion & Sécurité", url: "https://localhost:3000/", target:"_self"};
                break;

            case "orders" :
                return {title:"Vos Commandes", url: "/orders", target:"_self"};
                break;

            case "cart":
                return {title:"Votre Panier", url: "/cart", target:"_self"};
                break;

            case "messages":
                return {title:"Messagerie", url: "/messages", target:"_self"};
                break;

            case "seller":
                return {title:"Devenir vendeur", url: "https://localhost:3002/", target:"_self"};
                break;
            case "faq":
                return {title:"FAQ", url: "/faq", target:"_self"};
                break;
                default:
                    return "Undefined";
                    break;
        }
    }

    function getImage() {
        switch(typeMenuItem) {
            case "security" :
                return Shield;
                break;
            case "orders" :
                return Box;
                break;
            case "cart":
                return Cart;
                break;
            case "messages":
                return Letter;
                break;
            case "seller":
                return Shop;
                break;
            case "faq":
                return Faq;
                break;
            default:
                return Letter;
                break;
        }
    }
    function MyAccountMenuItem() {

        return (
            <div className="border-blue-rounded wrapitem">
            <a style={{textDecoration:"none"}} href={getName().url} target={getName().target}>

            <div className="container-menuitem" >
                <h4 className="text-item">{getName().title}</h4>
                <img src={getImage()} alt="."/>

            </div>
            </a>
            </div>

        )
    }
    return(MyAccountMenuItem());
}
