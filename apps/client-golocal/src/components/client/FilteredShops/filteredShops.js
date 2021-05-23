import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import './filteredShops.css'
import placeholder from "../../../assets/product-image-placeholder.jpg"
import {ScrollPanel} from "primereact/scrollpanel";
import FilteredShopCard from "./filteredShopCard";
import {Slider} from "primereact/slider";
import {SelectButton} from "primereact/selectbutton";
import {MultiSelect} from "primereact/multiselect";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";



export default function FilteredShops() {
    const [value, setValue] = useState([500,1500]);
    const options = ['Croissant', 'Décroissant'];
    const [value1, setValue1] = useState('Croissant');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState(5);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const categories = [
        {name: 'Accessoires'},
        {name: 'Ameublement'},
        {name: 'Bricolage'},
        {name: 'Musique'},
        {name: 'Chaussures'},
        {name: 'Décoration'},
        {name: 'Electroménager'},
        {name: 'Fournitures de bureau'},
        {name: 'Image & son'},
        {name: 'Informatique'},
        {name: 'Instruments de musique'},
        {name: 'Jardinage'},
        {name: 'Jeux & Jouets'},
        {name: 'Linge de maison'},
        {name: 'Livres'},
        {name: 'Montres & Bijoux'},
        {name: 'Outillage '},
        {name: 'Sports  '},
        {name: 'Vêtements '},
    ];
    if (value1 === null){
        setValue1(options[0]);
    }
    const categoriesTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }
    const selectedCategoriesTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }
        return "Choisir catégorie(s)";
    }
    const panelFooterTemplate = () => {
        const length = selectedCategories ? selectedCategories.length : 0;
        return (
            <div className="p-py-2 p-px-3">
                <b>{length}</b> catégorie{length > 1 ? 's' : ''} choisie{length > 1 ? 's' : ''}.
            </div>
        );
    }

    return (
        <div className="body p-grid" style={{marginTop:"0px"}}>
            <div className="customSidebar p-col-fixed p-grid p-dir-col">
                <span className="filter-title">FILTRES</span>
                <div className="filters">
                    <h3 style={{marginTop:"10%", textAlign:"left", borderBottom:"2px solid black"}}>Nom</h3>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={value2} onChange={(e) => setValue2(e.target.value)} placeholder="Recherche" />
                    </span>
                </div>
                <div className="filters">
                    <h3 style={{marginTop:"10%", textAlign:"left", borderBottom:"2px solid black"}}>Catégories</h3>
                    <MultiSelect style={{width:"90%"}} value={selectedCategories} options={categories} onChange={(e) => setSelectedCategories(e.value)} optionLabel="name" placeholder="Choisir catégorie(s)" filter className="multiselect-custom" itemTemplate={categoriesTemplate} selectedItemTemplate={selectedCategoriesTemplate} panelFooterTemplate={panelFooterTemplate}/>
                </div>
                <h3 style={{marginLeft:"10%", marginRight:"15%",marginTop:"8%", marginBottom:"0%", textAlign:"left", borderBottom:"2px solid black"}}>Prix</h3>
                <div className="filters">
                    <p style={{ textAlign:"left"}}>De {value[0]} à {value[1]} €</p>
                    <Slider value={value} onChange={(e) => setValue(e.value)} range  max={2000}/>
                </div>
                <div className="filters">
                    <p style={{marginTop:"10%", textAlign:"left"}}>Ordre</p>
                    <SelectButton value={value1} options={options} onChange={(e) => {setValue1(e.value);}}/>
                </div>
                <h3 style={{marginLeft:"10%", marginRight:"15%",marginTop:"8%", marginBottom:"0%", textAlign:"left", borderBottom:"2px solid black"}}>Distance</h3>
                <div className="filters">
                    <p style={{ textAlign:"left"}}>Jusqu'à {value3} Km</p>
                    <Slider value={value3} onChange={(e) => setValue3(e.value)} max={50} step={5}/>
                </div>
                <div className="filters" style={{display:"flex", justifyContent:"space-between", marginTop:"15%"}}>
                    <Button label="Appliquer" className="p-button-raised" style={{backgroundColor: "#5988ff"}} />
                    <Button label="Supprimer" onClick={() => {
                        setValue([500,1500]);
                        setValue1(options[0]);
                        setValue2("");
                        setValue3(5);
                        setSelectedCategories(null);
                    }} className="p-button-raised p-button-secondary" />
                </div>


            </div>
            <div className="filteredContent p-col">
                <ScrollPanel style={{ width: '100%', height: '790px'}} className="custombar1">
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                    <FilteredShopCard/>
                </ScrollPanel>
            </div>
        </div>
    )

}
