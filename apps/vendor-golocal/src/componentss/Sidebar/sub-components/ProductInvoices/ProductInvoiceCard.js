import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';
import { Rating } from 'primereact/rating';
import placeHolder from "../../../../assets/product-image-placeholder.jpg"
export default function ProductInvoicesCard({invoice}){
    let date = invoice.creation.split("T");
    invoice.creation = date[0];
    function RenderCard() {
        return (
            <div style={{width:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", border:"1px solid rgb(170, 179, 179)", padding:"1%", paddingLeft:"3%", justifyContent:"space-between", marginBottom:"2%"}}>
                <div>ID : {invoice.id}</div>
                <div>Nombre packages : {invoice.invoiceItems.length}</div>
                <div>Prix Total : {invoice.totalPrice}</div>
                <div>Création : {invoice.creation}</div>
            </div>
        )
    }

    return(RenderCard());
}
