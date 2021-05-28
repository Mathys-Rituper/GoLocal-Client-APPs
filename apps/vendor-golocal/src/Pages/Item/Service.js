import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import {useLocation} from "react-router-dom";
import Item from "../../componentss/Item/Item";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function ItemPage() {
    const params = useQuery();
    const shopID = params.get("shopID")
    const itemID = params.get("item")
    if ((shopID === null || shopID === undefined || shopID === "") || (itemID === null || itemID === undefined || itemID === "")){
        window.location.replace("https://localhost:3002/artisan");
    }

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Item/>
        </div>
    );


}
