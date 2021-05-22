
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';

export default function ProductCard(product){


    if (!product) product = {nom: "Test", image: "test.jpg", price: "55", rating: "5.0"}

    let name = product.nom;
    let image = product.image;
    let price = product.price;
    let rating = product.rating

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