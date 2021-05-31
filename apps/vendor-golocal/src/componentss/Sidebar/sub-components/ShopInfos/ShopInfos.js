import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./ShopInfos.css"
import ShopDefaultPic from "../../../../assets/product-image-placeholder.jpg"
import {Rating} from "primereact/rating";
import {useLocation} from "react-router-dom";
import {getShopByID} from "../../../../golocal-oidc/functions"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


export default function ShopInfos(){
    const params = useQuery();
    const shopID = params.get("shopID")
    const visibility = params.get("visibility");
    const [shopRequest, setShopRequest] = useState({
        loading: false,
        shop: null,
    });
    useEffect(() => {
        // Note that this replaces the entire object and deletes user key!
        setShopRequest({ loading: true });
        getShopByID(shopID, true)
            .then(data => {
                setShopRequest({
                    loading: false,
                    shop: data.data,
                });
            });
    }, []);

    const { loading, shop } = shopRequest;

    let name, email, phone, creator, location, creation, openings = null;
    let image = ShopDefaultPic;
    let rate = 1;

    if (shop){
        name = shop.name;
        email = shop.contact.email;
        phone = shop.contact.phone;
        rate = shop.rate;
        creator = shop.user.userName;
        location = `${shop.location.address} ${shop.location.street}, ${shop.location.postCode} ${shop.location.city} ${shop.location.country}`
        if (shop.image){
            image = shop.image;
        }
        creation = shop.creation.split("T");
        creation = creation[0];
        let splitedDate = creation.split("-");
        creation = splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0];
        // openings = shop.openings;
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
                <img src={image === ShopDefaultPic ? (image) : (`data:image/jpeg;base64,${image}`)} style={{width:"12%"}}/>
            </div>
            <div className="flex-container">
                <div className="emailTitle">Visibilité : </div>
                <div className="email" style={{marginLeft:"3%"}}>{visibility === "0" ? ("Visible") : ("Caché")}</div>
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
                <div className="a2f" style={{marginLeft:"1%"}}>{location}</div>
            </div>
            <div style={{display:"flex", flexDirection:"column", flexWrap:"wrap", marginLeft:"2%"}}>
                <div className="a2fTitle">Horaires : </div>
                {/*<div>Lundi : {openings[0].morning.min}-{openings[0].morning.max}  {openings[0].afternoon.min}-{openings[0].afternoon.max}</div>*/}
                {/*<div>Mardi : {openings[1].morning.min}-{openings[1].morning.max}  {openings[1].afternoon.min}-{openings[1].afternoon.max}</div>*/}
                {/*<div>Mercredi : {openings[2].morning.min}-{openings[2].morning.max}  {openings[2].afternoon.min}-{openings[2].afternoon.max}</div>*/}
                {/*<div>Jeudi : {openings[3].morning.min}-{openings[3].morning.max}  {openings[3].afternoon.min}-{openings[3].afternoon.max}</div>*/}
                {/*<div>Vendredi : {openings[4].morning.min}-{openings[4].morning.max}  {openings[4].afternoon.min}-{openings[4].afternoon.max}</div>*/}
                {/*<div>Samedi : {openings[5].morning.min}-{openings[5].morning.max}  {openings[5].afternoon.min}-{openings[5].afternoon.max}</div>*/}
                {/*<div>Dimanche : {openings[6].morning.min}-{openings[6].morning.max}  {openings[6].afternoon.min}-{openings[6].afternoon.max}</div>*/}
            </div>
        </div>
    )
}




