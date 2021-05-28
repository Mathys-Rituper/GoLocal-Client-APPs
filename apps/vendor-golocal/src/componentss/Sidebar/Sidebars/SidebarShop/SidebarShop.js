import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, {useRef, useState} from 'react';
import "./SidebarShop.css"
import { PanelMenu } from 'primereact/panelmenu';
import MyShops from "../../sub-components/MyShops/MyShops";
import ShopInfos from "../../sub-components/ShopInfos/ShopInfos";
import MyProducts from "../../sub-components/MyProducts/MyProducts";
import CreateProduct from "../../sub-components/CreateProduct/CreateProduct";
import {useLocation} from "react-router-dom";
import {confirmDialog} from "primereact/components/confirmdialog/ConfirmDialog";
import {Toast} from "primereact/toast";
import {deleteShopWithToken} from "../../../../golocal-oidc/functions";
import CreateService from "../../sub-components/CreateService/CreateService";
import ChangeImage from "../../sub-components/ChangeImage/ChangeImage";
import MyServices from "../../sub-components/MyServices/MyServices";
import ModifyContact from "../../sub-components/ModifyContact/ModifyContact";
import ModifyLocation from "../../sub-components/ModifyLocation/ModifyLocation";
import ChangeShopName from "../../sub-components/ChangeShopName/ChangeShopName";
import ChangeOpenings from "../../sub-components/ChangeOpenings/ChangeOpenings";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function SidebarShop(){
    const params = useQuery();
    const shopID = params.get("shopID");
    const shopName = params.get("shopName");
    const [component, setComponent] = useState(<ShopInfos/>)
    const [displayGlobal, setDisplayGlobal] = useState(true)
    const [displayProductPage, setDisplayProductPage] = useState(false)
    const [displayServiceInfo, setDisplayServiceInfo] = useState(false)
    const toast = useRef(null);
    const confirm2 = () => {
        confirmDialog({
            message: 'Voulez-vous supprimer votre boutique?',
            header: 'Cette action est irréversible',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            rejectLabel: "Annuler",
            acceptLabel: "Supprimer",
            accept,
            reject
        });
    };
    const accept = () => {
        deleteShopWithToken(shopID, shopName).then(data =>{
            console.log(data)
            if (data.status === 1){
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.message, life: 5000 });
            }else{
                toast.current.show({ severity: 'success', summary: 'Succès', detail: data, life: 5000 });
                setTimeout(()=> {
                    window.location.replace("https://localhost:3002/artisan")
                }, 2000)
            }
        })
    }
    const reject = () => {
        toast.current.show({ severity: 'info', summary: 'Annulation', detail: 'Vous avez annulé la suppression', life: 3000 });
    }
    const items = [
        {
            label:'Ma Boutique',
            icon:'pi pi-info-circle',
            command : () => {displayShop()},
            items:[
                {
                    label:'Modifier Nom',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {modifyName()}
                },
                {
                    label:'Modifier Contact',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {modifyContact()}
                },
                {
                    label:'Modifier Localisation',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {modifyLocation()}
                },
                {
                    label:'Ajouter / Modifier Horaires',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {modifyOpening()}
                },
                {
                    label:'Ajouter / Modifier Image',
                    icon:'pi pi-fw pi-image',
                    command : () => {modifyImage()}
                },
                {
                    label:'Supprimer Boutique',
                    icon:'pi pi-exclamation-triangle',
                    command : () => {confirm2()},
                }
            ]
        },
        {
            label:'Mes Produits',
            icon:'pi pi-th-large',
            command : () => {displayProducts()},
            items:[
                {
                    label:'Créer un produit',
                    icon:'pi pi-fw pi-plus-circle',
                    command : () => {createProduct()}
                }
            ]
        },
        {
            label:'Mes Services',
            icon:'pi pi-th-large',
            command : () => {displayServices()},
            items:[
                {
                    label:'Créer un service',
                    icon:'pi pi-fw pi-plus-circle',
                    command : () => {createService()}
                }
            ]
        }
    ];
    function displayShop(){
        if (!displayGlobal){
            setComponent(<ShopInfos/>)
            setDisplayGlobal(true);
            setDisplayProductPage(false);
            setDisplayServiceInfo(false)
        }
    }
    function displayProducts(){
        if (!displayProductPage){
            setComponent(<MyProducts/>)
            setDisplayProductPage(true);
            setDisplayGlobal(false);
            setDisplayServiceInfo(false)
        }
    }
    function displayServices(){
        if (!displayServiceInfo){
            setComponent(<MyServices/>)
            setDisplayServiceInfo(true)
            setDisplayGlobal(false);
            setDisplayProductPage(false);
        }
    }
    function modifyName(){
        setComponent(<ChangeShopName/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function modifyOpening(){
        setComponent(<ChangeOpenings/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function modifyLocation(){
        setComponent(<ModifyLocation/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function modifyImage(){
        setComponent(<ChangeImage/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function modifyContact(){
        setComponent(<ModifyContact/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function modifyOpenings(){
        setComponent(<ChangeImage/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function createProduct(){
        setComponent(<CreateProduct/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }
    function createService(){
        setComponent(<CreateService/>)
        setDisplayGlobal(false);
        setDisplayProductPage(false);
        setDisplayServiceInfo(false)
    }


    function RenderSidebar(){
        return(
            <div style={{display:"flex", flexDirection:"row", minHeight:"830px"}}>
                <Toast ref={toast} />
                <div style={{width:'18%', backgroundColor:"#f8f9fa", borderRight:"2px solid rgb(170, 179, 179)"}}>
                    <div style={{fontFamily:"Lato, sans-serif", fontSize:"150%", marginLeft:"3%", paddingTop:"5%", marginBottom:"5%", fontWeight:"bold", cursor:"pointer"}} onClick={() =>{window.location.href="https://localhost:3002/artisan"}}>{"<"} Retour Panel</div>
                    <PanelMenu model={items} multiple={true} />
                </div>
                <div style={{padding:"3%", width:"82%"}}>
                    {component}
                </div>
            </div>
        )
    }

    return RenderSidebar();
}
