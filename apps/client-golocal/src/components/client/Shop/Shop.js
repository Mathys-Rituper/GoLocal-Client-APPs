import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {useEffect, useRef, useState} from 'react';

import { Carousel } from 'primereact/carousel';

import ProductCard from "../ProductCard";

function getProductCard(article){
    return (
        <ProductCard nom={article.nom} image={article.image} price={article.price} rating={article.rating}/>
    )
}
function RenderShop(name,owner,date,category,articles,mapContainer) {
    const numItemsParPage=5;
    let numPages = 1;
    if (articles.length % numItemsParPage == 0) {
        numPages = articles.length / numItemsParPage;
    } else {
        numPages = (articles.length / numItemsParPage) + 1;
    }

    return (<div>
            <h4>{name}</h4>
            <p>Propriétaire : {owner}</p>
            <p>Sur GoLocal depuis : {date}</p>
            <p>Catégorie : {category}</p>
            <br/>
            <h5>Horaires d'ouverture</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur deserunt ducimus eum exercitationem facere facilis ipsam magni molestias, nostrum officiis quam, saepe sequi voluptatum. Expedita impedit iusto minus molestiae optio.</p>

            <div ref={mapContainer} className="map-container" ></div>

            <Carousel value={articles} itemTemplate={getProductCard} numVisible={numItemsParPage} numScroll={numPages} header={<h3>Produits de la boutique</h3>}/>

        </div>
    );
}


export default function Shop({name,owner,date,category,coords,articles}) {

    mapboxgl.accessToken = "pk.eyJ1IjoibWF0aHlzcml0dXBlciIsImEiOiJja295Y3hxdDQwaGcyMnhtYzhwMWoza3Y2In0.QzL6Cl3sFAFoMi_StxgMNw";
    if (!name) name = "Nom de la boutique";
    if (!owner) owner = "Propriétaire";
    if  (!date) date = "15/04/2002";
    if (!category) category = "Cat par défaut";
    if (!coords) coords = {lat:-70.9,long:42.35}
    if (!articles) articles = [{
        aaa : 12
    }];

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(coords.lng);
    const [lat, setLat] = useState(coords.lat);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });


    return RenderShop(name,owner,date,category,articles,mapContainer)
}