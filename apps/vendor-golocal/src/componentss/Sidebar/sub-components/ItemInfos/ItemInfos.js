import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import ShopDefaultPic from "../../../../assets/product-image-placeholder.jpg"
import {Rating} from "primereact/rating";
import {useLocation} from "react-router-dom";
import {getItemByID, getShopByID} from "../../../../golocal-oidc/functions"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


export default function ItemInfos(){
    const params = useQuery();
    const shopID = params.get("shopID")
    const itemID = params.get("item")
    const [itemRequest, setItemRequest] = useState({
        loading: false,
        item: null,
    });
    useEffect(() => {
        // Note that this replaces the entire object and deletes user key!
        setItemRequest({ loading: true });
        getItemByID(shopID,itemID)
            .then(data => {
                console.log(data.data);
                setItemRequest({
                    loading: false,
                    item: data.data,
                });
            });
    }, []);

    const { loading, item } = itemRequest;
    console.log(item)

    let name, email, phone, creator, location, creation, openings = null;
    let image = ShopDefaultPic;
    let rate = 1;

    if (item){
        name = item.name;
        email = item.contact.email;
        phone = item.contact.phone;
        rate = item.rate;
        creator = item.user.userName;
        location = `${item.location.address} ${item.location.street}, ${item.location.postCode} ${item.location.city} ${item.location.country}`
        if (item.image){
            image = item.image;
        }
        creation = item.creation.split("T");
        creation = creation[0];
        let splitedDate = creation.split("-");
        creation = splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0];
        // openings = item.openings;
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
        <div className="container" style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", flexDirection:"column", width:"50%"}}>
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




