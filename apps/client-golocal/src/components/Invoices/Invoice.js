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
import './Cart.css'

function nameBodyTemplate (rowData) {
    return rowData.item.name;
}

function packageBodyTemplate (rowData) {
    return rowData.item.package.name;
}

function amountBodyTemplate(rowData) {
    return rowData.amount
}

function priceBodyTemplate (rowData) {
    return rowData.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}
    
export default function Invoice({invoice}){

    const header = "Contenu de la commande :";

    return (<div>
        <Accordion className="color cartaccordion">
            <AccordionTab header={`Votre commande chez ${invoice.shopName} du ${invoice.date} (${invoice.orderContent.length} Articles)`}>
                <DataTable value={invoice.invoiceItems} header={header}>
                    <Column field={"name"} header={"Nom du produit"} body={nameBodyTemplate}></Column>
                    <Column field={"package"} header={"Variant"} body={packageBodyTemplate}></Column>
                    <Column field={"quantity"} header={"Quantité"} body={amountBodyTemplate}></Column>
                    <Column field={"price"} header={"Prix unitaire"} body={priceBodyTemplate}></Column>
                </DataTable >
                <div>
                    <p>Prix total : {invoice.totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <p>État de la commande : {invoice.status}</p>
                </div>


            </AccordionTab>
        </Accordion>

    </div>)
}