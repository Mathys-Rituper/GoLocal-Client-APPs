import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React from 'react';

import {Carousel} from 'primereact/carousel';

import BoutiqueCard from "../BoutiqueCard";

import './shops.css'

function renderShops(shops,responsiveOptions){
    const template = (shop) => {
        return (
            <BoutiqueCard boutique={shop}/>
        )
    }
    return (

                <div className="card" style={{width:"100%"}}>
                    <Carousel value={shops.shops} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={template} header={<h3>Boutiques de la catégorie {shops.category} :</h3>} />
                </div>

    )
}

export default function Shops() {

    const responsiveOptions = [
        {
            breakpoint: '1464px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '1190px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '915px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '645px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const object = [
        {id:0, nom: "Courgette", image: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:1, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:2, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:3, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:4, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:5, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:6, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:7, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:8, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:9, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Informatique", localisation: "null"},{id:0, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:1, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:2, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:3, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:4, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:5, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:6, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:7, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:8, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:9, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Culture", localisation: "null"},{id:0, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:1, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:2, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:3, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:4, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:5, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:6, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:7, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:8, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:9, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Art", localisation: "null"},{id:0, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:1, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:2, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:3, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:4, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:5, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:6, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:7, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:8, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:9, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Cuisine", localisation: "null"},{id:0, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:1, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:2, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:3, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:4, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:5, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:6, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:7, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:8, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"},{id:9, nom: "Courgette", description: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png", category:"Bijouterie", localisation: "null"}
    ]
    const categories = [];
    object.forEach((shop) => {
        if (!categories.includes(shop.category)){
            categories.push(shop.category);
        }
    })
    categories.sort();
    const shopsByCategory = [];
    categories.forEach((category) => {
        const shops = [];
        object.forEach((shop) => {
            if (shop.category === category){
                shops.push(shop);
            }
        })
        const toPushToShopsByCategory = {
            category : category,
            shops : shops
        }
        shopsByCategory.push(toPushToShopsByCategory);
    })
    console.log(shopsByCategory);

    let caroussels = [];

    if (shopsByCategory.length!=0) {
        for (const category of shopsByCategory) {
            caroussels.push(renderShops(category,responsiveOptions))
            console.log(category.category);
            console.log(category.shops)
        }
    } else {
        caroussels.push(<p>Pas de boutiques</p>);
    }

    return (
        <div className="shop-container">
            {caroussels}
        </div>


    );
}
