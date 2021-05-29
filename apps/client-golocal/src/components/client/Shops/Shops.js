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
import {getShopsRequest} from "../../../golocal-oidc/functions";


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
function getShops(type, long, lat, adress){
    getShopsRequest(type, long, lat, adress);
}

export default function Shops() {


    let cookies;

    cookies = window.localStorage.getItem("accept_cookies") !== "accepted";
    const [display, setDisplay] = useState(cookies);
    const [shops, setShops] = useState({
        loading : true,
        list : []
    });
    const [coords, setCoords] = useState({
        lng : null,
        lat : null,
        loading : true
    })


    if (coords.loading){
        navigator.geolocation.getCurrentPosition(function(position) {
            setCoords({
                lng : position.coords.longitude,
                lat : position.coords.latitude
            })
            getShops("coords", position.coords.longitude, position.coords.latitude, null).then(data => {

            })
            setCoords({loading: false});
        });
    }
    console.log(shops.list)
    return (
        <div className="shops-container">
            <Dialog header="Header" visible={display}  header="Acceptation des cookies"  breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter()}>
                <p>En cliquant sur accepter, vous accéderez au site, en acceptant l'usage de cookies de localisation.
                    Ces cookies ne sont présents que dans le but de vous géolocaliser pour trouver les boutiques les plus proches.
                    Si vous décidez de refuser les cookies, le site restera inaccessible et vous serez redirigé vers la page
                    www.google.fr. L'équipe Go Local vous remercie !</p>
            </Dialog>

            <div className="search-container">
                <div className="search-text">Recherchez les boutiques proches de chez vous : </div>
                <div className="p-inputgroup">
                    <InputText placeholder="Votre Adresse"/>
                    <Button label="Rechercher"/>
                </div>
            </div>
            <ScrollPanel style={{ width: '100%', height: '600px', marginTop:"1%" }}>
                <div style={{ padding: '1em', lineHeight: '1.5' }}>

                </div>
            </ScrollPanel>
        </div>
    );
}
