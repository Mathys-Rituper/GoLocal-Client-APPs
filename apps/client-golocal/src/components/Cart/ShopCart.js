import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Rating } from 'primereact/rating';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Accordion, AccordionTab} from "primereact/accordion";
import React, {useRef} from 'react';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import './Cart.css'
import {addToCartItem, removeItemFromCart, removeShopFromCart, validateCart} from "../../golocal-oidc/functions";
import {Toast} from "primereact/toast";
import {Dropdown} from "primereact/dropdown";

function getPrice(content) {
    let somme =0;
    for (const row of content){
        somme+=row.price*row.quantity;
    }
    return somme;
}



function priceBodyTemplate (rowData) {
    return rowData.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function stockBodyTemplate(rowData) {
    return(<i className={rowData.instock === true ? "pi pi-times" : "pi pi-check" } style={{color:rowData.instock === true ? "red" : "green"}}></i>)
}




function quantityBodyTemplate(rowData) {
    console.log(rowData)
    let originalQuantity = rowData.quantity;
    const numbers = [
        { name: '0', value: 0 },
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: '11', value: 11 },
        { name: '12', value: 12 },
        { name: '13', value: 13 },
        { name: '14', value: 14 },
        { name: '15', value: 15 },
        { name: '16', value: 16 },
        { name: '17', value: 17 },
        { name: '18', value: 18 },
        { name: '19', value: 19 },
        { name: '20', value: 20 },
        { name: '21', value: 21 },
        { name: '22', value: 22 },
        { name: '23', value: 23 },
        { name: '24', value: 24 },
        { name: '25', value: 25 },
        { name: '26', value: 26 },
        { name: '27', value: 27 },
        { name: '28', value: 28 },
        { name: '29', value: 29 },
        { name: '30', value: 30 },
        { name: '31', value: 31 },
        { name: '32', value: 32 },
        { name: '33', value: 33 },
        { name: '34', value: 34 },
        { name: '35', value: 35 },
        { name: '36', value: 36 },
        { name: '37', value: 37 },
        { name: '38', value: 38 },
        { name: '39', value: 39 },
        { name: '40', value: 40 },
        { name: '41', value: 41 },
        { name: '42', value: 42 },
        { name: '43', value: 43 },
        { name: '44', value: 44 },
        { name: '45', value: 45 },
        { name: '46', value: 46 },
        { name: '47', value: 47 },
        { name: '48', value: 48 },
        { name: '49', value: 49 },
        { name: '50', value: 50 },
        { name: '51', value: 51 },
        { name: '52', value: 52 },
        { name: '53', value: 53 },
        { name: '54', value: 54 },
        { name: '55', value: 55 },
        { name: '56', value: 56 },
        { name: '57', value: 57 },
        { name: '58', value: 58 },
        { name: '59', value: 59 },
        { name: '60', value: 60 },
        { name: '61', value: 61 },
        { name: '62', value: 62 },
        { name: '63', value: 63 },
        { name: '64', value: 64 },
        { name: '65', value: 65 },
        { name: '66', value: 66 },
        { name: '67', value: 67 },
        { name: '68', value: 68 },
        { name: '69', value: 69 },
        { name: '70', value: 70 },
        { name: '71', value: 71 },
        { name: '72', value: 72 },
        { name: '73', value: 73 },
        { name: '74', value: 74 },
        { name: '75', value: 75 },
        { name: '76', value: 76 },
        { name: '77', value: 77 },
        { name: '78', value: 78 },
        { name: '79', value: 79 },
        { name: '80', value: 80 },
        { name: '81', value: 81 },
        { name: '82', value: 82 },
        { name: '83', value: 83 },
        { name: '84', value: 84 },
        { name: '85', value: 85 },
        { name: '86', value: 86 },
        { name: '87', value: 87 },
        { name: '88', value: 88 },
        { name: '89', value: 89 },
        { name: '90', value: 90 },
        { name: '91', value: 91 },
        { name: '92', value: 92 },
        { name: '93', value: 93 },
        { name: '94', value: 94 },
        { name: '95', value: 95 },
        { name: '96', value: 96 },
        { name: '97', value: 97 },
        { name: '98', value: 98 },
        { name: '99', value: 99 }
    ];
    function add(shopID, itemID, packageID, quantity){
        addToCartItem(shopID, itemID, packageID, quantity)
        window.location.reload();
    }
    function remove(shopID, packageID, quantity){
        removeItemFromCart(shopID, packageID, quantity)
        window.location.reload();
    }
    return (
        <div style={{display: "flex", width:"100%"}}>
            <Dropdown value={rowData.quantity} options={numbers} onChange={(e) => {
                e.value > originalQuantity ? (
                    add(rowData.shopID, rowData.itemID, rowData.id, e.value - originalQuantity)
                ) : (
                    remove(rowData.shopID, rowData.id, originalQuantity - e.value)
                )
            }} optionLabel="name" placeholder="Select a quantity" />

        </div>);

}


export default function ShopCart({order}){

    function deleteShopCart (sid){
        removeShopFromCart(sid).then(data => {
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.message});
            }
        })
    }
    function deleteBodyTemplate(rowData){
        return(<i className="pi pi-trash" onClick={() => deleteLine(rowData)}/>)
    }
    function deleteLine(rowData){
        removeItemFromCart(order.cartId, rowData.id, rowData.quantity).then(data =>{
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.message});
            }
        })
    }
    function handleClick(id){
        validateCart(id).then(data => {
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.message});
                setTimeout(() => {
                    window.location.replace("https://localhost:3001/confirmedOrder")
                }, 500)
            }
        });
    }
    const toast = useRef(null);
    const header = "Contenu du panier :";
    const cartPackages = order.cartPackages;
    let content = [];
    cartPackages.forEach(r => {
        content.push({
            shopID: order.cartId,
            id : r.package.id,
            itemID: r.package.item.id,
            package : r.package.name,
            stock : r.package.asStocks,
            name : r.package.item.name,
            price : r.price,
            quantity: r.quantity
        })

    })

    return (<div>
        <Toast ref={toast}/>
        <Accordion className="color cartaccordion">
            <AccordionTab header={`Votre panier chez ${order.shopName} (${order.cartPackages.length} Articles)`}>
                <DataTable value={content} header={header}>
                    <Column field={"name"} header={"Nom du produit"}/>
                    <Column field={"package"} header={"Variant"}/>
                    <Column field={"quantity"} header={"Quantité"} body={quantityBodyTemplate}/>
                    <Column field={"price"} header={"Prix unitaire"} body={priceBodyTemplate}/>
                    <Column field={"stock"} header={"En stock"} body={stockBodyTemplate}/>
                    <Column field={"delete"} header={"Retirer"} body={deleteBodyTemplate}/>
                </DataTable >
                <div>
                    <p style={{marginLeft:"0.3%"}}>Prix total : {getPrice(order.cartPackages).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Button  label="Passer commande" onClick={()=>{handleClick(order.cartId)}} />
                        <Button style={{backgroundColor:"#c20d00", borderColor:"#c20d00"}} label="Supprimer Panier" onClick={()=>{deleteShopCart(order.cartId)}} />
                    </div>

                </div>


            </AccordionTab>
        </Accordion>

    </div>)
}
