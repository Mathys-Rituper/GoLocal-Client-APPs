import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./CreatePackage.css"
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createPackageByShopIdAndItemID, createProductByShopID} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";
import {Toast} from "primereact/toast";
import {InputNumber} from "primereact/inputnumber";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CreatePackage(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const itemID = params.get("item");
    const [disabled, setDisabled] = useState(true);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState(10);
    const [value4, setValue4] = useState(1);
    const toast = useRef(null);
    function createProduct(){
        createPackageByShopIdAndItemID(shopID, itemID, value1, value2, value3, value4).then(data => {
            if (data.status === 1){
                console.log(data)
                toast.current.show({severity: 'error', summary: 'Erreur', detail: "Ce package existe déjà"});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.data});
            }
        })
        setValue1('');
        setValue2('');
        setValue3(10);
        setValue4(1);
    }

    if (value1 && value2 && value3 && value4){
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
            <div className="title">Création Package</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Nom du package</label>
                <InputText id="username" value={value1} onChange={(e) => setValue1(e.target.value)} className="inputText"/>
            </div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Description du package</label>
                <InputTextarea value={value2} onChange={(e) => setValue2(e.target.value)} rows={6} cols={40} className="inputText" />
            </div>
            <div style={{width: "40%", display:"flex",flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", marginTop:"2%"}}>
                <InputNumber id="stacked" value={value3} onValueChange={(e) => setValue3(e.value)} showButtons mode="currency" min={1} currency="EUR" style={{width:"45%"}}/>
                <InputNumber id="minmax-buttons" value={value4} onValueChange={(e) => setValue4(e.value)} mode="decimal" showButtons min={1} max={999} style={{width:"45%"}}/>
            </div>
            <Button label="Ajouter" disabled={disabled} className="p-button-raised bouton" onClick={() => createProduct()}/>

        </div>
    )
}
