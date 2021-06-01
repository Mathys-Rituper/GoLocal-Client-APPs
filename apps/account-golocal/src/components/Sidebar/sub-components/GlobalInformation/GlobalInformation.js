import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import {Avatar} from "primereact/avatar";
import "./GlobalInformation.css"
import AvatarDefault from '../../../../assets/avatarDef.jpg'
import {goLocalGetUserInfo} from "../../../../golocal-oidc/functions";

export default function GlobalInformation(){

    const [userRequest, setUserRequest] = useState({
        loading: false,
        user: null,
    });
    useEffect(() => {
        // Note that this replaces the entire object and deletes user key!
        setUserRequest({ loading: true });
        goLocalGetUserInfo()
            .then(data => {
                setUserRequest({
                    loading: false,
                    user: data,
                });
            });
    }, []);

    const { loading, user } = userRequest;

    let name, avatar, email, phone, twofactor = null;

    if (user){
        if (avatar === null){
            avatar = AvatarDefault;
        }else{
            avatar = user.avatar;
        }
        name = user.userName;
        email = user.email;
        if (user.phoneNumber === null){
            phone = "Pas de numéro enregistré";
        }else{
            phone = user.phoneNumber
        }
        if (user.twoFactorEnabled){
            twofactor = "Activé"
        }else{
            twofactor = "Désactivé"
        }
    }else{
        name = "Chargement ...";
        avatar = AvatarDefault;
        email = "Chargement ...";
        phone = "Chargement ...";
        twofactor = "Chargement ...";
    }



    return (
        <div className="container">
            <div className="title">VOS INFORMATIONS</div>
            <div className="flex-container">
                <Avatar className="p-mr-2" size="xlarge" image={AvatarDefault} shape="square" style={{width:"7%", height:"7%"}}/>
                <div className="name">{name}</div>
            </div>
            <div className="flex-container">
                <div className="emailTitle">Email : </div>
                <div className="email">{email}</div>
            </div>
            <div className="flex-container">
                <div className="phoneTitle">Téléphone : </div>
                <div className="phone">{phone}</div>
            </div>
            <div className="flex-container">
                <div className="a2fTitle">Double Authentification : </div>
                <div className="a2f">{twofactor}</div>
            </div>

        </div>
    )
}
