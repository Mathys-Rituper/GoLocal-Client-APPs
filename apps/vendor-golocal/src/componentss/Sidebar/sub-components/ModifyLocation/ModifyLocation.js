import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ModifyLocation.css"

import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createShopRequest, patchLocalisation} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ModifyLocation(){
    const params = useQuery();
    const shopID = params.get("shopID");

    const [disabled, setDisabled] = useState(true);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState();
    const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();
    const [value6, setValue6] = useState();


    const toast = useRef(null);
    function modifyLocation(){
        patchLocalisation(shopID, value1, value2, value3, value4, value5, value6).then(data => {
            // console.log(data);
            if (data.status === 1){
                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
            }else{
                toast.current.show({severity: 'success', summary: 'Succès', detail: data.data});
            }
        })
        setValue1('');
        setValue2('');
        setValue3('');
        setValue4('');
        setValue5('');
        setValue6('');
    }

    if (value1 && value2 && value3 && value4 && value5 && value6){
        if (disabled === true){
            if (value4.length === 5) {
                    setDisabled(false);
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
            <div className="title" style={{marginBottom:"0%"}}>Modification Localisation</div>
            <div style={{marginTop:"2%", display:"flex",flexDirection:"row", width:"40%"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"30%"}}>
                    <label className="label">Numéro rue</label>
                    <InputText id="username" value={value1} onChange={(e) => setValue1(e.target.value)} style={{width:"80%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"70%"}}>
                    <label className="label">Nom de la rue</label>
                    <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} className="inputText" style={{width:"100%"}}/>
                </div>
            </div>
            <div style={{marginTop:"2%", display:"flex",flexDirection:"row", width:"40%"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Région</label>
                    <InputText id="username" value={value3} onChange={(e) => setValue3(e.target.value)} style={{width:"90%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Code Postal</label>
                    <InputText id="username" value={value4} onChange={(e) => setValue4(e.target.value)} className="inputText" style={{width:"100%"}}/>
                </div>
            </div>
            <div style={{marginTop:"2%", display:"flex",flexDirection:"row", width:"40%"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Ville</label>
                    <InputText id="username" value={value5} onChange={(e) => setValue5(e.target.value)} style={{width:"90%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Pays</label>
                    <InputText id="username" value={value6} onChange={(e) => setValue6(e.target.value)} className="inputText" style={{width:"100%"}}/>
                </div>
            </div>


            <Button label="Modifier" disabled={disabled} className="p-button-raised bouton" onClick={() => modifyLocation()}/>
        </div>
    )
}




