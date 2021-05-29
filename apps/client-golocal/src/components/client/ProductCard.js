
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../assets/product-image-placeholder.jpg"
export default function ProductCard({product, shopID}){
    console.log(product)

    if (!product) product = {nom: "Test", image: "test.jpg", price: "55", rating: 5}
    let id = product.id;
    let name = product.name;
    let image = product.image;
    let price = product.price;
    let rating = product.rating

    function RenderCard() {

        return (
            <div  style={{"width":"15rem", cursor:"pointer"}}>
            <div onClick={() => {window.location.href=`https://localhost:3001/shop/item?shopID=${shopID}&itemID=${id}`}}>
                <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} src={placeHolder} alt={name}/>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{name}</span>
            </div>
            <span style={{fontFamily:"Lato"}}>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}</span>
            </div>)
    }

    return(RenderCard());
}
