import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import "./Item.css";
import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getItemByID} from "../../../golocal-oidc/functions";
import {Rating} from "primereact/rating";
import {ScrollPanel} from "primereact/scrollpanel";
import {DataScroller} from "primereact/datascroller";
import {Button} from "primereact/button";
import {addToCartItem} from "../../../golocal-oidc/functions";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {Tooltip} from "primereact/tooltip";
import CommentaryCard from "./CommentaryCard/CommentaryCard";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function Item() {
    const params = useQuery();
    const shopID = params.get("shopID")
    const itemID = params.get("itemID")
    const toast = useRef(null);
    const [products, setProducts] = useState([]);
    const [itemRequest, setItemRequest] = useState({
        loading: false,
        item: null,
    });
    useEffect(() => {
        setItemRequest({ loading: true });
        getItemByID(shopID, itemID)
            .then(data => {
                setItemRequest({
                    loading: false,
                    item: data,
                });
            });
    }, []);
    const { loading, item } = itemRequest;
    console.log(item);
    let creation = "Chargement";
    const commentaryArray = []
    if (item){
        let toFormatDate = item.creation.split("T");
        toFormatDate = toFormatDate[0];
        toFormatDate = toFormatDate.split("-");
        toFormatDate = toFormatDate[2] + "/" + toFormatDate[1] + "/" + toFormatDate[0];
        creation = toFormatDate;
        if (products.length === 0){
            setProducts(item.packages);
        }
        let commentariesObject = [{rate: 4, body: "Teesst"},{rate: 4, body: "Teesst"},{rate: 4, body: "Teesst"},{rate: 4, body: "Teesst"},{rate: 4, body: "Teesst"}]
        if (commentariesObject){
            commentariesObject.forEach(commentary => {
                commentaryArray.push(<CommentaryCard commentary={commentary}/>)
            })
        }
    }

    const itemTemplate = (data) => {
        if (data.name.length >= 10){
            let name = data.name.slice(0,10)
            data.name = name;
        }
        return (
            <div >
                <Toast ref={toast} />
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingBottom:"2%", paddingTop:"2%"}}>
                    <div style={{display:"flex",flexDirection:"column", width:"20%"}}>
                        <div style={{fontFamily:"Lato,sans-serif", fontWeight:"bold", fontSize:"150%"}}>{data.name}</div>
                        <Rating value={data.rating} readOnly cancel={false}/>
                        <div style={{fontFamily:"Lato,sans-serif", fontWeight:"bold", fontSize:"100%"}}>Stock : {data.stocks}</div>
                    </div>
                    <span style={{width:"",fontFamily:"Lato,sans-serif", fontSize:"100%", paddingLeft:"1%", paddingRight:"1%", backgroundColor: data.asStocks ? ("#c8e6c9") : ("#ffcdd2")}}>{data.asStocks ? ('En stock') : ('Rupture')}</span>
                    <span style={{fontFamily:"Lato,sans-serif", fontSize:"120%"}}>{data.price}€</span>
                    <div style={{width:"12%"}}>
                        <Button style={{fontFamily:"Lato,sans-serif", backgroundColor:"grey", borderColor:"grey"}} icon="pi pi-info-circle" label="" tooltip={data.description} tooltipOptions={{ position: 'left', mouseTrack: true, mouseTrackTop: 15 }}/>
                        <Button style={{fontFamily:"Lato,sans-serif",  backgroundColor:"rgb(89, 136, 255)", borderColor:"rgb(89, 136, 255)", marginLeft:"3%"}} icon="pi pi-shopping-cart" label="" onClick={() => {
                            addToCartItem(shopID, itemID, data.id, 1).then(data => {
                                if (data.status === 1){
                                    toast.current.show({severity:'error', summary: 'Erreur', detail: data.message, life: 3000});
                                }else{
                                    toast.current.show({severity:'success', summary: 'Succès', detail: data.message, life: 3000});
                                }
                            })
                        }} disabled={data.asStocks === false}/>
                    </div>


                </div>
            </div>
        );
    }

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {item ? (
                <div className="responsiveContainer">
                    <div style={{width:"20%", marginRight:"2%"}}>
                        <img src={`data:image/jpeg;base64,${item.image}`} style={{width:"100%", borderColor: "2px solid #e8e8e8",boxShadow:"3px 3px 8px #f0f0f0"}} />
                    </div>
                    <div className="containerOne">
                        <div className="item-title">{item.name}</div>
                        <Rating value={item.rate} readOnly stars={5} cancel={false} />
                        <div className="small-text">{creation}</div>
                        <div className="mid-text">Prix Moyen : <div style={{marginLeft:"2%", fontFamily:"Lato,sans-serif", color:"rgb(89, 136, 255)", fontSize:"100%"}}>{Math.round(item.priceAverage)} €</div></div>
                        <div className="mid-text" style={{marginTop:"1%"}}>Description :</div>
                            <ScrollPanel style={{ width: '100%', height: '200px' }}>
                            <div style={{ padding: '1em', lineHeight: '1.5' }}>
                                {item.description}
                            </div>
                        </ScrollPanel>
                    </div>
                    <div className="containerTwo">
                        <DataScroller value={products} itemTemplate={itemTemplate} rows={7} inline scrollHeight="330px" header={`Liste des packages de ${item.name}`} />
                    </div>
                </div>
            ) : (
                <div/>
            )}
            {item ? (
                <div style={{marginTop:"3%", width:"100%"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontWeight:"bold", fontSize:"140%", marginBottom:"1%"}}>Commentaires</div>
                    <ScrollPanel style={{ width: '100%', height: '320px', border:"2px solid rgb(170, 179, 179)",boxShadow: "rgb(240, 240, 240) 3px 3px 8px" }}>
                            {commentaryArray}
                    </ScrollPanel>
                </div>
            ) : (
                <div/>
            )}
        </div>
    )
}