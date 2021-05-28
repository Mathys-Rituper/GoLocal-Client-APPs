import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./ChangeOpenings.css"
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {createProductByShopID, patchShopName} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";
import {Toast} from "primereact/toast";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {InputMask} from "primereact/inputmask";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ChangeOpenings(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const [disabled, setDisabled] = useState(true);
    const [day, setDay] = useState(null);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [date3, setDate3] = useState(null);
    const [date4, setDate4] = useState(null);
    const days = [
        {label: 'Lundi', value: 0},
        {label: 'Mardi', value: 1},
        {label: 'Mercredi', value: 2},
        {label: 'Jeudi', value: 3},
        {label: 'Vendredi', value: 4},
        {label: 'Samedi', value: 5},
        {label: 'Dimanche', value: 6},
    ];
    const toast = useRef(null);
    function createProduct(){
        // patchShopName(shopID, shopName, value1).then(data => {
        //     if (data.status === 1){
        //         toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
        //     }else{
        //         toast.current.show({severity: 'success', summary: 'Succès', detail: data.data});
        //     }
        // })
        // setValue1('');
    }

    if (day !== null && date1 !== null && date2 !== null && date3 !== null && date4 !== null){
        console.log("Succès" + day + date1 + date2 + date3 + date4)
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
            <div className="title">Changer nom de la boutique</div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%1", width:"40%"}}>
                <label className="label">Choisir un jour à changer</label>
                <Dropdown value={day} options={days} onChange={(e) => setDay(e.value)} placeholder="Jour"/>
            </div>
            <div className="title" style={{fontSize:"120%", marginTop:"2%", marginBottom:"0%"}}>Horaire Matinée</div>
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"40%", justifyContent:"space-between"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"45%"}}>
                    <label className="label">Ouverture</label>
                    <InputMask mask="99h99" value={date1} onChange={(e) => setDate1(e.value)} style={{width:"100%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap",width:"45%"}}>
                    <label className="label">Fermeture</label>
                    <InputMask mask="99h99" value={date2} onChange={(e) => setDate2(e.value)} style={{width:"100%"}}/>
                </div>
            </div>
            <div className="title" style={{fontSize:"120%", marginTop:"2%", marginBottom:"0%"}}>Horaire Après-midi</div>
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"40%", justifyContent:"space-between"}}>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", width:"45%"}}>
                    <label className="label">Ouverture</label>
                    <InputMask mask="99h99" value={date3} onChange={(e) => setDate3(e.value)} style={{width:"100%"}}/>
                </div>
                <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap",width:"45%"}}>
                    <label className="label">Fermeture</label>
                    <InputMask mask="99h99" value={date4} onChange={(e) => setDate4(e.value)} style={{width:"100%"}}/>
                </div>
            </div>

            <Button label="Modifier" disabled={disabled} className="p-button-raised bouton" onClick={() => createProduct()}/>

        </div>
    )
}
