import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import './filteredShops.css'
import {ScrollPanel} from "primereact/scrollpanel";
import FilteredProductCard from "./filteredProductCard";
import {Slider} from "primereact/slider";
import {SelectButton} from "primereact/selectbutton";



export default function FilteredShops() {
    const [value, setValue] = useState([0,200]);
    const options = ['Croissant', 'Décroissant'];
    const [value1, setValue1] = useState('Croissant');
    console.log(value1)
    if (value1 === null){
        setValue1(options[0]);
    }
    return (
        <div className="body p-grid">
            <div className="customSidebar p-col-fixed p-grid p-dir-col">
                <span className="filter-title">FILTRES</span>
                <div className="filters">
                    <h3>Prix : {value[0]} - {value[1]} €</h3>
                    <Slider value={value} onChange={(e) => setValue(e.value)} range  max={2000}/>
                    <h3 style={{marginTop:"10%"}}>Ordre Triage</h3>
                    <SelectButton value={value1} options={options} onChange={(e) => {
                        setValue1(e.value);
                    }} />
                </div>

            </div>
            <div className="filteredContent p-col">
                <ScrollPanel style={{ width: '100%', height: '790px'}} className="custombar1">
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                    <FilteredProductCard/>
                </ScrollPanel>
            </div>
        </div>
    )

}
