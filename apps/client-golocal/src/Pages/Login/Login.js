import React, {useEffect, useRef, useState} from 'react';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import './Login.css'
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import logo from "../../assets/goLocal.png"
import {goLocalLogin, oidcRegister} from "../../golocal-oidc/functions";
import {Messages} from "primereact/messages";

function goBackHome(){
    window.location.location=("https://localhost:3001/")
}
export default function Login() {
    let previousPage =  localStorage.getItem("previousPage")
    if (previousPage === null){
        window.location.href="https://localhost:3001/"
    }
    if (previousPage === "https://localhost:3001/register"){
        previousPage = "https://localhost:3001/"
    }
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
        if (!data.password) {
            errors.password = 'Mot de passe obligatoire.';
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
        // console.log(data)
        await goLocalLogin(data.name,data.password, errorShow,previousPage)
    };
    function goHome(){
        window.location.href="https://localhost:3001/";
    }
    return(
        <div className="formContainer">
            <img  src={logo} className="logo" onClick={() => {goHome()}}/>
            <div className="card">
                <p className="p-text-center">Connectez-vous à votre compte</p>
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
                        <Field name="password" render={({ input, meta }) => (
                            <div className="p-field" style={{marginBottom: "3%"}}>
                                    <span className="p-float-label">
                                        <Password id="password" {...input} feedback={false} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Mot de passe*</label>
                                    </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <div style={{marginBottom: "3%", cursor:"pointer", color:"rgb(89, 136, 255)", textAlign:"right"}} onClick={() => {
                            window.location.replace("https://localhost:3000/forgotPassword")
                        }}>Mot de passe perdu ?</div>
                        <Button type="submit" label="Connexion" className="p-mt-2" />
                    </form>
                )}/>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <p className="register-responsive" style={{marginLeft:"0px", marginRight:"0px"}}>Besoin d'un compte ? </p><p className="register-responsive" style={{color: "rgb(89, 136, 255)", cursor:"pointer", marginLeft:"5px", marginRight:"0px"}} onClick={oidcRegister}>S'enregistrer</p>
            </div>
        </div>
    );
}
