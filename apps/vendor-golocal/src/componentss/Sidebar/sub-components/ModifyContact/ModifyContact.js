import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ModifyContact.css"

import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createShopRequest, patchContacts} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ModifyContact(){
    const params = useQuery();
    const shopID = params.get("shopID")
    const [disabled, setDisabled] = useState(true);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();


    const toast = useRef(null);
    function modifyContact(){
        patchContacts(shopID, value1, value2).then(data => {
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
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value1)) {
                if (value2.length === 10) {
                        setDisabled(false);
                }
            }
        }
        }else{
            if (disabled === false) {
            setDisabled(true);
        }
    }

    return (
        <div className="container">
            <Toast ref={toast}/>
            <div className="title" style={{marginBottom:"0%"}}>Modifier les contacts de la boutique</div>
            <div style={{marginBottom:"1%", fontFamily:"Lato, sans-serif"}}>Pour ne pas changer l'adresse mail ou le téléphone de contact <br/> fournissez leurs valeurs actuelles</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"0.5%"}}>
                <label className="label">Mail de la boutique</label>
                <InputText id="username" value={value1} onChange={(e) => setValue1(e.target.value)} className="inputText"/>
            </div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"0.5%"}}>
                <label className="label">Téléphone de la boutique</label>
                <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} className="inputText"/>
            </div>

            <Button label="Modifier" disabled={disabled} className="p-button-raised bouton" onClick={() => modifyContact()}/>
        </div>
    )
}




