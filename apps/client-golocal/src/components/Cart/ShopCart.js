import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Rating } from 'primereact/rating';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Accordion, AccordionTab} from "primereact/accordion";
import React from 'react';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
function getPrice(content) {
    let somme =0;
    for (const row of content){
        somme+=row.price*row.quantity;
    }
    return somme;
}

function handleClick(id){
    console.log(id)
}

function imageBodyTemplate(rowData) {
    return <img src={rowData.image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} style={{width:"50%"}}/>;
}

function priceBodyTemplate (rowData) {
    return rowData.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function stockBodyTemplate(rowData) {
    return(<i className={rowData.instock ? "pi pi-check" : "pi pi-times" } style={{color:rowData.instock ? "green" : "red"}}></i>)
}

function deleteBodyTemplate(rowData){
   return(<i className="pi pi-trash" onClick={()=>deleteLine(rowData)}></i>)
}


function quantityBodyTemplate(rowData){

    return(
        <div style={{display:"flex"}}>
            <InputNumber value={rowData.quantity} onValueChange={(e) =>{
                rowData.quantity=e.value;
                }} min={1} max={30} showButtons style={{width:"80%"}}/>
            <Button icon="pi pi-check" onClick={()=>patchRow(rowData)}/>
        </div> );

}

function deleteLine(rowData){
    console.log(`Suppression de la ligne ${rowData.rowId} dans la commande ${rowData.cartId} du shop ${rowData.shopId}`)
    window.location.reload(false);
    //TODO branchement API
}

function patchRow(rowData){
    console.log(`Modification d'une ligne de commande, quantité = ${rowData.quantity}`);
    //window.location.reload(false);

    //TODO branchement API
}

export default function ShopCart({order}){

    const header = "Contenu du panier :";

    return (<div>
        <Accordion className="color">
            <AccordionTab header={`Votre panier chez ${order.shopName} (${order.orderContent.length} Articles)`}>
                <DataTable value={order.orderContent} header={header}>
                    <Column field={"image"} header={"Image"} body={imageBodyTemplate} ></Column>
                    <Column field={"name"} header={"Nom du produit"}></Column>
                    <Column field={"package"} header={"Variant"}></Column>
                    <Column field={"quantity"} header={"Quantité"} body={quantityBodyTemplate}></Column>
                    <Column field={"price"} header={"Prix"} body={priceBodyTemplate}></Column>
                    <Column field={"stock"} header={"En stock"} body={stockBodyTemplate}></Column>
                    <Column field={"delete"} header={"Retirer"} body={deleteBodyTemplate}></Column>
                </DataTable >
                <div>
                    <p>Prix total : {getPrice(order.orderContent).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <Button label="Passer commande" onClick={()=>{handleClick(order.cartId)}} />
                </div>


            </AccordionTab>
        </Accordion>

    </div>)
}