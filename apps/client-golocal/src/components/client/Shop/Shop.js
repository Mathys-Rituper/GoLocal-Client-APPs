import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Carousel} from 'primereact/carousel';
import ProductCard from "../ProductCard";
import './shop.css'
import {useLocation} from "react-router-dom";
import {getShopByID, goLocalGetUserInfo} from "../../../golocal-oidc/functions";
import {Button} from "primereact/button";
import Geocode from "react-geocode";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function renderCarousel(articles, responsiveOptions){
    const template = (product) => {
        return (<ProductCard product={product}/>)
    }
    return (
        <div>
            <Carousel value={articles} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={template} header={<h3>Produits de la boutique</h3>} />
        </div>
    )
}

function goHome(){
    window.location.href="https://localhost:3001/";
}
async function geocode(geocoder){
    return await geocoder.geocode('29 champs elysée paris');
}
export default function Shop() {
    mapboxgl.accessToken = "pk.eyJ1IjoibWF0aHlzcml0dXBlciIsImEiOiJja295Y3hxdDQwaGcyMnhtYzhwMWoza3Y2In0.QzL6Cl3sFAFoMi_StxgMNw";
    Geocode.setApiKey("AIzaSyBQOKYdqMp1Cne9eY3oSdHOdlrsHxAEq88");
    Geocode.setLanguage("fr");
    Geocode.setRegion("fr");
    Geocode.setLocationType("ROOFTOP");

    let name, owner, date, dateNotParsed, category, mail, phone, adress, articles;
    let [coords, setCoords] = useState(null);
    const params = useQuery();
    const id = params.get("ID")
    if (id === null || id === undefined || id === ""){
        window.location.href="https://localhost:3001/";
    }
    const [shop, setShop] = useState(null);
    const [display, setDisplay] = useState("none")
    if (shop === null){
        getShopByID(id).then(data => setShop(data));
    }
    if (shop){
        name = shop.name
        owner = shop.user.userName;
        dateNotParsed = shop.creation.split("T");
        dateNotParsed = dateNotParsed[0].split("-")
        date = dateNotParsed[2] + "/" + dateNotParsed[1] + "/" + dateNotParsed[0];
        mail = shop.contact.email;
        phone = shop.contact.phone;
        Geocode.fromAddress(`${shop.address} ${shop.street} ${shop.zip} ${shop.city} ${shop.country}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                coords.lat = lat;
                coords.lng = lng;
                console.log({ lat, lng })
            },
            (error) => {
                console.error(error);
            }
        )
        adress = {
            address: shop.location.address,
            street: shop.location.street,
            zip: shop.location.zip,
            city: shop.location.city,
            country: shop.location.country
        }
        articles = shop.products;
        if(display === "none"){
            setDisplay("")
        }
        console.log(articles);
    }
    if (!adress) {
        adress = {
            adress: "undefined",
            street: "undefined",
            zip: "undefined",
            city: "undefined",
            country: "undefined"
        }
    }
    if (!category) {
        category = "Cat par défaut";
    }
    if (!articles) {
        articles = [{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"}];
    }


    const responsiveOptions = [
        {
            breakpoint: '1464px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '1190px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '915px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '645px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(16);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coords.lng, coords.lat],
            zoom: zoom
        });
        var marker1 = new mapboxgl.Marker()
            .setLngLat([coords.lng, coords.lat])
            .addTo(map.current);
    });
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            coords.lng  = map.current.getCenter().lng.toFixed(4);
            coords.lat = map.current.getCenter().lat.toFixed(4);
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div className="shop-container">
            {shop ? (
                <div/>
            ) : (
                <div style={{width:"100%",textAlign:"center", fontSize:"300%"}}>
                    <div>Ce magasin n'existe pas</div>
                    {() => setDisplay("none")}
                    <Button onClick={() => {goHome()}}>Retour à l'accueil</Button>
                </div>

            )}
            <h4 style={{display : display}}>{name}</h4>
            <div style={{display : display}} className="shop-first-container">
                <div style={{display : display}} className="items" style={{fontFamily:"Lato"}}>
                    <p style={{display : display}} >Propriétaire : {owner}</p>
                    <p style={{display : display}}>Date création : {date}</p>
                    <p style={{display : display}}>Catégorie : {category}</p>
                    <br/>
                    <h5 style={{display : display}}>Horaires d'ouverture :</h5>
                    <table style={{display : display}}>
                        <tr>
                            <td>Lundi :</td>
                            <td>8:00-12:00 14:00-18:00</td>
                        </tr>
                        <tr>
                            <td>Mardi :</td>
                            <td>8:00-12:00 14:00-18:00</td>
                        </tr>
                        <tr>
                            <td>Mercredi :</td>
                            <td>8:00-12:00 14:00-18:00</td>
                        </tr>
                        <tr>
                            <td>Jeudi :</td>
                            <td>8:00-12:00 14:00-18:00</td>
                        </tr>
                        <tr>
                            <td>Vendredi :</td>
                            <td>8:00-12:00 14:00-18:00</td>
                        </tr>
                        <tr>
                            <td>Samedi :</td>
                            <td>Fermé</td>
                        </tr>
                        <tr>
                            <td>Dimanche :</td>
                            <td>Fermé</td>
                        </tr>
                    </table>
                </div>
                <div style={{display : display}} className="items">
                    <h5>Contact :</h5>
                    <p>Téléphone : {phone}</p>
                    <p>Email : <a href={`mailto:${mail}`}>{mail}</a></p>
                    <h5>Adresse</h5>
                    <p>{adress.address} {adress.street}</p>
                    <p>{adress.zip} {adress.city}</p>
                    <p>{adress.country}</p>
                </div>
                <div style={{display : display}} ref={mapContainer} className="map-container"/>
            </div>

            <div style={{display : display}}>
                {shop ? (renderCarousel(articles, responsiveOptions)) : (<div/>)}
            </div>
        </div>


    );
}
