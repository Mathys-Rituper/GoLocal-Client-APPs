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
                return {title:"Connexion & Sécurité", url: "/security"};
                break;

            case "orders" :
                return {title:"Vos Commandes", url: "/orders"};
                break;

            case "basket":
                return {title:"Votre Panier", url: "/basket"};
                break;

            case "messages":
                return {title:"Messagerie", url: "/messages"};
                break;

            case "seller":
                return {title:"Devenir vendeur", url: "/seller"};
                break;
            case "faq":
                return {title:"FAQ", url: "/faq"};
                break;
                default:
                    return "Undefinied";
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
            case "basket":
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
            <a style={{textDecoration:"none"}} href={getName().url}>

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
