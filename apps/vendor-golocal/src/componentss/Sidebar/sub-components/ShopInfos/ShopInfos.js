import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./ShopInfos.css"
import ShopDefaultPic from "../../../../assets/product-image-placeholder.jpg"
import {Rating} from "primereact/rating";

export default function ShopInfos(){

    const [shopRequest, setShopRequest] = useState({
        loading: false,
        shop: null,
    });
    // useEffect(() => {
    //     // Note that this replaces the entire object and deletes user key!
    //     setShopRequest({ loading: true });
    //     goLocalGetUserInfo()
    //         .then(data => {
    //             setShopRequest({
    //                 loading: false,
    //                 shop: data,
    //             });
    //         });
    // }, []);

    const { loading, shop } = shopRequest;

    let name, image, email, phone, creator, location, creation, openings = null;
    let rate = 1;

    if (shop){
        name = shop.name;
        email = shop.contact.email;
        phone = shop.contact.phone;
        rate = shop.rate;
        creator = shop.user.userName;
        location = shop.location
        if (shop.image === null){
            image = ShopDefaultPic;
        }else{
            image = shop.image;
        }
        creation = shop.creation.split("T");
        creation = creation[0];
        openings = shop.openings;
    } else{
        name = "Chargement ...";
        email = "Chargement ...";
        phone = "Chargement ...";
        rate = 1;
        location = "Chargement ..."
        creator = "Chargement ...";
        creation = "Chargement ...";
        openings = "Chargement ...";
        image= ShopDefaultPic;
    }


    return (
        <div className="container">
            <div style={{display:"flex", flexDirection:"column", width:"25%"}}>
                <div className="name2" style={{fontSize:"180%", fontWeight:"bold"}}>{name}</div>
                <div className="name2" style={{fontSize:"100%"}}>Créé par {creator} ({creation}) </div>
                <Rating value={rate} readOnly stars={5} cancel={false} />
            </div>
            <div className="flex-container" style={{marginTop:"2%"}}>
                <img src={image} style={{width:"12%"}}/>
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
                <div className="a2fTitle">Localisation : </div>
                <div className="a2f">{location}</div>
            </div>
            <div className="flex-container">
                <div className="a2fTitle">Horaires : </div>
                <div className="a2f">{openings}</div>
            </div>
        </div>
    )
}




