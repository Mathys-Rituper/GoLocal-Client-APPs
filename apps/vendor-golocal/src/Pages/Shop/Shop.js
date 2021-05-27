import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import Shop from "../../componentss/Shop/Shop";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ShopPage() {
    const params = useQuery();
    const shopID = params.get("shopID")
    if (shopID === null || shopID === undefined || shopID === ""){
        window.location.replace("https://localhost:3002/artisan");
    }

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Shop/>
        </div>
    );


}
