import React, {useState} from 'react';
import Header from "../../Layout/Header/Header";
import Artisan from "../../componentss/Artisan/Artisan";




export default function ArtisanPage() {

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Artisan/>
        </div>
    );


}
