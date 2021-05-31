
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../assets/product-image-placeholder.jpg"
export default function ServiceCard({service, shopID}){
    console.log(service)

    if (!service) service = {nom: "Test", image: "test.jpg", price: "55", rating: 5}
    let id = service.id;
    let name = service.name;
    let image;
    if (service.image === null){
        image = placeHolder;
    }else{
        image = service.image;
    }

    function RenderCard() {

        return (
            <div  style={{"width":"15rem", cursor:"pointer"}}>
            <div onClick={() => {window.location.href=`https://localhost:3001/shop/item?shopID=${shopID}&serviceID=${id}`}}>
                <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} src={image} alt={name}/>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{name}</span>
            </div>
            </div>)
    }

    return(RenderCard());
}
