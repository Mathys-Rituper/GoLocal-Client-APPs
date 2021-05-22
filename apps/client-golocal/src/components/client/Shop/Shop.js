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

function renderCarousel(articles, responsiveOptions){

    const template = (product) => {
        return (
            <ProductCard product={product}/>
        )
    }
    return (
        <div>
            <Carousel value={articles} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={template} header={<h3>Produits de la boutique</h3>} />
        </div>

    )
}

export default function Shop({name, owner, date, category, coords, articles}) {

    mapboxgl.accessToken = "pk.eyJ1IjoibWF0aHlzcml0dXBlciIsImEiOiJja295Y3hxdDQwaGcyMnhtYzhwMWoza3Y2In0.QzL6Cl3sFAFoMi_StxgMNw";
    if (!name) {
        name = "Nom de la boutique"
    };
    if (!owner) {
        owner = "Propriétaire";
    }
    if  (!date) {
        date = "15/04/2002";
    }
    if (!category) {
        category = "Cat par défaut";
    }
    if (!coords) {
        coords = {lng: 5.7169, lat: 45.1915};
    }
    if (!articles) {
        articles = [{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"},{nom: "Test", image: "test.jpg", price: "55", rating: "5"}];
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


    return (
        <div className="shop-container">
            <h4>{name}</h4>
            <div className="shop-first-container">
            <div className="items" style={{fontFamily:"Lato"}}>
                <p>Propriétaire : {owner}</p>
                <p>Sur GoLocal depuis : {date}</p>
                <p>Catégorie : {category}</p>
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
                    <p>Téléphone : 04 44 44 44 44</p>
                    <p>Email : <a href="mailto:toto@gmail.com">toto@gmail.com</a></p>
                    <h5>Adresse</h5>
                    <p>Place Doyen Gosse</p>
                    <p>38000 Grenoble</p>
                </div>
            <div ref={mapContainer} className="map-container"/>
            </div>

            <div className="card">
                {renderCarousel(articles, responsiveOptions)}
            </div>
        </div>


    );
}
