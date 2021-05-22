import React from 'react';
import { Button } from 'primereact/button';


import NotFoundPic from "../../assets/erreur-page-404.png"

export default function NotFound() {
    if (window.location.href === "https://localhost:3000/"){
        // window.location.replace("./");
    }
    setTimeout(function(){
        // window.location.replace("./");
        },10000)


    function redirect(){
        window.location.href='./';
    }
    return(
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", backgroundColor:"#f0f0f0"}} >
            <img src={NotFoundPic} style={{width:"70%",marginTop:"1%"}}/>
            <Button label="Go back" onClick={() => {redirect()}} className="p-button-raised" style={{width:"25%", marginTop:"1%", marginBottom:"10%"}} />
        </div>
    );
}
