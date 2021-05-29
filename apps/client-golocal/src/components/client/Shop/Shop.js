import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {useEffect, useRef, useState} from 'react';
import {Carousel} from 'primereact/carousel';
import ProductCard from "../ProductCard";
import {Rating} from "primereact/rating";
import './shop.css'
import {useLocation} from "react-router-dom";
import {getShopByID} from "../../../golocal-oidc/functions";


function renderCarousel(products, responsiveOptions, shopID){
    const template = (product) => {
        return (
            <ProductCard shopID={shopID} product={product}/>
        )
    }
    return (
        <div>
            <Carousel value={products} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={template} header={<h3>Produits de la boutique</h3>} />
        </div>

    )
}
function renderCarousel2(services, responsiveOptions, shopID){
    const template = (product) => {
        return (
            <ProductCard shopID={shopID} product={product}/>
        )
    }
    return (
        <div>
            <Carousel value={services} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={template} header={<h3>Services de la boutique</h3>} />
        </div>

    )
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function Shop() {
    const MAPBOX_TOKEN = require('../../../config')
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const params = useQuery();
    const shopID = params.get("ID")
    const latitude = params.get("lat")
    const longitude = params.get("lng")
    let name, owner, date, rate, products, services, contact, adress1, adress2;
    let coords = {
        lng: longitude,
        lat: latitude
    }
    if (shopID === null || shopID === undefined || shopID === "" || !latitude || !longitude){
        window.location.replace("https://localhost:3001/");
    }
    const [shopRequest, setShopRequest] = useState({
        loading: false,
        shop: null,
    });

    useEffect(() => {
        setShopRequest({ loading: true });
        getShopByID(shopID)
            .then(data => {
                setShopRequest({
                    loading: false,
                    shop: data,
                });
            });
    }, []);

    const { loading, shop } = shopRequest;
    if (shop){
        name = shop.name;
        let toFormatDate = shop.creation.split("T");
        toFormatDate = toFormatDate[0];
        toFormatDate = toFormatDate.split("-");
        toFormatDate = toFormatDate[2] + "/" + toFormatDate[1] + "/" + toFormatDate[0];
        date = toFormatDate;
        owner = shop.user.userName
        products = shop.products
        contact = shop.contact
        adress1 = `${shop.location.address} ${shop.location.street}`
        adress2 = `${shop.location.postCode} ${shop.location.city} ${shop.location.country}`
        services = shop.services;
    }
    if (!name) {
        name = "Nom de la boutique"
    };
    if (!owner) {
        owner = "Propriétaire";
    }
    if (!adress1 || !adress2){
        adress1 = "Chargement ..."
        adress2 = "Chargement ..."
    }
    if  (!date) {
        date = "15/04/2002";
    }
    if (!rate) {
        rate = 0;
    }
    if (!coords) {
        coords = {lng: 5.7169, lat: 45.1915};
    }
    if (!contact){
        contact = {
            phone : "non défini",
            email : "non défini"
        }
    }
    if (!products) {
        products = [{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"}];
    }
    if (!services) {
        services = [{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"},{nom: "Test", image: "test.jpg", price: "55", rating: "5.0"}];
    }

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(coords.lng);
    const [lat, setLat] = useState(coords.lat);
    const [zoom, setZoom] = useState(16);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        var marker1 = new mapboxgl.Marker()
            .setLngLat([coords.lng, coords.lat])
            .addTo(map.current);
    });
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div className="shop-container">
            <h4>{name}</h4>
            <div className="shop-first-container">
                <div className="items">
                    <p>Propriétaire : {owner}</p>
                    <p>Depuis le : {date}</p>
                    <Rating value={rate} readOnly stars={5} cancel={false} />
                    <br/>
                    <h5>Horaires d'ouverture :</h5>
                    <table></table>
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
                </div>
                <div className="items">
                    <h5>Contact :</h5>
                    <p>Téléphone : {contact.phone}</p>
                    <p>Email : <a href="mailto:toto@gmail.com">{contact.email}</a></p>
                    <h5>Adresse</h5>
                    <p>{adress1}</p>
                    <p>{adress2}</p>
                </div>
                <div ref={mapContainer} className="map-container"/>
            </div>
            {products.length !== 0 ? (
                <div style={{width:"100%", marginTop:"3%", borderColor:"1px solid #f0f0f0",boxShadow:"1px 1px 8px #f0f0f0"}}>
                    {renderCarousel(products, responsiveOptions, shopID)}
                </div>) : (<div/>)}
            {services.length !== 0 ? (
                <div style={{width:"100%", marginTop:"3%", borderColor:"1px solid #f0f0f0",boxShadow:"1px 1px 8px #f0f0f0"}}>
                    {renderCarousel2(services, responsiveOptions, shopID)}
                </div>
            ) : (
                <div/>
            )

            }

        </div>


    );
}
