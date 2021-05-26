import React, {useEffect, useRef, useState} from 'react';
import {resetPasswordRequest} from "../../golocal-oidc/functions";
import logo from "../../assets/goLocal.png"
import "./ResetPassword.css"
import {Messages} from "primereact/messages";
import { Form, Field } from 'react-final-form';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import { classNames } from "primereact/utils";


function goHome(){
    window.location.href="https://localhost:3001/";
}

export default function ResetPassword() {
    const [buttonState, setButtonState] = useState(true)
    const msgs1 = useRef(null);
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validate = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = 'Email obligatoire.';
        }else{
            setButtonState(true);
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Adresse mail invalide. Ex: exemple@email.com';
        }else{
            setButtonState(false);
        }
        return errors;
    };
    function errorShow(error){
        msgs1.current.show([
            { severity: 'warn', summary: '', detail: error, sticky: true },
        ]);
    }
    const onSubmit = async (data, form) => {
        console.log(data)
        await resetPasswordRequest(data.email, errorShow)
        setButtonState(true)
        window.location.replace("https://localhost:3001/")
        form.restart();
    };

    return (
            <div className="formContainer">
                <img src={logo} className="logo" onClick={() => {goHome()}}/>
                <div className="card">
                    <p className="p-text-center">Réinitialisation Mot de passe</p>
                    <p style={{textAlign:"center", marginBottom:"8%"}}>Regardez vos e-mail pour le lien de réinitialisation</p>
                    <Form onSubmit={onSubmit} initialValues={{email: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Messages ref={msgs1} />
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
                            <Button type="submit" style={{backgroundColor: "rgb(89, 136, 255)"}} label="Réinitialiser" className="p-mt-2" disabled={buttonState} />
                        </form>
                    )}/>
                </div>
        </div>
    );
}
