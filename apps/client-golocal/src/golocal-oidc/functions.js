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
        const instance = axios.create({
            baseURL: 'https://localhost:5001',
            method: "get",
            timeout: 3000,
            headers: {},
            data: {}
        });
        return instance
            .get(`/api/shops/${id}`)
            .then(res => res.data)
            .catch(error =>{
                console.log(error);
                // oidcLogin();
            })
}
export function getItemByID(shopID, itemID){
    const instance = axios.create({
        baseURL: 'https://localhost:5001',
        method: "get",
        timeout: 3000,
        headers: {},
        data: {}
    });
    return instance
        .get(`/api/shops/${shopID}/items/${itemID}`)
        .then(res => res.data)
        .catch(error =>{
            console.log(error);
        })
}
export function getAdressFromCoords(long, lat){
    const mapboxInstance = axios.create({
        timeout: 50000
    });
    return mapboxInstance
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${MAPBOX_TOKEN}`)
        .then(res => {
            window.localStorage.setItem("PlaceName", res.data.features[0].place_name)
            return res.data.features[0].place_name
        })
        .catch((error) => {
            console.log(error)
        })
}
export function getShopsRequest(adress){
        const instance = axios.create({
            baseURL: 'https://localhost:5001',
            method: "post",
            timeout: 50000,
        });
        const data = {
            "take": 300,
            "skip": 0,
            "range": 0.08,
            "location": adress,
            "name": ""
        }
        return instance
            .post(`/api/shops`, data)
            .then(res =>{
                return res.data.list;
            })
            .catch(error =>{
                console.log(error);
            })

}
export function getShopsFilteredRequest(filter, distance){
    const adress = window.localStorage.getItem("PlaceName")
    let distanceInRads;
    switch (distance){
        case 5:
            distanceInRads = 0.04;
            break;
        case 10:
            distanceInRads = 0.08;
            break;
        case 15:
            distanceInRads = 0.12;
            break;
        case 20:
            distanceInRads = 0.16;
            break;
        case 25:
            distanceInRads = 0.20;
            break;
        case 30:
            distanceInRads = 0.24;
            break;
        case 35:
            distanceInRads = 0.28;
            break;
        case 40:
            distanceInRads = 0.32;
            break;
        case 45:
            distanceInRads = 0.36;
            break;
        case 50:
            distanceInRads = 0.40;
            break;
    }
    const instance = axios.create({
        baseURL: 'https://localhost:5001',
        method: "post",
        timeout: 50000,
    });
    const data = {
        "take": 300,
        "skip": 0,
        "range": distanceInRads,
        "location": adress,
        "name": filter
    }
    return instance
        .post(`/api/shops`, data)
        .then(res =>{
            return res.data.list;
        })
        .catch(error =>{
            console.log(error);
        })

}
export function addToCartItem(shopID, itemID, packageID, quantity){
    if (middleware() === true) {
        goLocalGetUserInfo().then(data =>{
            if (data.id === null){
                oidcLogin();
            }
        })
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5001',
            method: "patch",
            timeout: 30000,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = {
            "shopId": shopID,
            "packageId": packageID,
            "itemId": itemID,
            "quantity": quantity
        }
        return instance
            .patch(`/api/carts/shops/${shopID}/add`, data)
            .then((response) => {
                console.log(response)
                return {status: 0, message: "Package ajouté au panier !"}
            })
            .catch((error) => {
                if (error.response.status === 400){
                    return {status: 1, message: "Votre panier dépasse le stock du package"}
                }
                if (error.response.status === 401){
                    oidcLogin();
                }else{
                    return {status: 1, message: error.response.message}
                }
            });
    }else{
        return oidcLogin();
    }
}
export function addToCommandPackage(shopID, serviceID, packageID, price, spec){
    if (middleware() === true) {
        goLocalGetUserInfo().then(data =>{
            if (data.id === null){
                oidcLogin();
            }
        })
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5001',
            method: "put",
            timeout: 30000,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = {
            "shopId": shopID,
            "serviceId": serviceID,
            "packageId": packageID,
            "price": price,
            "specifications": spec
        }
        return instance
            .put(`/api/commands`, data)
            .then((response) => {
                console.log(response)
                return {status: 0, message: "Package ajouté à vos commandes !"}
            })
            .catch((error) => {
                if (error.response.status === 400){
                    return {status: 1, message: "Votre panier dépasse le stock du package"}
                }
                if (error.response.status === 401){
                    oidcLogin();
                }else{
                    return {status: 1, message: error.response.message}
                }
            });
    }else{
        return oidcLogin();
    }
}
