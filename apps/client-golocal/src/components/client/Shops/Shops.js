import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useState} from 'react';
import './shops.css'
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {ScrollPanel} from "primereact/scrollpanel";
import {getAdressFromCoords, getShopsRequest} from "../../../golocal-oidc/functions";
import ShopCard from "./ShopCard";


function refuse(){
    window.open("https://google.fr/", '_blank');
    window.close();
}
function accept(){
    window.localStorage.setItem("accept_cookies", "accepted")
    window.location.replace("https://localhost:3001/");
}
function renderFooter(){
    return (
        <div>
            <Button label="Je refuse" icon="pi pi-times" onClick={() => refuse()} className="p-button-text" />
            <Button label="J'accepte" icon="pi pi-check" onClick={() => accept()} autoFocus />
        </div>
    );
}


export default function Shops() {

    let cookies;
    cookies = window.localStorage.getItem("accept_cookies") !== "accepted";
    const [display, setDisplay] = useState(cookies);
    const [adress, setAdress] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [shops, setShops] = useState({
        loading : true,
        list : []
    });
    const [coords, setCoords] = useState({
        lng : null,
        lat : null,
        loading : true
    })

    function getShopsByAdress(adress){
        getShopsRequest(adress).then(data => {
            let shops = [];
            data.forEach(shop => {
                shops.push(<ShopCard shop={shop}/>)
            })
            setShops({list: shops})
            window.localStorage.setItem("PlaceName", adress)
            setAdress('');
        })
    }

    if (coords.loading){
        navigator.geolocation.getCurrentPosition(function(position) {
            setCoords({
                lng : position.coords.longitude,
                lat : position.coords.latitude
            })
            getAdressFromCoords(position.coords.longitude, position.coords.latitude).then(data => {
                getShopsRequest(data).then(data => {
                    let shops = [];
                    data.forEach(shop => {
                        shops.push(<ShopCard shop={shop}/>)
                    })
                    setShops({list: shops})
                })
            })
            setCoords({loading: false});
        });
    }
    if (adress !== '' || adress !== null || adress !== undefined){
        if (disabled === true){
            setDisabled(false);
        }
    }else{
        if (disabled === false){
            setDisabled(true);
        }
    }
    return (
        <div className="shops-container">
            <Dialog header="Header" visible={display}  header="Acceptation des cookies"  breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter()}>
                <p>En cliquant sur accepter, vous accéderez au site, en acceptant l'usage de cookies de localisation.
                    <br/>Ces cookies ne sont présents que dans le but de vous géolocaliser pour trouver les boutiques les plus proches.
                    <br/>Si vous décidez de refuser les cookies, le site restera inaccessible et vous serez redirigé vers la page
                    www.google.fr. <br style={{marginBottom:"1%"}}/>L'équipe Go Local vous remercie !</p>
            </Dialog>

            <div className="search-container">
                <div className="search-text">Recherchez les boutiques proches de chez vous : </div>
                <div className="p-inputgroup">
                    <InputText value={adress} onChange={(e) => setAdress(e.target.value)} placeholder="Votre Adresse"/>
                    <Button disabled={disabled} onClick={() => {getShopsByAdress(adress)}} label="Rechercher"/>
                </div>
            </div>
            <ScrollPanel style={{ width: '1750px', height: '600px', marginTop:"1%", marginLeft:"4%" }}>
                <div style={{ padding: '1em', lineHeight: '1.5', width:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
                    {shops.list.length !== 0 ? (shops.list) : (<div/>)}
                </div>
            </ScrollPanel>
        </div>
    );
}
