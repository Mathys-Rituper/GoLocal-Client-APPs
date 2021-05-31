import React from 'react';
import Header from "../../Layout/Header/Header";
import {useLocation} from "react-router-dom";
import Package from "../../componentss/Package/Package";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function PackagePage() {
    const params = useQuery();
    const shopID = params.get("shopID")
    const itemID = params.get("item")
    const packageID = params.get("packageID")
    if ((shopID === null || shopID === undefined || shopID === "") || (itemID === null || itemID === undefined || itemID === "") || (packageID === null || packageID === undefined || packageID === "")){
        window.location.replace("https://localhost:3002/artisan");
    }

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Package/>
        </div>
    );


}
