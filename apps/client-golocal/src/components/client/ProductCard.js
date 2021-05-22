
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';

export default function ProductCard(name, image, price,rating){
    if (!name) name = "Produit sans nom";
    if (!price) price = "0.00";
    if (!image) image = "https://i.pinimg.com/originals/fb/40/19/fb4019c2f05bab822ec72082735ba697.png"
    if (!rating) rating = 0;



    function RenderCard() {
        return (<div style={{"width":"18rem"}}>
            <a href="/">
            <img style={{"width":"100%","height":(6)}} src={image} alt=""/>
            <h4>{name}</h4>

            <div style={{"display":"flex","justify-content":"space-between"}}>
            <h5>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)}</h5>
            <Rating value={rating} stars={5} readOnly={true} cancel={false}/>
            </div>
            </a>
            </div>)
    }

    return(RenderCard());
}