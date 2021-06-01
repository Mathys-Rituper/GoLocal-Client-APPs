import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import {Rating} from "primereact/rating";

export default function CommentaryCard({commentary}){

    if (!commentary){
        commentary = {
            rate: 1,
            body : "Test body d'un commentaire"
        }
    }

    function RenderCard() {
        return (
            <div style={{width:"100%", borderBottom:"1px solid rgb(170, 179, 179)", paddingLeft:"2%", paddingTop:"0.5%", paddingBottom:"2%", boxShadow: "rgb(240, 240, 240) 3px 3px 8px"}}>
                <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                    <Rating value={commentary.rate} readOnly stars={5} cancel={false} />
                    <span style={{fontFamily:"Lato", fontSize:"100%"}}>{commentary.body}</span>
                </div>
            </div>
        )
    }

    return(RenderCard());
}
