import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../../../assets/product-image-placeholder.jpg"
export default function PackageCard({itemPackage, shopID, itemID, itemName, shopName}){


    if (!itemPackage){
        itemPackage = {id: 999999666666333333, name: "Pas de nom", asStocks: false}
    }
    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`https://localhost:3002/artisan/shop/item?shopID=${shopID}&shopName=${shopName}&item=${itemID}&itemName=${itemName}&packageID=${itemPackage.id}`}} style={{"width":"15rem", cursor:"pointer", margin:"1%", paddingBottom:"3%"}}>
            <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} src={placeHolder}/>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{itemPackage.name.length >= 15 ? (`${itemPackage.name.slice(0, 15)}...`) : (itemPackage.name)}</span>
                {itemPackage ? (
                    <span style={{fontFamily:"Lato", fontSize:"120%", color:"green"}}>En Stock</span>
                ) : (
                    <span style={{fontFamily:"Lato", fontSize:"120%", color:"red"}}>Indisponible</span>
                )
                }
            </div>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{itemPackage.price} €</span>
            </div>
        )
    }

    return(RenderCard());
}
