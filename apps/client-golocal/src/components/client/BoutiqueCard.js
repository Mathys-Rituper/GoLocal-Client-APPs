import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, {useEffect, useRef, useState} from 'react';
import placeHolder from "../../assets/product-image-placeholder.jpg";
import {Rating} from "primereact/rating";

export default function BoutiqueCard({boutique}){


    if (!boutique) boutique = {id:1,nom: "Test", image: "test.jpg", category:"Art",city:"Grenoble"}
    let id = 0;
    let name = boutique.nom;
    let image = boutique.image;
    let category = boutique.category;
    let city = boutique.city

    function RenderCard() {
        return (
            <div onClick={() => {window.location.href=`/shop?ID=${id}`}} style={{"width":"15rem", cursor:"pointer"}}>
                <img style={{width:"100%",minHeight:"200px", border:"1px solid black"}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} src={placeHolder} alt={name}/>
                <span style={{fontFamily:"Lato", fontSize:"120%"}}>{name}</span>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <span style={{fontFamily:"Lato"}}>{category}</span>
                    <span style={{fontFamily:"Lato"}}>{city}</span>
                </div>

            </div>)
    }

    return(RenderCard());
}
