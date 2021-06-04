import React, {useEffect, useRef, useState} from 'react';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import './Register.css'
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import logo from "../../assets/goLocal.png"
import {goLocalLogin, goLocalRegister, oidcLogin, oidcRegister} from "../../golocal-oidc/functions";
import {Toast} from "primereact/toast";
import {Messages} from "primereact/messages";
import {useLocation} from "react-router-dom";
import {Divider} from "primereact/divider";
import {Checkbox} from "primereact/checkbox";


function consultCGU(){
    window.open("https://localhost:3001/CGU", "_blank")
}

export default function Register() {
    const [buttonState, setButtonState] = useState(true)
    const msgs1 = useRef(null);
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validate = (data) => {
        let errors = {};
        if (!data.name) {
            errors.name = 'Nom d\'utilisateur obligatoire.';
        }
        if (!data.email) {
            errors.email = 'Email obligatoire.';
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Adresse mail invalide. Ex: exemple@email.com';
        }
        if (!data.password) {
            errors.password = 'Mot de passe obligatoire.';
        }
        if (!data.confirmPassword) {
            errors.confirmPassword = 'Confirmation obligatoire.';
        }
        if (data.password === data.confirmPassword && data.accept){
            setButtonState(false)
        }
        return errors;
    };

    function errorShow(error){
        msgs1.current.show([
            { severity: 'warn', summary: '', detail: error, sticky: true },
        ]);
    }
    const onSubmit = async (data, form) => {
        form.restart();
        console.log(data)
        await goLocalRegister(data.name, data.email, data.password, data.confirmPassword, errorShow)
        setButtonState(true)
    };


    const passwordHeader = <h6>Choisissez un mot de passe</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>Au moins une minuscule</li>
                <li>Au moins une majuscule</li>
                <li>Au moins un chiffre</li>
                <li>Minimum 8 caractères</li>
            </ul>
        </React.Fragment>
    );
    function goHome(){
        window.location.href="https://localhost:3001/";
    }

    return(
        <div className="formContainer">
            <img src={logo} className="logo" onClick={() => {goHome()}}/>
            <div className="card">
                <p className="p-text-center" style={{fontFamily:"Lato,sans-serif"}}>Créez un compte</p>
                <Form onSubmit={onSubmit} initialValues={{ name: '', password: ''}} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">
                        <Messages ref={msgs1} />
                        <Field name="name" render={({ input, meta }) => (
                            <div className="p-field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nom Utilisateur*</label>
                                    </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <Field name="email" render={({ input, meta }) => (
                            <div className="p-field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <Field name="password" render={({ input, meta }) => (
                            <div className="p-field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Mot de passe*</label>
                                    </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <Field name="confirmPassword" render={({ input, meta }) => (
                            <div className="p-field">
                                    <span className="p-float-label">
                                        <Password id="confirmPassword" {...input} feedback={false} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter}/>
                                        <label htmlFor="confirmPassword" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Confirmation*</label>
                                    </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <Field name="accept" type="checkbox" render={({ input, meta }) => (
                            <div className="p-field-checkbox">
                                <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>J'accepte les</label><label style={{color: "rgb(89, 136, 255)", cursor:"pointer", marginLeft:"5px"}} onClick={consultCGU}>condition générales d'utilisation*</label>
                            </div>
                        )} />

                        <Button type="submit" style={{backgroundColor: "rgb(89, 136, 255)"}} label="S'inscrire"  style={{fontFamily:"Lato,sans-serif"}} className="p-mt-2" disabled={buttonState} />
                    </form>
                )}/>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <p style={{marginLeft:"0px", marginRight:"0px"}}>Déjà un compte ? </p><p style={{color: "rgb(89, 136, 255)", cursor:"pointer", marginLeft:"5px"}} onClick={oidcLogin}>Connexion</p>
            </div>
        </div>
    );
}
