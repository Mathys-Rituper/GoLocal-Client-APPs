import React from 'react'
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
    window.location.href=`https://localhost:3000/login`
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
    let data = `grant_type=password&username=${userName}&password=${Password}&client_id=golocal&scope=artisan.api%20client.api%20account.api`
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
            if (error.response === undefined){
                return errorShow(error);
            }else{
                return errorShow(error.response.data.error_description);
            }
        });
}
export function goLocalLogout(){
    localStorage.removeItem("access_token");
    window.location.href="https://localhost:3001/"
}

// ACCOUNT REQUESTS //
export function confirmAccountRequest(token, uid){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 1000,
        params: {
            "token" : `${token}`,
            "uid" : `${uid}`
        },
        headers: {},
    });

        return instance
        .post('/account/register/confirmation')
        .then(res => res.data)
        .catch(error =>{
            if (error.response === undefined){
                return error;
            }else{
                return error.response.data.message;
            }
        })
}
export function confirmPasswordRequest(token, uid, newPassword, newPasswordConfirmation){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 1000,
        params: {
            "token" : `${token}`,
            "uid" : `${uid}`
        },
        data: {
          "newPassword" : newPassword,
          "newPasswordConfirmation" : newPasswordConfirmation
        },
        headers: {},
    });

    return instance
        .post('/account/password/confirmation')
        .then(res => res.data)
        .catch(error =>{
            if (error.response === undefined){
                return error;
            }else{
                return error.response.data.message;
            }
        })
}
export function resetPasswordRequest(email){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 1000,
        data: {
            "email" : email
        },
        headers: {},
    });

    return instance
        .post('/account/password')
        .then(res => res.data)
        .catch(error =>{
            if (error.response === undefined){
                return error;
            }else{
                return error.response.data.message;
            }
        })
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
export function getShopByID(id){
    if (middleware() === true){
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5001',
            method: "get",
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {}
        });
        return instance
            .get(`/api/shops/${id}`)
            .then(res => res.data)
            .catch(error =>{
                console.log(error);
                // oidcLogin();
            })
    }else{
        return undefined;
    }
}
