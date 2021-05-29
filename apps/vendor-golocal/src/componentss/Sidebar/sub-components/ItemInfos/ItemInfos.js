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

    let name, creation, priceAverage, priceMin, priceMax, description, hidden = null;
    let image = ShopDefaultPic;
    let rate = 1;

    if (item){
        if (item.hidden === true){
            hidden = "Caché"
        }else{
            hidden = "Visible"
        }
        name = item.name;
        description = item.description
        priceAverage = item.priceAverage;
        priceMin = item.priceMin;
        priceMax = item.priceMax;
        rate = item.rate;
        if (item.image){
            image = item.image;
        }
        creation = item.creation.split("T");
        creation = creation[0];
        let splitedDate = creation.split("-");
        creation = splitedDate[2] + "/" + splitedDate[1] + "/" + splitedDate[0];
    } else{
        name = "Chargement ...";
        description= "Chargement ...";
        rate = 1;
        creation = "Chargement ...";
        image= ShopDefaultPic;
        hidden = "Chargement ...";
        priceMin = "..";
        priceMax = "..";
    }


    return (
        <div className="container" style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", flexDirection:"column", width:"50%"}}>
                <div className="name2" style={{fontSize:"180%", fontWeight:"bold"}}>{name}</div>
                <div className="name2" style={{fontSize:"100%"}}>Créé le {creation} </div>
                <Rating value={rate} readOnly stars={5} cancel={false} />
            </div>
            <div className="flex-container" style={{marginTop:"2%"}}>
                <img src={image === ShopDefaultPic ? (image) : (`data:image/jpeg;base64,${image}`)} style={{width:"12%"}}/>
            </div>
            <div className="flex-container">
                <div className="a2fTitle">Statut : </div>
                <div className="a2f">{hidden}</div>
            </div>
            <div className="flex-container">
                <div className="a2fTitle">Prix : </div>
                <div className="a2f">Compris entre {priceMin}€ et {priceMax}€</div>
            </div>
            <div className="flex-container">
                <div className="a2fTitle">Prix Moyen : </div>
                <div className="a2f">{priceAverage} €</div>
            </div>
            <div className="flex-container">
                <div className="a2fTitle">Description : </div>
                <div className="a2f">{description}</div>
            </div>


        </div>
    )
}




