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
    window.location.href=`https://localhost:3002/login`
}
export function goLocalLogin(userName,Password, errorShow, previousPage){
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 3000,
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
        timeout: 3000,
        headers: {},
    });
    const data = {
        "token" : token,
        "uid" : uid
    }

        return instance
        .post('/account/register/confirmation',data)
        .then(res => {
            console.log(res.data)
            return res.data;
        })
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
        timeout: 3000,
        headers: {},
    });
    const data = {
        "token" : token,
        "uid" : uid,
        "password" : newPassword,
        "passwordConfirmation" : newPasswordConfirmation
    }
    return instance
        .post('/account/password/confirmation', data)
        .then(res => res.data)
        .catch(error =>{
            if (error.response === undefined){
                console.log(1, error)
                return error;
            }else{
                console.log(2, error.response.data.message)
                return error.response.data.message;
            }
        })
}
export function resetPasswordRequest(email, errorShow){
    console.log("Password Reset Requested")
    const instance = axios.create({
        baseURL: 'https://localhost:5000',
        method: "post",
        timeout: 10000,
        headers: {},
    });
    const data = {
        "email" : email
    }
    return instance
        .post('/account/password', data)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(error =>{
            if (error.response === undefined){
                return errorShow(error);
            }else{
                return errorShow(error.response.data.message);
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
                oidcLogin();
            })

    }else{
        return undefined;
    }
}
export function getShops(){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "post",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "take": 500,
            "skip": 0
        }
        return instance
            .post('/api/shops', data)
            .then((response) => {
                return {statut: 0, data: response}
            })
            .catch((error) => {
                if (error.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}
export function getShopByID(id){
    if (middleware() === true) {
        const instance = axios.create({
            baseURL: 'https://localhost:5001',
            method: "get",
            timeout: 5000,
        });
        return instance
            .get(`/api/shops/${id}`)
            .then((response) => {
                return {statut: 0, data: response.data}
            })
            .catch((error) => {
                if (error.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}
export function patchShopName(shopID, oldName, newName){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "patch",
            timeout: 50000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "shopId": shopID,
            "oldName": oldName,
            "newName": newName
        }
        return instance
            .patch('/api/shops', data)
            .then((response) => {
                console.log(response);
                return {status: 0, message:"Changement effectué"}
            })
            .catch((error) => {
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    if (error.response.status === 401){
                        oidcLogin();
                    }else{
                        return {status: 1, message: error.response.data};
                    }
                }
            });
    }else{
        return oidcLogin();
    }
}
export function patchImageShop(image, shopId){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "patch",
            timeout: 10000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "shopId" : shopId,
            "image" : image
        }
        return instance
            .patch('/api/shops/image', data)
            .then((response) => {
                console.log(response);
                return {status: 0, message:"Changement effectué"}
            })
            .catch((error) => {
                if (error.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}
export function patchContacts(shopID, email, phone){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "patch",
            timeout: 50000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "shopId": shopID,
            "phone": phone,
            "email": email
        }
        return instance
            .patch('/api/shops/contact', data)
            .then((response) => {
                console.log(response);
                return {status: 0, message:"Changement effectué"}
            })
            .catch((error) => {
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    if (error.response.status === 401){
                        oidcLogin();
                    }else{
                        return {status: 1, message: error.response.data};
                    }
                }
            });
    }else{
        return oidcLogin();
    }
}
export function patchLocalisation(shopID, address, street, region, postCode, city, country){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "patch",
            timeout: 50000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "shopId": shopID,
            "postCode": postCode,
            "country": country,
            "region": region,
            "city": city,
            "street": street,
            "address": address
        }
        return instance
            .patch('/api/shops/location', data)
            .then((response) => {
                console.log(response);
                return {status: 0, message:"Changement effectué"}
            })
            .catch((error) => {
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    if (error.response.status === 401){
                        oidcLogin();
                    }else{
                        return {status: 1, message: error.response.data};
                    }
                }
            });
    }else{
        return oidcLogin();
    }
}
export function createShopRequest(name, postCode, country, region, city, street, address, phone, email){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "put",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = {
            "name": name,
            "location": {
                "postCode": postCode,
                "country": country,
                "region": region,
                "city": city,
                "street": street,
                "address": address
            },
            "contact": {
                "phone": phone,
                "email": email
            }
        }
        return instance
            .put(`/api/shops`, data)
            .then((response) => {
                console.log(response)
                return {status: 0, data: "Boutique ajouté !"}
            })
            .catch((error) => {
                if (error.response.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}
export function createProductByShopID(id, name, description){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "put",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = {
            "shopId": id,
            "name": name,
            "description": description
        }
        return instance
            .put(`/api/shops/${id}/items/products`, data)
            .then((response) => {
                console.log(response)
                return {status: 0, data: "Produit ajouté !"}
            })
            .catch((error) => {
                if (error.response.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}
export function createServiceByShopID(id, name, description){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "put",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = {
            "shopId": id,
            "name": name,
            "description": description
        }
        return instance
            .put(`/api/shops/${id}/items/services`, data)
            .then((response) => {
                console.log(response)
                return {status: 0, data: "Service ajouté !"}
            })
            .catch((error) => {
                if (error.response.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}
export function deleteShopWithToken(id, name){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5002',
            method: "delete",
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                "shopId": id,
                "name": name
            }
        });

        return instance
            .delete(`/api/shops`)
            .then((response) => {
                console.log(response)
                return {status: 0, data: "Boutique supprimé !"}
            })
            .catch((error) => {
                if (error.response.status === 401){
                    oidcLogin();
                }
                if (error.response === undefined) {
                    return {status: 1, message: error};
                } else {
                    return {status: 1, message: error.response.data};
                }
            });
    }else{
        return oidcLogin();
    }
}