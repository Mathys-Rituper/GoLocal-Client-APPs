import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./MyProducts.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import ProductCard from "./ProductCard";
import {getShops} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function MyProducts(){
    const params = useQuery();
    const shopID = params.get("shopID")

    const [productRequest, setProductRequest] = useState({
        loading: false,
        products: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        setProductRequest({ loading: true });
        getShops()
            .then(data => {
                if (data.status === 1 ){
                    setError(data.message)
                }else{
                    setProductRequest({
                        loading: false,
                        products: data.products,
                    });
                }
            });
    }, []);

    const { loading, products } = productRequest;
    console.log(products)
    let productsComponentsArray = [];
    const productts = [
        {
            "id": 0,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 1,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        },
        {
            "id": 2,
            "image": null,
            "name": "Test",
            "location" : "localisation"
        }
    ]
    if (productts){
        productts.forEach((product) => {
            productsComponentsArray.push(<ProductCard product={product} shopID={shopID}/>)
        })
    }

    return (
        <div>
            {productts ? (
                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                    <div style={{ padding: '1em', lineHeight: '1.5', display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
                        {productsComponentsArray}
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
