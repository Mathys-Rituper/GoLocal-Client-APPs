import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ChangePackageStock.css"
import {Button} from "primereact/button";
import {
    createProductByShopID,
    getItemByID,
    patchItemName,
    patchPackageStocks,
    patchShopName
} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";
import {Toast} from "primereact/toast";
import {InputNumber} from "primereact/inputnumber";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ChangePackageStock(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const shopName = params.get("shopName");
    const itemID = params.get("item");
    const itemName = params.get("itemName");
    const packageID = params.get("packageID");
    const [itemRequest, setItemRequest] = useState({
        loading: false,
        packageOfItem: null,
    });

    useEffect(() => {
        // Note that this replaces the entire object and deletes user key!
        setItemRequest({ loading: true });
        getItemByID(shopID, itemID, true)
            .then(data => {
                let packageOfItem;
                data.data.packages.forEach(packagee => {
                    if (packagee.id === parseInt(packageID)){
                        packageOfItem = packagee
                    }
                })
                setItemRequest({
                    loading: false,
                    packageOfItem: packageOfItem,
                });

            });
    }, []);

    const { loading, packageOfItem } = itemRequest;
    // console.log(packageOfItem)
    const [value1, setValue1] = useState();
    const toast = useRef(null);
    function changeStocks(){
        patchPackageStocks(shopID, itemID, packageID, value1).then(data => {
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.data});
                setTimeout(() => {
                    window.location.reload();
                }, 500)

            }
        })
    }



    return (
        <div>
            {packageOfItem ? (
                <div className="container">
                    <Toast ref={toast}/>
                    <div className="title">Changer les stocks de {packageOfItem.name}</div>
                    <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                        <label className="label">Stocks</label>
                        <InputNumber style={{width:"40%"}} id="minmax-buttons" value={packageOfItem.stocks} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons min={1} max={999} />
                    </div>

                    <Button label="Modifier" className="p-button-raised bouton" onClick={() => changeStocks()}/>

                </div>
            ) : (
                <div/>
            )}
        </div>

    )
}
