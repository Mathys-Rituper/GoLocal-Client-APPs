import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useRef, useState} from 'react';
import "./ChangePassword.css"
import {InputText} from "primereact/inputtext";
import {
    goLocalGetUserInfo,
    patchPhone,
    resetEmailWithToken,
    resetPasswordWithToken
} from "../../../../golocal-oidc/functions";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Password} from "primereact/password";
import {Divider} from "primereact/divider";



export default function ChangePassword(){
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState();
    const [lock, setLock] = useState(false);
    const toast = useRef(null);
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const header = <h6>Choisissez un mot de passe</h6>;
    const footer = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{lineHeight: '1.5'}}>
                <li>Au moins une minuscule</li>
                <li>Au moins une majuscule</li>
                <li>Au moins un chiffre</li>
                <li>Au moins 8 caractères</li>
                <li>Au moins 1 caractère spécial</li>
            </ul>
        </React.Fragment>
    );
    console.log("oldpassword : " + oldPassword)
    console.log("newPassword : " + newPassword)
    console.log("newPasswordConfirmation : " + newPasswordConfirmation)
    return (
        <div className="container">
            <div className="title">Changement Mot de passe</div>
            <Toast ref={toast}/>

            <div className="emailChangeContainer">
                <label style={{fontSize:"100%", fontFamily:"Lato,sans-serif"}}>Ancien mot de passe</label>
                <div style={{display:"flex", flexDirection:"row", flexWrap: "wrap"}}>
                    <Password onChange={(e) => {
                        setOldPassword(e.target.value);

                    }}  feedback={false}/>
                </div>
                <label style={{fontSize:"100%", fontFamily:"Lato,sans-serif"}}>Nouveau mot de passe</label>
                <div style={{display:"flex", flexDirection:"row", flexWrap: "wrap"}}>
                    <Password onChange={(e) => {
                        if (regex.test(e.target.value)){
                            setNewPassword(e.target.value);
                            // console.log(oldPassword)
                        }
                    }}   header={header} footer={footer} />
                </div>
                <label style={{fontSize:"100%", fontFamily:"Lato,sans-serif"}}>Confirmation mot de passe</label>
                <div style={{display:"flex", flexDirection:"row", flexWrap: "wrap"}}>
                    <Password onChange={(e) => {
                        setNewPasswordConfirmation(e.target.value);
                        if (e.target.value === newPassword){
                            if (oldPassword && newPassword && newPasswordConfirmation){
                                setButtonDisabled(false);
                            }else{
                                setButtonDisabled(true);
                            }
                        }
                    }}  feedback={false}/>
                </div>




                <Button disabled={buttonDisabled} onClick={() => {
                    resetPasswordWithToken(oldPassword, newPassword, newPasswordConfirmation).then(data => {
                        if (data.status === 1){
                            toast.current.show({severity: 'error', summary: 'Erreur', detail: data.message});
                        }else{
                            toast.current.show({severity: 'success', summary: 'Succès', detail: data.message});
                        }
                    })
                }} label="Valider" className="p-button-raised" />
            </div>
        </div>
    )
}
