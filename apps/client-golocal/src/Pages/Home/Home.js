import React from 'react';
import Header from "../../Layout/Header/Header";
import Shops from "../../components/client/Shops/Shops";

export default function Home() {
    return(
        <div>
            <Header/>
            <div>
                <Shops />
            </div>
        </div>
    );
}
