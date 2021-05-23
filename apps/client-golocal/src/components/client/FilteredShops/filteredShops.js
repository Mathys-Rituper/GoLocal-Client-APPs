import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import './filteredShops.css'
import {ScrollPanel} from "primereact/scrollpanel";
import FilteredProductCard from "./filteredProductCard";



export default function FilteredShops() {

    return (
        <div className="body p-grid">
            <div className="customSidebar p-col-fixed" style={{ width: '20%'}}>
                Fixed
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
