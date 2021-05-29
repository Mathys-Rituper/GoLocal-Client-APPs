import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../../../assets/product-image-placeholder.jpg"
export default function ServiceCard({service, shopID, shopName}){


    if (!service){
        service = {id: 999999666666333333, name: "Pas de nom", image: "test.jpg"}
    }
    if (service.image === null) {
        service.image = placeHolder;
    }
    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`https://localhost:3002/artisan/shop/item?shopID=${shopID}&shopName=${shopName}&item=${service.id}&itemName=${service.name}`}} style={{"width":"15rem", cursor:"pointer", margin:"1%", paddingBottom:"3%"}}>
                <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} src={service.image === placeHolder ? (service.image) : (`data:image/jpeg;base64,${service.image}`)}/>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <span style={{fontFamily:"Lato", fontSize:"120%"}}>{service.name.length >= 25 ? (`${service.name.slice(0, 25)}...`) : (service.name)}</span>
                </div>
            </div>
        )
    }

    return(RenderCard());
}
