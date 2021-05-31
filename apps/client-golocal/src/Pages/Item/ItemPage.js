import React from 'react';
import Header from "../../Layout/Header/Header";
import Item from "../../components/client/Item/Item";


export default function ItemPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const shopID = urlParams.get('shopID');
    let itemID = urlParams.get('itemID');
    let serviceID = urlParams.get('serviceID');
    if (!itemID && serviceID){
        itemID = serviceID;
    }
    if (!shopID && !itemID){
        window.location.href="https://localhost:3001/"
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
                <div style={{padding:"3%"}}>
                    <Item/>
                </div>
            </div>
        );
    }


}
