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
        timeout: 30000,
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
        timeout: 30000,
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
        timeout: 30000,
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
        timeout: 30000,
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
            timeout: 30000,
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
export function patchAvatar(avatar){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5000',
            method: "post",
            timeout: 30000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "avatar" : avatar
        }
        return instance
            .post('/account/avatar', data)
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
export function patchPhone(phone){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5000',
            method: "patch",
            timeout: 30000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "phone" : phone
        }
        return instance
            .patch('/account/phone', data)
            .then((response) => {
                console.log(response);
                return {statut: 0, message:"Changement effectué"}
            })
            .catch((error) => {
                console.log(error.response)
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
export function resetEmailWithToken(email){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5000',
            method: "patch",
            timeout: 30000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "email" : email
        }
        return instance
            .patch('/security/email', data)
            .then((response) => {
                return {statut: 0, message:"Changement effectué"}
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
export function resetPasswordWithToken(oldPassword, newPassword, newPasswordConfirmation){
    if (middleware() === true) {
        const token = getToken();
        const instance = axios.create({
            baseURL: 'https://localhost:5000',
            method: "patch",
            timeout: 30000,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "newPasswordConfirmation": newPasswordConfirmation
        }
        return instance
            .patch('/security/password', data)
            .then((response) => {
                return {statut: 0, message:"Changement effectué"}
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
