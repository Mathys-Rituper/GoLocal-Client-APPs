import React from 'react'
import Login from "../Pages/Login/Login";
const axios = require('axios');

const MAPBOX_TOKEN = require("../config");
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
        timeout: 30000,
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
            if (error.response === undefined){
                return errorShow(error);
            }else{
                return errorShow(error.response.data.error_description);
            }
        });
}
export function goLocalRegister(userName, email, Password, passwordConfirmation, errorShow){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 10000,
    });

    let data = {
        "email" : email,
        "username": userName,
        "password": Password,
        "passwordConfirmation": passwordConfirmation
    }
    return instance
        .post('/account/register', data)
        .then((response) => {
                window.location.replace("https://localhost:3001/");
                return response.data;
        })
        .catch((error) => {
            if (error.response === undefined){
                return errorShow(error);
            }else{
                return errorShow(error.response.data.message);
            }
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
            timeout: 3000,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {}
        });
        return instance
            .get('/connect/userinfo')
            .then(res => res.data)
            .catch(error =>{
                if (!window.localStorage.getItem("access_token")){
                    oidcLogin();
                }
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
            timeout: 3000,
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
export function getShopsRequest(type, long, lat, adress){
    if (type === "coords"){
        const mapboxInstance = axios.create({
            timeout: 50000
        });
        return mapboxInstance
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${MAPBOX_TOKEN}`)
            .then(res => {
                const instance = axios.create({
                    baseURL: 'https://localhost:5001',
                    method: "post",
                    timeout: 50000,
                });
                const firstReturn = [];
                const data = {
                    "take": 300,
                    "skip": 0,
                    "range": 0.08,
                    "location": res.data.features[0].place_name,
                    "name": ""
                }
                instance
                    .post(`/api/shops`, data)
                    .then(res =>{
                        res.data.list.forEach(res => {
                            firstReturn.push(res);
                        })
                    })
                    .catch(error =>{
                        console.log(error);
                    })
                return new Promise({data : firstReturn})
            })
            .catch((error) => {
                console.log(error)
            })
    }else {

    }


}
