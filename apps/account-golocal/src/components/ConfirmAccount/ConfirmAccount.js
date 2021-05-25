import React, {useEffect, useState} from 'react';
import {confirmAccountRequest} from "../../golocal-oidc/functions";
import logo from "../../assets/goLocal.png"
import "./ConfirmAccount.css"
export default function ConfirmAccount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const uid = urlParams.get('uid');
    if (!(token && uid)){
        window.location.replace("https://localhost:3001/");
    }
    const url = window.location.href
    let tokenSliced = url.split("token=")
    tokenSliced = tokenSliced[1].split("&uid=")
    console.log({tokenSliced,token, uid})

    const [response, setResponse] = useState({
        loading: false,
        data: null,
    });

    useEffect(() => {
        setResponse({ loading: true });
        confirmAccountRequest(tokenSliced[0], tokenSliced[1])
            .then(data => {
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
            <div className="texte">{!data && 'Compte Validé !'}</div>
            <div className="texte-small" onLoad={setTimeout(() => {window.location.replace("https://localhost:3001/")},5000)}>Redirection ...</div>
        </div>
    );
}
