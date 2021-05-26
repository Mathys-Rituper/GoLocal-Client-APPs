import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ChangeEmail.css"
import {InputText} from "primereact/inputtext";
import {goLocalGetUserInfo, patchPhone, resetEmailWithToken} from "../../../../golocal-oidc/functions";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";



export default function ChangeEmail(){
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [data, setData] = useState('');
    const toast = useRef(null);
    const [userRequest, setUserRequest] = useState({
        loading: false,
        user: null,
    });

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    let email;
    let phoneBool = false;
    if (user){
        email = user.email;
    }else{
        email = "Chargement ...";
    }


    return (
        <div className="container">
            <div className="title">Changement Adresse Mail</div>
            <Toast ref={toast}/>
            <div className="emailText">Votre email actuel : {email}</div>
            <label style={{fontSize:"100%", fontFamily:"Lato,sans-serif"}}>Modifier adresse mail</label>
            <div className="emailChangeContainer">

                <div style={{display:"flex", flexDirection:"column", flexWrap: "wrap", width:"100%"}}>
                    <InputText onChange={(e) => {
                        if (regex.test(e.target.value)){
                            setButtonDisabled(false);
                            setData(e.target.value);
                        }else{
                            setButtonDisabled(true);
                        }
                    }} placeholder="adressemail@test.com" style={{width: "30%"}}/>
                    <Button disabled={buttonDisabled} onClick={() => {
                        resetEmailWithToken(data).then(data => {
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
