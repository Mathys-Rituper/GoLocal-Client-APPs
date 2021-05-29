import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ChangeItemVisibility.css"
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {
    createProductByShopID,
    getItemByID,
    getShops,
    patchItemName, patchItemVisibilityRequest,
    patchShopName
} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";
import {Toast} from "primereact/toast";
import {ToggleButton} from "primereact/togglebutton";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ChangeItemVisibility(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const shopName = params.get("shopName");
    const itemID = params.get("item");
    const itemName = params.get("itemName");
    const [checked1, setChecked1] = useState(false);
    const toast = useRef(null);


    useEffect(() => {
        getItemByID(shopID, itemID)
            .then(data => {
                setChecked1(data.data.hidden)
            });
    }, []);


    function patchItemVisibility(){
        patchItemVisibilityRequest(shopID, itemID, checked1);
    }



    return (
        <div className="container">
            <Toast ref={toast}/>
            <div className="title">Changer nom de l'item</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Changer la visibilité de l'item</label>
                <ToggleButton checked={checked1} onChange={(e) => patchItemVisibility(e.value)} onLabel="Visible" offLabel="Caché" onIcon="pi pi-check" offIcon="pi pi-times" style={{width: '40%'}} />
            </div>
        </div>
    )
}
