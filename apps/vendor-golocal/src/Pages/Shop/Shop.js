import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import Shop from "../../componentss/Shop/Shop";



export default function ShopPage() {
    console.log("lol")

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Shop/>
        </div>
    );


}
