import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./CreateProduct.css"
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createProductByShopID} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";
import {Toast} from "primereact/toast";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CreateProduct(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const [disabled, setDisabled] = useState(true);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const toast = useRef(null);
    function createProduct(){
        createProductByShopID(shopID, value1, value2).then(data => {
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.data});
            }
        })
        setValue1('');
        setValue2('');
    }

    if (value1 && value2){
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
            <div className="title">Création Produit</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Nom du Produit</label>
                <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} className="inputText"/>
            </div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Description du produit</label>
                <InputTextarea value={value1} onChange={(e) => setValue1(e.target.value)} rows={6} cols={40} className="inputText" />
            </div>
            <Button label="Ajouter" disabled={disabled} className="p-button-raised bouton" onClick={() => createProduct()}/>

        </div>
    )
}
