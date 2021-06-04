import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import "./Item.css";
import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import {addToCommandPackage, getItemByID} from "../../../golocal-oidc/functions";
import {Rating} from "primereact/rating";
import {ScrollPanel} from "primereact/scrollpanel";
import {DataScroller} from "primereact/datascroller";
import {Button} from "primereact/button";
import {addToCartItem} from "../../../golocal-oidc/functions";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {Tooltip} from "primereact/tooltip";
import CommentaryCard from "./CommentaryCard/CommentaryCard";
import {InputNumber} from "primereact/inputnumber";
import {InputTextarea} from "primereact/inputtextarea";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function Item() {
    const params = useQuery();
    const shopID = params.get("shopID")
    let itemID = params.get("itemID")
    let serviceID = params.get('serviceID');
    if (!itemID && serviceID){
        itemID = serviceID;
    }
    const [infoDialog, setInfoDialog] = useState({
        shopID : shopID,
        itemID : itemID,
        prixIndic : null,
        itemName : null,
        packageID : null
    })
    const toast = useRef(null);
    const dialogToast = useRef(null);
    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState('');
    const [loadedPackages, setLoadedPackages] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayDescription, setDisplayDescription] = useState(false);
    const [position, setPosition] = useState('center');
    const [price, setPrice] = useState(1);
    const [spec, setSpec] = useState("Écrivez votre demande");
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
    let creation = "Chargement";
    const commentaryArray = []
    if (item){
        let toFormatDate = item.creation.split("T");
        toFormatDate = toFormatDate[0];
        toFormatDate = toFormatDate.split("-");
        toFormatDate = toFormatDate[2] + "/" + toFormatDate[1] + "/" + toFormatDate[0];
        creation = toFormatDate;
        if (products.length === 0){
            if (loadedPackages === false){
                setLoadedPackages(true);
                setProducts(item.packages);
            }
        }
        let commentariesObject = [{rate: 5, body: "Très bon produit"},{rate: 3, body: "Bien arrivé, mais vendeur peu cordial"},{rate: 4, body: "Je recommande"},{rate: 5, body: "Produits de très bonne qualité"},{rate: 3, body: "Mon produit s'est vité abimé, les matériaux ne sont pas les meilleurs"}]
        if (commentariesObject){
            commentariesObject.forEach(commentary => {
                commentaryArray.push(<CommentaryCard commentary={commentary}/>)
            })
        }
    }

    const itemTemplate = (data) => {
        let name;
        if (data.name.length >= 10){
            name = data.name.slice(0,10);
        }
        if (serviceID){
            return (
                <div >
                    <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingBottom:"2%", paddingTop:"2%"}}>
                        <div style={{display:"flex",flexDirection:"column", width:"20%"}}>
                            <div style={{fontFamily:"Lato,sans-serif", fontWeight:"bold", fontSize:"150%"}}>{name}</div>
                            <Rating value={data.rating} readOnly cancel={false}/>
                            <div style={{fontFamily:"Lato,sans-serif", fontWeight:"bold", fontSize:"100%"}}>Stock : {data.stocks}</div>
                        </div>
                        <span style={{width:"",fontFamily:"Lato,sans-serif", fontSize:"100%", paddingLeft:"1%", paddingRight:"1%", backgroundColor: data.asStocks ? ("#c8e6c9") : ("#ffcdd2")}}>{data.asStocks ? ('En stock') : ('Rupture')}</span>
                        <span style={{fontFamily:"Lato,sans-serif", fontSize:"120%"}}>{data.price}€</span>
                        <div style={{width:"12%"}}>
                            <Button style={{fontFamily:"Lato,sans-serif", backgroundColor:"grey", borderColor:"grey"}} icon="pi pi-info-circle" label="" onClick={() => {
                                setDescription(data.description);
                                setDisplayDescription(true);
                            }} tooltip={"Cliquez pour la description"} tooltipOptions={{ position: 'left', mouseTrack: true, mouseTrackTop: 15 }}/>
                            <Button style={{fontFamily:"Lato,sans-serif",  backgroundColor:"rgb(89, 136, 255)", borderColor:"rgb(89, 136, 255)", marginLeft:"3%"}} icon="pi pi-shopping-cart" label="" onClick={() => {
                                    setInfoDialog({
                                        shopID : shopID,
                                        itemID: itemID,
                                        prixIndic : data.price,
                                        itemName: data.name,
                                        packageID : data.id
                                    });
                                    setDisplayBasic(true);
                            }} disabled={data.asStocks === false}/>
                        </div>
                    </div>
                </div>
            )
        }else{
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
                            <Button style={{fontFamily:"Lato,sans-serif", backgroundColor:"grey", borderColor:"grey"}} icon="pi pi-info-circle" label="" onClick={() => {
                                setDescription(data.description);
                                setDisplayDescription(true);
                            }} tooltip={"Cliquez pour la description"} tooltipOptions={{ position: 'left', mouseTrack: true, mouseTrackTop: 15}}/>
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
    }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayDescription' : setDisplayDescription
    }


    const validate = () => {
        let specification;
        if (spec === ""){
            specification = "Non déterminé par le client"
        }else{
            specification = spec;
        }
        addToCommandPackage(infoDialog.shopID, infoDialog.itemID, infoDialog.packageID, price, specification).then(data => {
            if (data.status === 1){
                dialogToast.current.show({severity:'error', summary: 'Erreur', detail: data.message, life: 3000});
            }else{
                dialogToast.current.show({severity:'success', summary: 'Succès', detail: data.message, life: 3000});
            }
        })
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Annuler" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Ajouter" icon="pi pi-check" onClick={() => {
                    validate();
                    onHide(name)
                }} autoFocus />
            </div>
        );
    }
    const renderFooterProduct = (name) => {
        return (
            <div>
                <Button label="Annuler" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    }


    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {item ? (
                <div className="responsiveContainer">
                    <Dialog header="Commander un service" visible={displayBasic} style={{ width: '30%' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                        <div style={{display: "flex", flexDirection:"row", flexWrap:"wrap", alignItems:"center"}}>
                            <div style={{fontFamily:"Lato, sans-serif", fontWeight:"bold", fontSize:"120%"}}>Nom du package : </div>
                            <div style={{fontFamily:"Lato, sans-serif", fontSize:"100%", marginLeft:"1%"}}>{infoDialog.itemName}</div>
                        </div>
                        <div style={{display: "flex", flexDirection:"row", flexWrap:"wrap", alignItems:"center", marginTop:"2%"}}>
                            <div style={{fontFamily:"Lato, sans-serif", fontWeight:"bold", fontSize:"120%"}}>Prix de base : </div>
                            <div style={{fontFamily:"Lato, sans-serif", fontSize:"100%", marginLeft:"1%"}}>{infoDialog.prixIndic} €</div>
                        </div>
                        <div style={{display: "flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                            <div style={{fontFamily:"Lato, sans-serif", fontWeight:"bold", fontSize:"120%"}}>Votre prix : </div>
                            <InputNumber id="minmax-buttons" value={price} onValueChange={(e) => setPrice(e.value)} showButtons mode="currency" currency="EUR" min={1} max={9999} />
                        </div>
                        <div style={{display: "flex", flexDirection:"column", flexWrap:"wrap", marginTop:"2%"}}>
                            <div style={{fontFamily:"Lato, sans-serif", fontWeight:"bold", fontSize:"120%"}}>Votre spécification : </div>
                            <InputTextarea style={{width:"100%"}} value={spec} onChange={(e) => setSpec(e.target.value)} rows={6} cols={30} autoResize />
                        </div>

                    </Dialog>
                    <Dialog header="Description produit" visible={displayDescription} style={{ width: '40%', }} footer={renderFooterProduct('displayDescription')} onHide={() => onHide('displayDescription')}>
                        <p>{description}</p>
                    </Dialog>
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
                    {item.packages.length !== 0 ? (
                        <div className="containerTwo">
                            <Toast ref={dialogToast} />
                            <DataScroller value={products} itemTemplate={itemTemplate} rows={7} inline scrollHeight="330px" header={`Liste des packages de ${item.name}`} />
                        </div>
                    ) : (
                        <div>
                            <DataScroller value={null} itemTemplate={itemTemplate} rows={7} inline scrollHeight="330px" header={`Aucuns packages disponibles à l'achat pour le moment pour cet objet!`} />
                        </div>
                    )}

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
