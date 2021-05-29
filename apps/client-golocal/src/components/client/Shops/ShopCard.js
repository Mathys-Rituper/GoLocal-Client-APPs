import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import placeHolder from "../../../assets/product-image-placeholder.jpg"
export default function ShopCard({shop}){


    if (!shop){
        shop = {id: 999999666666333333, name: "Pas de nom", image: "test.jpg", location: "Pas de ville"}
    }
    if (shop.location === null){
        shop.location = "Pas de ville";
    }
    if (shop.image === null) {
        shop.image = placeHolder
    }


    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`https://localhost:3001/shop?ID=${shop.id}&lat=${shop.location.latitude}&lng=${shop.location.longitude}`}} style={{"width":"15rem", cursor:"pointer", margin:"1%", paddingBottom:"3%"}}>
            <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} src={shop.image === placeHolder ? (shop.image) : (`data:image/jpeg;base64,${shop.image}`)}/>
            <div style={{display:"flex", flexDirection:"column"}}>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{shop.name.length >= 25 ? (`${shop.name.slice(0, 25)}...`) : (shop.name)}</span>
                <span style={{fontFamily:"Lato"}}>{shop.location.city}</span>
            </div>
            </div>
        )
    }

    return(RenderCard());
}
