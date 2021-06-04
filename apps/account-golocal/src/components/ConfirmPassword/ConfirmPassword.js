import React, {useEffect, useRef, useState} from 'react';
import {confirmAccountRequest, confirmPasswordRequest} from "../../golocal-oidc/functions";
import { useFormik } from 'formik';
import "./ConfirmPassword.css"
import {Divider} from "primereact/divider";
import { classNames } from 'primereact/utils';
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import logo from "../../assets/goLocal.png"
import {Messages} from "primereact/messages";

function goHome(){
    window.location.replace("https://localhost:3001/");
}

export default function ConfirmPassword() {
    const [activatedButton, setActivatedButton] =useState(true)
    const [response, setResponse] =useState(null)
    const msgs1 = useRef(null);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const uid = urlParams.get('uid');
    if (token === null || token === undefined || uid === null || uid === undefined){
        window.location.replace("https://localhost:3001/");
    }
    const url = window.location.href
    let tokenSliced = url.split("token=")
    tokenSliced = tokenSliced[1].split("&uid=")
    const [formData, setFormData] = useState({});
    // console.log({tokenSliced,token, uid})


    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.password) {
                errors.password = 'Mot de passe requis.';
            }
            if (!data.passwordConfirm) {
                errors.passwordConfirm = 'Confirmation requise.';
            }
            if (data.passwordConfirm !== data.password) {
                errors.passwordConfirm = 'Mots de passe différents.';
            }else{
                setActivatedButton(false)
            }
            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            // console.log(data);
            confirmPasswordRequest(tokenSliced[0], tokenSliced[1], data.password, data.passwordConfirm).then(data => setResponse(data))
            if (response !== null || response !== undefined){
                // console.log(response)
                errorShow(response);
            }
            formik.resetForm();
            if(!response){
                window.location.replace("https://localhost:3001/")
            }

            setActivatedButton(true);
        }
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const passwordHeader = <h6>Choisir un mot de passe</h6>;
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
    function errorShow(error){
        if (error){
            msgs1.current.show([
                { severity: 'warn', summary: '', detail: error, sticky: false, life: 5000 },
            ]);
        }
    }


    return (
        <div style={{fontFamily:"Lato, sans-serif"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <img src={logo} className="logo" onClick={() => {goHome()}}/>
                <div className="card">
                    <h5 className="p-text-center">Changement Mot de passe</h5>
                    <Messages ref={msgs1} />
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Nouveau mot de passe*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Password id="passwordConfirm" name="passwordConfirm" value={formik.values.passwordConfirm} onChange={formik.handleChange} toggleMask feedback={false} className={classNames({ 'p-invalid': isFormFieldValid('passwordConfirm') })}/>
                                <label htmlFor="passwordConfirm" className={classNames({ 'p-error': isFormFieldValid('passwordConfirm') })}>Confirmation*</label>
                            </span>
                            {getFormErrorMessage('passwordConfirm')}
                        </div>
                        <Button type="submit" label="Réinitialiser" disabled={activatedButton} className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>









        // <div className="confirm-container">
        //
        //     {/*<img src={logo} className="image" alt="logo golocal"/>*/}
        //     {/*<div className="texte">{loading && 'Confirmation en cours...'}</div>*/}
        //     {/*<div className="texte">{data && data}</div>*/}
        //     {/*<div className="texte">{!data && 'Compte Validé !'}</div>*/}
        //     {/*<div className="texte-small" >Redirection ...</div>*/}
        //     {/*<div className="texte-small" onLoad={setTimeout(() => {window.location.replace("https://localhost:3001/")},5000)}>Redirection ...</div>*/}
        // </div>
    );
}
