import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../../assets/product-image-placeholder.jpg"
export default function FilteredProductCard({product}){


    if (!product) product = {nom: "Test", image: "test.jpg", price: "55", rating: "5"}
    let id = 0;
    let name = product.nom;
    let image = product.image;
    let price = product.price;

    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`./${id}`}} style={{"width":"15rem", cursor:"pointer", margin:"1%", paddingBottom:"3%"}}>
            <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} src={placeHolder} alt={name}/>
            <div style={{display:"flex", flexDirection:"column"}}>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>Nom Shop</span>
                <span style={{fontFamily:"Lato"}}>Grenoble</span>
            </div>
            </div>
        )
    }

    return(RenderCard());
}
