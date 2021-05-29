import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../../../assets/product-image-placeholder.jpg"
export default function ProductCard({product, shopID, shopName}){


    if (!product){
        product = {id: 999999666666333333, name: "Pas de nom", image: "test.jpg"}
    }
    if (product.image === null) {
        product.image = placeHolder;
    }
    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`https://localhost:3002/artisan/shop/item?shopID=${shopID}&shopName=${shopName}&item=${product.id}&itemName=${product.name}`}} style={{"width":"15rem", cursor:"pointer", margin:"1%", paddingBottom:"3%"}}>
            <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} src={product.image === placeHolder ? (product.image) : (`data:image/jpeg;base64,${product.image}`)}/>
            <div style={{display:"flex", flexDirection:"column"}}>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{product.name.length >= 25 ? (`${product.name.slice(0, 25)}...`) : (product.name)}</span>
            </div>
            </div>
        )
    }

    return(RenderCard());
}
