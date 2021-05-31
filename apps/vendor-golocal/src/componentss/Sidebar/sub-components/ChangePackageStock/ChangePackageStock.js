import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./ChangePackageStock.css"
import {Button} from "primereact/button";
import {createProductByShopID, getItemByID, patchItemName, patchShopName} from "../../../../golocal-oidc/functions";
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
    const [disabled, setDisabled] = useState(true);
    const [value1, setValue1] = useState();
    const toast = useRef(null);
    function createProduct(){
        patchItemName(shopID, itemID, itemName, value1).then(data => {
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.data});
                setTimeout(() => {
                    window.location.replace(`https://localhost:3002/artisan/shop?shopID=${shopID}&shopName=${shopName}`)
                },500)
            }
        })
        setValue1('');
    }

    if (value1){
        if (disabled === true){
            setDisabled(false);
        }
    }else{
        if (disabled === false) {
            setDisabled(true);
        }
    }

    return (
        <div className="container">
            <Toast ref={toast}/>
            <div className="title">Changer les stocks du package</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Stocks</label>
                <InputNumber id="minmax-buttons" value={value1} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons min={1} max={999} />
            </div>

            <Button label="Modifier" disabled={disabled} className="p-button-raised bouton" onClick={() => createProduct()}/>

        </div>
    )
}
