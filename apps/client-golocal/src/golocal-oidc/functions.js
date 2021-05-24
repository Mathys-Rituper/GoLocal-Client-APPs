import React from 'react'
import Login from "../Pages/Login/Login";
const axios = require('axios');
const qs = require('qs');

// MiddleWare
function middleware(){
    const token = localStorage.getItem("access_token");
    let bool = false;
    if (token !== null || token !== undefined){
        bool = true;
    }
    return bool;
}
function getToken(){
    return localStorage.getItem("access_token");;
}

// AUTHENTIFICATION //

export function oidcLogin(){
    const previousPage = window.location.href;
    localStorage.setItem("previousPage", previousPage);
    window.location.href=`https://localhost:3001/login`
}
export function oidcRegister(){
    window.location.href=`https://localhost:3001/register`
}
export function goLocalLogin(userName,Password, errorShow, previousPage){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 1000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    let data = `grant_type=password&username=${userName}&password=${Password}&client_id=golocal&scope=artisan.api%20client.api`
    return instance
        .post('/connect/token', data)
        .then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            let previous = previousPage;
            localStorage.removeItem("previousPage")
            window.location.replace(previous);
            return response.data;
        })
        .catch((error) => {
            return errorShow();
        });
}
export function goLocalRegister(userName, email, Password, passwordConfirmation, errorShow){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 1000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    let data = `email=${email}&username=${userName}&password=${Password}&passwordConfirmation=${passwordConfirmation}`
    return instance
        .post('/register', data)
        .then((response) => {
            console.log("Success");
            window.location.replace("https://localhost:3001/");
            return response.data;
        })
        .catch((error) => {
            return errorShow(error);
        });
}
export function goLocalLogout(){
    localStorage.removeItem("access_token");
    window.location.href="https://localhost:3001/"
}


// CLIENT REQUESTS //
export function goLocalGetUserInfo(){
    if (middleware() === true){
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5000',
            method: "get",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {}
        });
        return instance
            .get('/connect/userinfo')
            .then(res => res.data)
            .catch(error =>{
                oidcLogin();
            })

    }else{
        return undefined;
    }
}

