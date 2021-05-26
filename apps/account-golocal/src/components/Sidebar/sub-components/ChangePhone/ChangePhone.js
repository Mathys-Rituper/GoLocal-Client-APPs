import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ChangePhone.css"
import {InputText} from "primereact/inputtext";
import {goLocalGetUserInfo, patchPhone} from "../../../../golocal-oidc/functions";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";



export default function ChangePhone(){
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [data, setData] = useState('');
    const toast = useRef(null);
    const [userRequest, setUserRequest] = useState({
        loading: false,
        user: null,
    });
    const regex = new RegExp('^\\d+$');
    useEffect(() => {
        setUserRequest({ loading: true });
        goLocalGetUserInfo()
            .then(data => {
                setUserRequest({
                    loading: false,
                    user: data,
                });
            });
    }, []);

    const { loading, user } = userRequest;
    let phone = null;
    let phoneBool = false;
    if (user){
        if (user.phoneNumber === null){
            console.log("test");
            phone = "Aucun numéro associé au compte pour le moment";
        }else{
            console.log("test2")
            phone = user.phoneNumber
            phoneBool = true;
        }
    }else{
        phone = "Chargement ...";
    }


    return (
        <div className="container">
            <div className="title">Changement Téléphone</div>
            <Toast ref={toast}/>
            {phoneBool === false ? (
                <div className="phoneText">{phone}</div>
            ) : (
                <div className="phoneText">Votre numéro de téléphone actuel : {phone}</div>
            )
            }
            <label style={{fontSize:"100%", fontFamily:"Lato,sans-serif"}}>Ajouter / Modifier numéro de téléphone</label>
            <div className="phoneChangeContainer">

                <div style={{display:"flex", flexDirection:"column", flexWrap: "wrap", width:"100%"}}>
                    <InputText onChange={(e) => {
                        if (e.target.value.length === 10 && regex.test(e.target.value)){
                            setButtonDisabled(false);
                            setData(e.target.value);
                        }else{
                            setButtonDisabled(true);
                        }
                    }} placeholder="XXXXXXXXXX" style={{width: "30%"}}/>
                    <Button disabled={buttonDisabled} onClick={() => {
                        patchPhone(data).then(data => {
                            if (data.status === 1){
                                toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
                            }else{
                                toast.current.show({severity: 'succes', summary: 'Succès', detail: data.message});
                            }
                        })
                    }} label="Valider" style={{width:"10%", marginTop:"2%"}} className="p-button-raised" />
                </div>
            </div>
        </div>
    )
}
