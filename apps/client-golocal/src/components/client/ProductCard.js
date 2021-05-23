
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../assets/product-image-placeholder.jpg"
export default function ProductCard({product}){


    if (!product) product = {nom: "Test", image: "test.jpg", price: "55", rating: "5"}
    let id = 0;
    let name = product.nom;
    let image = product.image;
    let price = product.price;
    let rating = product.rating

    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`./${id}`}} style={{"width":"15rem", cursor:"pointer"}}>
            <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} src={placeHolder} alt={name}/>
            <span style={{fontFamily:"Lato", fontSize:"120%"}}>{name}</span>

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <span style={{fontFamily:"Lato"}}>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}</span>
            <Rating value={rating} stars={5} readOnly cancel={false}/>
            </div>

            </div>)
    }

    return(RenderCard());
}
