import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./MyShops.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import ShopCard from "./ShopCard";
import {getShops} from "../../../../golocal-oidc/functions";


export default function MyShops(){

    const [shopsRequest, setShopsRequest] = useState({
        loading: false,
        shops: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        setShopsRequest({ loading: true });
        getShops()
            .then(data => {
                if (data.status === 1 ){
                    setError(data.message)
                }else{
                    setShopsRequest({
                        loading: false,
                        shops: data.data.data.list,
                    });
                }
            });
    }, []);

    const { loading, shops } = shopsRequest;
    console.log(shops)
    let shopsComponentsArray = [];
    if (shops){
        shops.forEach((shop) => {
            shopsComponentsArray.push(<ShopCard shop={shop}/>)
        })
    }

    return (
        <div>
            {shops ? (
                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                    <div style={{ padding: '1em', lineHeight: '1.5', display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
                        {shopsComponentsArray}
                    </div>
                </ScrollPanel>
            ) : (
                <div/>
            )}

        </div>
    )
}
