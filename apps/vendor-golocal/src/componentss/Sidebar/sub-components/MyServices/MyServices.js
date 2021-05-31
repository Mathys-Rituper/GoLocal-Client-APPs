import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./MyServices.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import ServiceCard from "./ServiceCard";
import {getShopByID, getShops} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function MyServices(){

    const params = useQuery();
    const shopID = params.get("shopID")
    const shopName = params.get("shopName")
    const [serviceRequest, setServiceRequest] = useState({
        loading: false,
        services: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        setServiceRequest({ loading: true });
        getShopByID(shopID, true)
            .then(data => {
                console.log(data);
                if (data.status === 1 ){
                    setError(data.message)
                }else{
                    setServiceRequest({
                        loading: false,
                        services: data.data.services,
                    });
                }
            });
    }, []);

    const { loading, services } = serviceRequest;
    console.log(services)
    let servicesComponentsArray = [];
    if (services){
        services.forEach((service) => {
            servicesComponentsArray.push(<ServiceCard service={service} shopID={shopID} shopName={shopName}/>)
        })
    }

    return (
        <div>
            {services ? (
                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                    <div style={{ padding: '1em', lineHeight: '1.5', display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
                        {servicesComponentsArray}
                    </div>
                </ScrollPanel>
            ) : (
                <div>
                    {error ? (
                        <div>{error}</div>
                    ): (
                        <div/>
                    )}
                </div>

            )}

        </div>
    )
}
