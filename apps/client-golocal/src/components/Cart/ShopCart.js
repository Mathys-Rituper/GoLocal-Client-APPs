import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Rating } from 'primereact/rating';
import {Accordion, AccordionTab,DataTable} from "primereact/accordion";
import React from 'react';

export default function ShopCart(order){

    const shopName = order.shopName;
    const content = [];

    function RenderShopBasket() {
        return(<div>
            <Accordion className="color">
                <AccordionTab header={`Votre panier chez ${shopName} (${content.length} Articles)`}>


                </AccordionTab>
            </Accordion>

        </div>)
    }

    return RenderShopBasket()
}