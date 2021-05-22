import React from 'react';
import Header from "../../Layout/Header/Header";
import Shop from "../../components/client/Shop/Shop";


export default function ShopByID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const shopID = urlParams.get('ID')
    console.log(shopID);
    if (!shopID){
        window.location.href="./"
        return (
            <div>
            <Header/>
            <div style={{textAlign:"center"}}> REDIRECTING ...</div>
            </div>
        )
    }else{
        return(
            <div>
                <Header/>
                <div>
                    <Shop />
                </div>
            </div>
        );
    }


}
