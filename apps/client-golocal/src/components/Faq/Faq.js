import React from 'react';
import Header from "../../Layout/Header/Header";
import "./Faq.css";
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function Faq() {


    return(
        <div>
            <Header/>
            <div>
                <h1 className="HONE">FAQ</h1>
                    <div className="page">

                        <h2 className="HTWO" id="general" >Général</h2>
                        <Accordion className="color">
                            <AccordionTab header="Qui somme nous?" >
                                <p className="Paragraph">
                                    GoLocal est une platforme qui permet aux commerçants et artisants locaux de pouvoir vendre leurs produit ou services malgrès les restriction sanitaire.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="Pourquoi GoLocal ?">
                                <p className="Paragraph">
                                    Depuis la période du confinement suite à la Covid-19 les artisant locaux ne peuvent pas exercer leurs profesions dans des conditions propices à leur survie.
                                    <br/>
                                    GoLocal permet donc d'apporter une solution qui permet au artisant de compenser les pertes tout en respectant les différentes consignes sanitaires.
                                </p>

                            </AccordionTab>

                        </Accordion>

                        <h2 className="HTWO" id="utilisationClient">Utilisation Client</h2>

                        <Accordion className="color">
                            <AccordionTab header="Pourquoi être client ?">
                                <p className="Paragraph">
                                    Etre client, c'est soutenir les artisans proches de chez vous pour les soutenir pendant cette période compliquée.
                                </p>
                            </AccordionTab>
                            <AccordionTab header="Comment trouver une boutique?">
                                <p className="Paragraph">
                                    Il suffit de taper le nom de la boutique dans la barre de recherche.</p>
                            </AccordionTab>
                            <AccordionTab header="Quels sont les moyen de paiements?">
                                <p className="Paragraph">
                                    Pour le paiement il faut voir avec le vendeur </p>
                            </AccordionTab>
                        </Accordion>


                    </div>
                </div>

        </div>
    );
}
