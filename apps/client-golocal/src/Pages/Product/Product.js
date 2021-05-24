import React from 'react';
import Header from "../../Layout/Header/Header";
import "./Product.css";

import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Carousel } from 'primereact/carousel';

//pour le rating
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


// import ImageGallery from 'react-image-gallery';

export default function Product(){

    const data = {
        name: "test",
        commentary: ['test1','test2']
    };

    const commArray = [];
    data.commentary.forEach((commentary) => {
        commArray.push(<div>{commentary}</div>)
    })
    console.log(commArray);



    return(
      <div>
          <Header/>
          <div className="top">
          <div className="apercu">
              <h1 className="nomarticle">{data.name}</h1>
              <Rating value={3} stars={5} readOnly={false} cancel={false} className="Note"/>

              <div>
                  Image
              </div>

          </div>

          <div className="description">
              <h2 className="prix">Prix €</h2>
              <div className="Quantite">
                <p> Quantité</p>
              <Dropdown className="dropdown"/>
              </div>

                <h3>Description</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              <div className="buttonajouter">
              <Button label="Ajouter au panier"/>
              </div>

              <p>
                  Vendu par : xxxxxxxxxxx
              </p>

          </div>
          </div>

          <div className="commentairediv">
            <h2>Commentaires :</h2>
              {/*{commArray ? (*/}
              {/*    commArray*/}
              {/*): (*/}
              {/*    "null"*/}
              {/*)}*/}
              <div className="commentairerating">
              <h3>Monsieur X</h3>
              <Rating value={3} stars={5} readOnly={false} cancel={false} className="Notecomm"/>
              </div>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="commentairerating">
              <h3>Monsieur Y</h3>
              <Rating value={3} stars={5} readOnly={false} cancel={false} className="Notecomm"/>
              </div>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </div>

      </div>

    );

}
