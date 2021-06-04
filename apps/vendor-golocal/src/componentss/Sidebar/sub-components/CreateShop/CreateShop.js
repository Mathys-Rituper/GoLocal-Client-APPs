import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./CreateShop.css"

import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createShopRequest} from "../../../../golocal-oidc/functions";




export default function CreateShop(){


    const [disabled, setDisabled] = useState(true);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState();
    const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();
    const [value6, setValue6] = useState();
    const [value7, setValue7] = useState();
    const [value8, setValue8] = useState();
    const [value9, setValue9] = useState();

    const toast = useRef(null);
    function createShop(){
        createShopRequest(value1, value7, value9, value6, value8, value5, value4, value3, value2).then(data => {
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
        setValue7('');
        setValue8('');
        setValue9('');
    }

    if (value1 && value2 && value3 && value4 && value5 && value6 && value7 && value8 && value9){
        if (disabled === true){
            if (value3.length === 10) {
                if (value7.length === 5) {
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value2)){
                        setDisabled(false);
                    }
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
            <div className="title" style={{marginBottom:"0%"}}>Création Boutique</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                <label className="label">Nom de la boutique</label>
                <InputText id="username" value={value1} onChange={(e) => setValue1(e.target.value)} className="inputText"/>
            </div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"0.5%"}}>
                <label className="label">Mail de la boutique</label>
                <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} className="inputText"/>
            </div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"0.5%"}}>
                <label className="label">Téléphone de la boutique</label>
                <InputText id="username" value={value3} onChange={(e) => setValue3(e.target.value)} className="inputText"/>
            </div>
            <div style={{marginTop:"2%", display:"flex",flexDirection:"row", width:"40%"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"30%"}}>
                    <label className="label">Numéro rue</label>
                    <InputText id="username" value={value4} onChange={(e) => setValue4(e.target.value)} style={{width:"80%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"70%"}}>
                    <label className="label">Nom de la rue</label>
                    <InputText id="username" value={value5} onChange={(e) => setValue5(e.target.value)} className="inputText" style={{width:"100%"}}/>
                </div>
            </div>
            <div style={{marginTop:"2%", display:"flex",flexDirection:"row", width:"40%"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Région</label>
                    <InputText id="username" value={value6} onChange={(e) => setValue6(e.target.value)} style={{width:"90%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Code Postal</label>
                    <InputText id="username" value={value7} onChange={(e) => setValue7(e.target.value)} className="inputText" style={{width:"100%"}}/>
                </div>
            </div>
            <div style={{marginTop:"2%", display:"flex",flexDirection:"row", width:"40%"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Ville</label>
                    <InputText id="username" value={value8} onChange={(e) => setValue8(e.target.value)} style={{width:"90%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"50%"}}>
                    <label className="label">Pays</label>
                    <InputText id="username" value={value9} onChange={(e) => setValue9(e.target.value)} className="inputText" style={{width:"100%"}}/>
                </div>
            </div>


            <Button label="Créer Boutique" disabled={disabled} className="p-button-raised bouton" onClick={() => createShop()}/>
        </div>
    )
}




