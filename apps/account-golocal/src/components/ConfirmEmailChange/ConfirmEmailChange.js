import React, {useEffect, useState} from 'react';
import {confirmAccountRequest, confirmChangeEmailRequest} from "../../golocal-oidc/functions";
import logo from "../../assets/goLocal.png"
import "./ConfirmEmailChange.css"
export default function ConfirmEmailChange() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const uid = urlParams.get('uid');
    const email = urlParams.get('email');
    if (!(token && uid && email)){
        window.location.replace("https://localhost:3001/");
    }
    const url = window.location.href
    let tokenSliced = url.split("token=")
    let tokenURL = tokenSliced[1]
    tokenURL = tokenURL.split("&uid=")
    let tokenFinal = tokenURL[0]
    tokenURL = tokenURL[1].split("&email=")

    const [response, setResponse] = useState({
        loading: false,
        data: null,
    });

    useEffect(() => {
        setResponse({ loading: true });
        confirmChangeEmailRequest(tokenFinal, tokenURL[0], tokenURL[1])
            .then(data => {
                console.log(data)
                setResponse({
                    loading: false,
                    data: data,
                });
            });
    }, []);

    const { loading, data } = response;

    return (
        <div className="confirm-container">
            <img src={logo} className="image" alt="logo golocal"/>
            <div className="texte">{loading && 'Confirmation en cours...'}</div>
            <div className="texte">{data && data}</div>
            <div className="texte">{!data && 'Validation du changement d\'email non implémenté !'}</div>
            {/*<div className="texte-small" onLoad={setTimeout(() => {window.location.replace("https://localhost:3001/")},5000)}>Redirection ...</div>*/}
        </div>
    );
}
