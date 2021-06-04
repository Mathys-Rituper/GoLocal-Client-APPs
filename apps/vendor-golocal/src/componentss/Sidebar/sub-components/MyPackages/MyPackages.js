import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./MyPackages.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import PackageCard from "./PackageCard";
import {getItemByID, getShopByID, getShops} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function MyPackages(){
    const params = useQuery();
    const shopID = params.get("shopID")
    const itemID = params.get("item")
    const shopName = params.get("shopName")
    const [packageRequest, setPackageRequest] = useState({
        loading: false,
        packages: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        setPackageRequest({ loading: true });
        getItemByID(shopID, itemID, true)
            .then(data => {
                if (data.status === 1 ){
                    setError(data.message)
                }else{
                    setPackageRequest({
                        loading: false,
                        packages: data.data.packages,
                    });
                }
            });
    }, []);

    const { loading, packages } = packageRequest;
    // console.log(packages)
    let packagesComponentsArray = [];
    if (packages){
        packages.forEach((itemPackage) => {
            packagesComponentsArray.push(<PackageCard itemPackage={itemPackage} itemID={itemID} itemName={shopName} shopID={shopID} shopName={shopName}/>)
        })
    }

    return (
        <div>
            {packages ? (
                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                    <div style={{ padding: '1em', lineHeight: '1.5', display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
                        {packagesComponentsArray}
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
