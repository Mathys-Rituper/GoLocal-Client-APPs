import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import './filteredShops.css'
import {ScrollPanel} from "primereact/scrollpanel";
import {Slider} from "primereact/slider";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {useLocation} from "react-router-dom";
import {getShopsFilteredRequest} from "../../../golocal-oidc/functions";
import ShopCard from "../Shops/ShopCard";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function FilteredShops() {
    if (!window.localStorage.getItem("PlaceName")){
        window.location.replace("https://localhost:3001/")
    }
    const params = useQuery();
    const search = params.get("search")
    const [loadingSearch, setLoadingSearch] = useState(true)
    const [shopsRequest, setShopsRequest] = useState({
        loading: false,
        shops: null,
    });

    useEffect(() => {
        setShopsRequest({ loading: true });
        let searchVar = '';
        if (search){
            searchVar = search;
        }
        getShopsFilteredRequest(searchVar, 5)
            .then(data => {
                setShopsRequest({
                    loading: false,
                    shops: data,
                });
            });
    }, []);




    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState(5);
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    function getShopsFiltered(value2, value3) {
        getShopsFilteredRequest(value2, value3)
            .then(data => {
                // console.log(data)
                setShopsRequest({
                    loading: false,
                    shops: data,
                });
            });
    }
    function resetShopsFiltered() {
        getShopsFilteredRequest('', 5)
            .then(data => {
                // console.log(data)
                setShopsRequest({
                    loading: false,
                    shops: data,
                });
            });
    }
    const { loading, shops } = shopsRequest;
    let shopsArray = [];
    if (shops){
        shops.forEach(shop => {
            shopsArray.push(<ShopCard shop={shop}/>)
        })
    }
    return (
        <div className="body p-grid" style={{marginTop:"0px"}}>
            <div className="hiddenFilters">
                <Sidebar visible={visibleFullScreen} fullScreen onHide={() => setVisibleFullScreen(false)}>
                    <span className="filter-title">FILTRES</span>
                    <div className="filters">
                        <h3 style={{marginTop:"10%", textAlign:"left", borderBottom:"2px solid black"}}>Nom</h3>
                        <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={value2} onChange={(e) => setValue2(e.target.value)} placeholder="Recherche" />
                    </span>
                    </div>

                    <h3 style={{marginLeft:"10%", marginRight:"15%",marginTop:"8%", marginBottom:"0%", textAlign:"left", borderBottom:"2px solid black"}}>Distance</h3>
                    <div className="filters">
                        <p style={{ textAlign:"left"}}>Jusqu'à {value3} Km</p>
                        <Slider value={value3} onChange={(e) => setValue3(e.value)} min={5} max={50} step={5}/>
                    </div>
                    <div className="filters" style={{display:"flex", justifyContent:"space-between", marginTop:"15%", flexWrap:"wrap"}}>
                        <Button label="Appliquer" onClick={() => {getShopsFiltered(value2, value3)}} className="p-button-raised" style={{backgroundColor: "#5988ff"}} />
                        <Button label="Supprimer" onClick={() => {
                            setValue2("");
                            setValue3(5);
                            resetShopsFiltered()
                        }} className="p-button-raised p-button-secondary" />
                    </div>

                </Sidebar>
            </div>




            <div className="customSidebar p-col-fixed p-grid p-dir-col">
                <span className="filter-title">FILTRES</span>
                <div className="filters">
                    <h3 style={{marginTop:"10%", textAlign:"left", borderBottom:"2px solid black"}}>Nom</h3>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText style={{width:"100%"}} value={value2} onChange={(e) => setValue2(e.target.value)} placeholder="Recherche" />
                    </span>
                </div>

                <h3 style={{marginLeft:"10%", marginRight:"15%",marginTop:"8%", marginBottom:"0%", textAlign:"left", borderBottom:"2px solid black"}}>Distance</h3>
                <div className="filters">
                    <p >Jusqu'à {value3} Km</p>
                    <Slider value={value3} onChange={(e) => setValue3(e.value)} min={5} max={50} step={5}/>
                </div>
                <div className="filters" style={{display:"flex", justifyContent:"space-between", marginTop:"15%"}}>
                    <Button label="Appliquer" onClick={() => {getShopsFiltered(value2, value3)}} className="p-button-raised" style={{backgroundColor: "#5988ff"}} />
                    <Button label="Supprimer" onClick={() => {
                        setValue2("");
                        setValue3(5);
                        resetShopsFiltered()
                    }} className="p-button-raised p-button-secondary" />
                </div>


            </div>
            <div className="filteredContent p-col" style={{display :  visibleFullScreen ? 'none' : 'initial'}}>
                <Button icon="pi pi-filter" style={{width:"50%", marginLeft:"23%"}} onClick={() => {setVisibleFullScreen(true)}} className="p-button-raised p-button-secondary hiddenFilters">Afficher les filtres</Button>
                <ScrollPanel style={{ width: '100%', height: '790px'}} className="custombar1">
                    {shopsArray.length !== 0 ? (shopsArray) : (<div/>)}
                </ScrollPanel>
            </div>
        </div>
    )

}
