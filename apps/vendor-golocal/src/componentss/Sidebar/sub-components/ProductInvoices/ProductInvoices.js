import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useEffect, useState} from 'react';
import "./ProductInvoices.css"
import { ScrollPanel } from 'primereact/scrollpanel';
import ProductInvoicesCard from "./ProductInvoiceCard";
import {getProductsInvoices, getShops} from "../../../../golocal-oidc/functions";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ProductInvoices(){

    const params = useQuery();
    const shopID = params.get("shopID")
    const [shopsRequest, setShopsRequest] = useState({
        loading: false,
        invoices: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        setShopsRequest({ loading: true });
        getProductsInvoices(shopID)
            .then(data => {
                if (data.status === 1 ){
                    setError(data.message)
                }else{
                    setShopsRequest({
                        loading: false,
                        invoices: data.data.data.list,
                    });
                }
            });
    }, []);

    const { loading, invoices } = shopsRequest;
    console.log(invoices)
    let invoiceComponentsArray = [];
    if (invoices){
        invoices.forEach((invoice) => {
            invoiceComponentsArray.push(<ProductInvoicesCard invoice={invoice}/>)
        })
    }

    return (
        <div>
            {invoices ? (
                <ScrollPanel style={{ width: '100%', height: '700px' }}>
                    <div style={{ padding: '1em', lineHeight: '1.5', display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
                        {invoiceComponentsArray}
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
