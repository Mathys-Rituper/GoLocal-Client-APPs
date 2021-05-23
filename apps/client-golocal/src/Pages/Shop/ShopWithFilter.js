import React from 'react';
import Header from "../../Layout/Header/Header";
import FilteredShops from "../../components/client/FilteredShops/filteredShops";



export default function ShopWithFilter() {

        return(
            <div>
                <Header/>
                <FilteredShops/>
            </div>
        );


}
